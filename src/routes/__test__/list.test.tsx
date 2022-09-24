import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "../list.page";
import { BrowserRouter } from "react-router-dom";

test("shows hidden message when toggle is clicked", () => {
	const myMessage = "hello world";
	render(
		<BrowserRouter>
			<List />
		</BrowserRouter>
	);
	const toggleButton = screen.getByText(/toggle/i);
	expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
	userEvent.click(toggleButton);
	expect(screen.getByText(myMessage)).toBeInTheDocument();
	userEvent.click(toggleButton);
	expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
});
