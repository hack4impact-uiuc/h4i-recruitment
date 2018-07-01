import initialState from './initialState.js'
import {NEW_MATCH} from './../actions/actionTypes.js'

function recruitmentApp(state = initialState, action) {
	switch (action.type) {
		case NEW_MATCH:
			return {
				...state,
				...{candidates: action.candidates}
			}
		default:
			return state
	}
}