

/* function update counter for password length range input
 * https://stackoverflow.com/questions/11599666/get-the-value-of-checked-checkbox */
$(document).ready(function () {

  /* https://stackoverflow.com/questions/10082330/dynamically-create-bootstrap-alerts-box-through-javascript
   * call the #alert_placeholder temp div and populate it with the boostrap banner */
  const fillAlert = function (notification) {
    console.log("ran!");
    $('#alert_placeholder').html('<div class="alert alert-primary" role="alert" style="position:abolute;z-index:999;">' + notification + '</div>');
  };

  const fillAlertError = function (notification) {
    console.log("ran!");
    $('#alert_placeholder').html('<div class="alert alert-danger" role="alert" style="position:abolute;z-index:999;">' + notification + '</div>');
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

  const createPassword = function () {

    const errors = {
      urlempty: "Sorry, you can't leave the URL firld empty. Try again!",
      checkBoxesEmpty: "Sorry, you can't generate a password with all boxes unchcked. Try again!"
    }

    $('#passwordLength').on('input', function () {
      $('#slider_value').html(this.value);
    });

    $('#genpass').on('click', function () {
      $('#pwordLenRange').show()
      $('#pwordOptions').show()
      $('#pwordLenRange2').hide()
    })

    $('#ownpass').on('click', function () {
      $('#pwordLenRange').hide()
      $('#pwordOptions').hide()
      $('#pwordLenRange2').show()
    })

    $('#pwordSubmission').on('click', function () {
      const url = $('#urlInput').val();
      const passwordLength = $('#passwordLength').val();
      const upperCaseVal = document.querySelector('#upperCaseCheck').checked;
      const lowerCaseVal = document.querySelector('#lowerCaseCheck').checked;
      const numberCheckVal = document.querySelector('#numbersCheck').checked;
      const symbolVal = document.querySelector('#symbolsCheck').checked;
      const organisationName = document.querySelector('#orgName').value;
      const category = document.querySelector('#catName').value;

      if (!url) {
        fillAlertError(errors.urlempty);
        dismissAlert();
        return;
      }
  
      if (!upperCaseVal && !lowerCaseVal && !numberCheckVal && !symbolVal) {
        fillAlert(errors.checkBoxesEmpty);
        dismissAlert();
        return;
      }

      $.ajax({
          method: 'POST', url: '/password_gen/', data: {
          url: url,
          length: passwordLength,
          uppercase: upperCaseVal,
          lowercase: lowerCaseVal,
          numbers: numberCheckVal,
          symbols: symbolVal,
          organisationName: organisationName,
          category: category,
        }
      })
      .then(function (response) {
        console.log("response from the server is: ", response);
        const notification = 'Typed password created! Go to the homepage to view it!';
        fillAlert(notification);
        dismissAlert();
      });
    });

    $('#pwordSubmission2').on('click', function () {
      const url = $('#urlInput2').val();
      const password = document.querySelector('#passwordField2').value;
      const organisationName = document.querySelector('#orgName2').value;
      const category = document.querySelector('#catName2').value;
      console.log('these are sub 2 inputs: ', url, password, organisationName, category)

      $.ajax({
          method: 'POST', url: '/password_gen/', data: {
          url: url,
          organisationName: organisationName,
          category: category,
          password: password
        }
      })
      .then(function (response) {
        console.log("response from the server is: ", response);
        const notification = 'Typed password created! Go to the homepage to view it!';
        fillAlert(notification);
        dismissAlert();
      });
    });
  }

  createPassword();
});

