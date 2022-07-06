import path from 'path';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
/* import http from '../../lib/request'; */
import fs from 'fs';

export default async function handler(req, res) {
  const { repoUrl } = JSON.parse(req.body);

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
    url: repoUrl || 'https://cors.isomorphic-git.org/github.com/isomorphic-git/lightning-fs',
    corsProxy: 'https://cors.isomorphic-git.org',
  })
    .then(console.log)
    .catch(console.log);

  res.status(200).json(fs.readdirSync('./test-clone'));
};

const onMessage = (msg: any) => console.log(msg);
const onProgress = (msg: any) => console.log(msg);
