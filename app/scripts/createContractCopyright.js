// Get the query string contents from the page URL used by removing the "?"
var query = location.search.substr(1);
var ethRefAddress;
var pnpv = '';
var default_provider_url = 'http://localhost:8545';
//var default_provider_url = 'https://ropsten.infura.io/TOKEN';
var provider_url = '';
var dafault_gas = 92800;
var default_baanda = 1.99;
var contractUpdateAPI = "http://localhost:4000/genCRCApi";

function postFormData() {

    clearMessages();
    document.getElementById("message1").innerHTML = "Start data = POST";

    var x = document.getElementById("contract_form").elements.namedItem("contract_name").value;
    document.getElementById("message2").innerHTML = "contract name = " + x;
    x = document.getElementById("contract_form").elements.namedItem("emailAddress").value;
    document.getElementById("message3").innerHTML = "email = " + x;
    x = document.getElementById("contract_form").elements.namedItem("ether_Addr").value;
    document.getElementById("message4").innerHTML = "ether addr = " + x;
    x = document.getElementById("contract_form").elements.namedItem("authorName").value;
    document.getElementById("message5").innerHTML = "Author name = " + x;
    clearMessages();
    //alert("POST-FormData :: " + getAllFormElements());

    //loadAPI("http://localhost:4000/nlflstuff", getAllFormElements());
    // loadAPI("http://localhost:3005/nlfltest", getAllFormElements());
    //loadAPI("http://localhost:4000/genCRCApi", getAllFormElements());
    loadAPI(contractUpdateAPI, getAllFormElements());
}

function getFormData() {

    clearMessages();
    document.getElementById("message1").innerHTML = "Start data = GET";

    var x = document.getElementById("contract_form").elements.namedItem("contract_name").value;
    document.getElementById("message2").innerHTML = "contract name = " + x;
    x = document.getElementById("contract_form").elements.namedItem("emailAddress").value;
    document.getElementById("message3").innerHTML = "email = " + x;
    x = document.getElementById("contract_form").elements.namedItem("ether_Addr").value;
    document.getElementById("message4").innerHTML = "ether addr = " + x;
    x = document.getElementById("contract_form").elements.namedItem("authorName").value;
    document.getElementById("message5").innerHTML = "Author name = " + x;

    alert("GET-FormData :: " + getAllFormElements());

    //loadAPI("http://localhost:3005/nlflstuff", getAllFormElements());
    //loadAPI("http://localhost:3005/nlfltest", getAllFormElements());
}

function getAllFormElements() {
    var elements = document.getElementById("contract_form").elements;
    var formData = {};
    var qstring = "";
    var iname = '';
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        formData[item.name] = item.value;
        iname = item.name;
        //qstring = qstring + item.name + "=" + item.value;
        if (iname == "ether_balance") iname = "aether_balance";
        if (iname == "eth_password") iname = "aether_password";
        qstring = qstring + iname + "=" + item.value;
        if (i != (elements.length - 1))
            qstring += "&";
    }
    document.getElementById("message7").innerHTML = "qstring = " + qstring;

    return qstring;
    //return formData;
    //return "?a=b&b=c&d=f";
}

function fillFormData(formname) {
    document.getElementById("message1").innerHTML = "In the function fillFormData";
    if (query) {
        var params = query.split("&");
        document.getElementById("message4").innerHTML = "params ===== " + params + ' formname=' + formname + " length = " + params.length;
        var xy, pname, pval, formElement;
        for (var i = 0; i < params.length; i++) {
            xy = params[i].split("=");
            pname = xy[0];
            pval = xy[1];
            document.getElementById("message6").innerHTML = "param[" + i + "].name=" + pname + " value=" + pval;
            setContract(pname, pval);
        }
    } else {
        document.getElementById("message4").innerHTML = "query is not getting ... why?"
        return false;
    }
    //document.getElementById("message12").innerHTML = "I am here - what happend to ethRefAddress??";
    if (ethRefAddress) {
        document.getElementById("message7").innerHTML = "ethRefAddress =" + ethRefAddress;
        //ethjs();
    } else {
        document.getElementById("message7").innerHTML = "ethRefAddress = not defined";
    }
    // Note: eventually, return true or false and display messages accordingly
    // Fill Geth URL with default geth url.
    setContract('provider_url', default_provider_url)
    onloadFillEthInfo();

}

