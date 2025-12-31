import { useState, useEffect } from 'react';

interface FetchState<T> {
	data: T | null;
	isLoading: boolean;
	error: Error | null;
}

function useFetch<T>(
	fetcher: () => Promise<T>,
	deps: any[] = [],
): FetchState<T> {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const result = await fetcher();
				if (isMounted) {
					setData(result);
				}
			} catch (err) {
				if (isMounted) {
					setError(err as Error);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, deps);

	return { data, isLoading, error };
}

export default useFetch;
