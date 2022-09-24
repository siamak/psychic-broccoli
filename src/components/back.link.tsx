import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function BackLink() {
	return (
		<Link role="heading" to="/">
			<ArrowBackIcon /> Back to List
		</Link>
	);
}

export default BackLink;
