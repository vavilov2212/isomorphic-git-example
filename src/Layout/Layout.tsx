import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>{children}</div>
  );
}

export default Layout;
