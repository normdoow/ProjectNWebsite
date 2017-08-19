
function checkAndSendData() {
	var validOrNot = validateEmail(document.feedForm.email.value);
	var validOrNotName = validateName(document.feedForm.first_name.value);
    var validOrNotFeed = validateFeed(document.feedForm.feedback.value);
	if(!validOrNot) {
		document.getElementById("validEmail").innerHTML = "Invalid Email!";
        document.feedForm.email.focus();
	} else {
		document.getElementById("validEmail").innerHTML = "";
	}
	if(!validOrNotName) {
		document.getElementById("name").innerHTML = "Invalid Name";
        document.feedForm.first_name.focus();
	} else {
		document.getElementById("name").innerHTML = "";
	}
    if(!validOrNotFeed) {
        document.getElementById("validFeed").innerHTML = "Invalid Feedback";
        document.feedForm.feedback.focus();
    } else {
        document.getElementById("validFeed").innerHTML = "";
    }
	if(validOrNotName && validOrNot && validOrNotFeed) {
		sendInfoToServer();
	}

	return false;		//return false so the pagge doesn't reload
}

//checks if it is a valid email
function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//checks if name is a valid name
function validateName(name) {
	return !(name === "");
}

//checks if name is a valid name
function validateFeed(feed) {
    return !(feed === "");
}

// handles the submit event for link 1, sends the query
function sendInfoToServer() {
  getRequest(
      '../php/feedback.php', // URL for the PHP file
       drawOutput,  // handle successful request
       drawError    // handle error
  );
  return false;
}  
// handles drawing an error message
function drawError() {
    var container = document.getElementById('output');
    container.innerHTML = 'Bummer: there was an error!';
}
// handles the response, adds the html
function drawOutput(responseText) {
    var container = document.getElementById('successOutput');
    container.innerHTML = 'Thanks for the Feedback!';
}
// helper function for cross-browser request object
function getRequest(url, success, error) {
    var req = false;
    try{
        // most browsers
        req = new XMLHttpRequest();
    } catch (e){
        // IE
        try{
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            // try an older version
            try{
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                return false;
            }
        }
    }
    if (!req) return false;
    if (typeof success != 'function') success = function () {};
    if (typeof error!= 'function') error = function () {};
    req.onreadystatechange = function(){
        if(req.readyState == 4) {
            return req.status === 200 ? 
                success(req.responseText) : error(req.status);
        }
    }
    //add to the url the variables
    var params = "id-name=" + document.feedForm.first_name.value + "&id-email=" + document.feedForm.email.value + "&id-feed=" + document.feedForm.feedback.value;
    req.open("POST", url, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(params);
    return req;
}