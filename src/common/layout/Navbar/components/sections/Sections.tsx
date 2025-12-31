import styles from './Sections.module.css';
// components/Left.tsx
export function Left({ children }: { children: React.ReactNode }) {
	return <div className={styles.navbarLeft}>{children}</div>;
}

// components/Center.tsx
export function Center({ children }: { children: React.ReactNode }) {
	return <div className={styles.navbarCenter}>{children}</div>;
}

// components/Right.tsx
export function Right({ children }: { children: React.ReactNode }) {
	return <div className={styles.navbarRight}>{children}</div>;
}
