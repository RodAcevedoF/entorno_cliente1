export class ValidationError extends Error {
	messages: string[] | string;

	constructor(messages: string[] | string) {
		super(Array.isArray(messages) ? messages.join('\n') : messages);
		this.name = 'ValidationError';
		this.messages = messages;
	}
}
