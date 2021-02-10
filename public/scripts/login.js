$(document).ready(function () {
  console.log("Hello world");

  /* https://stackoverflow.com/questions/10082330/dynamically-create-bootstrap-alerts-box-through-javascript
  * call the #alert_placeholder temp div and populate it with the boostrap banner */
  fillAlert = function(error) {
    $('#alert_placeholder').html('<div class="alert alert-danger" role="alert" style="position:abolute;z-index:999;">' + error + '</div>');
  }

  /* when called, will dismiss any alerts after 3.7 seconds
  * https://api.jquery.com/fadeTo, https://api.jquery.com/slideup, https://api.jquery.com/remove */
  dismissAlert = function() {
    window.setTimeout(function() {
      $(".alert").fadeTo(600, 0).slideUp(600, function() {
        $(this).remove();
      });
    }, 3000);
  };

  // https://stackoverflow.com/questions/41078641/how-to-properly-redirect-in-nodejs-expressjs
  userLogin = function() {
    $('#login_button').on('click', function() {
      console.log('clicked!');

      const email = $('#email').val();
      const password = $('#password').val();
      console.log("email", email);
      console.log("password", password);

      $.ajax({ method: 'POST', url: '/login', data: { email: email, password: password }})
      .then(function (response) {

        if (response.status == "Success") {
          console.log("I ran first");
          window.location = response.redirect;
        } else {
          console.log("I ran second");
          fillAlert(response);
          dismissAlert();
        } 
      });
    });
  }

  userLogin();
});