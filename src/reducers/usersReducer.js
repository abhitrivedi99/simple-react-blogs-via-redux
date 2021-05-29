// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_USER':
			// always return new value
			return [...state, action.payload]
		default:
			return state
	}
}
