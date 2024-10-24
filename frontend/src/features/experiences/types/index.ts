import { UUID } from "../../../types";

type ExperienceProps = {
	id: UUID;
	name: string;
	description?: string;
	fromDate: Date;
	toDate?: Date;
};
type ExperiencesProps = {
	experiences: ExperienceProps[];
};
export type { ExperienceProps, ExperiencesProps };
