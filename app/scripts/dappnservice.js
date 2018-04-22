
const loginCheckAPI = "http://localhost:4000/checklogin?";
const addCopyrightAPI = "http://localhost:4000/addCopyrightAPI";
const parity_url = "http://localhost:8545";
// Global Variables
var modal = document.getElementById('myModal');
var starttalk = document.getElementById("startTalk");
var eth = document.getElementById("showEthStuff");
var newcr = document.getElementById("newCopyright");
var cting = document.getElementById("costing");
var pcr = document.getElementById("pastCopyrights");
var apimsg = null;
var loginRes = null;
var newcopyrightgas = 5000000;
var copyright = '';
var contractAddr = '';
var contracrtABI = '';
// This is temporary for presentation. Never ... never for real life even as MVP
// var gasConAddr = '0x008942a10cA7F936c302714D4c37294F74e2AC64'; // Baanda ether address for gas for now in testnet
// var gaspwd = "Ranjan10";
//var gemail = '';


// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal -- do we need this??????
var span = document.getElementsByClassName("close")[0];
// Login Check API & URL should be invoked fomr config file in Dev onwards. This is sandbox.
//var xxx = 'XYZ';



//function newerCopyright(form){
//    document.getElementById("message7").innerHTML = "XXXXXXXXXwwww";
//}

function initfn() {
    // document.getElementById("message0").innerHTML = "YYYY";
    document.getElementById("message0").innerHTML = "<font color=blue size=3><b>Would you please provide the above info? Your privacy is important to me.</b>  </font>";
    document.getElementById("message1").innerHTML = "<br><br><br><font color=brown size=3>I cannot see or hear now. My creators are making me gradually.  </font>";
    document.getElementById("message2").innerHTML = "<font color=brown size=3>When I do see, hear and recognize you, I will not ask for these information any more. </font>";
    //     var x = document.getElementById("startTalk");
    // x.style.display = "none";
    starttalk.style.display = "none";
    //     var y = document.getElementById("showEthStuff");
    eth.style.display = "none";
    newcr.style.display = "none";
    cting.style.display = "none";

}


function passwordCheck() {
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;

    document.getElementById("message1").innerHTML = "Before execute loginAPI " + email + " " + pwd;
    
    var auth = executeLoginAPI(email, pwd);
    var name = '';
    var status = '';
    var msg = '';
    var conaddr = '';
    var initerror = '';

    loginRes = JSON.parse(auth);
    status = loginRes.status;
    //document.getElementById("message2").innerHTML = "yyy=" + yyy;


    //document.getElementById("message2").innerHTML = "<br>Auth = " + auth;


    if (status == "Success") {
        //handleLo
        modal.style.display = "none";
        handleLoginSuccss(loginRes);
        //document.getElementById("message3").innerHTML = "---- DAPP and Baanda Service ----For:" + loginRes.name + " At Contract addr=" + loginRes.result.contract_address;
    } else if (status == "NoContract") {
        modal.style.display = "none";
        document.getElementById("message4").innerHTML = "---- No Contract but right login ----for:" + loginRes.name;
    } else if (status == "LoginFailed") {
        //document.getElementById("message0").innerHTML = "gas = " + newcopyrightgas;
        document.getElementById("message1").innerHTML = "<font color=red size=3><b>Oops ... have you mistyped ... OR ... May be, are you new here?</b></font><br>";
        document.getElementById("message2").innerHTML = "<br><font color=blue size=3><b>Please retry ... OR ... Cick on Introduction-tab on Top-bar to start our friendship.</b><font>";
        document.getElementById("message3").innerHTML = "<img align=center src='./images/wondering.gif' height=60 width=70>";
    } else if (status == "Error") {
        document.getElementById("message1").innerHTML = "<font color=red size=3><b>Oops ... mistyped or we have not been introduced?</b></font>";
        document.getElementById("message2").innerHTML = "";

    } else if (status == "Syntax") {
        document.getElementById("message1").innerHTML = "<font color=red size=3><b>JSON Syntax error - Fix it</b></font>";
        document.getElementById("message2").innerHTML = "JSON(Auth) : " + auth;
    } else {
        document.getElementById("message1").innerHTML = "<font color=red size=3><b>Invalid status = " + status + " - Fix it</b></font>";
    }
}


