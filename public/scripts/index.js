$(document).ready(function () {
  console.log("Hello world");

  let password_div = document.getElementsByClassName("password_button");
  let del_button = document.getElementsByClassName("remove_from_password_buttons");
  console.log("del_button:", del_button);

  console.log(del_button.length)

  for (let i = 0; i < del_button.length; i++) {
    del_button[i].onclick = function () {
      button_id = del_button[i].id;
      console.log("button_id", button_id);

      // perform ajax call to flask with jquery, to transmit extracted password_id to server
      $.ajax({ method: 'POST', url: '/deletePassword', data: { clicked_button: button_id } })
        .then(function (response) {
          console.log(response);
          password_div[i].style.display = "none"
        });
    }
  }
});

