import styles from './Home.module.css';
import bgImage from '@/assets/vd_bg.webp';
import { BENEFITS } from './benefits';
import { BenefitCard } from './components/BenefitCard';
import { Hero } from './components/Hero';
import { useEffect, useState, useRef } from 'react';

const Home = () => {
	const [activeId, setActiveId] = useState<string>('');
	const observerRefs = useRef<(HTMLElement | null)[]>([]);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: '-45% 0px -45% 0px',
			threshold: 0,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.getAttribute('data-id');
					if (id) setActiveId(id);
				}
			});
		}, options);

		observerRefs.current.forEach((ref) => {
			if (ref) observer.observe(ref);
		});

		return () => {
			observer.disconnect();
		};
	}, []);

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
				<section
					key={item.id}
					data-id={item.id}
					data-active={activeId === item.id}
					ref={(el: HTMLElement | null) => {
						observerRefs.current[index] = el;
					}}
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
			))}
		</div>
	);
};

export default Home;
