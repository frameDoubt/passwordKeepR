$(document).ready(function () {
  console.log("Hello world");

  let del_button = document.getElementsByClassName("remove_from_password_buttons");
  let del_button2 = document.getElementsByClassName("remove_from_password_buttons_company");
  console.log("del_button:", del_button);

  console.log(del_button.length)

  // attaches listeners to my passwords
  for (let i = 0; i < del_button.length; i++) {
    del_button[i].onclick = function () {
      button_id = del_button[i].id;

      /* perform ajax call to flask with jquery, to transmit extracted password_id to server
       * https://api.jquery.com/attribute-equals-selector/ */
      $.ajax({ method: 'POST', url: '/deletePassword', data: { clicked_button: button_id } })
        .then(function (response) {
          $(`div.personal_passwords[data-id=${response}]`)[0].style.display = "none";
          $(`div.company_passwords[data-id=${response}]`)[0].style.display = "none";
        });
    }
  }

  // attaches listeners to company passwords
  for (let i = 0; i < del_button2.length; i++) {
    del_button2[i].onclick = function () {
      button_id = del_button2[i].id;

      $.ajax({ method: 'POST', url: '/deletePassword', data: { clicked_button: button_id } })
        .then(function (response) {
          $(`div.personal_passwords[data-id=${response}]`)[0].style.display = "none";
          $(`div.company_passwords[data-id=${response}]`)[0].style.display = "none";
        });
    }
  }
});

