import { Eye, EyeClosed } from 'lucide-react';
import type { FC } from 'react';

export type ShowPasswordBtnProps = {
	parentMethod: () => void;
	isShowing: boolean;
	cssClass: string;
};

const ShowPasswordBtn: FC<ShowPasswordBtnProps> = ({
	parentMethod,
	isShowing,
	cssClass,
}) => {
	return isShowing ? (
		<EyeClosed className={cssClass} onClick={() => parentMethod()} />
	) : (
		<Eye className={cssClass} onClick={() => parentMethod()} />
	);
};

export default ShowPasswordBtn;
