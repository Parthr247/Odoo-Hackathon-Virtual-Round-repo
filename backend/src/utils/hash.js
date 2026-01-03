import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hash plain text password
 * @param {string} password
 * @returns {string} hashed password
 */
export const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password is required for hashing");
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

/**
 * Compare plain password with hashed password
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {boolean}
 */
export const comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error("Password and hash are required for comparison");
  }

  return bcrypt.compare(password, hashedPassword);
};
