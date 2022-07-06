const IsomorphicGitApi = () => {
  const submitClone = () => {
    fetch(
      'api/clone',
      {
        method: 'POST',
      }
    );
  };

  return (
    <div onClick={submitClone}>test</div>
  );
}

export default IsomorphicGitApi;
