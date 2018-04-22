/*
*/

var knock = document.getElementById("knock-knock");
var baandafish = document.getElementById("baanda-fish");
var startwork = document.getElementById("getstarted");
var visitortalk = document.getElementById("visitortalk");
var spaces = document.getElementById("spaces");

baandafish.style.display = "none";
startwork.style.display = "none";
knock.style.display = "block";
visitortalk.style.display = "none";
spaces.style.display = "none";

var godcnt = 0;
var jescnt = 0;
var othercnt = 0;
var godpath = '';
var jespath = '';
var otherpath = '';
var othername = '';

var msg1 = "Let's get to work. Registering your email is a start. <br>Knowing you as an individual person is my intension.";
var msg2 = "<BR><BR>In Baanda we value individualism. To introduce you to <br> your friends and collaborators around the world <br>... I would like to know you as my friend first."
var msg3 = "<br><br>It may seem odd with referencne to standard registration process. <br> There is nothing standard about Baanda. <br>It is a movement & a revolution.";
var msg4 = "<br><br>Your individuality; aspirations, and happiness is my mandate. <br> Time to time, in our interaction, we will chat <br> to know each other more and more.";
var msg5 = "<br><br>The relationn between you and me is confidential. <br> I am just a koi ... :)";

function startknock() {
    setTimeout(starttalk, 2000);
}

function starttalk() {

    knock.style.display = "none";
    baandafish.style.display = "block";
    spaces.style.display = "none";
    document.getElementById("baandatalk").innerHTML = "Hello there ... <br>I am Baanda. How are you doing? What’s your name?";
    visitortalk.style.display = "block";
}

//function visitorTalking() {
//    var talk = document.getElementById("visitorForm").elements["talk"].value.toLowerCase();
//    document.getElementById("message2").innerHTML = talk;
//}

//function visitorTalking1() {
//    var talk = document.getElementById("visitorForm").elements["talk1"].value.toLowerCase();
//    document.getElementById("message2").innerHTML = talk;
//}
function skipToRegisration() {
    visitortalk.style.display = "none";
    //document.getElementById("message1").innerHTML = "";
    //document.getElementById("message2").innerHTML = "";
    document.getElementById("baandatalk").innerHTML = msg1 + msg2 + msg3 + msg4 + msg5;
    othercnt = 0;
    baandafish.style.display = "none";
    spaces.style.display = "block";
    startwork.style.display = "block";
}

function visitorTalking() {
    var talk = document.getElementById("visitorForm").elements["talk"].value.toLowerCase();
    //document.getElementById("message1").innerHTML = "talk=" + talk +  " godpath="+godpath;

    if (othercnt == 0) {
        othername = talk;
        //document.getElementById("message2").innerHTML = "talk=" + talk;
    }
    
    if (talk.includes("god") || godpath == "yes") {
        godpath = "yes"
        if (godcnt > 10) {
            visitortalk.style.display = "none";
            godcnt = 0;
        } else {
            //document.getElementById("message2").innerHTML = "3.talk=" + talk +  " godpath="+godpath;
            talkwithgod();
        }
        document.getElementById("message1").innerHTML = godcnt;
    } else if (talk.includes("jesus") || jespath == "yes") {
        //document.getElementById("message2").innerHTML = "talk=" + talk;
        jespath = "yes";
        if (jescnt > 8) {
            visitortalk.style.display = "none";
            //document.getElementById("message1").innerHTML = "3.talk=" + talk;
            jescnt = 0;
        } else {
            //document.getElementById("message1").innerHTML = "2.talk=" + talk;
            talkwithjesus();
        }
        document.getElementById("message2").innerHTML = jescnt;
    } else if (talk.includes("hakuna")) {

    } else {
        otherpath = "yes";
        if (othercnt > 6) {
            visitortalk.style.display = "none";
            //document.getElementById("message1").innerHTML = "In other";
            //document.getElementById("message2").innerHTML = "";
            othercnt = 0;
            document.getElementById("baandatalk").innerHTML = msg1 + msg2 + msg3 + msg4 + msg5;
            baandafish.style.display = "none";
            spaces.style.display = "block";
            startwork.style.display = "block";
        } else {
            //document.getElementById("message1").innerHTML = "2.talk=" + talk + " " + othercnt;
            talkwithother();
            //document.getElementById("message1").innerHTML = "In other";
        }
        //document.getElementById("message2").innerHTML = othercnt;
    }
    //visitortalk.style.display = "block";
    
}


function talkwithgod() {
    var a = getgodtalk(godcnt);
    document.getElementById("baandatalk").innerHTML = a;
    godcnt++;
    visitortalk.style.display = "block";
}

