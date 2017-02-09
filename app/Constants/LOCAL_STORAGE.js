import Immutable from "immutable";
import ENVIRONMENTS from "../../Frecl/Constants/ENVIRONMENTS";

// put local storage white list here
const whiteLists = Immutable.List([
  Immutable.List(['AccountState']),
  Immutable.List(['SessionState'])
]);


export default Immutable.Map({
  // This is a white list
  [ENVIRONMENTS.get('production')]: whiteLists,
  [ENVIRONMENTS.get('staging')]: whiteLists,
  [ENVIRONMENTS.get('development')]: whiteLists
});