// This is when login was correct and there is a copyright contract already formed to work with
function handleLoginSuccss(loginRes) {
    modal.style.display = "none";
    starttalk.style.display = "block";
    eth.style.display = "none";
    newcr.style.display = "none";
    cting.style.display = "none";
    pcr.style.display = "none";

    if (handleWeb3Init()) {
        var docCount = copyright.getContractCount();
        if (docCount > 0) {
            document.getElementById("message8").innerHTML = ""; //"You havae (." + docCount + ") creations copyrighted and guarded by Baanda.";
        } else {
            document.getElementById("message8").innerHTML = ""; //"You are yet to copyright your first creation. " + docCount;
        }
    } else {

    }
}

function handleWeb3Init() {
    var ret = true;
    try {
        window.web3 = new Web3(new Web3.providers.HttpProvider(parity_url));
        try {
            copyright = web3.eth.contract(loginRes.result.abi).at(loginRes.result.contract_address);
            //test function to access contract methods via the abi/address route
            try {
                var loop = 1;
                copyright.getContractCount(function (error, result) {
                    if (error) {
                        //console.log("@TEST" + JSON.stringify(result, null, 2));
                        return false;
                    } else {
                        // These needs to be sent to server for storing onto the Ethereum network
                        // the contract that is to be copyrighted
                        contractAddr = loginRes.result.contract_address;
                        contracrtABI = loginRes.result.abi;
                       // document.getElementById("message7").innerHTML = "Success in web3 + create contrct instance + executing. ConAddr: " + contractAddr;
                    }
                });
            } catch (e0) {
                document.getElementById("message7").innerHTML = "Error executing contract via getContractCount: " + e0;
                ret = false;
            }
        } catch (e1) {
            document.getElementById("message7").innerHTML = "Error creating contract instance via abi and addr : " + e1;
            ret = false;
        }
    } catch (e2) {
        document.getElementById("message7").innerHTML = "Error creating window.web3 via parity_URL : " + parity_URL + " err:" + e2;
        ret = false;
    }
    return ret;
}


/*-------------------------------------------------------
// If connectivity is all right ... load existing contracts
function loadCopyrightDocs() {
    // get the length of documents on the chain
    var contractCount = 0;
 
    Copyright.getContractCount(function (error, count) {
        if (error) {
            return false;
        } else {
            contractCount = count.toNumber();
            //console.log("Record Count is " + contractCount);
            //Copyright.getOwner(function (error, owner) {
            //    console.log("Owner is " + owner);
            //    ownerAdd = owner[0];
            //    populateOwner(owner);
            //});
            
            //for (var i = 0; i < contractCount; i++) {
            //    Copyright.getContractByIndex(i, function (error, v) {
            //        populateTable(v);
            //        //console.log(" Contract " + i + " is : " + JSON.stringify(v, null, 2));
            //    });
            //}
            
        }
    });
    return true;
}
*/

/*-----------------------------------------
// populate the table -- fix this ... with referernce to the html
function populateTable(v) {
    var beginTag = "<tr id='doc_" + v[0] + "'><td>";
    var endTag = "</td></tr>";
    var midTag = "</td><td>";
 
    var view = "<a href='" + v[2] + "' class='btn btn-primary' target='_blank'>View</a>";
    var link = "<a href='#' id='" + v[0] + "' onclick='deleteCopyright(this);' class='btn btn-primary'>Delete</a>";
    var html = beginTag + v[0] + midTag + v[1] + midTag + v[2] + midTag + v[3].substring(0, 10) + "..." + midTag + new Date(v[4] * 1000).toISOString() + midTag + new Date(v[5] * 1000).toISOString() + midTag + link + midTag + view + endTag;
    $('#mytable tbody').append(html);
}
*/



