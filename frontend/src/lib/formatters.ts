export function getISODateString(date: Date) {
	return date.toISOString().split("T")[0];
}
