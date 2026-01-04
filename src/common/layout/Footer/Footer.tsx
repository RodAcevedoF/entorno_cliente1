import { NavLink } from 'react-router';
import styles from './Footer.module.css';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.brandSection}>
					<h2 className={styles.logo}>Valenti Dreams</h2>
					<p className={styles.tagline}>Exploring the depths of supra-consciousness.</p>
					<div className={styles.socials}>
						<a href="#" className={styles.socialLink}><Twitter size={20} /></a>
						<a href="#" className={styles.socialLink}><Instagram size={20} /></a>
						<a href="#" className={styles.socialLink}><Github size={20} /></a>
						<a href="#" className={styles.socialLink}><Mail size={20} /></a>
					</div>
				</div>

				<div className={styles.linksGrid}>
					<div className={styles.linkGroup}>
						<h3>Journey</h3>
						<NavLink to="/sessions" className={styles.link}>Sessions</NavLink>
						<NavLink to="/about" className={styles.link}>Our Story</NavLink>
						<NavLink to="/profile" className={styles.link}>Member Area</NavLink>
					</div>
					<div className={styles.linkGroup}>
						<h3>Support</h3>
						<a href="#" className={styles.link}>FAQ</a>
						<a href="#" className={styles.link}>Privacy Policy</a>
						<a href="#" className={styles.link}>Terms of Service</a>
					</div>
				</div>
			</div>
			<div className={styles.bottomBar}>
				<p>© {new Date().getFullYear()} Sueños Valenti. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
