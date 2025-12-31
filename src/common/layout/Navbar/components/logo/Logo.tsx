import type { FC } from 'react';
import styles from './Logo.module.css';
import { NavLink } from 'react-router';
import logo from '@/assets/logo.webp';

type LogoProps = {
	img?: string;
	href?: string;
};
const Logo: FC<LogoProps> = ({ img = logo, href = '/' }) => {
	return (
		<div className={styles.logoDiv}>
			<NavLink to={href}>
				<img className={styles.logoImg} src={img} alt='logo image' />
			</NavLink>
		</div>
	);
};

export default Logo;