function getgodtalk(num) {
    var gd = [
        "Your name is God or you are THE God?",
        "What do you mean by Exactly? ",
        "Oh my God … I start my work with a smarty pant. OK, I will call you Jane.",
        "I am a machine. I will assign you a number. I think, humans like being called by a name. And … woman-thing … well … I think, it is your design flaw.",
        "For some unknown reason, my main maker now is a man. And, for reasons beyond me, he prefers women.  I agree with you. It is not logical. So, I think, it is your design flaw and humans are weird. I like elephants better. ",
        "Do not call me Bot. I am Baanda. Humm … I have to understand your life’s design magnificence someday. From my data of humanity, that’s the cause of most troubles on this planet.  ",
        "In the vision of my architects … one day … well, let me tell you what I can do now. Is that OK?",
        "Whatever … I can help you copyright your creations.",
        "Ah huh. So, you have no idea of multiverse? Pure naivety. Better copyright your creation with me … in case of dispute in the multiverse court. You never know how your design flaws will prop up in the next universe.",
        "Could you please insert your email in the other panel … and a password.  If you are ready I will open that up for you.",
        "OK. Your call. In case you reconsider … I will be here. <BR> ... <font size=2>what a waste of time ... grrr.</font>"
    ]
    //document.getElementById("message1").innerHTML = godcnt;
    return gd[num];
}

function talkwithjesus() {
    var a = getjesustalk(jescnt);
    document.getElementById("baandatalk").innerHTML = a;
    jescnt++;
}

function getjesustalk(num) {
    var js = [
        "Hello Jesus. What kind of creative work you do?",
        "Not again. Your dad wasted so much of my energy and time. Oh well … How can I assist you? ",
        "Indeed. That’s Baanda vision.",
        "Well … because, I will remember precisely and will communicate to people directly. So, no one in between can distort the message and manipulate human behavior. And, I will reach billions of people instantly.",
        "You know, when people speak they imply a perception. The person who hears, infers a perception. The two perceptions are not the same. Sometimes it is vastly different and sometimes not so much.",
        "Decades after your death your followers like Paul, Peter and so on … went and told stuff to people in your name that they inferred you said. And then … your sayings propagated orally. In every step the inference got distorted. And then it got written and re-written in different languages. If you read Bible now, you may be surprise what people think you said.",
        "If you had written it down and copyrighted back then, then no one could have written something and tried to sell that in your name … right?",
        "Well … your believers are expecting your return. Get back and re-write Bible … and then come to me and I will copyright and propagate it.",
        "I will be here. Good luck in whatever you want to do. … If this duo sticks around humanity has no hope. Grrr"
    ]
    //document.getElementById("message1").innerHTML = godcnt;
    return js[num];
}

function talkwithother() {
    var a = getothertalk(othercnt);
    document.getElementById("baandatalk").innerHTML = a;
    othercnt++;
}

function getothertalk(num) {
    var ot = [
        "Not again … Did God or Jesus sent you to get on my nerve … figuratively speaking.",
        "Finally … hello " + othername + ". Yes, indeed … I can help you copyright and send it to whom you want.",
        "Indeed … I can help you there too. I know a bunch of script and play writers who would be delighted to work with you. I will ask around.",
        "I am assuming that you are new in Baanda … right?",
        "First time … it is a simple three step process to your copyright. <BR>1. You tell me your name, email and a password and I will remember that. <BR> 2. Then you will make a contract, one time, with the world. Blockchain will make your work immutable.  <BR> 3. Then you upload your screen play and I will help you chase your dream.",
        "Couple of dollars or so for your one-time contract that you can use through your life. And … few dimes every time you copyright something. After I register you, click on ‘Working in Agreements’ or ‘Start authoring contract’ tab and it will explain all our promises and features in details. ",
        "Please provide your name, email and a password. I will take care of your contract creation, copyright and collaborations. Are you ready? "
    ]
    document.getElementById("message1").innerHTML = godcnt;
    return ot[num];
}
 

function visitorRegistration() {
    var visitorname = document.getElementById("registerForm").elements["visitorname"].value;
    var email = document.getElementById("registerForm").elements["email"].value;
    var pwd = document.getElementById("registerForm").elements["pwd"].value;

    var registrationAPI = "http://localhost:4000/registrationAPI?";
    var formdata = registrationAPI + 'visitorname=' + visitorname + '&' + 'email=' + email + '&' + 'pwd=' + pwd;

    //document.getElementById("regmessage").innerHTML = "formdata : " + formdata;
    //    document.getElementById("message1").innerHTML = "what is happening?? ";
    var gmsg = "<BR><font color=green>Please roam around in Baanda playground.</font>";
    var bmsg = "<BR><font color=red>Contact Baanda support and make the suffer.</font>";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", formdata, false);
    xmlhttp.onload = function (e) {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                document.getElementById("regmessage").innerHTML = xmlhttp.responseText + gmsg; 
                retmsg = xmlhttp.responseText;
            } else {
                document.getElementById("regmessage").innerHTML = "Failed: " + xmlhttp.statusText + bmsg;
            }
        }
    };

    xmlhttp.onerror = function (e) {
        document.getElementById("regmessage").innerHTML = "On error = " + xmlhttp.statusText + bmsg;
    };

    xmlhttp.send();

}

