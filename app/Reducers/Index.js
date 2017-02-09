import {combineReducers} from "redux-immutablejs";
import routing from "./routerReducer";
import FormState from "../../Frecl/Components/Form/Reducers/fields";
import FormGeneratorState from "../../Frecl/Components/FormGenerator/reducer";
import ToggleViewState from "../../Frecl/Components/ToggleView/Reducers/toggleView";
import NotificationState from "./Notification";
import ListViewState from "../../Frecl/Components/ListView/Reducers/ListView";
import ProgressWrapperState from "../../Frecl/Components/ProgressButtons/Reducers/ProgressReducers";
import ConfirmState from "../Components/ConfirmModal/Reducers/confirmModal";
import {createCrudReducer} from "../../Frecl/exports";
import ErrorState from "./Error";
import {Map} from "immutable";
import ButtonSpinnerState from "./ButtonSpinner.js";

const SessionState = createCrudReducer("SESSION");
const AccountState = createCrudReducer("ACCOUNT");
const EmployeeState = createCrudReducer("EMPLOYEE");

const appReducers = combineReducers({
  FormState,
  FormGeneratorState,
  ToggleViewState,
  ListViewState,
  AccountState,
  EmployeeState,
  ProgressWrapperState,
  SessionState,
  NotificationState,
  ButtonSpinnerState,
  ConfirmState,
  ErrorState,
  routing
});


export default (state, action) => {
  const safeState = action.type === "CLEAR_STATE" ? Map() : state;
  return appReducers(safeState, action);
}