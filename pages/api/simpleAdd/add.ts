import path from 'path';
import http from 'isomorphic-git/http/node';
import git from 'isomorphic-git';
import fs from 'fs';

export default async function handler(req, res) {
  const { filepath, filecontent } = JSON.parse(req.body);

  console.log('simpleAdd filepath', filepath);
  console.log('simpleAdd fileContent', filecontent);

  const dir = path.join(process.cwd(), 'test-clone');
  const file = path.join(dir, filepath);
  console.log('file', file);
  const message = 'Add commit message.';

  if (fs.existsSync(dir)) {
    try {
      fs.appendFileSync(file, filecontent);
      await git.add({ fs, dir: './test-clone', filepath  })
    } catch(e) {
      console.log('git.add error', e);
    }
  }

  let remotes = await git.listRemotes({ fs, dir })
  console.log('simpleAdd remotes', remotes);

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
    })
      .then((git_res) => {
        console.log('git_res', git_res);
        res.status(200).json({ success: true });
      })
  } catch(e) {
    console.log('push error', e);
    res.status(400).json({ error: e.message });
  }
};
