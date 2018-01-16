import { symbol } from "./createApi";

export default () => store => next => action => {
  if (!action[symbol]) {
    return next(action);
  }

  next({
    type: action.types.request,
    payload: action.payload
  });

  action
    .request(action.payload)
    .then(body => {
      next({
        type: action.types.success,
        payload: {
          request: action.payload,
          body,
          meta: {
            receivedAt: Date.now()
          }
        }
      });
    })
    .catch(err => {
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
    });
};
