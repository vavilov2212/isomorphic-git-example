import Navigation from 'Navigation/Navigation';
import 'styles/app.css';

export default function App({ Component, pageProps }) {

  return (
    <div className="applicationContainer">
      <Navigation />
      <Component {...pageProps} />
    </div>
  )
};
