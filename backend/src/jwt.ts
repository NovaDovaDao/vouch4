import { type JWTPayload, jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
console.log("process.env.JWT_SECRET_KEY", process.env.JWT_SECRET_KEY);

export async function createJWT(payload: JWTPayload): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1y")
    .sign(secret);

  return jwt;
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    console.log("JWT is valid:", payload);
    return payload;
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}

// if (import.meta.main) {
//   const token = await createJWT({ sub: "internal" });
//   console.log("Created JWT:", token);
//   const verifiedPayload = await verifyJWT(token);
//   console.log("Verified Payload:", verifiedPayload);
// }
