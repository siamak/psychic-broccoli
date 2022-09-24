import { Button, Heading, Select, Badge, Text, SimpleGrid, Box, Spinner } from "@chakra-ui/react";
import { ITicket, IUser } from "interfaces/root.interface";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { editTicket } from "services/ticket.services";
import useSWR, { mutate } from "swr";
import { fetcher } from "utils/fetcher";

export default function Detail() {
	const params = useParams() as any;
	const id = params.id;
	const { data: ticket, error: errorTicket } = useSWR<ITicket>(`/tickets/${id}`, fetcher);
	const { data: user, error: errorUser } = useSWR<IUser>(ticket?.userId ? `/users/${ticket?.userId}` : null, fetcher);
	const { data: users, error: errorUsers } = useSWR<IUser[]>(`/users`, fetcher);
	const [isLoading, setLoading] = useState(false);

	if (errorTicket) return <p>There is an error Ticket Entity.</p>;
	if (errorUser) return <p>There is an error User Entity.</p>;
	if (!ticket)
		return <Spinner position="fixed" top={4} right={4} thickness="2px" color="green.500" speed="0.65s" size="sm" />;
	const isCompleted = ticket?.status === "completed";

	return (
		<>
			<Link role="heading" to="/">
				{"<"} Back to List
			</Link>
			<Heading role="heading" mb={4}>
				#{ticket.number}
			</Heading>

			{isLoading && (
				<Spinner position="fixed" top={4} right={4} thickness="2px" color="green.500" speed="0.65s" size="sm" />
			)}

			<Button
				disabled={isCompleted || isLoading}
				colorScheme="green"
				onClick={async () => {
					try {
						setLoading(true);
						await editTicket({ ...ticket, status: "completed" });
						await mutate(`/tickets/${id}`);
					} catch (error) {
						console.log(error);
					} finally {
						setLoading(false);
					}
				}}
			>
				Complete
			</Button>

			<SimpleGrid columns={2} mt={8} spacing={5}>
				{ticket && (
					<Box>
						<Heading size="md" mb={3}>
							Status
						</Heading>
						<Badge>{ticket.status}</Badge>
					</Box>
				)}

				<Box>
					<Heading size="md" mb={3}>
						Assign To
					</Heading>

					{/* {errorUsers && <pre>{JSON.stringify(errorUsers, null, 2)}</pre>} */}
					{errorUsers && <Text color="red.400">{errorUsers?.message}</Text>}
					{users && (
						<Select
							disabled={isCompleted || isLoading}
							defaultValue={ticket.userId}
							onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
								try {
									setLoading(true);
									await editTicket({ ...ticket, userId: Number(e.target.value as string) });
									await mutate(`/tickets/${id}`);
								} catch (error) {
									console.log(error);
								} finally {
									setLoading(false);
								}
							}}
						>
							{users.map((person) => (
								<option
									placeholder="Assign to..."
									key={person.id}
									disabled={person.id === ticket.userId}
									value={person.id}
								>
									{person.firstName} {person.lastName}
									{person.id === ticket.userId ? " (Current user)" : ""}
								</option>
							))}
						</Select>
					)}
				</Box>

				{user && (
					<Box>
						<Heading size="md" mb={3}>
							User
						</Heading>
						{user?.firstName} {user?.lastName}
						<Text opacity={0.5}>{user?.address}</Text>
					</Box>
				)}
			</SimpleGrid>
		</>
	);
}
