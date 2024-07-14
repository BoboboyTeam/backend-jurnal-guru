import pkg from 'bcryptjs';
const { compareSync, hashSync } = pkg;

export const hashPassword = (password) => {
  return hashSync(password);
};

export const comparePassword = (password, password_db) => {
  return compareSync(password, password_db);
};
