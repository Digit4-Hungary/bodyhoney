 // Snipcart szövegezések testreszabása
var nyelv = document.getElementsByTagName('html')[0].getAttribute('lang');
if (nyelv == "hu"){
  document.addEventListener('snipcart.ready', function() {
    Snipcart.api.session.setLanguage('hu', {
        actions: {
          show: "MUTASD"
        },
        address_form: {
            address2: "Emelet/Ajtó"
        },
        cart: {
            secured_by: "",
            shipping_taxes_calculated_at_checkout: "A szállítási díjat a pénztárnál adjuk hozzá.",
            invoice_number: "Rendelés azonosító"
        },
        cart_summary: {
            total: "Fizetendő"
        },
        checkout: {
            shipping_taxes_calculated_when_address_provided: "A szállítási díjat a pénztárnál adjuk hozzá."
        },
        confirmation: {
            thank_you_for_your_order: "Köszönjük a megrendelést!"
        },
        errors: {
            customer_not_found: "A megadott email címmel nem található felhasználó."
        },
        forgot_password_form: {
            title: "Jelszóvisszaállítás",
            instructions: "Add meg a regisztrált email címedet és küldünk egy jelszó visszaállítási linket",
            email_instructions: "Az email-t elküldtük. Jelszó visszaállításhoz kattints a benne lévő linkre!",
            action: "EMAIL KÜLDÉSE"
        },
        reset_password_form: {
            title: "Jelszóvisszaállítás",
            password: "Új jelszó",
            confirmation_password: "Új jelszó még egyszer",
            action: "ÚJ JELSZÓ BEÁLLÍTÁSA",
        },
        item: {
            quantity_short: "db "
        },
        payment: {
            checkout_with: "",
            form: {
              deferred_payment_title: "Fizetés utánvéttel",
              deferred_payment_instructions: "A megrendelés elküldésével vállalom, hogy az áru ellenértékét átvételkor fizetem meg."
            },
            methods: {
              deferred_payment: "Fizetés utánvéttel"  
            },
            processing_payment: "Átirányítás a fizetési oldalra. Türelem, ez eltarthat pár másodpercig is..."                 
        }
    });
});
} else if (nyelv == "sk"){
  document.addEventListener('snipcart.ready', function() {
    Snipcart.api.session.setLanguage('sk', {
        payment:{
            checkout_with: "",
            form: {
              deferred_payment_title: "Platba na dobierku",
              deferred_payment_instructions: "Odoslaním objednávky sa zaväzujem zaplatiť za tovar pri prijatí."
            },
            methods: {
              deferred_payment: "Platba na dobierku"  
            }   
        }
    });
});
};
//Navbár kosár ikonhoz regisztrációsFix hozzásadása
var cartIcon = document.getElementsByClassName("cart-icon snipcart-checkout")[0];
cartIcon.setAttribute("onclick", "signInButtonOnclick()");
function signInButtonOnclick() {
    setTimeout(function(){ 
        var signInButton = document.getElementsByClassName("snipcart-cart-header__option snipcart-cart-header__sign-in")[0];
        signInButton.setAttribute("onclick", "registerButtonFix()");
       // console.log("signInButtonOnclick() ok")
    }, 500)
};
function registerButtonFix() {
    setTimeout(function(){ 
        var registerButton = document.getElementsByClassName("snipcart__font--black snipcart-signin__register-link")[0];
        registerButton.setAttribute("href", "#/checkout/register");
        registerButton.setAttribute("onclick", "signInButtonOnclick2()");
        var forgotPassBtn = document.getElementsByClassName("snipcart-signin__forgot-password snipcart__font--black")[0];
        forgotPassBtn.setAttribute("href", "#/cart/forgot-password");
       // console.log("registerButtonFix() ok")
    }, 500)
};
function signInButtonOnclick2() {
    setTimeout(function(){ 
        var signInButton = document.getElementsByClassName("snipcart__font--black snipcart-register__register-link")[0];
        signInButton.setAttribute("href", "#/cart/signin");
        signInButton.setAttribute("onclick", "registerButtonFix()");
       // console.log("signInButtonOnclick2() ok")
    }, 500)
};
//Navbar Termékek gomb javítás
var navbarProductLink = document.getElementById("navbar-product-link");
navbarProductLink.setAttribute("onclick", "doubleClick(this)");

function doubleClick(clickedElement) {
    clickedElement.click()
};

//Oldallapozáshoz attribútumok hozzáadása
    var nextProductArrow = document.getElementById("next-product");
    var previousProductArrow = document.getElementById("previous-product");
    nextProductArrow.setAttribute("onclick", "nextProduct()");
    previousProductArrow.setAttribute("onclick", "previousProduct()");
    var productLinks = document.getElementsByClassName("product-link");

