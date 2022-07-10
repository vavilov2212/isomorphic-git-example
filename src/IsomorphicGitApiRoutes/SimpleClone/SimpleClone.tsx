import { useState } from 'react';

import styles from './SimpleClone.module.scss';

const SimpleClone = () => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/vavilov2212/wiki-articles');
  const [cloneResponse, setCloneResponse] = useState([]);

  const submitClone = async () => {
    const response = await fetch('api/simpleClone/clone', { method: 'POST', body: JSON.stringify({ repoUrl }) })
      .then(res => {
        console.log('res', res);
        if (res) return res.json();
      });

    setCloneResponse(response);
  };

  return (
    <div>
      <p className={styles.pageTitle}>Simple clone repository using "isomorphic-git"</p>
      <p>This clones repo <b>server-side</b>, using nextjs api routes.</p>

      <div className={styles.cloneRequestContainer}>
        <label>Repository url:</label>
        <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)}/>
        <button className={styles.cloneButton} onClick={submitClone}>Clone</button>
      </div>

      {!cloneResponse?.length &&
        <span>Here will be list of files after clone.</span>
      }
      {!!cloneResponse?.length &&
        <div className={styles.cloneResponseContainer}>
          {cloneResponse.map(cR => <span key={`${cR}`}>{cR}</span>)}
        </div>
      }
    </div>
  );
}

export default SimpleClone;
