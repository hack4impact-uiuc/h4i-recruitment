import * as action from './actionTypes.js'

// Action Creators

// Function to send data to store about new match
function newMatch(id_1, id_2) {
	return {
		type: action.NEW_MATCH
		candidates: [id_1, id_2]
	}
}