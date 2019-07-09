import axios from "axios";
import consts from "../../common/helpers/consts";
import { loadState } from "../../common/helpers/localStorage";
import { toastr } from "react-redux-toastr";
import { onlineCheck } from "../../offlinePage/onlineCheck";

export function getBalances(userId) {
  return dispatch => {
    const identity = loadState("identity");
    if (identity && parseInt(identity.username.usernameId) === userId) {
      dispatch({ type: "BALANCE_FETCHING", payload: true });
      axios
        .get(`${consts.API_URL}/dashboard/balances`, {
          headers: { session: identity.sessionId }
        })
        .then(resp => {
          dispatch([
            { type: "BALANCE_FETCHED", payload: resp.data.result },
            { type: "BALANCE_FETCHING", payload: false }
          ]);
        })
        .catch(e => {
          if (!e.response) {
            toastr.error("No Internet Connection");
            onlineCheck();
          } else {
            toastr.error("Error", "Error in fetching balance");
            dispatch([
              { type: "BALANCE_ERROR", payload: "Error in fetching balance" }
            ]);
          }
        })
        .finally(() => dispatch({ type: "BALANCE_FETCHING", payload: false }));
    } else {
      dispatch([{ type: "BALANCE_FETCHED", payload: "restrict" }]);
    }
  };
}

export function getPortfolio(userId) {
  return dispatch => {
    const identity = loadState("identity");
    dispatch({ type: "PORTFOLIO_FETCHING", payload: true });
    axios
      .get(
        `${consts.API_URL}/dashboard/portfolio/${userId}`,
        identity && { headers: { session: identity.sessionId } }
      )

      .then(resp => {
        dispatch({ type: "PORTFOLIO_FETCHED", payload: resp.data.result });
        dispatch({ type: "PORTFOLIO_FETCHING", payload: false });
      })
      .catch(e => {
        dispatch({
          type: "PORTFOLIO_ERROR",
          payload: "Error in fetching portfolio"
        });
        dispatch({ type: "PORTFOLIO_FETCHING", payload: false });
      });
  };
}
