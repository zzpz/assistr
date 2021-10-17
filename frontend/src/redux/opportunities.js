import initialState from "./initialState"
import axios from "axios" 

export const CREATE_POST = "@@posts/CREATE_POST"
export const CREATE_POST_SUCCESS = "@@posts/CREATE_POST_SUCCESS"
export const CREATE_POST_FAILURE = "@@posts/CREATE_POST_FAILURE"

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
    default:
      return state
  }
}

export const Actions = {}


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
        dispatch({ type: CREATE_POST_SUCCESS })
        return dispatch({ type: CREATE_POST_SUCCESS, data: res.data })
      } catch (error) {
        console.log(error)
        dispatch({ type: CREATE_POST_FAILURE, error })
      }
    }
}
  
