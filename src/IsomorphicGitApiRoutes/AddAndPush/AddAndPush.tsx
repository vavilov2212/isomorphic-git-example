import { useEffect, useState } from 'react';

import styles from './AddAndPush.module.scss';

interface DeleteAdnPushProps {
  directoryArray: string[];
}

const AddAndPush = (props: DeleteAdnPushProps) => {
  const { directoryArray } = props;

  const [repoUrl, setRepoUrl] = useState('https://github.com/vavilov2212/wiki-articles');
  const [addFileName, setAddFileName] = useState('');
  const [addValue, setAddValue] = useState('');
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
      .catch(e => console.log('delete error', e));
  };

  const submitAddFile = async () => {
    await fetch(
      'api/simpleAdd/add',
      {
        method: 'POST', body: JSON.stringify({
          filepath: addFileName,
          filecontent: addValue
        }) 
      }
    )
      .then(response => {
        console.log('add response', response);
        if (response.status === 400) {
          return response.json();
        }

        submitClone();
      })
      .catch(e => console.log('add error', e));
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeadingContainer}>
        <p className={styles.pageTitle}>Delete and push files to repository using "isomorphic-git"</p>
        <p>This clones <a href="https://github.com/vavilov2212/wiki-articles">https://github.com/vavilov2212/wiki-articles</a></p>
        <p>This clones repo <b>server-side</b>, using nextjs api routes.</p>

        <div className={styles.cloneRequestContainer}>
          <label>Repository url:</label>
          <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)}/>
          <button className={styles.cloneButton} onClick={submitClone}>Clone</button>
        </div>
      </div>

      <div className={styles.commandsContainer}>
        {!cloneResponse?.length &&
          <span>Here will be list of files after clone.</span>
        }
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

        <div className={styles.addCommandContainer}>
          <div className={styles.addMetaInfContainer}>
            <label>File name:</label>
            <input className={styles.addFileNameInput} type="text" value={addFileName} onChange={e => setAddFileName(e.target.value)}/>
            <button className={styles.cloneButton} onClick={submitAddFile}>Add</button>
          </div>
          <textarea className={styles.addInput} value={addValue} onChange={e => setAddValue(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default AddAndPush;
