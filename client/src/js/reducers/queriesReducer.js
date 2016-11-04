export default function reducer(state={
    queries: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_QUERIES": {
        return {...state, fetching: true}
      }
      case "FETCH_QUERIES_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_QUERIES_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          queries: action.payload
        }
      }
      case "ADD_QUERY": {
        return {
          ...state,
          queries: [...state.queries, action.payload],
        }
      }
      case "UPDATE_QUERY": {
        const { _id, query, userId } = action.payload
        const newQueries = [...state.queries]
        const queryToUpdate = newQueries.findIndex(query => query._id === _id)
        newQueries[queryToUpdate] = action.payload;
        return {
          ...state,
          queries: newQueries,
        }
      }
      case "DELETE_QUERY": {
        return {
          ...state,
          queries: state.queries.filter(query => query._id !== action.payload),
        }
      }
    }

    return state
}
