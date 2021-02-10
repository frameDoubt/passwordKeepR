
// function update counter for password length range input
$(document).ready(function() {
  console.log('hello world');
  $('#passwordLength').on('input', function() {
    console.log('Real-Time Value:', this.value);
    $('#slider_value').html(this.value);
  });
});
