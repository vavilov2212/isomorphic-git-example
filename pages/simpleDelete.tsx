import { DeleteAndPushUI } from 'IsomorphicGitApiRoutes';

interface SimpleDeleteProps {
  directoryArray: string[];
}

export default function SimpleDelete(props: SimpleDeleteProps) {
  const { directoryArray } = props;

  return <DeleteAndPushUI directoryArray={directoryArray} />;
}

export async function getStaticProps({ params }) {
    console.log('params', params);
  const response = await fetch(`${process.env.BASE_URL}/api/simpleClone/clone`, { method: 'POST', body: JSON.stringify({ repoUrl: 'https://github.com/vavilov2212/wiki-articles' }) })
    .then(res => {
      console.log('deleteAdnPush getStaticProps res', res);
      if (res) return res.json();
    });
    console.log('response', response);

  return {
    props: {
      directoryArray: response,
    },
  }
};
