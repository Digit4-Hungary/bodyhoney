//Lottie konténerek:
  //var soapName;
  const rotateLottiePlayer = document.getElementById("rotate-lottie");
  const scrollLottiePlayer = document.getElementById("scroll-lottie");
  const hoverLottiePlayer= document.getElementById("hover-lottie");
  var citromfuvesJSONs = window.soapLotties.find(el => el.name === "citromfuves");
  var preLoadWorking = true;
  window.szappan = document.getElementById("Soap-header").getAttribute("productName");

//Görgetés figyeléséhez scrolledY változó
  var slideRightStarted = false;
  var slideLeftStarted = false;
  window.addEventListener('scroll', function() {
      var scrolledY =  window.pageYOffset;
      //console.log(scrolledY);
      if (scrolledY > 10) {
        document.getElementById("home-hover-trigger").style.setProperty("display", "none");                
    	} else {
      	document.getElementById("home-hover-trigger").style.setProperty("display", "block");
      };
   
      if (scrolledY > 1*vh && citromfuvesJSONs.hoverJSON === null) {
        citromfuvesJSONs.hoverJSON = "load...";
        lottiePreDownload("citromfuves", "hover");
        scrollLottieLoad()
      };
    /*  if (scrolledY > 6*vh && citromfuvesJSONs.slideJSON === null) {
        citromfuvesJSONs.slideJSON = "load...";
        lottiePreDownload("citromfuves", "slide");
      };*/
      if (scrolledY > 7.5*vh) {
        if (scrollLottiePlayer.childNodes[0].getAttribute("width") == 0) {
          scrollLottiePlayer.childNodes [0].remove();
          scrollLottieLoad()
        };
        var triggerPosition = Math.round((scrolledY - 7.5*vh)/vh*100);
        var frame = Math.round(triggerPosition/2.33)
        //console.log(triggerPosition);
        //console.log(frame);       
        scrollLottieAnim.goToAndStop(frame, true);
        if (triggerPosition > 1 && hoverLottiePlayer.childNodes.length == 0) {
          hoverLottieLoad("citromfuves");
        //  console.log("citromfüves hover betöltésre parancs indítva") 
        };
        if (triggerPosition > 25 && hoverLottiePlayer.childNodes[0].getAttribute("width") == 0) {
          hoverLottiePlayer.childNodes [0].remove();
          document.getElementById("Soap-header").setAttribute("productName", "citromfuves");          
          hoverLottieLoad("citromfuves");
        //  console.log("citromfüves slide betöltésre parancs indítva") 
        };
        if (triggerPosition > 50 && hoverLottiePlayer.childNodes[0].getAttribute("width") == 0) {
          hoverLottiePlayer.childNodes [0].remove();
          hoverLottieLoad("citromfuves");
        //  console.log("citromfüves slide betöltésre 2. parancs indítva") 
        }
      }
  });

//Egérhúzás szappan felett figyelő
  document.addEventListener('mousemove', productHoverFrame);
  document.getElementById("Product-hover-trigger").setAttribute("onmouseout", "productHoverOver()");
  function productHoverFrame(e) {
        if (hoverLottiePlayer.childNodes.length !== 0) {
          var frame = Math.round(((Math.abs((e.clientX)-vw))/vw*100-69.8)*5.2356/2.38);
          var y = (e.clientY)/vw*100;
          if((frame < 41 && frame > 0) && (y < 26.5 && y > 7)){        
                //console.log(frame);
                hoverLottieAnim.goToAndStop(frame, true);
          }
      }
  };

  function lottieLoader(soapName, animType) {
      //var hoverLottiePLayer= document.getElementById("hover-lottie-"+soapName);
      // var slideLottie = document.getElementById("slide-lottie-"+soapName);
    // Csak ha nem mobilnézet
      if (mobilAspectRatio.matches == false) {
        var whichLottieObj = window.soapLotties.find(el => el.name === soapName);
        if (animType == "hover") {      
              var json = whichLottieObj.hoverJSON;
              if (json == null) {
                  setTimeout(function(){ 
                      lottieLoader(soapName, animType)
                  }, 10);
              } else {
                  if (hoverLottiePlayer.childNodes == null) {
                      hoverLottieLoad(soapName)
                  } else {
                      hoverLottiePlayer.childNodes [0].remove();
                      //hoverLottieAnim.destroy()
                      hoverLottieLoad(soapName);
                    //  console.log("törlés és újrabetöltés"+soapName+" , "+animType)
                  };
                  //lastHoverName = soapName
              }
        }
      }
  };

