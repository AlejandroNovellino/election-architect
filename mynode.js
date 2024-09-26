const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
const dotenv = require("dotenv").config({ path: "src/.env" });

const envFile = `export const environment = {
    base_url: '${process.env.BASE_URL}',
    auth_issuer: '${process.env.AUTH_ISSUER}',
    auth_client_id: '${process.env.AUTH_CLIENT_ID}',
    auth_redirect_url: '${process.env.VARIABLE_NAME}',
    post_logout_redirect_uri: '${process.env.VARIABLE_NAME}',
};
`;


BASE_URL='baseUrl',
AUTH_ISSUER='urlOfAuthIssuer',
AUTH_CLIENT_ID='AuthIssuerClienteId',
AUTH_REDIRECT_URL='authRedirectUrl',
POST_LOGOUT_REDIRECT_URI='authLogoutRedirectUrl',


const targetPath = path.join(
  __dirname,
  "./src/environments/environment.development.ts"
);
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.development.ts`
    );
  }
});
