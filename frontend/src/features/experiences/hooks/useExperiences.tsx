import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import { ExperienceProps } from "../types";
import { UUID } from "../../../types";
export function useExperiences() {
	const [experiences, setExperiences] = useState<ExperienceProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const isLoading = !!loading;
	const isError = !!error;
	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const experiences = await api.read();
			setExperiences(experiences ?? []);
		} catch (error) {
			setError("An error has occurred while fetching the experience data.");
		} finally {
			setLoading(false);
		}
	}, []);
	async function add(experience: Partial<ExperienceProps>) {
		try {
			setLoading(true);
			await api.create(experience);
		} catch (error) {
			setError("An error has occurred while creating the experience.");
		} finally {
			setLoading(false);
			await fetchData();
		}
	}
	async function update(experience: Partial<ExperienceProps>) {
		try {
			await api.update(experience);
		} catch (error) {
			setError("An error has occurred while updating the experience.");
		} finally {
			await fetchData();
		}
	}
	async function publish(id: UUID) {
		try {
			await api.publish(id);
		} catch (error) {
			setError("An error has occurred while publishing the experience.");
		} finally {
			await fetchData();
		}
	}
	async function unpublish(id: UUID) {
		try {
			await api.unpublish(id);
		} catch (error) {
			setError("An error has occurred while unpublishing the experience.");
		} finally {
			await fetchData();
		}
	}
	async function remove(id: UUID) {
		try {
			setLoading(true);
			await api.remove(id);
		} catch (error) {
			setError("An error has occurred while removing the experience.");
		} finally {
			setLoading(false);
			await fetchData();
		}
	}
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		add,
		update,
		remove,
		publish,
		unpublish,
		get: fetchData,
		isLoading,
		isError,
		experiences,
		error,
	};
}

export default useExperiences;
