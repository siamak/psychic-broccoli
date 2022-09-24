import { axios } from "services/ticket.services";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
