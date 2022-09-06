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

  await git.clone({
    fs,
    http,
    onMessage,
    onProgress,
    dir,
    url: repoUrl || 'https://github.com/vavilov2212/wiki-articles',
    corsProxy: corsUrl || 'http://localhost:9999',
  })
    .then(console.log)
    .catch(console.log);

  const recursiveDirStruct = (distPath) => {
    return fs.readdirSync(distPath).filter(function (file) {
      console.log('file', file);
      if (file === '.git') return false;
      return fs.statSync(distPath + '/' + file).isDirectory();
    }).reduce(function(all, subDir) {
      return [...all, ...fs.readdirSync(distPath + '/' + subDir).map(e => subDir + '/' + e)]
    }, []);
  };

  res.status(200).json(recursiveDirStruct('./test-clone'));
};

const onMessage = (msg: any) => console.log(msg);
const onProgress = (msg: any) => console.log(msg);
