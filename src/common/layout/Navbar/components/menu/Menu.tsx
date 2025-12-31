import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router';
import styles from './Menu.module.css';

type MenuProps = {
	children?: ReactNode;
};

const Menu: FC<MenuProps> = ({ children }) => {
	return <ul className={styles.ul}>{children}</ul>;
};

export default Menu;

export interface ItemProps {
	href: string;
	label: string;
}

export function Item({ href, label }: ItemProps) {
	return (
		<li>
			<NavLink 
                to={href}
                className={({ isActive }) => 
                    `${styles.link} ${isActive ? styles.active : ''}`
                }
            >
                {label}
            </NavLink>
		</li>
	);
}

interface NavItemsProps {
	items: ItemProps[];
}

export const NavItems = ({ items }: NavItemsProps) => {
	return (
		<>
			{items.map((item, index) => (
				<Item key={index} href={item.href} label={item.label} />
			))}
		</>
	);
};
