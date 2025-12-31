import {
	createContext,
	useContext,
	useEffect,
	useState,
	type FC,
	type ReactNode,
} from 'react';

export interface CartItem {
	id: number;
	name: string;
	price: number;
	image?: string;
	quantity: number;
}

interface CartContextType {
	items: CartItem[];
	addToCart: (item: Omit<CartItem, 'quantity'>) => void;
	removeFromCart: (id: number) => void;
	clearCart: () => void;
	total: number;
	count: number;
    isCartOpen: boolean;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

const CART_STORAGE_KEY = 'valenti_cart';

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
	const [items, setItems] = useState<CartItem[]>(() => {
		try {
			const stored = localStorage.getItem(CART_STORAGE_KEY);
			return stored ? JSON.parse(stored) : [];
		} catch (error) {
			console.error('Failed to parse cart from localStorage', error);
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
	}, [items]);

	const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
		setItems((prev) => {
			const existing = prev.find((item) => item.id === newItem.id);
			if (existing) {
				return prev.map((item) =>
					item.id === newItem.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}
			return [...prev, { ...newItem, quantity: 1 }];
		});
        setIsCartOpen(true); // Auto open when adding
	};

	const removeFromCart = (id: number) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	const clearCart = () => {
		setItems([]);
	};

    const toggleCart = () => setIsCartOpen(prev => !prev);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const count = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<CartContext.Provider
			value={{ 
                items, 
                addToCart, 
                removeFromCart, 
                clearCart, 
                total, 
                count,
                isCartOpen,
                toggleCart,
                openCart,
                closeCart
            }}>
			{children}
		</CartContext.Provider>
	);
};
