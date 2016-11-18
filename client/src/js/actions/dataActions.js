import axios from "axios";

export function fetchData(query) {
  return function(dispatch) {
    axios.get("http://ec2-54-225-37-120.compute-1.amazonaws.com:3000/api/data/"+query)
      .then((response) => {
        dispatch({type: "FETCH_DATA_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_DATA_REJECTED", payload: err})
      })
  }
}
