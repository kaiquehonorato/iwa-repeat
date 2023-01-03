import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {login} from '../redux/util/controller';

const LoginPage = () => {

	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const emailHandler = (event) => {
		setEmail(event.target.value.toLowerCase().trim());
		setEmailError('');
	}
	const passwordHandler = (event) => {
		setPassword(event.target.value.trim());
		setPasswordError('');
	}

	// Validation
	const validate = () => {
		if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[A-Za-z]+$/.test(email)) {
			setEmailError('');
		} else {
			setEmailError('Enter a valid email');
		}
		if (password === "") {
			setPasswordError('Enter your password');
		} else if (password.length < 6) {
			setPasswordError('Password needs to be at least 6 characters');
		} else {
			setPasswordError('');
		}
		if (!(/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[A-Za-z]+$/.test(email)) || password === "" || password.length < 6) {
			return false;
		}
		return true;
	}

	// Form Submit
	const handleLogin = (event) => {
		event.preventDefault();
		const isValid = validate();
		if (isValid) {
			// Login Mode Form Submit
			const user = {
				email,
				password
			}
			dispatch(login(user));
		}
	}

	return (
		<React.Fragment>
			<div className="header">
				<div className="container">
					<div className="header-text">Welcome to JobPedia</div>
                    <p>A Job Portal listing different jobs for job seekers and helping companies get good employees</p>
				</div>
			</div>
			<div className="gray-bg">
				<div className="container login-form p-40">
					<div className="p-lr">
						<div className="card">
							<div className="title">Login</div>
							<form>						
								<label htmlFor="email">Email</label>
								<input 
									type="text"
									id="email"
									value={email}
									onChange={emailHandler}
									className={`${(emailError !== "") && "red-input"}`}
								/>
								{emailError !== "" && <p className="error_text"><i>!</i> &nbsp;{emailError}</p>}

								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={passwordHandler}
									className={`${(passwordError !== "") && "red-input"}`}
								/>
								{passwordError !== "" && <p className="error_text"><i>!</i> &nbsp;{passwordError}</p>}

								<button type="submit" onClick={handleLogin}>Continue</button>
							
							</form>
						</div>
						
						<div className="signUpArea">
							<p className="new_to_bootweb"><span>New to JobPedia?</span></p>
							<Link to="/signup" className="signUpBtnLink"><button className="signUpBtn">Create your JobPedia account</button></Link>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default LoginPage;