export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	dob: string;
	address: string;
	image: string;
}

export interface ITicket {
	id: number;
	userId?: number;
	number: string;
	status: "assigned" | "completed" | "unassigned";
}
