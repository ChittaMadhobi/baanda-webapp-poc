// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function myfun() {
    modal.style.display = "none";
}

function passwordCheck() {

    //var name = localStorage.getItem('name');
    /*var fon = "<font color = blue size = 3><b>";
    var fonc = "</b></font>";
    document.getElementById("message1").innerHTML = breaks + spaces + fon + "Hello " + name + ". Are the one? " + fonc + "<br>";
    document.getElementById("message2").innerHTML = spaces + "My creator haven't given me the eyes and ears. To be certain ";
    document.getElementById("message3").innerHTML = spaces + "Would you please tell me the password? ";
    var div1 = document.getElementById("two");
    */
    //div1.style.display = "block";
    document.getElementById("message1").innerHTML = "TEsting";
    //modal.style.display = "none";
}