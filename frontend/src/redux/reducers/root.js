import { combineReducers } from "redux";
import serverResponse from "./serverResponse_reducer";
import job from "./job_reducer";
import session from "./session_reducer";

export default combineReducers({
  session,
  job,
  serverResponse
});