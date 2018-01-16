export const prefix = "@@api/";

export default name => ({
  request: `${prefix}${name}/REQUEST`,
  success: `${prefix}${name}/SUCCESS`,
  failure: `${prefix}${name}/FAILURE`
});
