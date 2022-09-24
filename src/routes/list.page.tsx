import {
	Button,
	Heading,
	Select,
	Table,
	TableContainer,
	Tbody,
	Badge,
	Td,
	Th,
	Thead,
	Tr,
	HStack,
	Spinner,
} from "@chakra-ui/react";
import classNames from "classnames";
import { ITicket } from "interfaces/root.interface";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { addTicket } from "services/ticket.services";
import useSWR, { mutate } from "swr";
import { fetcher } from "utils/fetcher";

export default function List() {
	const { data, error } = useSWR<ITicket[]>("/tickets", fetcher);
	const [filter, setFilter] = useState<string>("all");
	const [isLoading, setLoading] = useState(false);

	const rows = useMemo(() => {
		if (filter !== "all") {
			return data?.filter((item) => item.status === filter);
		} else {
			return data;
		}
	}, [data, filter]);

	if (error) return <p>There is an error.</p>;
	if (!data)
		return <Spinner position="fixed" top={4} right={4} thickness="2px" color="green.500" speed="0.65s" size="sm" />;

	return (
		<>
			<Heading role="heading">Tickets App</Heading>
			{isLoading && (
				<Spinner position="fixed" top={4} right={4} thickness="2px" color="green.500" speed="0.65s" size="sm" />
			)}
			<HStack my={5}>
				<Button
					role="button"
					name="Add"
					onClick={async () => {
						try {
							setLoading(true);
							await addTicket();
							await mutate(`/tickets`);
						} catch (error) {
							console.log(error);
						} finally {
							setLoading(false);
						}
					}}
				>
					+ Add Ticket
				</Button>
				<Select
					role="combobox"
					value={filter}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value as string)}
				>
					<option value="all">All</option>
					<option value="assigned">Assigned</option>
					<option value="completed">Completed</option>
					<option value="unassigned">Unassigned</option>
				</Select>
			</HStack>
			<TableContainer>
				<Table variant="striped">
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th isNumeric>Number</Th>
							<Th isNumeric>Status</Th>
							<Th isNumeric>Details</Th>
						</Tr>
					</Thead>
					<Tbody>
						{rows?.map((item) => (
							<Tr key={item.number}>
								<Td>{item.id}</Td>
								<Td isNumeric>{item.number}</Td>
								<Td isNumeric>
									<Badge
										colorScheme={classNames({
											green: item.status === "completed",
											purple: item.status === "assigned",
										})}
									>
										{item.status}
									</Badge>
								</Td>
								<Td isNumeric>
									<Link to={`/tickets/${item.id}`}>
										<Button>Detail</Button>
									</Link>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
}