// Kosár deviza változtatásához
  function changeCurrency(val) {
    document.getElementById("snipcart").setAttribute("data-currency", val);
    Snipcart.api.session.setCurrency(val);
  }

// Kosárba rakandó mennyiség állításához
  function getQuantity() {
  	var db = document.getElementById("quantity");
    document.getElementById("product-params").setAttribute("data-item-quantity", db.value);
    setTimeout(function() { 
      db.value = 1;
      signInButtonOnclick() 
    }, 1000)
  };
  function downQuantity() {
    var db = document.getElementById("quantity").value;
    if (db > 1){
      db == db--;
      document.getElementById("quantity").value = db;
      document.getElementById("product-params").setAttribute("data-item-quantity", db)
    }  
  };

  function upQuantity() {
    var db = document.getElementById("quantity").value;
    db == db++;
    document.getElementById("quantity").value = db;
    document.getElementById("product-params").setAttribute("data-item-quantity", db)
  };

  function changeQuantity(val) {
    if (val < 1) {
      document.getElementById("quantity").value = 1;
      document.getElementById("product-params").setAttribute("data-item-quantity", 1);
    } else {
      document.getElementById("product-params").setAttribute("data-item-quantity", val)
    }
  };

// Kosárba rakandó mennyiség állításához
	//Mennyiség szövegmező cseréje számra + attribútumok hozzáadása
		var quantity = document.getElementById("quantity"), parent = quantity.parentNode,
      	tempDiv = document.createElement("div");
 		tempDiv.innerHTML = "<input type='number' id='quantity' class='quantity' min='1' value='1' oninput='changeQuantity(this.value)' />"
  		var input = tempDiv.childNodes[0];
  		parent.replaceChild(input, quantity);
      //quantity.style.setProperty("fontSize", "2em");


	//Automata attribútum hozzáadás a plusz-minusz gombokhoz
		document.getElementById("plusminus-symbol-minus").setAttribute("onclick", "downQuantity()");
		document.getElementById("plusminus-symbol-plus").setAttribute("onclick", "upQuantity()")


// wrapper attributum hozzáadása a body-hoz (Barba js miatt)
	document.getElementsByTagName("BODY")[0].setAttribute("data-barba", "wrapper");

//Deviza hozzáadása a Body-hoz attribútumként
  document.getElementsByTagName("body")[0].setAttribute("currency", "HUF");
  var currency = document.getElementsByTagName("body")[0].getAttribute("currency");


// Home eröltetett újratöltéséhez (Barba js miatt)
	document.getElementById("brand-logo-link").setAttribute("onclick", "forceGoHome()");

	function forceGoHome() {
    	location.assign(mainPageLink);
      setTimeout(function(){ location.assign(mainPageLink) }, 100)
    }

//Termékoldal legörgetés nyilkattintásra
  var rightArrow = document.getElementById("right-arrow");
  rightArrow.setAttribute("onclick", "scrollDown()");

  function scrollDown() {
    window.scrollBy({
      top: 1*vh,
      left: 0,
      behavior: 'smooth'
    });
    document.getElementById("right-arrow").setAttribute("onclick", "scrollUp()");
  };
  function scrollUp() {
    window.scrollBy({
      top: -1*vh,
      left: 0,
      behavior: 'smooth'
    });
    document.getElementById("right-arrow").setAttribute("onclick", "scrollDown()");
  };

