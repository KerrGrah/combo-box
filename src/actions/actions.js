export function getCountries(lang) {
  return function(dispatch) {

    dispatch({type: "GET_COUNTRIES"});
    console.log(lang);
    fetch(`../api/countries/${lang}`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data.countries);
      dispatch({type: "GET_COUNTRIES_FULFILLED", payload: data.countries})

    }).catch((err) => {

      dispatch({type: "GET_COUNTRIES_REJECTED", payload: err})

    })
  }
}
export function userSelected(selection) {
  return {
     type: "USER_SELECTED",
     payload: selection
   }
 }
