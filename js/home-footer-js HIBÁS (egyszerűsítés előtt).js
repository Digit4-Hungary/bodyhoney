/*window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
             setTimeout(function(){  rotateLottieLoad() }, 2000)
});
*/
//Lottie konténerek:
  //var soapName;
  const rotateLottiePlayer = document.getElementById("rotate-lottie");
  const scrollLottiePlayer = document.getElementById("scroll-lottie");
  const hoverLottieWrappercitromfuves = document.getElementById("hover-lottie-citromfuves");
  const slideLottieWrappercitromfuves = document.getElementById("slide-lottie-citromfuves");
  const hoverLottieWrapperkoromviragos = document.getElementById("hover-lottie-koromviragos");
  const slideLottieWrapperkoromviragos = document.getElementById("slide-lottie-koromviragos");
  var citromfuvesJSONs = window.soapLotties.find(el => el.name === "citromfuves");

//Görgetés figyeléséhez scrolledY változó
  var slideRightStarted = false;
  var slideLeftStarted = false;
  window.addEventListener('scroll', function() {
      var scrolledY =  window.pageYOffset;
      //console.log(scrolledY);
      if (scrolledY > 10) {
        document.getElementById("home-hover-trigger").style.setProperty("display", "none");
          if (window.mainLotties.scrollJSON == null) {
            window.mainLotties.scrollJSON = "load...";
            lottiePreDownload("main", "scroll")
          }
                  
    	} else {
      	document.getElementById("home-hover-trigger").style.setProperty("display", "block");
      };
   
      if (scrolledY > 3*vh && citromfuvesJSONs.hoverJSON === null) {
        citromfuvesJSONs.hoverJSON = "load...";
        lottiePreDownload("citromfuves", "hover");
        scrollLottieLoad()
      };
      if (scrolledY > 6*vh && citromfuvesJSONs.slideJSON === null) {
        citromfuvesJSONs.slideJSON = "load...";
        lottiePreDownload("citromfuves", "slide");
      };
      if (scrolledY > 7.5*vh) {
        var triggerPosition = Math.round((scrolledY - 7.5*vh)/vh*100);
        var frame = Math.round(triggerPosition/2.33)
        console.log(triggerPosition);
        console.log(frame);       
        scrollLottieAnim.goToAndStop(frame, true);
        if (triggerPosition > 1 && hoverLottieWrappercitromfuves.childNodes.length == 0) {
          hoverLottieLoad("citromfuves");
          console.log("citromfüves hover betöltésre parancs indítva") 
        };
        if (triggerPosition > 50 && slideLottieWrappercitromfuves.childNodes.length == 0) {
          slideLottieLoad("citromfuves");
          document.getElementById("Soap-header").setAttribute("productName", "citromfuves");
          console.log("citromfüves slide betöltésre parancs indítva") 
        };
        if (triggerPosition > 100 && slideLottieWrappercitromfuves.childNodes[0].getAttribute("width") == 0) {
          slideLottieWrappercitromfuves.childNodes [0].remove();
          slideLottieLoad("citromfuves");
          //document.getElementById("Soap-header").setAttribute("productName", "citromfuves");
          console.log("citromfüves slide betöltésre parancs 2. indítva") 
        };
        if (triggerPosition > 220 && slideRightStarted == false) {
          slideRightStarted = true;
          slideLeftStarted = false;
          var i;
          var productLinks = document.getElementsByClassName("product-link-home");
          for (i = 0; i < productLinks.length; i++) {
                productLinks[i].setAttribute("animType", "slide");
          };
          setTimeout(function(){ 
            productSlideRight();
            console.log("citromfüves right slide betöltésre parancs indítva")
          }, 100) 
        };
        if (triggerPosition < 220 && slideRightStarted == true && slideLeftStarted == false) {
          slideLeftStarted = true;
          slideRightStarted = false;
          var i;
          var productLinks = document.getElementsByClassName("product-link-home");
          for (i = 0; i < productLinks.length; i++) {
              productLinks[i].setAttribute("animType", "hover");
          };
          setTimeout(function(){ 
            productSlideLeft();
            console.log("citromfüves left slide betöltésre parancs indítva") 
          }, 100)
        };

      }
  });