function showHideEth() {
    //var x = document.getElementById("showEthStuff");
    //if (eth.style.display === "none") {
    //modal.style.display = "none";
    document.getElementById("message2").innerHTML = "Show eth ---------------- " + loginRes.result.txn_hash;
    eth.style.display = "block";

    //} else {
    //    eth.style.display = "none";
    //}

    document.getElementById('t-txnhash').innerHTML = loginRes.result.txn_hash;
    document.getElementById('t-conaddr').innerHTML = loginRes.result.contract_address;
    document.getElementById('t-abi').innerHTML = JSON.stringify(loginRes.result.abi);
    //contractAddr = loginRes.result.contract_address;
    starttalk.style.display = "block";
    newcr.style.display = "none";
    cting.style.display = "none";
    eth.style.display = "block";
    pcr.style.display = "none";
    //modal.style.display = "none";
}



function newCopyrightShow() {

    eth.style.display = "none";
    starttalk.style.display = "block";
    newcr.style.display = "block";
    cting.style.display = "none";
    pcr.style.display = "none";
}

function costingshow() {

    eth.style.display = "none";
    starttalk.style.display = "block";
    newcr.style.display = "none";
    cting.style.display = "block";
    pcr.style.display = "none";
}

function pastCopyright() {
    eth.style.display = "none";
    starttalk.style.display = "block";
    newcr.style.display = "none";
    cting.style.display = "none";
    pcr.style.display = "block";
}



function executeLoginAPI(email, pwd) {

    //clearMessages();
    //const loginCheckAPI = "http://localhost:4000/checklogin?";
    document.getElementById("message1").innerHTML = "I am here in execute login API.";
    var spaces = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

    var badmsgF = spaces + "<font color=blue size=3><b>Message:";
    var madmsgE = "</b></font>";

    var formdata = loginCheckAPI + 'email=' + email + '&' + 'pwd=' + pwd;
    document.getElementById("message2").innerHTML = "formdata = " + formdata;
    
    var retmsg = '';
    var xx = 0;  // used for making async to sync - sleep loop

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", formdata, false);
    document.getElementById("message0").innerHTML = "";
    xmlhttp.onload = function (e) {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                document.getElementById("message1").innerHTML = "Success: -----------------<br>";// + badmsgF + xmlhttp.responseText + madmsgE;
                retmsg = xmlhttp.responseText;
                showHideEth();
            } else {
                document.getElementById("message1").innerHTML = "Failed: " + xmlhttp.statusText;
                retmsg = xmlhttp.statusTexte;
            }
        }
    };

    xmlhttp.onerror = function (e) {
        document.getElementById("message2").innerHTML = "On error = " + xmlhttp.statusText;
        retmsg = "On error = " + xmlhttp.statusText;
        xx = 1;
    };

    xmlhttp.send();

    return retmsg;
    
    //return 'success';
}

function newerCopyright(form) {
    //document.getElementById("message8").innerHTML = "Inside newerCopyright(form)";
    
    var oData = new FormData(form);
    var form = document.forms.namedItem("newcrfile");
    // Testing additional field append as needed. 
    //oData.append("CustomField", "This is some extra data");
    // Sending the contract address for gas money
    oData.append("ContractAddr", contractAddr);
    //oData.append("ContractABI", contracrtABI);
    oData.append("ContractABI", JSON.stringify(contracrtABI));
    document.getElementById("debug1").innerHTML = JSON.stringify(contracrtABI);
    var oReq = new XMLHttpRequest();

    oReq.open("POST", addCopyrightAPI, true);
    oReq.onload = function (oEvent) {
        if (oReq.status == 200) {
            //success
            document.getElementById("newcprmsg").innerHTML = "<font color='green' size='3'><b>" + oReq.responseText + "</b></font>"; 
            //document.getElementById("message7").innerHTML = "Success" + oReq.responseText;
            
        } else {
            //errpr print oReq.status
            //document.getElementById("newcprmsg").innerHTML = "<font color='red' size='3'><b>Error : " + oReq.status + "</b></font>"; 
            document.getElementById("message7").innerHTML = "Error";
            
        }
    };
    oReq.send(oData);
    
    
}

