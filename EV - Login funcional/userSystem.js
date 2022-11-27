let notificationElement = {
  element: document.querySelector("#errormsg"),
  showError: function (errors) {
    this.element.classList.remove("hidden");
    errortxt = `${errors.join("; ")}.`;
    this.element.textContent = errortxt;
  },
  hideError: function () {
    this.element.classList.add("hidden");
    this.element.textContent = "";
  },
  showSuccess: function (success) {
    this.element.classList.remove("hidden");
    this.element.classList.toggle("successmsg");
    this.element.textContent = success;
  },
};

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
  emptyFields = checkEmptyFields([usernameElement, passwordElement]);
  if (emptyFields)
    return notificationElement.showError(["There are empty fields"]);
  verifiedUser = AlreadyHas(users, "username", username);
  if (verifiedUser) {
    if (password === users[verifiedUser[0]]["password"]) {
      notificationElement.showSuccess(`Successfully logged in as "${username}".`);
    }
  }
}

function NewUser() {
  notificationElement.hideError();
  console.log(users);
  let username = usernameElement.value;
  let password = passwordElement.value;
  let email = emailElement.value;
  let emptyFields = checkEmptyFields([
    usernameElement,
    passwordElement,
    emailElement,
  ]);
  if (emptyFields)
    return notificationElement.showError(["There are empty fields"]);
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
  if (AlreadyHas(users, "email", email)) {
    FlashError(emailElement);
    errors.push("Email already in use");
  }

  if (errors.length > 0) return notificationElement.showError(errors);
  users.push({
    username,
    password,
    email,
  });
  notificationElement.showSuccess(`Successfully registered as "${username}".`);
}

function AlreadyHas(array, property, item) {
  for (let key = 0; key < array.length; key++) {
    if (array[key][property] === item) return [key];
  }
  return 0;
}

function checkEmptyFields(array) {
  let emptyFields = false;
  for (const element of array) {
    if (!element.value.length > 0) {
      FlashError(element);
      emptyFields = true;
    }
  }
  return emptyFields;
}
