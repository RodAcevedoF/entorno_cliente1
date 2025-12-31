import { useEffect } from 'react';
import { useCart } from '@/common/contexts/CartContext/CartContext';
import styles from './CartDrawer.module.css';
import { createPortal } from 'react-dom';

export const CartDrawer = () => {
	const { isCartOpen, closeCart, items, removeFromCart, clearCart, total } =
		useCart();

	// Prevent body scroll when drawer is open
	useEffect(() => {
		if (isCartOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isCartOpen]);

	if (!isCartOpen) return null;

	const drawerContent = (
		<div className={styles.overlay} onClick={closeCart}>
			<div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
				<div className={styles.header}>
					<h2>Your Spirit Cart</h2>
					<button className={styles.closeBtn} onClick={closeCart}>
						&times;
					</button>
				</div>

				<div className={styles.items}>
					{items.length === 0 ? (
						<div className={styles.empty}>
							<p>Your journey bag is empty.</p>
							<button className={styles.startBtn} onClick={closeCart}>
								Browse Sessions
							</button>
						</div>
					) : (
						items.map((item) => (
							<div key={item.id} className={styles.item}>
								<div className={styles.itemInfo}>
									<span className={styles.itemName}>{item.name}</span>
									<span className={styles.itemPrice}>
										${item.price} x {item.quantity}
									</span>
								</div>
								<div className={styles.itemActions}>
									<span className={styles.itemTotal}>
										${item.price * item.quantity}
									</span>
									<button
										className={styles.removeBtn}
										onClick={() => removeFromCart(item.id)}>
										&times;
									</button>
								</div>
							</div>
						))
					)}
				</div>

				{items.length > 0 && (
					<div className={styles.footer}>
						<div className={styles.totalRow}>
							<span>Total</span>
							<span className={styles.totalAmount}>${total}</span>
						</div>
						<div className={styles.actions}>
							<button className={styles.clearBtn} onClick={clearCart}>
								Clear
							</button>
							<button
								className={styles.checkoutBtn}
								onClick={() => console.log('Pending')}>
								Proceed to Checkout
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);

	return createPortal(drawerContent, document.body);
};
