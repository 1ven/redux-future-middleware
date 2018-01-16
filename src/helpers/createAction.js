import { symbol } from "../createApi";

export default (types, request) => payload => ({
  [symbol]: true,
  request,
  payload,
  types
});
