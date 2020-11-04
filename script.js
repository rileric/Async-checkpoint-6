// jshint esversion:6

//generate fetch string
function createFetchString( userString) {

  return 'https://api.github.com/users/' + userString + '/repos';
}

// fetch results
function getGitHubResults(userString) {

  let fetchString = createFetchString(userString);
  fetch(fetchString)
    .then( response => response.json() )
    .then( responseJson => { 

      if(responseJson.message != 'Not Found') {
        render(responseJson, userString);
      }
      else {
        let resultsHTMLstring ="<p>Unable to find a user called: " + userString + "</p>";
        $('.js-results').html(resultsHTMLstring);
      }
    })
    .catch( error => console.log("An issue occurred during the request process." + error.message));
}

// generate HTML string per result
function generateSingleResultHTML( singleResonseObj) {

  let nameString = '<h3>Name: ' + singleResonseObj.name + '</h3>';
  let urlString = '<p>URL: ' + singleResonseObj.html_url + '</p><hr>';
  
  return (nameString + urlString);
}

// generate full results string
function generateFullResultsHTML( fullResponseObj, searchUser) {
  let fullResultString = "<h2>Repos by " + searchUser + "</h2>";

  // loop through each repoObj
  for( let repoObj of fullResponseObj) {
    // call generateSingleResultHTML
    let singleResultString = generateSingleResultHTML(repoObj);
    //add resultString to fullResultString
    fullResultString += singleResultString;
  }

  return fullResultString;
}

// render results
function render(fullResponseObj, userString) {

  let resultsHTMLstring = generateFullResultsHTML(fullResponseObj, userString);
  $('.js-results').html(resultsHTMLstring);
  $('.hidden').removeClass('hidden');

}

// handle submit button
function handleSubmitButton() {

  $('main').on('submit', event => {
    event.preventDefault();

    let searchUser = $('#gitUser').val();
    $('#gitUser').val(""); // clear

    getGitHubResults(searchUser);
  });
}

// initial call
$(handleSubmitButton);