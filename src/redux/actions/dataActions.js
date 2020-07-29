import {SET_SCREAM, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, SET_SCREAMS} from '../types'
import axios from 'axios'

export const getScreams = () => dispatch => {
  dispatch({type: LOADING_DATA})
  axios.get('https://europe-west3-socialape-23b23.cloudfunctions.net/api/screams')
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