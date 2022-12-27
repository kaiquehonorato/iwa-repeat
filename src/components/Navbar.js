import React, { useState, useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom'; /*<NavLink exact> attribute for active link */
import {useSelector, useDispatch} from 'react-redux';

import {logout} from '../redux/util/controller';

const Navbar = () => {

	const dispatch = useDispatch();
	const session = useSelector(state => state.session);
	const loggedIn = Boolean(session.email);

	const [toggleBtn, setToggleBtn] = useState(false);
	
	return (
		<React.Fragment>
			<nav>
				<div className="container">
					<ul className={`menu ${toggleBtn ? " blocky" : ""}`}>
						<li className="logo">
							<NavLink to="/">
								<img src="/images/logo.png" alt="logo" />
							</NavLink>
						</li>
						<li className="item first-element" onClick={() => setToggleBtn(false)}>
							<NavLink to="/" exact>Home</NavLink>
						</li>
						{(loggedIn) ?
							<React.Fragment>
								<li className="item user" onClick={() => setToggleBtn(false)}>
									<NavLink
										to="/profile">
										<i className="fa fa-user" aria-hidden="true"></i> Hi, {session.username} <i className="fa fa-caret-down" aria-hidden="true"></i>
									</NavLink>
									<ul>
										<li onClick={() => setToggleBtn(false)}>
											<Link to="/logout" onClick={() => dispatch(logout())}>Logout</Link>
										</li>
									</ul>
								</li>
							</React.Fragment>
							:
							<React.Fragment>
								<li className="item button login" onClick={() => setToggleBtn(false)}>
									<NavLink to="/login">Log in</NavLink>
								</li>
								<li className="item button signup" onClick={() => setToggleBtn(false)}>
									<NavLink to="/signup">Sign up</NavLink>
								</li>
							</React.Fragment>
						}
						<li className="toggle" onClick={() => setToggleBtn(!toggleBtn)}><span className="bars"></span></li>
					</ul>
				</div>
			</nav>	
		</React.Fragment>
	);
}

export default Navbar;