// Barba js paraméterezés
   barba.init({
       timeout: 100000,
       transitions: [{
            name: 'no-transition',
            //sync: true,
            leave(data) {
                 /*return gsap.to(data.current.container, {
                      opacity: 0
                  });*/
            },
            enter(data) {
                 /*return gsap.from(data.next.container, {
                      opacity: 1
                      //x: "+=100",
                      //duration: 5
                      //ease: "expo"
                  });*/
            },
         }],
      views: [{
        namespace: 'home',
        afterEnter(data) {
          //var szamlalo3 =1
          var productLinks = document.getElementsByClassName("product-link");
          var clickedElement = productLinks[0];
          //console.log(clickedElement);
          var animType = clickedElement.getAttribute("animType");
          var soapName = clickedElement.getAttribute("productName");
          window.szappan = soapName;
          var forHeader = clickedElement.getAttribute("forHeader");
          for (i = 0; i < productLinks.length; i++) {
            productLinks[i].style.setProperty("pointer-events", "none");
            productLinks[i].children[0].setAttribute("class", "page-icon color")
          };
          clickedElement.children[0].setAttribute("class", "page-icon color current");
          var backText = document.getElementById("Soap-header");
          backText.innerHTML = forHeader;
          backText.setAttribute("productName", soapName);
          for (i = 0; i < productLinks.length; i++) {
            productLinks[i].style.setProperty("pointer-events", "auto")
          };
          clickedElement.style.setProperty("pointer-events", "none");
          document.getElementById("quantity").value = 1;
          if (window.soapLotties.find(el => el.name === "citromfuves").hoverJSON != null) {
            lottieLoader(soapName, "hover");
          };
          var spinUpTrigger = document.getElementById("Spin-up-Lottie-trigger");
          //var opacityCheckerFirst = setInterval(getOpacityHome, 200);
          function getOpacityHome() {
              var opac = spinUpTrigger.style.opacity;
              if (opac < 0.1) {
              //  clearInterval(opacityCheckerFirst);
                barba.go("/soaps/citromfuves-mezes-kecsketejes-szappan");
                //console.log("barba.go ok")     
              } else {
                  //console.log("barba.go kivárás") 
                  setTimeout(function(){ getOpacityHome() }, 200)
              }
             //szamlalo3++;
             //console.log("szamlalo3= "+szamlalo3)
             //alert("home ok")
           };
           getOpacityHome()
         },
         beforeLeave(data) {
         	//console.log(document.getElementById("product-description-texts"))
           	//var tryNumber = 0;
           function firstProductPageLoadedChecker () {
             if (document.getElementById("product-description-texts") != null) {
               document.getElementById("product-description-texts-home").innerHTML = document.getElementById("product-description-texts").innerHTML;
               document.getElementById("when-to-use-home").innerHTML = document.getElementById("when-to-use").innerHTML;
               document.getElementById("how-to-use-home").innerHTML = document.getElementById("how-to-use").innerHTML;
               document.getElementById("ingredients-home").innerHTML = document.getElementById("ingredients").innerHTML               
             } else {             	
                  setTimeout(firstProductPageLoadedChecker, 100);
                  /*tryNumber++;
                  console.log(tryNumber)*/
             }
           };
           firstProductPageLoadedChecker()
         }
       }, {     
        namespace: 'soaps',
        beforeEnter(data) {
           document.getElementById("when-to-use-home").setAttribute("class", "when-to-use-description w-richtext");
           document.getElementById("how-to-use-home").setAttribute("class", "when-to-use-description w-richtext");
           document.getElementById("ingredients-home").setAttribute("class", "when-to-use-description w-richtext")           
         },
        afterEnter(data) {
          var szamlalo2 = 1;
          //setTimeout(function(){ }, 1000)
          //document.getElementById("product-description-texts-home").innerHTML = document.getElementById("product-description-texts").innerHTML;              
          document.getElementById("second-section").style.opacity = 0;
          document.getElementById("third-section").style.opacity = 0;
         /*   var scrollIcon1 = document.getElementById("Scroll-icon-container");
            scrollIcon1.setAttribute("onclick", "scrollDown()");
            scrollIcon1.style.setProperty("display", "block");
            var scrollIcon2 = document.getElementById("Scroll-icon-container-2")
            scrollIcon2.setAttribute("onclick", "scrollDown()");
            scrollIcon2.style.setProperty("display", "block"); */
          if (szamlalo2 = 1) {
            var opacityCheckerInterval = setInterval(getOpacityChecker, 200);
          };
          /*var pageNameInterval = setInterval(pageNameChecker, 200); 
          function pageNameChecker() {     		
            var productParams = document.getElementById("product-params");          	
            if (productParams != null) {
              var pageName = productParams.getAttribute("data-item-id");
              if (pageName != "citromfuves") {
                 //alert("másik szappan oldal");
                var spinUpTrigger = document.getElementById("Spin-up-Lottie-trigger");
    	        if (spinUpTrigger != null) {
                 	//spinUpTrigger.remove()
                 };
                 //document.getElementById("first-slide-lottie-trigger").style.top = "0px";
                 //document.getElementById("first-slide-lottie-trigger").style.position = "fixed";
                 //clearInterval(pageNameInterval);
                 //clearInterval(opacityCheckerInterval)
               }else {
                 //alert("citromfüves oldal")
                 document.getElementById("Spin-up-Lottie-trigger").style.position = "absolute"
               }
             }else {
               //alert("stop");             
               clearInterval(pageNameInterval)
             }
           };*/
           function getOpacityChecker() {
             var element = document.getElementById("Spin-up-Lottie-trigger");
             if (element != null) {
               var elementOpacity = element.style.opacity
               if (elementOpacity > 0.1) {
                 clearInterval(opacityCheckerInterval);
                 barba.go("/")
               };
               szamlalo2++;
              //console.log("szamlalo2= "+szamlalo2+"opac= "+elementOpacity)
             }  
           }     
         },
         beforeLeave(data) {
         	document.getElementById("Scroll-icon-container").style.setProperty("display", "none");
 		   	   document.getElementById("Scroll-icon-container-2").style.setProperty("display", "none")
         }
       }]
   })