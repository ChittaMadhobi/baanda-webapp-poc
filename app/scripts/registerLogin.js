// global variables
var query = location.search.substr(1);
var domainofinterest = '';

function buttonClicked(which) {
    if (which == "login") {
        //document.getElementById("message1").innerHTML = "I clicked Login";
        //var email = document.getElementById("registration_form").elements.namedItem("email_addr").value;

        //document.getElementById("message4").innerHTML = "email = " + email;
        login();
    }
    else if (which == "registration") {
        //document.getElementById("message2").innerHTML = "I clicked Registration";
        register();
    }
    else if (which == "ethermgmt") {
        document.getElementById("message").innerHTML = "<font color='blue'>Ethereum Account Management is not a part of the POC. It will eventually be part of Baanda.</font>";
    } else if (which == "clear") {
        //document.getElementById("message3").innerHTML = "Clearing localstorage.";
        clearStorage();
    } else if (which == "continue") {
        //document.getElementById("message7").innerHTML = "Continue-------------------------->>";
        continueWorkflow();
    }
    else if (which == "show") showStorage();
}

function login() {
    var emails = localStorage.getItem('email');
    var name = localStorage.getItem('name');
    var ethacc = localStorage.getItem('ethacc');
    var pwds = localStorage.getItem('pwd');
    var pwdf = document.getElementById("registration_form").elements.namedItem("eth_password").value;
    var emailf = document.getElementById("registration_form").elements.namedItem("email_addr").value;

    //document.getElementById("message5").innerHTML = "pwds:" + pwds + " pwdf:" + pwdf + " emails:" + emails + " emailf:" + emailf;
    //document.getElementById("message6").innerHTML = "ethacc:" + ethacc + " name:" + name; 


    if (emails !== emailf) {
        document.getElementById("message").innerHTML = "<font color=red><b>Error: Incorrect Email</b></font>";
        document.getElementById("author_name").value = "";
        document.getElementById("eth_address").value = "";
        return false;
    } else if (pwds !== pwdf) {
        document.getElementById("message").innerHTML = "<font color=red><b>Error: Incorrect password</b></font>";
        document.getElementById("author_name").value = "";
        document.getElementById("eth_address").value = "";
        return false;
    } else {
        document.getElementById("message").innerHTML = "<font color=green><b>Login Successful. Click 'Continue' button for the next step</b></font>";
        document.getElementById("author_name").value = name;
        document.getElementById("eth_address").value = ethacc;
        return true;
    }

}

function register() {
    //document.getElementById("message5").innerHTML = "In registration";
    var email = document.getElementById("registration_form").elements.namedItem("email_addr").value;
    //document.getElementById("message1").innerHTML = "email:" + email;
    var name = document.getElementById("registration_form").elements.namedItem("author_name").value;
    //document.getElementById("message2").innerHTML = "name:" + name;
    var ethacc = document.getElementById("registration_form").elements.namedItem("eth_address").value;
    //document.getElementById("message3").innerHTML = "etha:" + ethacc;
    var pwd = document.getElementById("registration_form").elements.namedItem("eth_password").value;
    //document.getElementById("message4").innerHTML = "pwd:" + pwd;
    localStorage.setItem('email', email);
    localStorage.setItem('name', name);
    localStorage.setItem('ethacc', ethacc);
    localStorage.setItem('pwd', pwd);
}

function clearStorage() {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('ethacc');
    localStorage.removeItem('pwd');
    var form = document.getElementById("registration_form");
    form.reset();
}

function showStorage() {
    var emails = localStorage.getItem('email');
    var pwds = localStorage.getItem('pwd');
    document.getElementById("message").innerHTML = "Storage pwds:" + pwds + " Storage emails:" + emails;
    //document.getElementById("message5").innerHTML = "email:" + email; // + " name:" + name + " ethacc:" + ethacc + " pwd:" + pwd;
}

function continueWorkflow() {
    var emails = localStorage.getItem('email');
    var name = localStorage.getItem('name');
    var ethacc = localStorage.getItem('ethacc');
    var pwds = localStorage.getItem('pwd');
    var contractPage = '';
    var conPageURL = ''
    //createContract.html?author_name=Sapho Something&email_addr=jit@baanda.com&ether_Addr=c2d7cf95645d33006175b78989035c7c9061d3f9&ether_bal=12.430&gas_need=900230"
    //window.location.replace("Human-landing.html");
    //self.location = "Human-landing.html";
    if (login()) {
        if (domainofinterest.toLowerCase() == 'copyright') {
            contractPage = "createContractCopyright.html?";
            conPageURL = contractPage + 'author_name=' + name + '&email_addr=' + emails + '&ether_Addr=' + ethacc + '&eth_password=' + pwds;
            //document.getElementById("message").innerHTML = "conPageUrl = " + conPageURL + "  domainofinterest:" + domainofinterest.toLowerCase();
            self.location = conPageURL;
        } else {
            document.getElementById("message").innerHTML = "<font color=blue><b>Baanda has not been trained for the domain [" + domainofinterest.toLowerCase() + "] you selected. (Coming Soon)</b></font>";
            return false;
        }
        //conPageURL = contractPage + 'author_name=' + name + '&email_aadr=' + emails + '&aether_Addr=' + ethacc + '&eth_password=' + pwds;
        //document.getElementById("message").innerHTML = "conPageUrl = " + conPageURL;
        //self.location = conPageURL;
        //self.location = "createContractCopyright.html?author_name=Jit Mukherjee&email_addr=jit@baanda.com&ether_Addr=c2d7cf95645d33006175b78989035c7c9061d3f9&ether_bal=12.430&gas_need=900230";
    } else {
        document.getElementById("message").innerHTML = "<font color=red><b>Error: Your loging failed. Please register or provide right credential to Continue.</b></font>";
        return false;
    }
}

function fillFormData(formname) {
    // document.getElementById("message1").innerHTML = "In the function fillFormData";
    // document.getElementById("message2").innerHTML = "query:" ;
    if (query) {
        var params = query.split("&");
        //document.getElementById("message4").innerHTML = "params ===== " + params + ' formname=' + formname + " length = " + params.length;
        var xy, pname, pval, formElement;
        for (var i = 0; i < params.length; i++) {
            xy = params[i].split("=");
            pname = xy[0];
            pval = xy[1];
            //document.getElementById("message6").innerHTML = "param[" + i + "].name=" + pname + " value=" + pval;
            setFormValue(pname, pval);
        }
    } else {
        document.getElementById("message7").innerHTML = "query is not getting ... why?"
    }

}

function setFormValue(pn, pv) {
    document.getElementById("domainName").value = pv; //initialize the hidden form field
    document.getElementById("domainTitle").innerHTML = pv.toUpperCase();
    domainofinterest = pv;
}