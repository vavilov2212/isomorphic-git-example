import { useState } from 'react';

import styles from './IsomorphicGitApiRoutes.module.scss';

const IsomorphicGitApi = () => {
  const [repoUrl, setRepoUrl] = useState("https://github.com/isomorphic-git/lightning-fs");
  const [cloneResponse, setCloneResponse] = useState([]);

  const submitClone = async () => {
    const response = await fetch('api/clone', { method: 'POST', body: JSON.stringify({ repoUrl }) })
      .then(res => {
        console.log('res', res);
        if (res) return res.json();
      });

    setCloneResponse(response);
  };

  return (
    <>
      <p className={styles.pageTitle}>Clone repository using "isomorphic-git"</p>
      <p>This clones repo <b>server-side</b>, using nextjs api routes.</p>

      <div className={styles.cloneRequestContainer}>
        <label>Repository url:</label>
        <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)}/>
        <button className={styles.cloneButton} onClick={submitClone}>Clone</button>
      </div>

      {!!cloneResponse?.length &&
        <div className={styles.cloneResponseContainer}>
          {cloneResponse.map(cR => <span key={`${cR}`}>{cR}</span>)}
        </div>
      }
    </>
  );
}

export default IsomorphicGitApi;
