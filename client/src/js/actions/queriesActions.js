import axios from "axios";

export function fetchQueries() {
  return function(dispatch) {
    axios.get("http://localhost:3000/api/search?userId=001")
      .then((response) => {
        dispatch({type: "FETCH_QUERIES_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_QUERIES_REJECTED", payload: err})
      })
  }
}

export function addQuery(id, query, userId) {
  return {
    type: 'ADD_QUERY',
    payload: {
      id,
      text,
      userId,
    },
  }
}

export function updateQuery(id, query, userId) {
  return {
    type: 'UPDATE_QUERY',
    payload: {
      id,
      text,
      userId,
    },
  }
}

export function deleteQuery(id) {
  return { type: 'DELETE_QUERY', payload: id}
}