function setContract(pn, pv) {
    //document.getElementById("message5").innerHTML = "went to default type = " + pn;// + ename;
    pnpv = pnpv + "pn=" + pn + " pv=" + pv + "| ";
    document.getElementById("message7").innerHTML = pnpv;

    // var xx = pv.split("%20");
    switch (pn) {
        case 'author_name':
            var xx = pv.split("%20");
            //document.getElementById(pn).innerHTML = xx[0] + " " + xx[1];
            var nameA = xx[0] + " " + xx[1];
            document.getElementById("authorName").value = nameA;
            document.getElementById(pn).innerHTML = nameA;
            break;
        case 'email_addr':
            document.getElementById(pn).innerHTML = pv; // show it on the screen
            document.getElementById("emailAddress").value = pv; //initialize the hidden form field
            break;
        case 'ether_Addr':
            document.getElementById(pn).innerHTML = pv; // show it on the screen
            document.getElementById("ether_Addr").value = pv; //initialize the hidden form field
            ethRefAddress = pv;  // initialize global variable to get account balance
            break;
        case 'ether_bal':
            document.getElementById(pn).innerHTML = pv + " Ether";
            document.getElementById("ether_balance").value = pv; //initialize the hidden form field
            document.getElementById("message5").innerHTML = "ether_bal pn=" + pn + " pv=" + pv;
        case 'gas_need':
            ocument.getElementById(pn).innerHTML = pv;
            document.getElementById("gas_fee").value = pv; //initialize the hidden form field
            //document.getElementById("message12").innerHTML = "gas_need: " + pv;// + document.getElementById("gas_fee").value;
            break;
        case 'eth_password':
            document.getElementById(pn).innerHTML = pv; // show it on the screen
            document.getElementById("eth_password").value = pv; //initialize the hidden form field
            break;
        case 'provider_url':
            document.getElementById(pn).innerHTML = pv; // show it on the screen
            document.getElementById("provider_url").value = pv; //initialize the hidden form field
            document.getElementById("message12").innerHTML = "Provider URL: " + pv;
            break;
        default:
            document.getElementById("message1").innerHTML = "Error in URI parameters. ";
            break;
    }
}

// This function is invoked onLoad of HTML form createContractCopyright.html
// Eventually, all these would be in util.js to be shared by other contract creation avenue
function onloadFillEthInfo() {
    // Initialize provider_url with default_provider_url (for on load)
    provider_url = default_provider_url;
    document.getElementById("message11").innerHTML = "onloadFilleEthInfo...";// + ename;
    getEtherBalance();
    setGasBaandaExpense();
}

function ondemandFillEthInfo() {
    document.getElementById("message11").innerHTML = "Inside ondemandFillEthInfo()  ";
    provider_url = document.getElementById("provider_url").value;
    document.getElementById("message10").innerHTML = "provider url " + provider_url;
    //getEtherBalance();
    default_baanda = 1.98;
    //setGasBaandaExpense();
    //showWeb3Version();
}

// This is used on submit ... to invoke backend service where the form data would be 
// used to trans-create the smart contract, deploy, same the contract and return status or error messages.
// including ethscan.io with right tnHash for people to see.
function loadAPI(url, formData) {

    clearMessages();
    var spaces = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    var contractname = document.getElementById("contract_name").value + '.sol';
    var outFileName = 'CR_' + document.getElementById("contract_name").value + '.sol';
    var goodmsg = spaces + '<font color=blue size=3><b>Message: Successfully created the Solidity contract file {' + outFileName + '}.</b></font>';

    var detailresult = "";


    var image = "<img src='./images/miner.gif' height=42 width=42>";
    var image1 = "&nbsp;<img src='./images/wait2.gif' height=42 width=42>";
    document.getElementById("message").innerHTML = spaces + "<font color=brown size=3><B> PLEASE WAIT - It will take a while to compile, deploy, and mined ... </b></font>" + image + image1;
    var xmlhttp = new XMLHttpRequest();
    // alert("URL IS" + url + formData);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                document.getElementById("message1").innerHTML = "Something === " + xmlhttp.responseText; 
                if (xmlhttp.responseText.substring(0, 6) == "Exists") {
                    goodmsg = spaces + '<font color=Orange size=3><b>Message: This contract already exists {' + contractname + '}. Use this from the [View Your Contract tab]</b></font>';
                } else {
                    detailresult = xmlhttp.responseText;
                }
                document.getElementById("message").innerHTML = goodmsg;
                document.getElementById("message0").innerHTML = spaces + "<font color=green size=2>" + detailresult + "</font>";
            }
            else if (xmlhttp.status == 400) {
                document.getElementById("message0").innerHTML = "<font color=red>1. Response (error 400) = " + xmlhttp.responseText + "</font>";
                //alert('Error 1: There was an error 400 for URL = ' + url);
            }
            else {
                document.getElementById("message0").innerHTML = "<font color=red>2. Response status = " + xmlhttp.status + " res=" + xmlhttp.responseText + "</font>";
                //alert('Error 2: Something else other than 200 or 400 was returned for URL = ' + xmlhttp.status );
            }
        }
    };

    xmlhttp.open("GET", url + "?" + formData, true);
    xmlhttp.send();
}

