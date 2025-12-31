import { NavLink } from 'react-router';
import styles from './Home.module.css';
import bgImage from '@/assets/vd_bg.webp';

const benefits = [
    {
        id: '01',
        title: 'Deep Relaxation',
        description: 'Release physical tension and mental stress as you drift into a state of profound calm and equilibrium.',
        image: 'https://placehold.co/600x400/1b2e21/38bc69?text=Deep+Relaxation'
    },
    {
        id: '02',
        title: 'Inner Clarity',
        description: 'Clear the noise of daily life to reveal the intuitive wisdom that resides within your core consciousness.',
        image: 'https://placehold.co/600x400/1b2e21/ece8cd?text=Inner+Clarity'
    },
    {
        id: '03',
        title: 'Higher Vibration',
        description: 'Elevate your energetic frequency to attract abundance, harmony, and deeper connections with the universe.',
        image: 'https://placehold.co/600x400/1b2e21/38bc69?text=Higher+Vibration'
    }
];

const Home = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.parallaxBg}>
                <img
                    src={bgImage}
                    alt='Background'
                    className={styles.backgroundImage}
                />
                <div className={styles.overlay} />
            </div>

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
                        self and explore the realms of supra-consciousness through our guided
                        interactive sessions.
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

            {benefits.map((item, index) => (
                <section key={item.id} className={`${styles.benefitRow} ${index % 2 !== 0 ? styles.reverse : ''}`}>
                    <div className={styles.numberWrapper}>
                        <span className={styles.bigNumber}>{item.id}</span>
                    </div>
                    <div className={styles.cardWrapper}>
                        <div className={styles.benefitCard}>
                            <div className={styles.cardImageWrapper}>
                                <img src={item.image} alt={item.title} className={styles.cardImage} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Home;
