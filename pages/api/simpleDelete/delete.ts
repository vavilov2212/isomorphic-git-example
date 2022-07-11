import path from 'path';
import http from 'isomorphic-git/http/node';
/* import http from '../../../lib/request'; */
import git from 'isomorphic-git';
import fs from 'fs';

export default async function handler(req, res) {
  const { filepath } = JSON.parse(req.body);

  console.log('filepath', filepath);

  if (fs.existsSync('./test-clone')) {
    try {
      await git.remove({ fs, dir: './test-clone', filepath })
    } catch(e) {
      console.log('git.add error', e);
    }
  }

  const dir = path.join(process.cwd(), 'test-clone');
  const message = 'Default commit message.';

  let remotes = await git.listRemotes({ fs, dir })
  console.log('remotes', remotes);

  await git.commit({
    fs,
    dir,
    message,
    author: {
      name: 'Roman Vavilov',
      email: 'vavilov2212@yandex.ru',
    },
  })
    .then(console.log)
    .catch(console.log);

  try{
    await git.push({
      fs,
      dir,
      http,
      onProgress,
      onMessage,
      remote: 'origin',
      ref: 'master',
      onAuth: () => ({ username: 'vavilov2212', password: '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' }),
    })
      .then((git_res) => {
        console.log(git_res);
        res.status(200).json({ success: true });
      })
  } catch(e) {
    res.status(400).json({ erro: e.message });
  }
};

const onMessage = (msg: any) => console.log(msg);
const onProgress = (msg: any) => console.log(msg);
