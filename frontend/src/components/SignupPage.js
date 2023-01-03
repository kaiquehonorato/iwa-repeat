import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Select from 'react-select';

import {signup} from '../redux/util/controller';

const SignupPage = () => {

	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [account, setAccount] = useState('');
	
	const [nameError, setNameError] = useState('');
	const [usernameError, setUsernameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [accountError, setAccountError] = useState('');

	const accountOptions = [{label: "Employer", value: "employer"}, {label: "Job Seeker", value: "job_seeker"}];

	const nameHandler = (event) => {
		setName(event.target.value);
		setNameError('');
	}
	const usernameHandler = (event) => {
		setUsername(event.target.value.toLowerCase().trim());
		setUsernameError('');
	}
	const emailHandler = (event) => {
		setEmail(event.target.value.toLowerCase().trim());
		setEmailError('');
	}
	const passwordHandler = (event) => {
		setPassword(event.target.value.trim());
		setPasswordError('');
	}
	const accountHandler = (e) => {
		setAccount(e);
		setAccountError('');
	}

	// Scroll to top of page
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Validation
	const validate = () => {
		if (!name) {
			setNameError('Enter your name');
		}
		if (!username) {
			setUsernameError('Choose your username');
		}
		if (username.length > 0 && username.length < 4) {
			setUsernameError('Username must be at least 4 characters');
		}
		if (username.length > 9) {
			setUsernameError('Username must have at most 9 characters');
		}
		if (!email) {
			setEmailError('Enter your email');
		}
		if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[A-Za-z]+$/.test(email)) {
			setEmailError('');
		} else {
			setEmailError('Enter a valid email');
		}
		if (!account) {
			setAccountError('Please select');
		} else {
			setAccountError('');
		}
		if (!password) {
			setPasswordError('Enter your password');
		}
		if (password.length > 0 && password.length < 6) {
			setPasswordError('Password must be at least 6 characters');
		}
		if (!name || !username || !(/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[A-Za-z]+$/.test(email)) || !account || !password || password.length < 6) {
			return false;
		}
		return true;
	}

	// Form Submit
	const handleSignup = (event) => {
		event.preventDefault();
		const isValid = validate();
		if (isValid) {
			const user = {
				name,
				username,
				email,
				account: account.value,
				password
			}
			dispatch(signup(user));
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
							<div className="title">Create Account</div>
							<form>
								
								<label htmlFor="name">Your full name</label>
								<input
									type="text"
									id="name"
									value={name}
									onChange={nameHandler}
									className={`${(nameError !== "") && "red-input"}`}
								/>
								{nameError !== "" && <p className="error_text"><i>!</i> &nbsp;{nameError}</p>}

								<label htmlFor="username">Choose username</label>
								<input
									type="text"
									id="username"
									placeholder="At least 4 characters"
									value={username}
									onChange={usernameHandler}
									className={`${(usernameError !== "") && "red-input"}`}
								/>
								{usernameError !== "" && <p className="error_text"><i>!</i> &nbsp;{usernameError}</p>}
								
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
									placeholder="At least 6 characters"
									value={password}
									onChange={passwordHandler}
									className={`${(passwordError !== "") && "red-input"}`}
								/>
								{passwordError !== "" && <p className="error_text"><i>!</i> &nbsp;{passwordError}</p>}

								<label>Account Type</label>
								<Select 
									defaultValue={account}
									onChange={accountHandler}
									options={accountOptions}
									className="mt-6"
								/>
								{accountError !== "" && <p className="error_text mt-6"><i>!</i> &nbsp;{accountError}</p>}

								<button type="submit" onClick={handleSignup}>Continue</button>
							
							</form>
							<div className="have_an_acc"><p>Already have an account? <button className="signInBtn"><Link to="/login">Sign In</Link></button></p></div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default SignupPage;