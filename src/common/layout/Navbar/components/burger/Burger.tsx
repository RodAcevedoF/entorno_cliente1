import { useNavbar } from '../../Navbar';
import styles from './Burger.module.css';

const Burger = () => {
    const { isMobileMenuOpen, toggleMobileMenu } = useNavbar();

    return (
        <button 
            className={`${styles.burger} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
        >
            <span />
            <span />
            <span />
        </button>
    );
};

export default Burger;
