import { values } from "ramda";

const createEntryReducer = (types, merge) => (
  state = {
    isFetching: false
  },
  { type, payload }
) => {
  switch (type) {
    case types.request:
      return {
        ...state,
        isFetching: true
      };
    case types.success:
      return {
        ...state,
        isFetching: false,
        data: !merge
          ? payload.body
          : merge(payload.request, state.data, payload.body),
        lastUpdated: payload.meta.receivedAt,
        error: void 0
      };
    case types.failure:
      return {
        ...state,
        isFetching: false,
        error: payload.data || payload.message
      };
    default:
      return state;
  }
};

const createDictionaryReducer = (types, dictionary, merge) => (
  state = {},
  action
) => {
  if (!values(types).includes(action.type)) return state;

  const payload =
    action.type === types.request ? action.payload : action.payload.request;

  const key = dictionary(payload);

  return {
    ...state,
    [key]: createEntryReducer(types, merge)(state[key], action)
  };
};

export default (types, dictionary, merge) => {
  if (!dictionary) {
    return createEntryReducer(types, merge);
  }

  return createDictionaryReducer(types, dictionary, merge);
};
