$(document).ready(function () {
  console.log("Hello world");

  // variables to store the elements we want to manipulate
  let del_button = document.getElementsByClassName("remove_from_password_buttons");
  let del_button2 = document.getElementsByClassName("remove_from_password_buttons_company");
  let edit_button = document.getElementsByClassName("edit_password");
  let edit_button2 = document.getElementsByClassName("edit_password_company");
  let cancel_button = document.getElementsByClassName("cancel_edits");
  let cancel_button2 = document.getElementsByClassName("cancel_edits_company");
  let submit_button = document.getElementsByClassName("submit_edits");
  let submit_button2 = document.getElementsByClassName("submit_edits_company");
  let cachedPassword;

  // attaches listeners to my passwords - to delete
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

  // attaches listeners to company passwords - to delete
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

  // attaches listeners to personal passwords - to edit - TODO
  for (let i = 0; i < edit_button.length; i++) {
    edit_button[i].onclick = function (event) {
      const button_id = edit_button[i].id;
      cachedPassword = $(event.target).parent().parent().find('.password_to_edit').val();
      edit_button_id = edit_button[i].id;
      edit_button[i].style.display = "none";
      cancel_button[i].style.display = "block";
      submit_button[i].style.display = "block";
      $(event.target).parent().parent().find('.password_to_edit').prop('disabled', false);

      submit_button[i].onclick = function () {
        const password_text = $(event.target).parent().parent().find('.password_to_edit').val();
        $.ajax({ method: 'POST', url: '/editPassword', data: { clicked_button: button_id, password_text: password_text } })
        .then(function (response) {
          // $(`div.personal_passwords[data-id=${response}]`)[0].style.display = "none";
          // $(`div.company_passwords[data-id=${response}]`)[0].style.display = "none";
          // console.log("response from server with id test: ", response);
          edit_button[i].style.display = "block";
          cancel_button[i].style.display = "none";
          submit_button[i].style.display = "none";
          $(event.target).parent().parent().find('.password_to_edit').val(response);
          $(event.target).parent().parent().find('.password_to_edit').prop('disabled', true);
        });
      }

      cancel_button[i].onclick = function () {
        $(event.target).parent().parent().find('.password_to_edit').val(cachedPassword);
        edit_button[i].style.display = "block";
        cancel_button[i].style.display = "none";
        submit_button[i].style.display = "none";
        $(event.target).parent().parent().find('.password_to_edit').prop('disabled', true);
      }
    }
   }

  // attaches listeners to company passwords - to edit - TODO
  for (let i = 0; i < edit_button2.length; i++) {
    edit_button2[i].onclick = function (event) {
      button_id = edit_button2[i].id;
      edit_button2[i].style.display = "none";
      cancel_button2[i].style.display = "block";
      submit_button2[i].style.display = "block";
      $(event.target).parent().parent().find('.password_to_edit').prop('disabled', false);

      submit_button[i].onclick = function () {
        $.ajax({ method: 'POST', url: '/editPassword', data: { clicked_button: button_id } })
        .then(function (response) {
          // $(`div.personal_passwords[data-id=${response}]`)[0].style.display = "none";
          // $(`div.company_passwords[data-id=${response}]`)[0].style.display = "none";
          console.log("response from server with id test: ", response);
        });
      }

      cancel_button2[i].onclick = function () {
        edit_button2[i].style.display = "block";
        cancel_button2[i].style.display = "none";
        submit_button2[i].style.display = "none";
        $(event.target).parent().parent().find('.password_to_edit_company').prop('disabled', true);
      }
    }
  }
});