import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import styles from './navbar.module.css';
import logo from '../../assets/logo.png';
import cartImage from '../../assets/cart.svg';
import { useContext, useState } from 'react';

export default function Navbar() {
 const {cart} = useContext<any>(StoreContext)
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className={styles.nav}>
        <Link id={styles.limitSpace} to="/">
          <img className={styles.logo} src={logo} alt="Logo" />
        </Link>
        <div id={styles.cartImageSizer}>
          <Link to="/shoppingCart">
            <img id={styles.editCartSize} src={cartImage} alt="Cart" />
            <label>{cart?.length}</label>
          </Link>
        </div>
        <div className={styles.burgerMenu} onClick={toggleMenu}>
          <div className={menuOpen ? `${styles.line} ${styles.line1Active}` : styles.line}></div>
          <div className={menuOpen ? `${styles.line} ${styles.line2Active}` : styles.line}></div>
          <div className={menuOpen ? `${styles.line} ${styles.line3Active}` : styles.line}></div>
        </div>
        <menu dir='rtl' className={`${styles.menu} ${menuOpen ? styles.showMenu : ''}`}>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            {/* <li>
              <Link to="/profile">Profile</Link>
            </li> */}
            <li>
              <Link to="/store">Store</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </menu>
      </nav>
    </>
  );
}
