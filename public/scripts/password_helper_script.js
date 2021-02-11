


$(document).ready(function() {

  // function update counter for password length range input
  // https://stackoverflow.com/questions/11599666/get-the-value-of-checked-checkbox
  $('#passwordLength').on('input', function() {
    $('#slider_value').html(this.value);
  });
  $('#genpass').on('click', function() {
    $('#pwordLenRange').show()
    $('#pwordOptions').show()
    $('#pwordLenRange2').hide()
  })

  $('#ownpass').on('click', function() {
    $('#pwordLenRange').hide()
    $('#pwordOptions').hide()
    $('#pwordLenRange2').show()
  })

  $('#pwordSubmission').on('click', function() {
    const url = $('#urlInput').val();
    const passwordLength = $('#passwordLength').val();
    const upperCaseVal = document.querySelector('#upperCaseCheck').checked;
    const lowerCaseVal = document.querySelector('#lowerCaseCheck').checked;
    const numberCheckVal = document.querySelector('#numbersCheck').checked;
    const symbolVal = document.querySelector('#symbolsCheck').checked;
    const organisationName = document.querySelector('#orgName').value;
    const category = document.querySelector('#catName').value;

    // to add to pass through AJAX post method: USERID, ORGANISATIONID OR NAME, CATEGORY
    $.ajax({ method: 'POST', url: '/password_gen/', data: {
      url: url,
      length: passwordLength,
      uppercase: upperCaseVal,
      lowercase: lowerCaseVal,
      numbers: numberCheckVal,
      symbols: symbolVal,
      organisationName: organisationName,
      category: category,
    } })
    .then(function (response) {
      console.log("response from the server is: ", response);
    });
  });
  $('#pwordSubmission2').on('click', function() {
    const url = $('#urlInput2').val();
    const password = document.querySelector('#passwordField2').value;
    const organisationName = document.querySelector('#orgName2').value;
    const category = document.querySelector('#catName2').value;
    console.log('these are sub 2 inputs: ', url, password, organisationName, category)

    $.ajax({ method: 'POST', url: '/password_gen/', data: {
      url: url,
      organisationName: organisationName,
      category: category,
      password: password
    } })
    .then(function (response) {
      console.log("response from the server is: ", response);
    });
  });
});

