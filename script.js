const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')


// show error function
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}


// show success
function showSuccess(input) {
  formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (re.test(input.value.trim())) {
    showSuccess(input)
  }
  else {
    showError(input, 'Invalid Email');
  }
}

// check required function
function checkRequired(inputsArr) {
  inputsArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is Required`);
    }
    else {
      showSuccess(input);
    }
  });
}

//check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
  }
  else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  }
  else {
    showSuccess(input);
  }
}

// check password match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not Match");
  }
}

// get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 4, 20);
  checkLength(password, 7, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});