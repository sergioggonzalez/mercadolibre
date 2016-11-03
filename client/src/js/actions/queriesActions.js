import axios from "axios";

export function fetchQueries(userId) {
  var url = "http://localhost:3000/api/search?searchid="+userId;
  return function(dispatch) {
    axios.get(url)
      .then((response) => {
        dispatch({type: "FETCH_QUERIES_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_QUERIES_REJECTED", payload: err})
      })
  }
}

export function addQuery(query, userId) {
  return function(dispatch) {
    axios.post('http://localhost:3000/api/search', {
      query: query,
      userId: userId
    }).then((response) => {
      dispatch({type: "ADD_QUERY", payload: response.data})
    });
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
  var url = "http://localhost:3000/api/search/"+id;
  return function(dispatch){
    axios.delete(url).then((response) => {
      dispatch({type: "DELETE_QUERY", payload: response.data._id})
    });
  }
}
