import { useEffect, useState } from 'react';

import styles from './DeleteAndPush.module.scss';

interface DeleteAdnPushProps {
  directoryArray: string[];
}

const DeleteAndPush = (props: DeleteAdnPushProps) => {
  const { directoryArray } = props;

  console.log('directoryArray', directoryArray);
  const [repoUrl, setRepoUrl] = useState('https://github.com/vavilov2212/wiki-articles');
  const [cloneResponse, setCloneResponse] = useState([]);

  useEffect(() => {
    if (directoryArray?.length) {
      setCloneResponse(directoryArray);
    }
  }, [directoryArray])

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
      <p className={styles.pageTitle}>Delete and push files to repository using "isomorphic-git"</p>
      <p>This clones <a href="https://github.com/vavilov2212/wiki-articles">https://github.com/vavilov2212/wiki-articles</a></p>
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

export default DeleteAndPush;
