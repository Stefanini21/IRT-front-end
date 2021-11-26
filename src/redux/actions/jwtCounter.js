import { SEND_COUNTER_TOKEN_TO_BACK } from "./types";
import { routes } from "../../config/routes";
import { HttpService } from "../../services/httpService";

export const sendCounterTokenToBack = (counterValue) => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.SET_JWT_TOKEN;
  console.log("url: " + url);
  return HttpService.post(url + counterValue, {}).then((response) => {
    if (typeof response === "object" && response !== null) {
      console.log("respose.counter: " + response.counter);
      return dispatch({
        type: SEND_COUNTER_TOKEN_TO_BACK,
        payload: response.counter,
      });
    }
  });
};
