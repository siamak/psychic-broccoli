import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./test-utils";
import App from "./App";

test("renders loading", () => {
	render(<App />);
	const loading = screen.getByRole("progressbar");

	expect(loading).toBeInTheDocument();
});
