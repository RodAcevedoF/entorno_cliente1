import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Our Philosophy</h1>
                <div className={styles.content}>
                    <p>
                        Welcome to <span className={styles.highlight}>Sueños Valenti</span>, a sanctuary for the modern soul seeking connection with the infinite.
                        We believe that within every individual lies a dormant universe of wisdom, waiting to be awakened.
                    </p>
                    <p>
                        Our mission is to provide accessible, high-frequency interactive sessions that bridge the gap between ancient spiritual practices and modern technology.
                        Through our browser-based portal, you can explore the depths of your consciousness without leaving your home.
                    </p>
                    <p>
                        Whether you are a seeker taking your first steps into meditation or an experienced traveler of the astral planes,
                        our curated experiences are designed to elevate your vibration and harmonize your being.
                    </p>
                    <p className={styles.highlight}>
                        Awaken. Connect. Transcend.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;