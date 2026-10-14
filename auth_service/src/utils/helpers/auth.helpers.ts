import bcrypt from "bcrypt";

export async function hashPassword(plainPassword: string): Promise<string> {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
}

export async function checkPasswordHash(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (err) {
    console.error("Error comparing passwords:", err);
    return false;
  }
}