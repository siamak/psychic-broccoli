import { render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import BackToList from "./back.link";
import { createMemoryHistory } from "history";

describe("BackToList", () => {
	test("should pass", () => {
		const history = createMemoryHistory({ initialEntries: ["/"] });
		render(
			<Router history={history}>
				<BackToList />
			</Router>
		);
		expect(history.location.pathname).toBe("/");
	});
});
