import Layout from 'Layout/Layout';
import Navigation from 'Navigation/Navigation';
import 'styles/app.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Navigation />
      <Component {...pageProps} />
    </Layout>
  )
}
