import bcrypt from "bcryptjs";

async function hashPassword(password: string) {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return hashedPassword;
}

async function matchCryptedPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(password, hashedPassword);
  return isMatched;
}

export { hashPassword, matchCryptedPassword };
