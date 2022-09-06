import cn from 'classnames';
import { useRouter } from 'next/router';

import styles from './Navigation.module.scss';

const links = [
  { label: 'Simple clone', href: '/simpleClone' },
  { label: 'Delete and push', href: '/simpleDelete' },
  { label: 'Add and push', href: '/simpleAdd' },
];

const Navigation = () => {

  const { pathname } = useRouter();

  console.log('pathname', pathname);
  return (
    <aside
      className={styles.nav} 
      role="navigation"
      aria-label="main navigation"
    >
      {links.map(link => 
        <a
        className={cn(
          styles.link,
          {[styles.activeLink]: pathname === link.href}
        )}
          href={link.href}
        >
          {link.label}
        </a>
      )}
    </aside>
  );
}

export default Navigation;
