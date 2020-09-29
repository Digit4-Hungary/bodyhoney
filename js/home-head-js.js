//Betöltőképernyőhöz

function downloadCheckerXHR() {
    var origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
      this.addEventListener('load', function() {
        if (url == "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f270643d9c777ed1624cb9e_Falling_lottie_new_(70%25).json") {
          //console.log("letöltés ok");
          startOpenAnimation()
          //var timestamp = Date.now();
          //console.log('XHR finished loading', timestamp, url)
        }
      });

      this.addEventListener('error', function() {
        var timestamp = Date.now();
        //console.log('XHR errored out', timestamp, url);
      });
      origOpen.apply(this, arguments);
    };
  };

downloadCheckerXHR();

function startOpenAnimation() {
    if ( window.mainLotties.rotateJSON == null ) {
      window.mainLotties.rotateJSON = "load...";
      lottiePreDownload("main", "rotate")
    };
    var focus;
    if (/*@cc_on!@*/false) { // check for Internet Explorer
      document.onfocusin = function(){
        focus = true;
        //console.log("onfocusin, "+focus)
      };
      document.onfocusout = function(){
        focus = false;
        //console.log("onfocusout, "+focus)
      }
    } else {
      window.onfocus = function(){
        focus = true;
        //console.log("onfocus, "+focus)
      };
      window.onblur = function(){
        focus = false;
        //console.log("onblur, "+focus)
      };
    };
    if (focus !== false) {
        //console.log("startOpenAnimation funkción belül focus = "+focus)  
        //console.log("start animáció indul");
        setTimeout(function(){ 
        	document.getElementById("start-window-open").click();
        }, 2000);
        setTimeout(function(){ 
        	document.getElementById("start-falling-lottie").click();
          lottiePreDownload("main", "scroll")
          /*var whichLottieObj = window.mainLotties;
          var json = window.mainLotties.rotateJSON;
          lottieJSONSaver("main", "rotate", whichLottieObj, json)
          */
        }, 2400);
        setTimeout(function(){ 
          rotateLottieLoad()         
        }, 5400);
        setTimeout(function(){
         // lottiePreDownload("main", "scroll");
          document.getElementById("start-falling-lottie").click();
          document.getElementById("second-section").style.setProperty("position", "absolute");
          document.getElementById("triggers").style.setProperty("position", "absolute");
          //cookieScriptLoad();          
        }, 7400)      
    } else {
       setTimeout(function() {
         //console.log("start animáció késleltetés");
         startOpenAnimation()
       }, 200)
    }
  };

  //Lottie preloader
function lottiePreDownload(soapName, animType) {
   var lottieURL;
   //console.log("lottiePreDownloaderben:"+soapName, animType);
   if (soapName == "main") {
         var whichLottieObj = window.mainLotties;
         if (animType === "rotate") {  
            lottieURL = whichLottieObj.rotateURL;
         } else {
            lottieURL = whichLottieObj.scrollURL;
         }   
   } else if (soapName !== "main") {
        //console.log("preloaderben else után, animType = "+animType+" szappan= "+soapName)
        var whichLottieObj = window.soapLotties;
        if (animType === "hover") {
            lottieURL = whichLottieObj.find(el => el.name === soapName).hoverURL;
            //console.log("hoverURL = "+lottieURL)
        } else {
            lottieURL = whichLottieObj.find(el => el.name === soapName).slideURL;
            //console.log("slideURL = "+lottieURL)
        }
   };
   return fetch(lottieURL)
   .then(response => {
       return response.json()
   })
   .then(json => {
       this.users = json;
       lottieJSONSaver(soapName, animType, whichLottieObj, this.users)           
   })
};

//Lottie file saver
function lottieJSONSaver(soapName, animType, whichLottieObj, json) {
    if (soapName == "main") {
        if (animType == "rotate") {
           whichLottieObj.rotateJSON = json;
        } else {
           whichLottieObj.scrollJSON = json;
        }
    } else {
        if (animType == "hover") {
            whichLottieObj.find(el => el.name === soapName).hoverJSON = json;
            window.preLoadWorking = true;
            //console.log("preLoadWorking= "+window.preLoadWorking)
        } else {
            whichLottieObj.find(el => el.name === soapName).slideJSON = json
        }
    };
    //console.log(whichLottieObj);
};