import axios from "axios";
import consts from "../common/helpers/consts";
import { loadState } from "../common/helpers/localStorage";
import { toastr } from "react-redux-toastr";

export function getPublicProfile(userId) {
  return dispatch => {
    dispatch({ type: "PUBLIC_PROFILE_FETCHING", payload: true });
    const identity = loadState("identity");
    axios
      .get(
        `${consts.API_URL}/username/profile/${userId}`,
        identity && { headers: { session: identity.sessionId } }
      )
      .then(resp => {
        dispatch([
          { type: "PUBLIC_PROFILE_FETCHED", payload: resp.data.result },
          { type: "PUBLIC_PROFILE_FETCHING", payload: false }
        ]);
        if (identity && identity.usernameId === userId) {
          if (!resp.data.result.isTrader) {
            dispatch(getInvestorResume());
          } else {
            dispatch(getTraderResume());
          }
        }
      })
      .catch(e => {
        toastr.error("Error", "Error in fetching profile");
        dispatch([
          {
            type: "PUBLIC_PROFILE_ERROR",
            payload: "Error in fetching profile ",
            error: e
          },
          { type: "PUBLIC_PROFILE_FETCHING", payload: false }
        ]);
      });
  };
}

export function getFollowedTrader() {
  return (dispatch, getState) => {
    const investorResume = getState().publicProfile.investorResume;
    if (investorResume.length <= 0) return;
    const userId = investorResume[investorResume.length - 1].traderUsernameId;
    dispatch({ type: "FOLLOWED_TRADER_FETCHING", payload: true });
    axios
      .get(`${consts.API_URL}/username/profile/${userId}`)
      .then(resp => {
        dispatch([
          { type: "FOLLOWED_TRADER_FETCHED", payload: resp.data.result },
          { type: "FOLLOWED_TRADER_FETCHING", payload: false }
        ]);
      })
      .catch(e => {
        toastr.error("Error", "Error in fetching profile");
        dispatch([
          {
            type: "FOLLOWED_TRADER_ERROR",
            payload: "Error in fetching trader profile ",
            error: e
          },
          { type: "FOLLOWED_TRADER_FETCHING", payload: false }
        ]);
      });
  };
}
export function getInvestorResume() {
  return (dispatch, getState) => {
    dispatch({ type: "INVESTOR_RESUME_FETCHING", payload: true });
    const identity = loadState("identity");
    axios
      .get(`${consts.API_URL}/username/investor-resume/`, {
        headers: { session: identity ? identity.sessionId : null }
      })
      .then(resp => {
        dispatch([
          { type: "INVESTOR_RESUME_FETCHED", payload: resp.data.result.data },
          getFollowedTrader(),
          { type: "INVESTOR_RESUME_FETCHING", payload: false }
        ]);
      })
      .catch(e => {
        toastr.error("Error", "Error in fetching investor resume");
        dispatch([
          {
            type: "INVESTOR_RESUME_ERROR",
            payload: "Error in fetching investor resume",
            error: e
          },
          { type: "INVESTOR_RESUME_FETCHING", payload: false }
        ]);
      });
  };
}
export function getTraderResume() {
  return (dispatch, getState) => {
    dispatch({ type: "TRADER_RESUME_FETCHING", payload: true });
    const identity = loadState("identity");
    axios
      .get(`${consts.API_URL}/username/trader-resume/`, {
        headers: { session: identity ? identity.sessionId : null }
      })
      .then(resp => {
        dispatch([
          { type: "TRADER_RESUME_FETCHED", payload: resp.data.result },
          { type: "TRADER_RESUME_FETCHING", payload: false }
        ]);
      })
      .catch(e => {
        toastr.error("Error", "Error in fetching trader resume");
        dispatch([
          {
            type: "TRADER_RESUME_ERROR",
            payload: "Error in fetching trader resume",
            error: e
          },
          { type: "TRADER_RESUME_FETCHING", payload: false }
        ]);
      });
  };
}
