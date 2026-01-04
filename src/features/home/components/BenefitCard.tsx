import styles from './BenefitCard.module.css';

interface BenefitItem {
	id: string;
	title: string;
	description: string;
	image: string;
}

interface BenefitCardProps {
	item: BenefitItem;
	isActive?: boolean;
}

export const BenefitCard = ({ item, isActive = false }: BenefitCardProps) => {
	return (
		<div className={`${styles.benefitCard} ${isActive ? styles.active : ''}`}>
			<div className={styles.mobileNumber}>{item.id}</div>
			<div className={styles.cardImageWrapper}>
				<img src={item.image} alt={item.title} className={styles.cardImage} />
			</div>
			<div className={styles.cardContent}>
				<h3>{item.title}</h3>
				<p>{item.description}</p>
			</div>
		</div>
	);
};