// Set up web3 link with geth node and get ether balance 
function getEtherBalance() {
    document.getElementById("message10").innerHTML = "Inside getEtherBalance ---";
    // check and Set web3 provider

    //var ret = doConnect();
    //if (ret) {
    doConnect();
    showWeb3Version();
    initEtherBalance();
    //} 
}

function initEtherBalance() {

    var account = document.getElementById("ether_Addr").value;
    document.getElementById("message9").innerHTML = "Inside initEtherBalance() ---" + " ac#:" + account;

    // var bal = web3.eth.getBalance("0xc453d647a6b8eb32bfe34e577e77e577eec8fd9f");
    // var balance = web3.eth.getBalance(account);
    // document.getElementById("message10").innerHTML = "Balance = " + bal;// + " for ac = " + account + " pwd=";
    // setContract('ether_bal', bal);
    // document.getElementById('ether_bal').innerHTML = web3.fromWei(bal, 'ether').toFixed(4) + " Ether";
    web3.eth.getBalance(account, function (error, result) {
        if (error) {
            document.getElementById("message11").innerHTML = "Error:" + error;
        } else {
            // Convert the balance to ethers
            var balance = web3.fromWei(result, 'ether').toFixed(4);
            // display the balance on the screen and initialize the hidden input field to be sent to backend
            setContract("ether_bal", balance);
        }
    });

}

// This setups the connection with the Geth node. Return 'false' is connection test fails
// Otherwise sends 'true'
function doConnect() {
    // 	
    window.web3 = new Web3(new Web3.providers.HttpProvider(provider_url));
    document.getElementById("message6").innerHTML = "doConnect -- Using Geth URL:" + provider_url;
    // Check web3 connection
    if (web3) {
        document.getElementById("message3").innerHTML = "web3 defined";
        if (web3.isConnected()) {
            document.getElementById("message4").innerHTML = "---- Connected to web3.isConnected()";
            return true;
        } else {
            document.getElementById("message").innerHTML = "<font color=red><b>Error:</b> The URL centric Geth node is not up. Please start localhost geth or point URL to valid Geth.</font>"
            return false;
        }
    } else {
        document.getElementById("message").innerHTML = "<font color=red><b>Error:</b> web3 is not defined or could not be defined. Report to Baanda-support @555-5555.</font>"
        return false;
    }
    return true;
}

// This displays the connectedweb3 version
function showWeb3Version() {
    document.getElementById("message8").innerHTML = "showWeb3Version() ---";
    // Asynchronous version
    web3.version.getNode(function (error, result) {
        if (error) {
            document.getElementById("message7").innerHTML = "<font color=red><b>Error:</b>Error: Geth node version cannot be detected. Report to Baanda support";
        } else {
            document.getElementById('geth_node_info').innerHTML = result;
            document.getElementById("message7").innerHTML = "Geth Version : " + result;
        }
    });
}

function setGasBaandaExpense() {
    //document.getElementById("message11").innerHTML = "Inside setGasBaandaExpens " + dafault_gas + " | " + default_baanda;
    document.getElementById('gas_need').innerHTML = dafault_gas + " Wie for deploying + $" + default_baanda + " Trans-creation Fee";
    document.getElementById("gas_fee").value = dafault_gas; //initialize the hidden form field
    document.getElementById("message12").innerHTML = "gas_need: " + dafault_gas;
}

// For keeping code that is to be cleaned up
/*
function storage() {

    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
        document.getElementById("message2").innerHTML = "Note: Web3 is already defined ... huh??.";
    } else {

        //console.log('Injected web3 Not Found!!!')
        var provider_url = 'http://localhost:8545';

        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        // window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        // If different geth provide than localhost:8545
        // Try const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/TOKEN"));
        // if localhost is not enabled ... and/or you have not set a get node somewhere exclusively 
        //var provider = document.getElementById('provider_url').value;
        document.getElementById("message2").innerHTML = "Using Geth URL:" + provider_url;
        window.web3 = new Web3(new Web3.providers.HttpProvider(provider_url));
        document.getElementById("message3").innerHTML = "Crossed window.web3";
    }


}
*/
function clearMessages() {
    document.getElementById("message0").innerHTML = '';
    document.getElementById("message1").innerHTML = '';
    document.getElementById("message2").innerHTML = '';
    document.getElementById("message3").innerHTML = '';
    document.getElementById("message4").innerHTML = '';
    document.getElementById("message5").innerHTML = '';
    document.getElementById("message6").innerHTML = '';
    document.getElementById("message7").innerHTML = '';
    document.getElementById("message8").innerHTML = '';
    document.getElementById("message9").innerHTML = '';
    document.getElementById("message10").innerHTML = '';
    document.getElementById("message11").innerHTML = '';
    document.getElementById("message12").innerHTML = '';
}