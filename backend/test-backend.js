import token from "./database/token.js";
import user from "./database/user.js";

async function runFunction() {
  let response = await token.createToken(1);
  console.log(response);
}

runFunction();

