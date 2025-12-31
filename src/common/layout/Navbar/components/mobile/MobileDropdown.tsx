import { NavLink } from 'react-router';
import { useNavbar } from '../../Navbar';
import styles from './MobileDropdown.module.css';

interface ItemProps {
    href: string;
    label: string;
}

interface MobileDropdownProps {
    items: ItemProps[];
}

const MobileDropdown = ({ items }: MobileDropdownProps) => {
    const { isMobileMenuOpen, closeMobileMenu } = useNavbar();

    return (
        <div className={`${styles.dropdown} ${isMobileMenuOpen ? styles.open : ''}`}>
            <ul className={styles.list}>
                {items.map((item, index) => (
                    <li key={index} className={styles.item} style={{ transitionDelay: `${index * 0.1}s` }}>
                        <NavLink 
                            to={item.href} 
                            className={({ isActive }) => 
                                `${styles.link} ${isActive ? styles.active : ''}`
                            }
                            onClick={closeMobileMenu}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MobileDropdown;
