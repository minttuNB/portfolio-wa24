import { useCallback, useEffect, useState } from "react";
import { ExperienceProps } from "../../types";
import api from "./services/api";
export function useExperiences() {
	const [experiences, setExperiences] = useState<ExperienceProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const isLoading = !!loading;
	const isError = !!error;
	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const experiences: ExperienceProps[] = await api.read();
			setExperiences(experiences ?? []);
		} catch (error) {
			setError("An error has occurred while fetching the Experience data.");
		} finally {
			setLoading(false);
		}
	}, []);
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		get: fetchData,
		isLoading,
		isError,
		experiences,
		error,
	};
}

export default useExperiences;
