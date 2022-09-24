import { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import "./app.css";

export type AppProps = {};

const App = () => {
	return (
		<BrowserRouter>
			<Container py={5} maxW="960px">
				<Suspense fallback={<span role="progressbar">loading</span>}>
					<Switch>
						<Route component={lazy(() => import("routes/list.page"))} exact path="/" />
						<Route component={lazy(() => import("routes/detail.page"))} exact path="/tickets/:id" />
					</Switch>
				</Suspense>
			</Container>
		</BrowserRouter>
	);
};

export default App;
