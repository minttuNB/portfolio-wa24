import { useCallback, useEffect, useState } from "react";
import { UUID } from "../../../types";
import api from "../services/api";
import { ProjectProps } from "../types";
export function useProjects() {
	const [projects, setProjects] = useState<ProjectProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const isLoading = !!loading;
	const isError = !!error;
	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const projects: ProjectProps[] = await api.read();
			setProjects(projects ?? []);
		} catch (error) {
			setError("An error has occurred while fetching the project data.");
		} finally {
			setLoading(false);
		}
	}, []);
	async function add(project: Partial<ProjectProps>) {
		try {
			setLoading(true);
			await api.create(project);
		} catch (error) {
			setError("An error has occurred while creating the project.");
		} finally {
			setLoading(false);
			await fetchData();
		}
	}
	async function update(project: Partial<ProjectProps>) {
		try {
			await api.update(project);
		} catch (error) {
			setError("An error has occurred while updating the project.");
		} finally {
			await fetchData();
		}
	}
	async function remove(id: UUID) {
		try {
			setLoading(true);
			await api.remove(id);
		} catch (error) {
			setError("An error has occurred while removing the project.");
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
		get: fetchData,
		isLoading,
		isError,
		projects,
		error,
	};
}

export default useProjects;
