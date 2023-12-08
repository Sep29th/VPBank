import {useRoutes} from "react-router-dom";
import {configRouters} from "../config-router";

const AllRouters = () => {
  return useRoutes(configRouters);
}
export default AllRouters;