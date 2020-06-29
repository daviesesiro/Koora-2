import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setCurrentUserAsync } from "./redux/user/user.async";
import { selectSignInSignUp } from "./redux/modal/modal.selector";
import { selectIsFetching } from "./redux/user/user.selector";

import AboutPage from "./pages/about/about.component";
import HomePage from "./pages/home/home.component";
import EventPage from "./pages/event/event.component";
import ProfilePage from "./pages/profile/profile.component";
import Spinner from "./components/spinner/spinner.component";
import { SignInSignUp } from "./components/SignIn-SignUp/SignIn-SignUp.component";
import Nav from "./components/nav/nav.component";

import "./App.scss";
import { toggleSignInSignUp } from "./redux/modal/modal.actions";

class App extends React.Component {
	state = {
		loading: false,
	};

	componentDidMount() {
		setCurrentUserAsync();
	}

	render() {
		const { toggleSignInSignUp, signInSignOutState, isFetching } = this.props;

		if (isFetching) return <Spinner />;

		return (
			<div className="app">
				<Nav />
				<div className='pages'>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/about" component={AboutPage} />
						<Route path="/events" component={EventPage} />
						<Route path="/profile" component={ProfilePage} />
					</Switch>
				</div>

				{signInSignOutState ? <SignInSignUp state={signInSignOutState} toggle={toggleSignInSignUp} /> : null}

			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => ({
	toggleSignInSignUp: () => dispatch(toggleSignInSignUp()),
	setCurrentUserAsync: dispatch(setCurrentUserAsync())
});
const mapStateToProps = createStructuredSelector({
	signInSignOutState: selectSignInSignUp,
	isFetching: selectIsFetching
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
