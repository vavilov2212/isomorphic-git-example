import { useState, useEffect } from 'react';
import { submitClone } from 'api';
import useApi from 'hoc/useApi';

import styles from './CloneInputs.module.scss';

const CloneInputs = (props) => {
  const { trigger, setResponse } = props;

  const [repoUrl, setRepoUrl] = useState('https://github.com/vavilov2212/wiki-articles');
  const [corsUrl, setCorsUrl] = useState('http://localhost:9999');

  const [cloneResponse, getCloneResponse] = useApi<string[]>(() => submitClone(repoUrl, corsUrl));

  useEffect(() => {
    if (!!cloneResponse.length) {
      setResponse(cloneResponse);
    }
  }, [cloneResponse]);

  useEffect(() => {
    if (!!trigger?.length) {
      getCloneResponse();
    }
  }, [trigger]);

  return (
    <div className={styles.requestContainer}>
      <div className={styles.request}>
        <label>Cors-proxy url:</label>
        <input type="text" value={corsUrl} onChange={e => setCorsUrl(e.target.value)}/>
      </div>
      <div className={styles.request}>
        <label>Repository url:</label>
        <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)}/>
      </div>
      <button className={styles.cloneButton} onClick={getCloneResponse}>Clone</button>
    </div>
  );
};

export default CloneInputs;
