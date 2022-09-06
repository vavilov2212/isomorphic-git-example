import { useState, useEffect } from 'react';
import styles from './CloneInputs.module.scss';

const CloneInputs = (props) => {
  const { trigger } = props;

  useEffect(() => {
    if (!!trigger?.length) {
      props.submitClone(repoUrl, corsUrl);
    }
  }, [trigger]);

  const [repoUrl, setRepoUrl] = useState('https://github.com/vavilov2212/wiki-articles');
  const [corsUrl, setCorsUrl] = useState('http://localhost:9999');

  const submitClone = () => {
    props.submitClone(repoUrl, corsUrl);
  };

  return (
    <div className={styles.requestContainer}>
      <div className={styles.request}>
        <label>Cors pruxy url:</label>
        <input type="text" value={corsUrl} onChange={e => setCorsUrl(e.target.value)}/>
      </div>
      <div className={styles.request}>
        <label>Repository url:</label>
        <input type="text" value={repoUrl} onChange={e => setRepoUrl(e.target.value)}/>
      </div>
      <button className={styles.cloneButton} onClick={submitClone}>Clone</button>
    </div>
  );
};

export default CloneInputs;
