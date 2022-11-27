let errormsg = document.querySelector("#errormsg");

let usernameElement = document.querySelector("#username");
let passwordElement = document.querySelector("#password");
let emailElement = document.querySelector("#email");

let users = new Array();
users.push({
  username: "asdasd",
  password: "asdasd",
  email: "asdasd@",
});
let flashErrorTimeouts = new Map();

function FlashError(element) {
  if (!element.classList.contains("smooth")) element.classList.add("smooth");

  if (!element.classList.contains("flashError"))
    element.classList.add("flashError");

  if (flashErrorTimeouts.has(`${element.id}`)) {
    timeout = flashErrorTimeouts.get(`${element.id}`);
    clearTimeout(timeout);
  }

  flashErrorTimeouts.set(
    `${element.id}`,
    setTimeout(() => {
      element.classList.remove("flashError");
    }, 5000)
    );
  //  = setTimeout(() => {
  //   element.classList.remove("flashError");
  // }, 5000);

  /*
  let toggleFlash = (function toggleFlash() {
    element.classList.toggle("flashError");
    return toggleFlash;
  })();
  let flashTimeout = setTimeout(toggleFlash, 5000);
  return flashTimeout;
  */
}
function LogIn() {
  let username = usernameElement.value;
  let password = passwordElement.value;
  emptyFields = false;
  if (!username.length > 0) {
    FlashError(usernameElement);
    emptyFields = true;
  }
  if (!password.length > 0) {
    FlashError(passwordElement);
    emptyFields = true;
  }
  if (emptyFields) return showError(["There are empty fields"]);
}

function NewUser() {
  hideError();
  console.log(users);
  let username = usernameElement.value;
  let password = passwordElement.value;
  let email = emailElement.value;
  let emptyFields = checkEmptyFields([username, password, email]);
  let errors = [];
  if (username.length < 4) {
    FlashError(usernameElement);
    errors.push("Invalid username");
  }
  if (AlreadyHas(users, "username", username)) {
    FlashError(usernameElement);
    errors.push("User already exists");
  }
  if (password.length < 4) {
    FlashError(passwordElement);
    errors.push("Invalid password");
  }
  if (email.length < 4 || !email.includes("@")) {
    FlashError(emailElement);
    errors.push("Invalid e-mail");
  }
  if (emptyFields) return showError(["There are empty fields"]);
  if (errors.length > 0) return showError(errors);
  users.push({
    username,
    password,
    email,
  });
}

function showError(errors) {
  errormsg.classList.remove("hidden");
  errortxt = `${errors.join(", ")}.`;
  errormsg.textContent = errortxt;
}
function hideError(){
  errormsg.classList.add("hidden");
  errormsg.textContent = "";
}


function AlreadyHas(array, property, item) {
  for (const value of array) {
    if (value[property] === item) return true;
  }
  return false;
}
function checkEmptyFields(array) {
  for (const value of array) {
    if (!value.length > 0) return true;
  }
}
