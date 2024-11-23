import token from "./database/token.js";
import user from "./database/user.js";

async function runFunction() {
  let response = await user.verifyUser("edias7942@gmail.com", "1234");
  console.log(response);
}

runFunction();
