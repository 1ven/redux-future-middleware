import * as helpers from "./helpers";

export const symbol = Symbol();

export default ({ name, request, dictionary, merge, config = {} }) => {
  const types = helpers.createTypes(name);
  return {
    reducer: helpers.createApiReducer(types, dictionary, merge),
    request: helpers.createAction(types, request, config),
    types
  };
};
