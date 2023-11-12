import pool from "../db";
import { userQuery } from "./queries";

const getInternalServerError = (res) => {
  return res.status(500).json({
    code: 500,
    message: "Internal Server Error",
  });
};

const getUserNotFoundError = (res) => {
  return res.status(404).json({
    code: 404,
    message: "User not found",
  });
};

const getUsers = (req, res) => {
  pool.query(userQuery.getUsers, (error, results) => {
    if (error) {
      return getInternalServerError(error);
    }

    return res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(userQuery.getUserById, [id], (error, results) => {
    if (error) {
      return getInternalServerError(error);
    }

    if (!results.rows.length) {
      return getUserNotFoundError(res);
    }

    return res.status(200).json(results.rows[0]);
  });
};

const getUserByEmail = (req, res) => {
  const email = req.params.email;

  pool.query(userQuery.getUserByEmail, [email], (error, results) => {
    if (error) {
      return getInternalServerError(error);
    }

    if (!results.rows.length) {
      return getUserNotFoundError(res);
    }

    return res.status(200).json(results.rows[0]);
  });
};

const addUser = (req, res) => {
  const { email, password, dob, name, type, phone } = req.body;

  pool.query(userQuery.checkEmailExisists, [email], (error, results) => {
    if (results.rows.length) {
      return res.status(409).json({
        code: 409,
        message: "User with this email already exisits",
      });
    }

    pool.query(
      userQuery.addUser,
      [email, password, dob, name, type, phone],
      (error, results) => {
        if (error) {
          return getInternalServerError(error);
        }

        pool.query(userQuery.getUserByEmail, [email], (error, results) => {
          if (error) {
            return getInternalServerError(error);
          }

          if (!results.rows.length) {
            return getUserNotFoundError(res);
          }

          return res.status(201).json({
            code: 201,
            data: {
              id: results.rows[0].id,
              type: results.rows[0].type,
            },
            message: "User added successfully",
          });
        });
      }
    );
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(userQuery.getUserById, [id], (error, results) => {
    if (error) {
      return getInternalServerError(error);
    }

    if (!results.rows.length) {
      return getUserNotFoundError(res);
    }

    pool.query(userQuery.deleteUSer, [id], (error, results) => {
      if (error) {
        return getInternalServerError(error);
      }

      return res.status(200).json({
        code: 200,
        message: "User deleted successfully",
      });
    });
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, type, phone, dob } = req.body;

  pool.query(userQuery.getUserById, [id], (error, results) => {
    if (error) {
      return getInternalServerError(error);
    }

    if (!results.rows.length) {
      return getUserNotFoundError(res);
    }

    pool.query(
      userQuery.updateUserById,
      [name, type, phone, dob, id],
      (error, results) => {
        if (error) {
          return getInternalServerError(error);
        }

        return res.status(200).json({
          code: 200,
          message: "User updated successfully",
        });
      }
    );
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  pool.query(
    userQuery.checkLoginExisists,
    [email, password],
    (error, results) => {
      if (error) {
        return getInternalServerError(error);
      }

      if (!results.rows.length) {
        return res.status(409).json({
          code: 409,
          data: [],
          message: "User Not Found",
        });
      }

      return res.status(200).json({
        code: 200,
        data: [],
        message: "Login Successfull",
      });
    }
  );
};

const updateUserType = (req, res) => {
  const id = parseInt(req.params.id);
  const { type } = req.body;

  pool.query(userQuery.getUserById, [id], (error, results) => {
    if (error) {
      return getInternalServerError(error);
    }

    if (!results.rows.length) {
      return getUserNotFoundError(res);
    }

    pool.query(userQuery.updateUserType, [type, id], (error) => {
      if (error) {
        return getInternalServerError(error);
      }

      return res.status(200).json({
        code: 200,
        message: "User type updated successfully",
      });
    });
  });
};

export const userController = {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  loginUser,
  getUserByEmail,
  updateUserType,
};
