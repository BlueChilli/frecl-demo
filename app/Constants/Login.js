import {createConstants, createAsyncConstants} from "../Helpers/CreateConstants.js";

module.exports = createConstants(
 createAsyncConstants('LOGIN_USER', 'LOGOUT_USER'),
 'SessionState'
);