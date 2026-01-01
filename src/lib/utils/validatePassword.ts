export interface PasswordValidationResult {
	valid: boolean;
	messages: string[];
}

export interface ValidatePasswordParams {
	password: string;
	confirmPassword?: string;
}
export function validatePassword({
	password,
	confirmPassword,
}: ValidatePasswordParams): PasswordValidationResult {
	const errors: string[] = [];

	const matchingPasswords =
		confirmPassword !== undefined ? password === confirmPassword : true;
	if (!matchingPasswords) {
		errors.push('Passwords do not match.');
	}
	const minLength = 8;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasNumber = /[0-9]/.test(password);
	const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

	if (password.length < minLength)
		errors.push(`Password must be at least ${minLength} characters long.`);
	if (!hasUpperCase)
		errors.push('Password must contain at least one uppercase letter.');
	if (!hasLowerCase)
		errors.push('Password must contain at least one lowercase letter.');
	if (!hasNumber) errors.push('Password must contain at least one number.');
	if (!hasSpecialChar)
		errors.push('Password must contain at least one special character.');

	return {
		valid: errors.length === 0,
		messages: errors,
	};
}
