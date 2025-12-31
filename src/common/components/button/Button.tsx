import type { FC, ReactNode } from 'react';

type BtnProps = {
	p: {
		styles?: string;
		label: string;
		onClick?: () => void;
		icon?: ReactNode;
	};
};

const Button: FC<BtnProps> = ({ p }) => {
	return <button>{p.label}</button>;
};

export default Button;