//Lottie anim data
  function rotateLottieLoad() {
      var rotateLottieData = {
        container: rotateLottiePlayer,
        animationData: window.mainLotties.rotateJSON,
        renderer: "canvas",
        loop: false, // Optional
        autoplay: false, // Optional
        name: "rotateLottie",
      };
      rotateLottieAnim = bodymovin.loadAnimation(rotateLottieData);
      rotateLottieStart()
      //rotateLottieAnim.playSegments([1, 42], true)
  };

  function rotateLottieStart() {
    rotateLottieAnim.playSegments([1, 42], true);
    setTimeout(function(){ rotateLottieStart() }, 1700)
  };

  function scrollLottieLoad() {
      var scrollLottieData = {
          container: scrollLottiePlayer,
          animationData: window.mainLotties.scrollJSON,
          renderer: "canvas",
          loop: false, // Optional
          autoplay: false, // Optional
          name: "scrollLottie",
      };
      scrollLottieAnim = bodymovin.loadAnimation(scrollLottieData);
  };

  function hoverLottieLoad(soapName) {
      var hoverLottieData = {
              container: hoverLottiePlayer,
              animationData: window.soapLotties.find(el => el.name === soapName).hoverJSON,
              renderer: "canvas",
              loop: false, // Optional
              autoplay: false, // Optional
              name: "hoverLottie",
              };
          hoverLottieAnim = bodymovin.loadAnimation(hoverLottieData); 
  };

  function productHoverOver() {
          hoverLottieAnim.setDirection(-1);
          hoverLottieAnim.setSpeed(4);
          hoverLottieAnim.play();
  }; 
//Legörgetés kattintásra
  document.getElementById("home-hover-trigger").setAttribute("onclick", "scrollHomeToBottom()");
  function scrollHomeToBottom() {
    document.getElementById("home-hover-trigger").style.setProperty("display", "none");
    window.scrollBy({
      top: 1.45*vh,
      left: 0,
      behavior: 'smooth'
    });
    setTimeout(function(){
      window.scrollBy({
        top: 1.9*vh,
        left: 0,
        behavior: 'smooth'
      })
    }, 1700);
    setTimeout(function(){
      window.scrollBy({
        top: 2.112*vh,
        left: 0,
        behavior: 'smooth'
      })
    }, 3000);
    setTimeout(function() {
      var scrollStep = 1;
      var scrollInterval = setInterval(function(){
        if (scrollStep < 200) {
          window.scrollBy({
            top: 0.0212*vh,
            left: 0,
          });
          scrollStep++
        } else {
          clearInterval(scrollInterval)
        }
      }, 10);
    }, 4800);
  };

//Oldallapozáshoz -----------------------------------------------------------------------------------
  //Egérhúzásra előtöltés hozzáadása
    var i;
    for (i = 0; i < productLinks.length; i++) {
        productLinks[0].style.setProperty("pointer-events", "none");
        productLinks[i].setAttribute("onclick", "productDescriptionIcon(this)");
        productLinks[i].setAttribute("animType", "hover");
        productLinks[i].addEventListener("mouseenter", function( event ) {
          if (mobilAspectRatio.matches == false) {
              //var animType = event.target.getAttribute("animType");
              var animType = "hover";
              var soapName = event.target.getAttribute("productName");
              //console.log("Egérhúzásra előtöltés és attribútumok hozzáadása "+soapName, animType);
              var whichLottieObj = window.soapLotties;
              //console.log(whichLottieObj);
              var jsonType = animType+"JSON";
              //console.log("jsonType= "+jsonType);
              var json = whichLottieObj.find(el => el.name === soapName)[jsonType];
              //console.log("json: "+ json + " , " + jsonType);
              //console.log("preLoadWorking= "+window.preLoadWorking);
              if (json == null) {
                  json = "loading..."
                  //console.log("preLoadWorking egyenlő true-val");
                  //console.log("preLoadWorking ="+window.preLoadWorking);
                  if(preLoadWorking == true ) {
                      preLoadWorking == false;
                      //console.log("json ="+json)
                      lottiePreDownload(soapName, "hover");
                      //console.log("lottiePreDownload "+soapName, animType)
                  } else {
                      //console.log("json nem egyenéő null, így nem tölti újra le a "+soapName, animType);
                      window.preLoadWorking == true
                  }
              } else {
                  //console.log("preLoadWorking nem egyenlő true, így nem tölti újra le a "+soapName, animType);
              }
          }
        })   
    };

