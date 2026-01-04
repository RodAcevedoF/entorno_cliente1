import { NavLink } from 'react-router';
import styles from './Hero.module.css';

export const Hero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.heroContent}>
				<div className={styles.heroHeader}>
					<h1 className={styles.title}>Valenti Dreams</h1>
					<h2 className={styles.subtitle}>
						Supra Conscious Interactive Sessions
					</h2>
				</div>

				<p className={styles.description}>
					Embark on a journey to the center of your being. Discover your inner
					self and explore the realms of supra-consciousness through our
					guided interactive sessions.
				</p>

				<div className={styles.actions}>
					<NavLink to='/sessions' className={styles.btnPrimary}>
						View Sessions
					</NavLink>
					<NavLink to='/about' className={styles.btnSecondary}>
						Learn More
					</NavLink>
				</div>
			</div>
		</section>
	);
};
