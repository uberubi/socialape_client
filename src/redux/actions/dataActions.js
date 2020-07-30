import { SUBMIT_COMMENT, STOP_LOADING_UI, CLEAR_ERRORS, LOADING_UI, POST_SCREAM, SET_SCREAM, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, SET_SCREAMS, DELETE_SCREAM, SET_ERRORS} from '../types'
import axios from 'axios'

export const getScreams = () => dispatch => {
  dispatch({type: LOADING_DATA})
  axios.get('/screams')
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      })
    })
}

export const getScream = (screamId) => dispatch => {
  dispatch({type: LOADING_UI})
  axios.get(`/scream/${screamId}`)
    .then(res => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      })
      dispatch({type: STOP_LOADING_UI})
    })
    .catch(err => console.log(err))
}

//Post a scream
export const postScream = (newScream) => dispatch => {
  dispatch({type: LOADING_UI})
  axios.post('/scream', newScream)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      })
      dispatch(clearErrors())
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

// Like a scream
export const likeScream = (screamId) => dispatch => {
  axios.get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

//Submit a comment
export const submitComment = (screamId, commentData) => (dispatch) => {
  axios.post(`/scream/${screamId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      })
      dispatch(clearErrors())
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

//Unlike a scream
export const unlikeScream = (screamId) => dispatch => {
  axios.get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

// delete a screan
export const deleteScream = (screamId) => dispatch => {
  axios.delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId})
    })
    .catch(err => console.log(err))
}

// clear errors
export const clearErrors = () => dispatch => {
  dispatch({type: CLEAR_ERRORS})
}