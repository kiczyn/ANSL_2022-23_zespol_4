var password = document.getElementById("pw")
  , confirm_password = document.getElementById("confirm_pw");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Hasła się nie zgadzają!");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;