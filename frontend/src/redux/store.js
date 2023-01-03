import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers/root';

// const myStore = (preloadedState) => 
// 	createStore(
// 		reducer,
// 		preloadedState,
// 		applyMiddleware(
// 			thunk // lets us dispatch() functions
// 		)
// 	)

const myStore = (preloadedState) => 
	createStore(
		reducer,
		preloadedState,
		compose(
			applyMiddleware(
				thunk // lets us dispatch() functions
			),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	)

export default myStore;