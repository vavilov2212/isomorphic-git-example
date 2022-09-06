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

  const submitDelete = async (filepath: string) => {
    await fetch(
      'api/simpleDelete/delete',
      {
        method: 'POST', body: JSON.stringify({ filepath }) 
      }
    )
      .then(response => {
        console.log('delete response', response);
        if (response.status === 400) {
          return response.json();
        }

        submitClone();
      })
      .catch(e => console.log('error', e));
  };

  return (
    <div>
      <p className={styles.pageTitle}>Delete and push files to repository using "isomorphic-git"</p>
      <p>This clones repo <b>server-side</b>, using nextjs api routes.</p>
      <p>You can also <b>delete</b> files.</p>

      <div className={styles.cloneRequestContainer}>
        <label>Repository url:</label>
        <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)}/>
        <button className={styles.cloneButton} onClick={submitClone}>Clone</button>
      </div>

      {!!cloneResponse?.length &&
        <div className={styles.cloneResponseContainer}>
          {cloneResponse.map(cR => (
            <div key={`${cR}`} className={styles.cloneFile}>
              <span className={styles.cloneFileName}>{cR}</span>
              <svg onClick={() => submitDelete(cR)} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </div>
          ))}
        </div>
      }

      {!cloneResponse?.length &&
        <p className={styles.preloaderCaption}>Here will be list of files after clone.</p>
      }
    </div>
  );
}

export default DeleteAndPush;
