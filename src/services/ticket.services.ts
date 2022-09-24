import Axios, { AxiosResponse } from "axios";
import { ITicket } from "interfaces/root.interface";

export const axios = Axios.create({
	baseURL: "http://localhost:3004",
});

export async function editTicket(body: ITicket): Promise<AxiosResponse<ITicket>> {
	try {
		const update = await axios({
			url: `/tickets/${body.id}`,
			method: "PUT",
			data: body,
		});
		return update;
	} catch (error) {
		if (Axios.isAxiosError(error)) {
			throw error;
		} else {
			throw new Error("different error than axios");
		}
	}
}

export async function addTicket(): Promise<AxiosResponse<ITicket>> {
	try {
		const update = await axios({
			url: `/tickets/`,
			method: "POST",
			data: {
				id: 32 + Math.floor(Math.random() * 1000),
				userId: 2,
				number: (Math.random() + 1).toString(36).substring(7),
				status: "unassigned",
			},
		});
		return update;
	} catch (error) {
		if (Axios.isAxiosError(error)) {
			throw error;
		} else {
			throw new Error("different error than axios");
		}
	}
}
