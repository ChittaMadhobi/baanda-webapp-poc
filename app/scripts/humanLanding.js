//global variable
var domainToGo = '';

function domainSelect() {
    //document.getElementById("message2").innerHTML = "domainToGo=" + domainToGo;

    if (domainToGo.toLowerCase() == 'copyright') {
        //document.getElementById("message1").innerHTML = "1. domainToGo=" + domainToGo;
       self.location = "registerLogin.html?option=copyright";
    } else if (domainToGo.toLowerCase() == 'roommate') {
       //document.getElementById("message1").innerHTML = "2. domainToGo=" + domainToGo;
       self.location = "registerLogin.html?option=roommate";
    }
    else {
       // document.getElementById("message1").innerHTML = "3. domainToGo=" + domainToGo;
        self.location = "registerLogin.html?option=nottrained";
    }
} 

function copyright() {
    var img = document.getElementById("image");
    img.src = "../images/copyright.png";
    domainToGo = 'copyright';
    return false;
}

function roommate() {
    var img = document.getElementById("image");
    img.src = "../images/roommate.png";
    domainToGo = 'roommate';
    return false;
}

function nottrained() {
    var img = document.getElementById("image");
    img.src = "../images/nottrained.png";
    domainToGo = 'nottrained';
    return false;
}