import _ from 'lodash'
import jsonPlaceholder from '../apis/jsonPlaceHolder'

// now that we have applied thunk we can return functions too
// need to have getState & dispatch as arguments

// what actions are doing
// function() {
// 	return function () {

// 	}
// }

export const fetchPostsAndUsers =
	() => async (dispatch, getState) => {
		await dispatch(fetchPosts())

		// alternative of above code of
		// const uniqueUserIds = _.uniq(_.map(getState().posts, 'userId'))
		// uniqueUserIds.forEach((id) => dispatch(fetchUser(id)))
		_.chain(getState().posts)
			.map('userId')
			.uniq()
			.forEach((id) => dispatch(fetchUser(id)))
			.value()
	}

export const fetchPosts = () => async (dispatch) => {
	const response = await jsonPlaceholder.get('/posts')

	dispatch({
		type: 'FETCH_POSTS',
		payload: response.data,
	})
}

export const fetchUser = (id) => async (dispatch) => {
	const response = await jsonPlaceholder.get(`/users/${id}`)

	dispatch({
		type: 'FETCH_USER',
		payload: response.data,
	})
}

// export const fetchUser = (id) => (dispatch) =>
// 	_fetchUser(id, dispatch)

// const _fetchUser = _.memoize(async (id, dispatch) => {
// 	const response = await jsonPlaceholder.get(`/users/${id}`)

// 	dispatch({
// 		type: 'FETCH_USER',
// 		payload: response.data,
// 	})
// })
