// userID check és mentés cookie-ba
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
  setTimeout(function(){
      dataLayer.push({
          userId : cvalue
      })
  }, 2000)
};

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
          //console.log(c.substring(1))
      }
      if (c.indexOf(name) == 0) {
          //console.log(c.substring(name.length, c.length))
          return c.substring(name.length, c.length);
      }
  }
  return "";
};

function checkCookie() {
  var user = getCookie("userID");
  if (user != "") {
        //console.log("cookie userID: " + user);
        setTimeout(function(){
            dataLayer.push({
                userId : user
            })
        }, 2000)
  } else {
        var user = uniqueIDgen();
        if (user != "" && user != null) {
            setCookie("userID", user, 365);
        }
  };
  if (window.location.href.indexOf("reset-password") > -1) {
      console.log(URLhash);
      if (mobilAspectRatio.matches) {
          setTimeout(function(){ 
              window.location.assign("https://www.bodyhoney.com/soaps/citromfuves-mezes-kecsketejes-szappan"+URLhash)
          }, 2000);
          //window.location.assign("https://google.com"+URLhash)
      } else {
            window.location.assign("https://www.bodyhoney.com"+URLhash)
      }
  } else {
        window.history.replaceState({}, document.title, "/")
  }
};

function uniqueIDgen(){
  var url_string= window.location.href
  console.log(url_string)
  var url = new URL(url_string);
  var id = url.searchParams.get("id");
  //console.log(id);
  if (id !== null) {
      return (id)
      
  } else {
      // always start with a letter (for DOM friendlyness)
      var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
      do {                
      // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
      var ascicode=Math.floor((Math.random()*42)+48);
          if (ascicode<58 || ascicode>64){
              // exclude all chars between : (58) and @ (64)
              idstr+=String.fromCharCode(ascicode);    
          }                
      } while (idstr.length<32);
      return (idstr);
  }
};

var URLAndParams = window.location.href;
var URLhash = window.location.hash;

//checkCookie();

//Betöltőképernyőhöz
function downloadCheckerXHR() {
    var origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
/*    this.addEventListener('progress', function() {
        if (mobilAspectRatio.matches == true && url == "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f270643d9c777ed1624cb9e_Falling_lottie_new_(70%25).json") {
          //console.log("progress majd abort");  
          origOpen("https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f270643d9c777ed1624cb9e_Falling_lottie_new_(70%25).json").abort();
        };
      }); */
    
      this.addEventListener('load', function() {
        if (mobilAspectRatio.matches == false && url == "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f270643d9c777ed1624cb9e_Falling_lottie_new_(70%25).json") {
          //console.log("letöltés ok");
          startOpenAnimationDesktop()
          //var timestamp = Date.now();
          //console.log('XHR finished loading', timestamp, url)
        } else if (mobilAspectRatio.matches == true){
            startOpenAnimationMobil()
        }
      });

      this.addEventListener('error', function() {
        var timestamp = Date.now();
        //console.log('XHR errored out', timestamp, url);
      });
      origOpen.apply(this, arguments);

      /* if (isIOSDevice == true) {
        setTimeout(function(){
          startOpenAnimationMobil();
          //console.log("ios eszköz értzékelve")
        }, 3000)
      } */

    };
  };

downloadCheckerXHR();



//Nyitó animációk:
  //Desktop:
      function startOpenAnimationDesktop() {
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
            //console.log("startOpenAnimationDesktop funkción belül focus = "+focus)  
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
            startOpenAnimationDesktop()
          }, 200)
        }
      };

  //Mobil:
    function startOpenAnimationMobil() {
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
          //console.log("startOpenAnimationMobil funkción belül focus = "+focus)  
          //console.log("start animáció indul");
          document.getElementById("start-window-open").click();
          document.getElementById("start-falling-lottie").click();
          document.getElementById("second-section").style.setProperty("position", "absolute");
          document.getElementById("triggers").style.setProperty("position", "absolute");
          //cookieScriptLoad();               
      } else {
        setTimeout(function() {
          //console.log("start animáció késleltetés");
          startOpenAnimationMobil()
        }, 200)
      }
    };

//    setTimeout(function(){ startOpenAnimationMobil() }, 2000)

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