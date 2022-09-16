export const submitClone = async (repoUrl: string, corsUrl: string) => {
  return await fetch(
    'api/simpleClone/clone',
    {
      method: 'POST',
      body: JSON.stringify({ repoUrl, corsUrl }) 
    }
  )
    .then(res => res.json());
};
