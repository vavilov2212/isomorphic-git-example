import styles from './Navigation.module.scss';

const Layout = ({ children }) => {
  return (
    <aside
      className={styles.nav} 
      role="navigation"
      aria-label="main navigation"
    >
      <a href="/simpleClone">Simple clone</a>
      <a href="/simpleDelete">Delete and push</a>
      <a href="/simpleAdd">Add and push</a>
    </aside>
  );
}

export default Layout;