//Egérhúzás szappan felett figyelő
  document.addEventListener('mousemove', productHoverFrame);
  document.getElementById("Product-hover-trigger").setAttribute("onmouseout", "productHoverOver()");
  function productHoverFrame(e) {
        var backText = document.getElementById("Soap-header");
        var soapName = backText.getAttribute("productName");
        //var hoverLottieWrapper = document.getElementById("hover-lottie-"+soapName)
      if (hoverLottieWrappercitromfuves.childNodes.length !== 0) {
          var frame = Math.round(((Math.abs((e.clientX)-vw))/vw*100-69.8)*5.2356/2.38);
          var y = (e.clientY)/vw*100;
          if((frame < 41 && frame > 0) && (y < 26.5 && y > 7)){        
                //console.log(frame);
                hoverLottieAnimcitromfuves.goToAndStop(frame, true);
          }
      }
  };

//Lottie anim loader
  //var lastHoverName = "citromfuves";
  //var lastSlideName = "citromfuves";
  function lottieLoader(soapName, animType) {
      var hoverLottieWrapper = document.getElementById("hover-lottie-"+soapName);
      var slideLottieWrapper = document.getElementById("slide-lottie-"+soapName);
      var whichLottieObj = window.soapLotties.find(el => el.name === soapName);
      if (animType == "hover") {      
            var json = whichLottieObj.hoverJSON;
            if (json == null) {
                setTimeout(function(){ 
                    lottieLoader(soapName, animType)
                }, 10);
            } else {
                if (hoverLottieWrapper.childNodes == null) {
                    hoverLottieLoad(soapName)
                } else {
                    //hoverLottieWrapper.childNodes [0].remove();
                    /*hoverLottieAnim.destroy()
                    hoverLottieLoad(soapName);
                    console.log("törlés és újrabetöltés"+soapName+" , "+animType) */
                };
                //lastHoverName = soapName
            }
      } else if (animType == "slide") {
            console.log("else után");
            var json = whichLottieObj.slideJSON;
            console.log("var json után, ahol json= "+json);
            if (json == null) {
                setTimeout(function(){ 
                    lottieLoader(soapName, animType)
                }, 10);
            } else {
                if (slideLottieWrapper.childNodes == null) {
                    slideLottieLoad(soapName)
                    console.log("betöltés"+soapName+" , "+animType) 
                } else {
                    //slideLottieWrapper.childNodes [0].remove();
                   /* slideLottieAnim.destroy()
                    slideLottieLoad(soapName);
                    console.log("törlés és újrabetöltés"+soapName+" , "+animType) */
                };
                //lastSlideName = soapName
             }
       };

       /*if (lastHoverName !== lastSlideName) {
            if (animType == "hover") {
                var json = whichLottieObj.slideJSON;
                if (slideLottieWrapper.childNodes == null) {
                    slideLottieLoad(soapName)
                    console.log("betöltés"+soapName+" , "+animType) 
                } else {
                    slideLottieWrapper.childNodes [0].remove();
                    slideLottieLoad(soapName);
                    console.log("törlés és újrabetöltés"+soapName+" , "+animType) 
                };
                lastSlideName = soapName
            } else {
                var json = whichLottieObj.hoverJSON;
                if (hoverLottieWrapper.childNodes == null) {
                    hoverLottieLoad(soapName)
                } else {
                    hoverLottieWrapper.childNodes [0].remove();
                    hoverLottieLoad(soapName);
                };
                lastHoverName = soapName
            }
        }*/
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
      var hoverLottieWrapper = document.getElementById("hover-lottie-"+soapName) 
      switch (soapName) {
        case "citromfuves":
          var hoverLottieDatacitromfuves = {
              container: hoverLottieWrappercitromfuves,
              animationData: window.soapLotties.find(el => el.name === soapName).hoverJSON,
              renderer: "canvas",
              loop: false, // Optional
              autoplay: false, // Optional
              name: "hoverLottiecitromfuves",
              };
          hoverLottieAnimcitromfuves = bodymovin.loadAnimation(hoverLottieDatacitromfuves); 
          break;
        case "koromviragos":
          var hoverLottieDatakoromviragos = {
              container: hoverLottieWrapperkoromviragos,
              animationData: window.soapLotties.find(el => el.name === soapName).hoverJSON,
              renderer: "canvas",
              loop: false, // Optional
              autoplay: false, // Optional
              name: "hoverLottiekoromviragos",
              };
          hoverLottieAnimkoromviragos = bodymovin.loadAnimation(hoverLottieDatakoromviragos)        
          break;
        case "":
          break;  
        case "":
          break;
        case "":
          break;
        case "":
          break;                            
      }

  };
  function slideLottieLoad(soapName) {
      var slideLottieWrapper = document.getElementById("slide-lottie-"+soapName);
      switch (soapName) {
        case "citromfuves":
          var slideLottieDatacitromfuves = {
              container: slideLottieWrappercitromfuves,
              animationData: window.soapLotties.find(el => el.name === soapName).slideJSON,
              renderer: "canvas",
              loop: false, // Optional
              autoplay: false, // Optional
              name: "slideLottiecitromfuves",
              };
          slideLottieAnimcitromfuves = bodymovin.loadAnimation(slideLottieDatacitromfuves);
          break;
        case "koromviragos":
          var slideLottieDatakoromviragos = {
              container: slideLottieWrapperkoromviragos,
              animationData: window.soapLotties.find(el => el.name === soapName).slideJSON,
              renderer: "canvas",
              loop: false, // Optional
              autoplay: false, // Optional
              name: "slideLottiekoromviragos",
              };
          slideLottieAnimkoromviragos = bodymovin.loadAnimation(slideLottieDatakoromviragos);
          break;  
        case "":
          break;
        case "":
          break;
        case "":
          break;
        case "":
          break; 
      }
  };
  function productHoverOver() {
      var soapName = document.getElementById("Soap-header").getAttribute("productName")
      console.log("onmouseout funkción belül "+soapName);
      switch (soapName) {
        case "citromfuves":
          hoverLottieAnimcitromfuves.setDirection(-1);
          hoverLottieAnimcitromfuves.setSpeed(4);
          hoverLottieAnimcitromfuves.play();
          break;
        case "koromviragos":
          hoverLottieAnimkoromviragos.setDirection(-1);
          hoverLottieAnimkoromviragos.setSpeed(4);
          hoverLottieAnimkoromviragos.play();
          break;
        case "":
          hoverLottieAnim.setDirection(-1);
          hoverLottieAnim.setSpeed(4);
          hoverLottieAnim.play();
          break;
        case "":
          break;
        case "":
          break;
        case "":
          break;
      }      
  };
  function productSlideRight() {
      var soapName = document.getElementById("Soap-header").getAttribute("productName");
      console.log("productSlide funkció ok "+soapName);
      if (soapName == "citromfuves") {
          maxFrame = 42
      } else {
          maxFrame = 33
      };
      switch (soapName) {
        case "citromfuves":
          slideLottieAnimcitromfuves.playSegments([1, Math.round(10/42*maxFrame)], false);
          slideLottieAnimcitromfuves.setSpeed(2);
          slideLottieAnimcitromfuves.playSegments([Math.round(10/42*maxFrame), Math.round(20/42*maxFrame)], false);
          slideLottieAnimcitromfuves.setSpeed(3.5);
          slideLottieAnimcitromfuves.playSegments([Math.round(20/42*maxFrame), Math.round(25/42*maxFrame)], false);
          slideLottieAnimcitromfuves.setSpeed(4);
          slideLottieAnimcitromfuves.playSegments([Math.round(25/42*maxFrame), Math.round(30/42*maxFrame)], false);
          slideLottieAnimcitromfuves.setSpeed(3.5);
          slideLottieAnimcitromfuves.playSegments([Math.round(30/42*maxFrame), Math.floor(42/42*maxFrame)], false);
          slideLottieAnimcitromfuves.setSpeed(2)
          break;
        case "koromviragos":
          slideLottieAnimkoromviragos.playSegments([1, Math.round(10/42*maxFrame)], false);
          slideLottieAnimkoromviragos.setSpeed(2);
          slideLottieAnimkoromviragos.playSegments([Math.round(10/42*maxFrame), Math.round(20/42*maxFrame)], false);
          slideLottieAnimkoromviragos.setSpeed(3.5);
          slideLottieAnimkoromviragos.playSegments([Math.round(20/42*maxFrame), Math.round(25/42*maxFrame)], false);
          slideLottieAnimkoromviragos.setSpeed(4);
          slideLottieAnimkoromviragos.playSegments([Math.round(25/42*maxFrame), Math.round(30/42*maxFrame)], false);
          slideLottieAnimkoromviragos.setSpeed(3.5);
          slideLottieAnimkoromviragos.playSegments([Math.round(30/42*maxFrame), Math.floor(42/42*maxFrame)], false);
          slideLottieAnimkoromviragos.setSpeed(2)
          break;
        case "":
          break;
        case "":
          break; 
        case "":
          break;
        case "":
          break;
      }        
  };
  function productSlideLeft() {
      var soapName = document.getElementById("Soap-header").getAttribute("productName");
      console.log("productSlide funkció ok "+soapName);
      if (soapName == "citromfuves") {
          maxFrame = 42
      } else {
          maxFrame = 33
      };
      switch (soapName) {
        case "citromfuves":
          slideLottieAnimcitromfuves.playSegments([Math.floor(42/42*maxFrame), Math.round(31/42*maxFrame)], false);
          slideLottieAnimcitromfuves.setSpeed(3.5);
          slideLottieAnimcitromfuves.playSegments([Math.round(30/42*maxFrame), Math.round(26/42*maxFrame)], false);
          slideLottieAnimcitromfuves.setSpeed(5);
          slideLottieAnimcitromfuves.playSegments([Math.round(25/42*maxFrame), Math.round(21/42*maxFrame)], false);
          slideLottieAnimcitromfuves.setSpeed(5.5);
          slideLottieAnimcitromfuves.playSegments([Math.round(20/42*maxFrame), Math.round(11/42*maxFrame)], false);
          slideLottieAnimcitromfuves.setSpeed(5);
          slideLottieAnimcitromfuves.playSegments([Math.round(10/42*maxFrame), 1], false);
          slideLottieAnimcitromfuves.setSpeed(3.5)
          break;
        case "koromviragos":
          slideLottieAnimkoromviragos.playSegments([Math.floor(42/42*maxFrame), Math.round(31/42*maxFrame)], false);
          slideLottieAnimkoromviragos.setSpeed(3.5);
          slideLottieAnimkoromviragos.playSegments([Math.round(30/42*maxFrame), Math.round(26/42*maxFrame)], false);
          slideLottieAnimkoromviragos.setSpeed(5);
          slideLottieAnimkoromviragos.playSegments([Math.round(25/42*maxFrame), Math.round(21/42*maxFrame)], false);
          slideLottieAnimkoromviragos.setSpeed(5.5);
          slideLottieAnimkoromviragos.playSegments([Math.round(20/42*maxFrame), Math.round(11/42*maxFrame)], false);
          slideLottieAnimkoromviragos.setSpeed(5);
          slideLottieAnimkoromviragos.playSegments([Math.round(10/42*maxFrame), 1], false);
          slideLottieAnimkoromviragos.setSpeed(3.5)
          break;
        case "":
          slideLottieAnim.playSegments([Math.floor(42/42*maxFrame), Math.round(31/42*maxFrame)], false);
          slideLottieAnim.setSpeed(3.5);
          slideLottieAnim.playSegments([Math.round(30/42*maxFrame), Math.round(26/42*maxFrame)], false);
          slideLottieAnim.setSpeed(5);
          slideLottieAnim.playSegments([Math.round(25/42*maxFrame), Math.round(21/42*maxFrame)], false);
          slideLottieAnim.setSpeed(5.5);
          slideLottieAnim.playSegments([Math.round(20/42*maxFrame), Math.round(11/42*maxFrame)], false);
          slideLottieAnim.setSpeed(5);
          slideLottieAnim.playSegments([Math.round(10/42*maxFrame), 1], false);
          slideLottieAnim.setSpeed(3.5)
          break;
        case "":
          break; 
        case "":
          break;
        case "":
          break;
      }
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
    }, 1200);
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
    }, 4300);
  };

