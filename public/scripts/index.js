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

  /* https://stackoverflow.com/questions/10082330/dynamically-create-bootstrap-alerts-box-through-javascript
* call the #alert_placeholder temp div and populate it with the boostrap banner */
  const fillAlert = function (notification) {
    $('#alert_placeholder').html('<div class="alert alert-primary" role="alert" style="position:abolute;z-index:999;">' + notification + '</div>');
  };

  /* when called, will dismiss any alerts after 3.7 seconds
  * https://api.jquery.com/fadeTo, https://api.jquery.com/slideup, https://api.jquery.com/remove */
  const dismissAlert = function () {
    window.setTimeout(function () {
      $(".alert").fadeTo(600, 0).slideUp(600, function () {
        $(this).remove();
      });
    }, 3000);
  };

  /* attaches listeners to my passwords - to delete
   * perform ajax call to flask with jquery, to transmit extracted password_id to server
   * https://api.jquery.com/attribute-equals-selector/ */
  const deletePersonalPassword = function () {
    for (let i = 0; i < del_button.length; i++) {
      del_button[i].onclick = function () {
        button_id = del_button[i].id;

        $.ajax({ method: 'POST', url: '/deletePassword', data: { clicked_button: button_id } })
          .then(function (response) {
            $(`div.personal_passwords[data-id=${response}]`)[0].style.display = "none";
            const notification = "Personal password deleted from database!";
            fillAlert(notification);
            dismissAlert();
          });
      }
    }
  };

  // attaches listeners to company passwords - to delete
  const deleteCompanyPassword = function () {
    for (let i = 0; i < del_button2.length; i++) {
      del_button2[i].onclick = function () {
        button_id = del_button2[i].id;

        $.ajax({ method: 'POST', url: '/deletePassword', data: { clicked_button: button_id } })
          .then(function (response) {
            $(`div.company_passwords[data-id=${response}]`)[0].style.display = "none";
            const notification = "Company password deleted from database!";
            fillAlert(notification);
            dismissAlert();
          });
      }
    }
  };

  // attaches listeners to personal passwords - to edit
  const editPersonalPassword = function () {
    for (let i = 0; i < edit_button.length; i++) {
      edit_button[i].onclick = function (event) {
        const button_id = edit_button[i].id;
        cachedPassword = $(event.target).parent().parent().find('.password_to_edit').val();
        edit_button[i].style.display = "none";
        cancel_button[i].style.display = "block";
        submit_button[i].style.display = "block";
        $(event.target).parent().parent().find('.password_to_edit').prop('disabled', false);

        submit_button[i].onclick = function () {
          const password_text = $(event.target).parent().parent().find('.password_to_edit').val();
          $.ajax({ method: 'POST', url: '/editPassword', data: { clicked_button: button_id, password_text: password_text } })
            .then(function (response) {
              edit_button[i].style.display = "block";
              cancel_button[i].style.display = "none";
              submit_button[i].style.display = "none";
              $(event.target).parent().parent().find('.password_to_edit').val(response);
              $(event.target).parent().parent().find('.password_to_edit').prop('disabled', true);
              const notification = "Personal password edited on database!";
              fillAlert(notification);
              dismissAlert();
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
  };

  // attaches listeners to company passwords - to edit
  const editCompanyPassword = function () {
    for (let i = 0; i < edit_button2.length; i++) {
      edit_button2[i].onclick = function (event) {
        const button_id = edit_button2[i].id;
        cachedPassword = $(event.target).parent().parent().find('.password_to_edit_company').val();
        edit_button2[i].style.display = "none";
        cancel_button2[i].style.display = "block";
        submit_button2[i].style.display = "block";
        $(event.target).parent().parent().find('.password_to_edit_company').prop('disabled', false);

        submit_button2[i].onclick = function () {
          const password_text = $(event.target).parent().parent().find('.password_to_edit_company').val();
          $.ajax({ method: 'POST', url: '/editPassword', data: { clicked_button: button_id, password_text: password_text } })
            .then(function (response) {
              edit_button2[i].style.display = "block";
              cancel_button2[i].style.display = "none";
              submit_button2[i].style.display = "none";
              $(event.target).parent().parent().find('.password_to_edit_company').val(response);
              $(event.target).parent().parent().find('.password_to_edit_company').prop('disabled', true);
              const notification = "Company password edited on database!";
              fillAlert(notification);
              dismissAlert();
            });
        }

        cancel_button2[i].onclick = function () {
          $(event.target).parent().parent().find('.password_to_edit_company').val(cachedPassword);
          edit_button2[i].style.display = "block";
          cancel_button2[i].style.display = "none";
          submit_button2[i].style.display = "none";
          $(event.target).parent().parent().find('.password_to_edit_company').prop('disabled', true);
        }
      }
    }
  }

  deletePersonalPassword();
  deleteCompanyPassword();
  editPersonalPassword();
  editCompanyPassword();
  highlightDivs();
});
