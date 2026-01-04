import type { Session } from '@/api/services/sessions.service';
import styles from './SessionCard.module.css';
import { useAuth } from '@/common/contexts/AuthContext/AuthContext';
import { ShoppingCart, Clock, Zap } from 'lucide-react';

interface SessionCardProps {
	session: Session;
	onAddToCart: (item: {
		sessionId: string;
		quantity: number;
		name: string;
		price: number;
	}) => void;
	isAdding?: boolean;
}

export const SessionCard = ({
	session,
	onAddToCart,
	isAdding = false,
}: SessionCardProps) => {
	const { userContext } = useAuth();

	return (
		<div className={styles.card}>
			<div className={styles.imageContainer}>
				<img
					src={session.image}
					alt={session.name}
					className={styles.image}
					onError={(e) => {
						(e.target as HTMLImageElement).src = '/assets/sessions/inner_11zon.webp';
					}}
				/>
				<span className={styles.category}>
					{session.category || 'Spiritual'}
				</span>
			</div>

			<div className={styles.content}>
				<h3 className={styles.title}>{session.name}</h3>
				<p className={styles.description}>{session.description}</p>

				<div className={styles.meta}>
					<span>
						<Clock /> {session.duration} min
					</span>
					<span>
						<Zap /> {session.level}
					</span>
				</div>
			</div>

			<div className={styles.footer}>
				<div className={styles.priceTag}>
					<span className={styles.currency}>$</span>
					<span className={styles.amount}>{session.price}</span>
				</div>
				<button
					className={styles.button}
					onClick={() =>
						userContext?.id &&
						onAddToCart({
							sessionId: session.id.toString(),
							quantity: 1,
							name: session.name,
							price: session.price,
						})
					}
					disabled={!userContext?.id || isAdding}>
					<ShoppingCart size={18} />
					<span>{isAdding ? 'Adding...' : 'Add'}</span>
				</button>
			</div>
		</div>
	);
};
