 //Oldallapozáshoz
    window.szappan = document.getElementById("product-params").getAttribute("page-name")
  //  console.log(szappan);
    var currentIcon =  document.getElementById(szappan)
  //  console.log(currentIcon);
    var i;
    for (i = 0; i < productLinks.length; i++) {
        productLinks[i].style.setProperty("pointer-events", "none");
        productLinks[i].setAttribute("onclick", "doubleClick(this)");
        productLinks[i].children[0].setAttribute("class", "page-icon color")
    };
    currentIcon.children[0].setAttribute("class", "page-icon color current");
    for (i = 0; i < productLinks.length; i++) {
          productLinks[i].style.setProperty("pointer-events", "auto")
    };
    currentIcon.style.setProperty("pointer-events", "none");

  //Következő termék nyil kattintás
      function nextProduct() {
        //nextProductArrow.style.setProperty("pointer-events", "none");
        var number = document.getElementById(szappan).getAttribute("number");
        var container = document.getElementById("Page-icon-container");
        number++;
        number++;
        if (number < 11) {
          container.children[number].click();
          container.children[number].click();
        } else {
          container.children[0].click();
          container.children[0].click()
        };
    //    setTimeout(function(){ nextProductArrow.style.setProperty("pointer-events", "auto") }, 500)
      };

   //Előző termék nyil kattintás
      function previousProduct() {
       // previousProductArrow.style.setProperty("pointer-events", "none");
        var number = document.getElementById(szappan).getAttribute("number");
        var container = document.getElementById("Page-icon-container");           //csak itt van különbség
        number--;
        number--;
        if (number > -1) {
          container.children[number].click();
          container.children[number].click()
        } else {
          container.children[10].click();
          container.children[10].click()
        };
    //    setTimeout(function(){ previousProductArrow.style.setProperty("pointer-events", "auto") }, 500)
      }; 

   /* var currentPageName;
    function nextProductPageLoadedChecker () {
      if (currentPageName == null) {
        currentPageName = "citromfuves"
      };
      if (document.getElementById("product-params") !== null) {
        if (currentPageName !== document.getElementById("product-params").getAttribute("page-name") ) {                               
          currentPageName = document.getElementById("product-params").getAttribute("page-name")
        }
      };
      setTimeout(nextProductPageLoadedChecker, 100)
    };
    nextProductPageLoadedChecker(); */