import { useEffect } from 'react';
import { useCart } from '@/common/contexts/CartContext/CartContext';
import styles from './CartDrawer.module.css';
import { createPortal } from 'react-dom';
import { useAuth } from '@/common/contexts/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import { OrderService } from '@/api/services/order.service';
import { CartService } from '@/api/services/cart.service';
import useMutation from '@/common/hooks/useMutation';
import type { Order, OrderDTO, Cart } from '@/types/types.app';

export const CartDrawer = () => {
	const navigate = useNavigate();
	const {
		isCartOpen,
		closeCart,
		items,
		setItems,
		removeFromCart: removeUI,
		clearCart: clearUI,
		total,
	} = useCart();
	const { userContext } = useAuth();

	const handleNavigate = () => {
		closeCart();
		userContext.isAuthenticated ? navigate('/sessions') : navigate('/login');
	};

	const { mutate: clearCartAPI } = useMutation<Cart, { userId: string }>(
		CartService.clearCart,
		{
			onSuccess: () => {
				clearUI();
			},
		},
	);

	const { mutate: createOrder, isLoading } = useMutation<Order, OrderDTO>(
		OrderService.createOrder,
		{
			onSuccess: () => {
				if (userContext?.id) {
					clearCartAPI({ userId: userContext.id });
				} else {
					clearUI();
				}
				closeCart();
				navigate('/profile');
			},
			onError: (error) => {
				console.error('Placing order failed', error);
			},
		},
	);

	const { mutate: removeItemAPI } = useMutation<
		Cart,
		{ userId: string; sessionId: string }
	>(CartService.removeItem, {
		onSuccess: (updatedCart) => {
			setItems(updatedCart.items);
		},
	});

	const handleCheckout = () => {
		if (!userContext?.id) {
			navigate('/login');
			return;
		}
		createOrder({
			userId: userContext.id,
			items,
			total,
		});
	};

	const handleRemoveItem = (sessionId: string) => {
		removeUI(sessionId);
		if (userContext?.id) {
			removeItemAPI({ userId: userContext.id, sessionId });
		}
	};

	const handleClearCart = () => {
		if (userContext?.id) {
			clearCartAPI({ userId: userContext.id });
		} else {
			clearUI();
		}
	};

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
							<button className={styles.startBtn} onClick={handleNavigate}>
								{userContext.isAuthenticated
									? 'Browse Sessions'
									: 'Login to Start'}
							</button>
						</div>
					) : (
						items.map((item) => (
							<div key={item.sessionId} className={styles.item}>
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
										onClick={() => handleRemoveItem(item.sessionId)}>
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
							<button className={styles.clearBtn} onClick={handleClearCart}>
								Clear
							</button>
							<button
								className={styles.checkoutBtn}
								onClick={handleCheckout}
								disabled={isLoading}>
								{isLoading ? 'Processing...' : 'Proceed to Checkout'}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);

	return createPortal(drawerContent, document.body);
};
