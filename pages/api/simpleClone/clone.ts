import path from 'path';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
/* import http from '../../lib/request'; */
import fs from 'fs';

export default async function handler(req, res) {
  const { repoUrl, corsUrl } = JSON.parse(req.body);

  console.log('repoUrl', repoUrl);

  if (fs.existsSync('./test-clone')) {
    try {
      fs.rmSync('./test-clone', { recursive: true });
    } catch(e) {
      console.log('fs.rmSync error', e);
    }
  }

  const dir = path.join(process.cwd(), 'test-clone');

  console.log('dir', dir);

  try {
    await git.clone({
      fs,
      http,
      onMessage: console.log,
      onProgress: console.log,
      dir,
      url: repoUrl || 'https://github.com/vavilov2212/wiki-articles',
      corsProxy: corsUrl || 'http://localhost:9999',
    })
      .then(console.log)
      .catch(console.log);
  } catch(e) {
    console.log('git.clone error', e);
  }

  const recursiveDirStruct = (distPath: string): string[] => {
    return fs.readdirSync(distPath)
      .filter(function (file) {
        console.log('file', file);
        if (file === '.git') return false;
        return fs.statSync(distPath + '/' + file).isDirectory();
      })
      .reduce(function(all, subDir) {
        return [...all, ...fs.readdirSync(distPath + '/' + subDir).map(e => subDir + '/' + e)]
      }, []);
  };

  res.status(200).json(recursiveDirStruct('./test-clone'));
};
