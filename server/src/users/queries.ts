const getUsers = "SELECT id, name, email, dob, phone, type FROM users";

const getUserById =
  "SELECT id, name, email, dob, phone, type FROM users WHERE id = $1";

const getUserByEmail =
  "SELECT id, name, email, dob, phone, type FROM users WHERE email = $1";

const checkEmailExisists = "SELECT s FROM users s WHERE s.email = $1";

const addUser =
  "INSERT INTO users (email, password, dob, name, type, phone) VALUES ($1, $2, $3, $4, $5, $6)";

const deleteUSer = "DELETE FROM users WHERE id = $1";

const updateUserById =
  "UPDATE users SET name = $1, type = $2, phone = $3, dob = $4 WHERE id = $5";

const checkLoginExisists =
  "SELECT * FROM users WHERE email = $1 AND password = $2";

export const userQuery = {
  getUsers,
  getUserById,
  checkEmailExisists,
  addUser,
  deleteUSer,
  updateUserById,
  getUserByEmail,
  checkLoginExisists,
};
