import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "./firebase/firebase.utils";
import {
	showSignSignOut,
	setCurrentUser
} from "./redux/user/user.actions";
import {
	selectSignInSignOut
} from "./redux/user/user.selector";

import AboutPage from "./pages/about/about.component";
import HomePage from "./pages/home/home.component";
import EventPage from "./pages/event/event.component";
import ProfilePage from "./pages/profile/profile.component";
import Spinner from "./components/spinner/spinner.component";

import "./App.css";
import { SignInSignUp } from "./components/SignIn-SignUp/SignIn-SignUp.component";
import { createStructuredSelector } from "reselect";
import Nav from "./components/nav/nav.component";

class App extends React.Component {
	state = {
		loading: true,
	};

	unsubscribe = null;
	componentDidMount() {
		const { setUser } = this.props;

		this.unsubscribe = auth.onAuthStateChanged((user) => {
			const newUser = user ? { email: user.email, userId: user.uid } : null;
			setUser(newUser);
			this.setState({ loading: false });
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
	render() {
		const {
			toggleSignSignOut,
			signInSignOutState
		} = this.props;
		
		if (this.state.loading) return <Spinner />;
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
				
				{signInSignOutState?<SignInSignUp state={signInSignOutState} toggle={toggleSignSignOut}/>:null}
				
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => ({
	toggleSignSignOut: () => dispatch(showSignSignOut()),
	setUser: (user) => dispatch(setCurrentUser(user))
});
const mapStateToProps = createStructuredSelector({
	signInSignOutState: selectSignInSignOut
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
