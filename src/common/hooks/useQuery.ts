import { useCallback, useEffect, useRef, useState } from 'react';

interface QueryState<T> {
	data: T | null;
	isLoading: boolean;
	error: Error | null;
	refetch: () => Promise<void>;
}

interface QueryOptions<T> {
	enabled?: boolean;
	onSuccess?: (data: T) => void;
	onError?: (error: Error) => void;
	initialData?: T | null;
}

function useQuery<T>(
	fetcher: () => Promise<T>,
	deps: any[] = [],
	options: QueryOptions<T> = {},
): QueryState<T> {
	const { enabled = true, onSuccess, onError, initialData = null } = options;
	const [data, setData] = useState<T | null>(initialData);
	const [isLoading, setIsLoading] = useState<boolean>(enabled);
	const [error, setError] = useState<Error | null>(null);
	const isMountedRef = useRef(true);

	const refetch = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await fetcher();
			if (isMountedRef.current) {
				setData(result);
				onSuccess?.(result);
			}
		} catch (err) {
			const nextError = err as Error;
			if (isMountedRef.current) {
				setError(nextError);
				onError?.(nextError);
			}
		} finally {
			if (isMountedRef.current) {
				setIsLoading(false);
			}
		}
	}, [fetcher, onSuccess, onError, ...deps]);

	useEffect(() => {
		isMountedRef.current = true;
		if (!enabled) {
			setIsLoading(false);
			return () => {
				isMountedRef.current = false;
			};
		}

		refetch();

		return () => {
			isMountedRef.current = false;
		};
	}, [enabled, refetch]);

	return { data, isLoading, error, refetch };
}

export default useQuery;
