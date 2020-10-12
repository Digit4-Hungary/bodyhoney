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
  }
};

function uniqueIDgen(){
  var url_string= window.location.href
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

checkCookie()