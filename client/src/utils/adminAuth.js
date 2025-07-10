export const validateAdmin = (id, password) => {
  const ADMIN_ID = "9851174646";
  const ADMIN_PASSWORD = "myadmindb";

  return id === ADMIN_ID && password === ADMIN_PASSWORD;
};
