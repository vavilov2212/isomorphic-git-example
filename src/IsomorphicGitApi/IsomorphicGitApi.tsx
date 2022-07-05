const IsomorphicGitApi = () => {
  const submitClone = () => {
    fetch(
      'api/clone',
      {
        method: 'POST',
        headers: {
          "origin": "github.com"
        }
      }
    );
  };

  return (
    <div onClick={submitClone}>test</div>
  );
}

export default IsomorphicGitApi;
