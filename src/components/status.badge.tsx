import { Badge } from "@chakra-ui/react";
import classNames from "classnames";
import React from "react";

type Props = {
	children: React.ReactNode;
	type: string;
};

export default function Status({ children, type }: Props) {
	return (
		<Badge
			colorScheme={classNames({
				green: type === "completed",
				purple: type === "assigned",
			})}
		>
			{children}
		</Badge>
	);
}