//Termékoldal legörgetés nyilkattintásra
  function scrollDown() {
    window.scrollBy({
      top: 1*vh,
      left: 0,
      behavior: 'smooth'
    });
    document.getElementById("Scroll-icon-container").setAttribute("onclick", "scrollUp()");
    document.getElementById("Scroll-icon-container-2").setAttribute("onclick", "scrollUp()")
  };
  function scrollUp() {
    window.scrollBy({
      top: -1*vh,
      left: 0,
      behavior: 'smooth'
    });
    document.getElementById("Scroll-icon-container").setAttribute("onclick", "scrollDown()");
    document.getElementById("Scroll-icon-container-2").setAttribute("onclick", "scrollDown()")
  };

//Oldallapozáshoz -----------------------------------------------------------------------------------
  //Egérhúzásra előtöltés és attribútumok hozzáadása
    var rightArrow = document.getElementById("right-arrow");
    var leftArrow = document.getElementById("left-arrow");
    rightArrow.setAttribute("onclick", "nextProduct()");
    leftArrow.setAttribute("onclick", "previousProduct()");
    var productLinks = document.getElementsByClassName("product-link-home");
    var i;
    for (i = 0; i < productLinks.length; i++) {
        productLinks[0].style.setProperty("pointer-events", "none");
        productLinks[i].setAttribute("onclick", "productDescriptionIcon(this)");
        productLinks[i].setAttribute("animType", "hover");
        productLinks[i].addEventListener("mouseenter", function( event ) {
            var animType = event.target.getAttribute("animType");
            var soapName = event.target.getAttribute("productName");
            console.log(soapName, animType);
            var whichLottieObj = window.soapLotties;
            console.log(whichLottieObj);
            var jsonType = animType+"JSON";
            console.log("jsonType= "+jsonType);
            var json = whichLottieObj.find(el => el.name === soapName)[jsonType];
            console.log(json);
            if (json == null) {
                console.log("json egyenlő null-lal");
                json = "load...";
                console.log(json);
                //lottiePreDownload(soapName, animType);
                setTimeout(function(){ lottiePreDownload(soapName, "hover") }, 1);
                setTimeout(function(){ lottiePreDownload(soapName, "slide") }, 2000);
                console.log("lottiePreDownload "+soapName, animType);
            } else {
                console.log("nem tölti újra le a "+soapName, animType);
            }    
        })   
    };

  //Kattintásra
      function productDescriptionIcon(clickedElement) {
        var animType = clickedElement.getAttribute("animType");
        var soapName = clickedElement.getAttribute("productName");
        var forHeader = clickedElement.getAttribute("forHeader");
        lottieLoader(soapName, animType);
        setTimeout(function(){
            if (animType == "hover") {
              lottieLoader(soapName, "slide");
              console.log("szappan csere slide dobozban is")
            } else {
              lottieLoader(soapName, "hover");
              console.log("szappan csere hover dobozban is")              
            };
        }, 3000);
        if (animType == "slide") {
          if (soapName == "citromfuves") {
            slideLottieAnim.playSegments([41, 42], true);
          } else {
            slideLottieAnim.playSegments([32, 33], true);
          }
          console.log("productDescriptionIconslide 1. log ", soapName, animType)
        };
        for (i = 0; i < productLinks.length; i++) {
          productLinks[i].style.setProperty("pointer-events", "none");
          productLinks[i].children[0].setAttribute("class", "page-icon-home color")
        };
        clickedElement.children[0].setAttribute("class", "page-icon-home color current");
        var backText = document.getElementById("Soap-header");
        backText.innerHTML = forHeader;
        backText.setAttribute("productName", "soapName")
        for (i = 0; i < productLinks.length; i++) {
          productLinks[i].style.setProperty("pointer-events", "auto")
        };
        clickedElement.style.setProperty("pointer-events", "none");
        document.getElementById("quantity").value = 1
      };

  //Következő termék nyil kattintás
      function nextProduct() {
        rightArrow.style.setProperty("pointer-events", "none");
        var number = document.getElementById(currentPageName).getAttribute("number");
        var container = document.getElementById("Page-icon-container");
        number++;
        number++;
        if (number < 11) {
          container.children[number].click()
        } else {
          container.children[0].click()
        };
        setTimeout(function(){ rightArrow.style.setProperty("pointer-events", "auto") }, 500)
      };

   //Előző termék nyil kattintás
      function previousProduct() {
        leftArrow.style.setProperty("pointer-events", "none");
        var number = document.getElementById(currentPageName).getAttribute("number");
        var container = document.getElementById("Page-icon-container-HOME");           //csak itt van különbség
        number--;
        number--;
        if (number > -1) {
          container.children[number].click()
        } else {
          container.children[10].click()
        };
        setTimeout(function(){ leftArrow.style.setProperty("pointer-events", "auto") }, 500)
      };   

  //Betöltődött a következő termék figyelő 
    var currentPageName;
    function nextProductPageLoadedChecker () {
      if (currentPageName == null) {
        currentPageName = "citromfuves"
      };
      if (document.getElementById("product-params") !== null) {
        if (currentPageName !== document.getElementById("product-params").getAttribute("data-item-id") ) {
          document.getElementById("product-description-texts-home").innerHTML = document.getElementById("product-description-texts").innerHTML;
          document.getElementById("when-to-use-home").innerHTML = document.getElementById("when-to-use").innerHTML;
          document.getElementById("how-to-use-home").innerHTML = document.getElementById("how-to-use").innerHTML;
          document.getElementById("ingredients-home").innerHTML = document.getElementById("ingredients").innerHTML;                                   
          currentPageName = document.getElementById("product-params").getAttribute("data-item-id")
        }
      };
      setTimeout(nextProductPageLoadedChecker, 100)
    };
    nextProductPageLoadedChecker(); 


