$(document).ready(function() {

  /* https://stackoverflow.com/questions/10082330/dynamically-create-bootstrap-alerts-box-through-javascript
  * call the #alert_placeholder temp div and populate it with the boostrap banner */
  const fillAlert = function(error) {
    $('#alert_placeholder').html('<div class="alert alert-danger" role="alert" style="position:abolute;z-index:999;"><p>' + error + '</p></div>');
  };

  /* when called, will dismiss any alerts after 3.7 seconds
  * https://api.jquery.com/fadeTo, https://api.jquery.com/slideup, https://api.jquery.com/remove */
  const dismissAlert = function() {
    window.setTimeout(function() {
      $(".alert").fadeTo(600, 0).slideUp(600, function() {
        $(this).remove();
      });
    }, 3000);
  };

  // https://stackoverflow.com/questions/41078641/how-to-properly-redirect-in-nodejs-expressjs
  const userLogin = function() {
    $('#login_button').on('click', function() {

      const email = $('#email').val();
      const password = $('#password').val();

      $.ajax({ method: 'POST', url: '/login', data: { email: email, password: password }})
        .then(function(response) {

          if (response.status === "Success") {
            console.log("I ran first");
            window.location = response.redirect;
          } else {
            console.log("I ran second");
            fillAlert(response);
            dismissAlert();
          }
        });
    });
  };
  userLogin();
});