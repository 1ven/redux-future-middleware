import { symbol } from "./createApi";

export default () => store => next => async action => {
  if (!action[symbol]) {
    return next(action);
  }

  try {
    next({
      type: action.types.request,
      payload: action.payload
    });

    next({
      type: action.types.success,
      payload: {
        request: action.payload,
        body: await action.request(action.payload),
        meta: {
          receivedAt: Date.now()
        }
      }
    });
  } catch (err) {
    next({
      type: action.types.failure,
      payload: {
        request: action.payload,
        message: err.message,
        data: err.data,
        meta: {
          receivedAt: Date.now()
        }
      }
    });
  }
};
