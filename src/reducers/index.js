export default function reducer(state = {

  fetching: false,
  fetched: false,
  error: null,
  countries: [],
  userCountry: null
}, action) {

  switch (action.type) {

    case "GET_COUNTRIES":
      {
        return {
          ...state,
          fetching: true,
          fetched: false
        };
      }
    case "GET_COUNTRIES_FULFILLED":
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          countries: action.payload
        };
      }
    case "GET_COUNTRIES_REJECTED":
      {
        return {
          ...state,
          fetching: false,
          error: action.payload
        }
      }
      case "USER_SELECTED":
      {
        return {
          ...state,
          userCountry: action.payload
        }
      }

  }

  return {state}

}
