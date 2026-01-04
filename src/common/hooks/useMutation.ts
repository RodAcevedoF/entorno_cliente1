import { useCallback, useEffect, useRef, useState } from 'react';

interface MutationState<T, V> {
	data: T | null;
	isLoading: boolean;
	error: Error | null;
	mutate: (vars: V) => Promise<T>;
	reset: () => void;
}

interface MutationOptions<T> {
	onSuccess?: (data: T) => void;
	onError?: (error: Error) => void;
}

function useMutation<T, V>(
	mutator: (vars: V) => Promise<T>,
	options: MutationOptions<T> = {},
): MutationState<T, V> {
	const { onSuccess, onError } = options;
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const isMountedRef = useRef(true);

	const mutatorRef = useRef(mutator);
	const onSuccessRef = useRef(onSuccess);
	const onErrorRef = useRef(onError);

	useEffect(() => {
		mutatorRef.current = mutator;
		onSuccessRef.current = onSuccess;
		onErrorRef.current = onError;
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	const mutate = useCallback(
		async (vars: V) => {
			setIsLoading(true);
			setError(null);
			try {
				const result = await mutatorRef.current(vars);
				if (isMountedRef.current) {
					setData(result);
					onSuccessRef.current?.(result);
				}
				return result;
			} catch (err) {
				const nextError = err as Error;
				if (isMountedRef.current) {
					setError(nextError);
					onErrorRef.current?.(nextError);
				}
				throw nextError;
			} finally {
				if (isMountedRef.current) {
					setIsLoading(false);
				}
			}
		},
		[],
	);

	const reset = useCallback(() => {
		if (!isMountedRef.current) return;
		setData(null);
		setError(null);
		setIsLoading(false);
	}, []);

	return { data, isLoading, error, mutate, reset };
}

export default useMutation;