//Oldallapozáshoz
  //Következő termék nyil kattintás
      function nextProduct() {
        nextProductArrow.style.setProperty("pointer-events", "none");
        var number = document.getElementById(currentPageName).getAttribute("number");
        var container = document.getElementById("Page-icon-container");
        number++;
        number++;
        if (number < 11) {
          container.children[number].click()
        } else {
          container.children[0].click()
        };
        setTimeout(function(){ nextProductArrow.style.setProperty("pointer-events", "auto") }, 500)
      };

   //Előző termék nyil kattintás
      function previousProduct() {
        previousProductArrow.style.setProperty("pointer-events", "none");
        var number = document.getElementById(currentPageName).getAttribute("number");
        var container = document.getElementById("Page-icon-container");           //csak itt van különbség
        number--;
        number--;
        if (number > -1) {
          container.children[number].click()
        } else {
          container.children[10].click()
        };
        setTimeout(function(){ previousProductArrow.style.setProperty("pointer-events", "auto") }, 500)
      };  

  //Kattintásra
    var productImgPNG = document.getElementById("mobil-poduct-imgs").getElementsByTagName("img")
    function productDescriptionIcon(clickedElement) {
            //console.log(clickedElement);
            var animType = clickedElement.getAttribute("animType");
            var soapName = clickedElement.getAttribute("productName");
            window.szappan = soapName;
            var arrayID = clickedElement.getAttribute("arrayID")
            console.log(arrayID);
            var forHeader = clickedElement.getAttribute("forHeader");
            //lottieLoader(soapName, animType);
            lottieLoader(soapName, "hover");
            for (i = 0; i < productLinks.length; i++) {
              productLinks[i].style.setProperty("pointer-events", "none");
              productLinks[i].children[0].setAttribute("class", "page-icon color");
              productImgPNG[i].setAttribute("class", "hover-lottie-png png hide")
            };
            clickedElement.children[0].setAttribute("class", "page-icon color current");
            productImgPNG[arrayID].setAttribute("class", "hover-lottie-png png");
            var backText = document.getElementById("Soap-header");
            backText.innerHTML = forHeader;
            backText.setAttribute("productName", soapName)
            for (i = 0; i < productLinks.length; i++) {
              productLinks[i].style.setProperty("pointer-events", "auto")
            };
            clickedElement.style.setProperty("pointer-events", "none");
            document.getElementById("quantity").value = 1
    };

  //Betöltődött a következő termék figyelő 
    var currentPageName;
    function nextProductPageLoadedChecker () {
      if (currentPageName == null) {
        currentPageName = "citromfuves"
      };
      if (document.getElementById("product-params") !== null) {
        if (currentPageName !== document.getElementById("product-params").getAttribute("page-name") ) {
          var productDescriptionTexts = document.getElementById("product-description-texts").innerHTML;
          document.getElementById("product-description-texts-home").innerHTML = productDescriptionTexts;
          document.getElementById("product-description-texts-home-mobil").innerHTML = productDescriptionTexts;
          document.getElementById("product-description-texts-home-mobil").getElementsByClassName("soap-header-container")[0].setAttribute("class", "soap-header-container mobil");
          document.getElementById("product-description-texts-home-mobil").getElementsByClassName("dividing-line-box")[0].setAttribute("class", "dividing-line-box fix");
          document.getElementById("product-description-texts-home-mobil").getElementsByClassName("description-box")[0].setAttribute("class", "description-box mobil");
          var whenToUse = document.getElementById("when-to-use").innerHTML;
          document.getElementById("when-to-use-home").innerHTML = whenToUse;
          document.getElementById("when-to-use-home-mobil").innerHTML = whenToUse;
          var howToUse = document.getElementById("how-to-use").innerHTML;
          document.getElementById("how-to-use-home").innerHTML = howToUse;
          document.getElementById("how-to-use-home-mobil").innerHTML = howToUse;
          var ingredients = document.getElementById("ingredients").innerHTML;
          document.getElementById("ingredients-home").innerHTML = ingredients;    
          document.getElementById("ingredients-home-mobil").innerHTML = ingredients;                                
          currentPageName = document.getElementById("product-params").getAttribute("page-name");
          if (mobilAspectRatio.matches) {
            window.scrollTo(0, 0)
          } 
        }
      };
      setTimeout(nextProductPageLoadedChecker, 100)
    };
    nextProductPageLoadedChecker();


