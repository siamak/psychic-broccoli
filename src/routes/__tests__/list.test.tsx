import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import List from "routes/list.page";

it("should display loading state", async () => {
	render(
		<MemoryRouter>
			<List />
		</MemoryRouter>
	);
	expect(screen.getByRole("progressbar")).toBeInTheDocument();
});
