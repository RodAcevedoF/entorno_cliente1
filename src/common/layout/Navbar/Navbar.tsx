import { type FC, type ReactNode, createContext, useContext, useState } from 'react';
import styles from './Navbar.module.css';

export interface NavbarProps {
	children?: ReactNode;
}

interface NavbarContextType {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavbar must be used within a Navbar');
    }
    return context;
};

const Navbar: FC<NavbarProps> = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

	return (
        <NavbarContext.Provider value={{ isMobileMenuOpen, toggleMobileMenu, closeMobileMenu }}>
            <nav className={styles.nav}>{children}</nav>
        </NavbarContext.Provider>
    );
};

export default Navbar;
