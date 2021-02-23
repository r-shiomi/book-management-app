import axios from 'axios';

export const SEARCH_STARTED = 'SEARCH_STARTED'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'

export const search = (state) => {
  return dispatch => {
    dispatch({ type: SEARCH_STARTED });
    console.log(state.page)
    axios.get('http://localhost:3000/api/v1/search', {
      params: {
        'keyword': state.keyword,
        'page': state.page
      }
    }
    )
      .then(res => {
        console.log(res);
        dispatch({ type: SEARCH_SUCCESS, payload: res.data.data});
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: SEARCH_FAILURE, payload: err });
      });
  }
}