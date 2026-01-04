import styles from './About.module.css';
import { Compass, Sparkles, Moon, Sun } from 'lucide-react';

const About = () => {
	return (
		<div className={styles.container}>
			<section className={styles.heroSection}>
				<h1 className={styles.mainTitle}>The Valenti Vision</h1>
				<p className={styles.mainSubtitle}>Bridging ancient wisdom and digital infinity.</p>
			</section>

			<div className={styles.grid}>
				<div className={styles.glassCard}>
					<div className={styles.iconWrapper}><Compass size={32} /></div>
					<h3>Our Origins</h3>
					<p>
						Born from the intersection of dream exploration and computational ethics, 
						<span className={styles.highlight}>Valenti Dreams</span> began as a experiment in 
						collective consciousness synchronization.
					</p>
				</div>

				<div className={styles.glassCard}>
					<div className={styles.iconWrapper}><Sparkles size={32} /></div>
					<h3>The Method</h3>
					<p>
						We utilize high-frequency audio-visual guidance to induce states of 
						supra-consciousness, allowing seekers to bypass the analytical mind 
						and access their core essence.
					</p>
				</div>

				<div className={styles.glassCard}>
					<div className={styles.iconWrapper}><Moon size={32} /></div>
					<h3>Astral Integrity</h3>
					<p>
						Every session is crafted with deep respect for the sacred. We maintain 
						the highest energetic standards to ensure your digital journey remains 
						spiritually grounded and safe.
					</p>
				</div>

				<div className={styles.glassCard}>
					<div className={styles.iconWrapper}><Sun size={32} /></div>
					<h3>Global Harmony</h3>
					<p>
						Our ultimate goal is the elevation of global vibration. When one soul 
						finds clarity, the entire collective frequency shifts toward harmony 
						and understanding.
					</p>
				</div>
			</div>

			<section className={styles.closingSection}>
				<h2 className={styles.mantra}>Awaken. Connect. Transcend.</h2>
			</section>
		</div>
	);
};

export default About;