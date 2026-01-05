import styles from './Home.module.css';
import bgImage from '@/assets/vd_bg.webp';
import { BENEFITS } from './benefits';
import { BenefitCard } from './components/BenefitCard';
import { Hero } from './components/Hero';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';

const Home = () => {
	const [activeId, setActiveId] = useState<string>('');

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

			<Hero />

			{BENEFITS.map((item, index) => (
				<InView
					key={item.id}
					threshold={0.5}
					onChange={(inView) => {
						if (inView) setActiveId(item.id);
					}}>
					{({ ref }) => (
						<section
							ref={ref}
							data-id={item.id}
							data-active={activeId === item.id}
							className={`${styles.benefitRow} ${
								index % 2 !== 0 ? styles.reverse : ''
							}`}>
							<div className={styles.numberWrapper}>
								<span className={styles.bigNumber}>{item.id}</span>
							</div>
							<div className={styles.cardWrapper}>
								<BenefitCard item={item} isActive={activeId === item.id} />
							</div>
						</section>
					)}
				</InView>
			))}
		</div>
	);
};

export default Home;
