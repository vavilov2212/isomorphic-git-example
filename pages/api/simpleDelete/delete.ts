import path from 'path';
import http from 'isomorphic-git/http/node';
/* import http from '../../../lib/request'; */
import git from 'isomorphic-git';
import fs from 'fs';

export default async function handler(req, res) {
  const { filepath } = JSON.parse(req.body);

  console.log('filepath', filepath);

  const dir = path.join(process.cwd(), 'test-clone');
  const message = 'Delete commit message.';

  if (fs.existsSync(dir)) {
    try {
      await git.remove({ fs, dir: './test-clone', filepath })
    } catch(e) {
      console.log('git.add error', e);
    }
  }

  let remotes = await git.listRemotes({ fs, dir })
  console.log('simpleDelete remotes', remotes);

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
      onProgress: console.log,
      onMessage: console.log,
      remote: 'origin',
      ref: 'master',
      onAuth: () => ({ username: 'vavilov2212', password: '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' }),
              /* headers: { */
          /* Authentication: `Basic ${Buffer.from(`vavilov2212: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`).toString('base64')}` */
        /* } */

    })
      .then((git_res) => {
        console.log('git_res', git_res);
        res.status(200).json({ success: true });
      })
  } catch(e) {
    console.log('push error', e);
    res.status(400).json({ erro: e.message });
  }
};
