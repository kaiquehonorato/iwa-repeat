import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';

import {clearResponse} from '../redux/util/controller';

const Modal = () => {

	const dispatch = useDispatch();
	const serverResponse = useSelector(state => state.serverResponse);


	const [show, setShow] = useState(false);

	useEffect(() => {
		if (serverResponse.success != null || serverResponse.failure != null) {
			setShow(true)
			const timer = setTimeout(() => {
				setShow(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [serverResponse.success, serverResponse.failure]);

	useEffect(() => {
		if (show === false && (serverResponse.success != null || serverResponse.failure != null)) {
			const timer2 = setTimeout(() => {
				dispatch(clearResponse());
			}, 500);
			return () => clearTimeout(timer2);
		}
	}, [show, serverResponse.success, serverResponse.failure]);

	return (
		<React.Fragment>
			<CSSTransition
				in={show}
				classNames="toastAnimation"
				timeout={500}
				mountOnEnter
				unmountOnExit
			>
				<div className="toast_area">
					{serverResponse.success != null &&
					<React.Fragment>
						<div className="my_animated_bar_success"></div>
						<div className="toast toast_success">
							<p><i className="fa fa-flag" aria-hidden="true"></i> <strong>Success</strong>: {serverResponse.success}</p>
							<button
								type="button"
								className="close_toast"
								onClick={() => setShow(false)}>
								<i className="fa fa-times" aria-hidden="true"></i>
							</button>
						</div>
					</React.Fragment>
					}
					{serverResponse.failure != null &&
					<React.Fragment>
						<div className="my_animated_bar_failure"></div>
						<div className="toast toast_failure">
							<p><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> <strong>Failure</strong>: {serverResponse.failure}</p>
							<button
								type="button"
								className="close_toast"
								onClick={() => setShow(false)}>
								<i className="fa fa-times" aria-hidden="true"></i>
							</button>
						</div>
					</React.Fragment>
					}
				</div>
			</CSSTransition>
		</React.Fragment>
	)
}

export default Modal;