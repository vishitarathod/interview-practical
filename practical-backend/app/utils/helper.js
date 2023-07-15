import bcrypt from "bcrypt";

const saltOrRounds = 10;

export const createHash = async (password) => {
  const hasher = await bcrypt.hash(password.toString(), saltOrRounds);
  return hasher;
};

export const match = async (hash, password) => {
  const isMatch = await bcrypt.compare(password?.toString(), hash?.toString());
  return isMatch;
};
