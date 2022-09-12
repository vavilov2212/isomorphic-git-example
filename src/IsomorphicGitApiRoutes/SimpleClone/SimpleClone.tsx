import { useState } from 'react';
import CloneInputs from 'CloneInputs/CloneInputs';
import styles from './SimpleClone.module.scss';

const SimpleClone = (props) => {
  const [response, setResponse] = useState([]);

  return (
    <>
      <p className={styles.pageTitle}>Simple clone repository using "isomorphic-git"</p>
      <p>This clones repo <b>server-side</b>, using nextjs api routes.</p>

      <CloneInputs
        setResponse={setResponse}
        response={response}
      />

      {!!response?.length &&
        <div className={styles.cloneResponseContainer}>
          {response.map(cR => <span key={`${cR}`}>{cR}</span>)}
        </div>
      }

      {!response?.length &&
        <p className={styles.preloaderCaption}>Here will be list of files after clone.</p>
      }
    </>
  );
}

export default SimpleClone;
