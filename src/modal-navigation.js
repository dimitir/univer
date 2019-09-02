



// go to stepOne
function goToStepOne(e) {
    document.getElementById('stepVerificationOne').style.display = "grid";
    document.getElementById('stepVerificationTwo').style.display = "none";
    document.getElementById('stepVerificationThree').style.display = "none";

    document.getElementById('stepOne').style.color = "#364476";
    document.getElementById('stepTwo').style.color = "#DADADA";
}
document.getElementById("stepOne").addEventListener("click", goToStepOne, false);



// go to stepTwo
function goToStepTwo(e) {

    document.getElementById('stepVerificationOne').style.display = "none";
    document.getElementById('stepVerificationTwo').style.display = "grid";
    document.getElementById('stepVerificationThree').style.display = "none";
    document.getElementById('stepOne').style.color = "#DADADA";
    document.getElementById('stepTwo').style.color = "#364476";
}

document.getElementById("stepTwo").addEventListener("click", goToStepTwo, false);



// go to stepThree
function goToStepThree(e) {
    document.getElementById('stepVerificationOne').style.display = "none";
    document.getElementById('stepVerificationTwo').style.display = "none";
    document.getElementById('stepVerificationThree').style.display = "grid";
    document.getElementById('lastStepIcon').style.display = "none";
    document.getElementById('lastStepIconActiv').style.display = "block";
    document.getElementById('stepOne').style.color = "#DADADA";
    document.getElementById('stepTwo').style.color = "#DADADA";
    // if(getSumImputsValue[page1])

}

document.getElementById("lastStepIcon").addEventListener("click", goToStepThree, false);




// go to come back page
function goToVerificationPage(e) {
    document.getElementById('verificationModal').style.display = "none";
    document.getElementById('stepVerificationTwo').style.display = "none";
    document.getElementById('stepVerificationThree').style.display = "none";
    document.getElementById('verificationPage').style.display = "block";
    document.getElementsByClassName('logoTop__img')[0].style.display = "block";
}

document.getElementById('verificationModal__close').addEventListener(
    'click', goToVerificationPage, false
);






// go to modal StepOne
function goToModalStepOne(e) {
    document.getElementById('verificationPage').style.display = "none";
    document.getElementsByClassName('logoTop__img')[0].style.display = "none";
    document.getElementById('verificationModal').style.display = "block";
    document.getElementById('stepOne').style.color = "#364476";
    document.getElementById('stepVerificationOne').style.display = "grid";
    document.getElementById('stepTwo').style.color = "#DADADA";
    document.getElementById('stepVerificationThree').style.display = "none";



}
document.getElementById('buttonCheckDokWrap__button').addEventListener(
    'click', goToModalStepOne, false
);





//  go two step
function goToSecondStepButton(evt) {
    evt.preventDefault();
    document.getElementById('stepVerificationOne').style.display = "none";
    document.getElementById('stepVerificationTwo').style.display = "grid";
    document.getElementById('stepVerificationThree').style.display = "none";

    document.getElementById('stepOne').style.color = "#DADADA";
    document.getElementById('stepTwo').style.color = "#364476";
}

document.getElementById('stepsVerification__buttonGo').addEventListener(
    'click', goToSecondStepButton, false
);





// function postAjax(url, data, success) {
//     var params = typeof data == 'string' ? data : Object.keys(data).map(
//             function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
//         ).join('&');

//     var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
//     xhr.open('POST', url);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
//     };
//     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.send(params);
//     return xhr;
// }






function getRadioCheckedValue(radio_name) {
    var checkName;
    var radioArr = document.getElementsByName(radio_name);
    for (var i = 0; i < radioArr.length; i++) {
        if (radioArr[i].checked) {
            checkName = radioArr[i].value;
            console.log('checkName ' + checkName);
        }
        else checkName = "";
        return checkName;
    }
}



function gatheringValue() {
    let imputValueGether = new Object();
    let commonValue = document.getElementsByClassName('stepsVerification__Input');
    for (let k = 0; k < commonValue.length; k++) {
        let name = commonValue[k]['name'];
        let value = commonValue[k]['value'];
        imputValueGether[name] = value
    }

    // get radio value
    let radioName = getRadioCheckedValue('radio')
    imputValueGether.radio = radioName;
    console.log('imputValueGether');
    console.log(imputValueGether);
    // var myJSON = JSON.stringify(imputVale);
    return imputValueGether;
}








function checkResultSuccess(objStat) {
    // console.log(imputValue);
    // let totalObjectItem = Object.keys(fieldsImputState[pageNumber]).length;
    let sumGeneralInputs;
    let sumImputsTrueCommon = 0;

    for (let key in objStat) {
        let inputPages = objStat[key];
        sumGeneralInputs = Object.keys(inputPages).length;
        sumGeneralInputs += sumGeneralInputs;
    }

    for (let key in objStat) {
        let sumImputsTrue = objStat[key];
        for (let t in sumImputsTrue) {
            sumImputsTrueCommon += sumImputsTrue[t];
        }
    }


    // let radioValue = getRadioCheckedValue('radio');




    if (sumGeneralInputs === sumImputsTrueCommon) {
        let imputValue = gatheringValue();

        //    postAjax('http://xxx.xxx/', jsonData, function(data){ console.log(data); });

        let commonString = imputValue['name'] + " " + imputValue['lastname'] + "<br>"
            + imputValue['radio'] + ", " + imputValue['numbershort'] + " / №" + imputValue['numberlong'];


        let userDataBlock = document.getElementById('stepsVerification__userData');
        userDataBlock.innerHTML = commonString;

        document.getElementById('stepsVerification__buttonResultTipText').style.visibility = "hidden";
        document.getElementById('stepVerificationOne').style.display = "none";
        document.getElementById('stepVerificationTwo').style.display = "none";
        document.getElementById('stepVerificationThree').style.display = "grid";
        document.getElementById('stepOne').style.color = "#DADADA";
        document.getElementById('stepTwo').style.color = "#DADADA";
        document.getElementById('lastStepIcon').style.display = "none";
        document.getElementById('lastStepIconActiv').style.display = "block";
    }
    else {
        document.getElementById('stepsVerification__buttonResultTipText').style.visibility = "visible";
    }
}




function goToResult(evt) {
    evt.preventDefault();

    console.log('fieldsImputState final' + fieldsImputState);
    // console.log(fieldsImputState);
    checkResultSuccess(fieldsImputState);
}

document.getElementById('stepsVerification__buttonResult').addEventListener(
    'click', goToResult, false
);