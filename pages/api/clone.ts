import path from 'path';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
/* import http from '../../lib/request'; */
import fs from 'fs';

export default async function handler(req, res) {
  const dir = path.join(process.cwd(), 'test-clone')
  const onMessage = (msg: any) => console.log(msg);
  const onProgress = (msg: any) => console.log(msg);
  await git.clone({
    fs,
    http,
    onMessage,
    onProgress,
    dir,
    url: 'https://cors.isomorphic-git.org/github.com/isomorphic-git/lightning-fs',
    corsProxy: 'https://cors.isomorphic-git.org'
  })
    .then(console.log)
    .catch(console.log);

  res.status(200).json({ success: true });
};
