import initialState from "./initialState"
import axios from "axios" 

export const CREATE_POST = "@@posts/CREATE_POST"
export const CREATE_POST_SUCCESS = "@@posts/CREATE_POST_SUCCESS"
export const CREATE_POST_FAILURE = "@@posts/CREATE_POST_FAILURE"

export const FETCH_POST_BY_ID = "@@cleanings/FETCH_POST_BY_ID"
export const FETCH_POST_BY_ID_SUCCESS = "@@cleanings/FETCH_POST_BY_ID_SUCCESS"
export const FETCH_POST_BY_ID_FAILURE = "@@cleanings/FETCH_POST_BY_ID_FAILURE"
export const CLEAR_CURRENT_OPPORTUNITY = "@@cleanings/CLEAR_CURRENT_OPPORTUNITY"

export default function postsReducer(state = initialState.posts, action = {}) {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        isLoading: true,
      }
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: {
          ...state.data,
          [action.data.id]: action.data,
        },
      }
    case CREATE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case FETCH_POST_BY_ID:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_POST_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        currentPost: action.data
      }
    case FETCH_POST_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        currentPost: {}
      }
    case CLEAR_CURRENT_OPPORTUNITY:
      return {
        ...state,
        currentPost: null
      }
    default:
      return state
  }
}

export const Actions = {}

Actions.clearCurrentOpportunity = () => ({ type: CLEAR_CURRENT_OPPORTUNITY })


Actions.createPost = ({ title, short_desc, long_desc, location }) => {
    console.log(title)

    return async (dispatch) => {
      dispatch({ type: CREATE_POST })
      const token = localStorage.getItem("access_token")

      try {
        const res = await axios({
          method: `POST`,
          url: `http://localhost:8000/api/posts/`,
          data: { new_post: { title, short_desc, long_desc, location } },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        })
        console.log(res)
        return dispatch({ type: CREATE_POST_SUCCESS, data: res.data })
      } catch (error) {
        console.log(error)
        dispatch({ type: CREATE_POST_FAILURE, error })
      }
    }
}


Actions.fetchPostById = ({ opportunity_id }) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_POST_BY_ID })
    const token = localStorage.getItem("access_token")

    try {
      const res = await axios({
        method: `GET`,
        url: `http://localhost:8000/api/posts/${ opportunity_id }`,
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      })
      console.log(res)
      return dispatch({ type: FETCH_POST_BY_ID_SUCCESS, data: res.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: FETCH_POST_BY_ID_FAILURE, error })
    }
  }
}

// Actions.updateImage = ({ image }) => {
//   return async (dispatch) => {
//     dispatch({ type: FETCH_POST_BY_ID })
//     const token = localStorage.getItem("access_token")

//     try {
//       const res = await axios({
//         method: `GET`,
//         url: `http://localhost:8000/api/posts/${ opportunity_id }`,
//         data: {},
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//       })
//       console.log(res)
//       return dispatch({ type: FETCH_POST_BY_ID_SUCCESS, data: res.data })
//     } catch (error) {
//       console.log(error)
//       dispatch({ type: FETCH_POST_BY_ID_FAILURE, error })
//     }
//   }
// }

