import type { Session } from '@/api/services/sessions.service';
import { useCart } from '@/common/contexts/CartContext/CartContext';
import { useToast } from '@/common/contexts/ToastContext/ToastContext';
import styles from './SessionCard.module.css';

interface SessionCardProps {
    session: Session;
}

export const SessionCard = ({ session }: SessionCardProps) => {
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const handleAddToCart = () => {
        addToCart({
            id: session.id,
            name: session.name,
            price: session.price,
            image: session.image
        });
        addToast(`Added "${session.name}" to cart`, 'success');
    };

    return (
        <div className={styles.card}>
            <div className={styles.imagePlaceholder}>
                {/* Initial letter as icon/logo placeholder */}
                {session.name.charAt(0)}
            </div>
            
            <div className={styles.content}>
                <span className={styles.category}>{session.category || 'Spiritual'}</span>
                <h3 className={styles.title}>{session.name}</h3>
                <p className={styles.description}>{session.description}</p>
                
                <div className={styles.meta}>
                    <span>⏱ {session.duration} min</span>
                    <span>⚡ {session.level}</span>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.price}>${session.price}</div>
                <button className={styles.button} onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};