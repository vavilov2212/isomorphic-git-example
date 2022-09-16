import { DeleteAndPushUI } from 'IsomorphicGitApiRoutes';

interface SimpleDeleteProps {
  directoryArray: string[];
}

export default function SimpleDelete(props: SimpleDeleteProps) {
  const { directoryArray } = props;

  return <DeleteAndPushUI directoryArray={directoryArray} />;
}

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/simpleClone/clone`,
    {
      method: 'POST', body: JSON.stringify({ repoUrl: 'https://github.com/vavilov2212/wiki-articles' }) 
    }
  )
    .then(res => {
      if (res) return res.json();
    });

  return {
    props: {
      directoryArray: response,
    },
  }
};
