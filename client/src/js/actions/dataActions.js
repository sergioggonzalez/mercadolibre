import axios from "axios";

export function fetchData() {
  return function(dispatch) {
    axios.get("http://localhost:3000/api/search?userId=001")
      .then((response) => {
        dispatch({type: "FETCH_DATA_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_DATA_REJECTED", payload: err})
      })
  }
}
