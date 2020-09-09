//Főoldal linkje v2
    const mainPageLink = "https://www.bodyhoney.com";
//Oldal szélesség és magasság
  	const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth  || 0);
//Lottie url-ek
var mainLotties = {
    	rotateURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5ef8a85732df4658888cbf20_Forg%C3%A1s%20loop%20vaj%20h%C3%A1tt%C3%A9r%20(Bodymovin%2070%25).json",
      	rotateJSON: null,
      	scrollURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5ef8a85732df465aef8cbf21_G%C3%B6rget%C3%A9sre%20p%C3%B6rg%C3%A9s%20(Bodymovin%2070%25).json",
      	scrollJSON: null
    };
var soapLotties = [{
        name: "citromfuves",
        hoverURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5ef8cb93ad13582abc0dc2e7_Citromf%C3%BCves%20balra%20befordul%C3%A1s%2050F%20(70%25).json",
     	hoverJSON: null,
     	slideURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5ef8cb93ad1358715e0dc2e5_Citromf%C3%BCves%20jobbra%20cs%C3%BAsz%C3%A1s%2050F%20(80%25).json",
     	slideJSON: null
   	  }, {
        name: "koromviragos",
        hoverURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f24167d505feafd996f5529_K%C3%B6r%C3%B6mvir%C3%A1gos%20balra%20befordul%C3%A1s%2050F%20(70%25)%20(vil%C3%A1gosabb%20v2).json",
        hoverJSON: null,
        slideURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f2408488b28252bcd1cd6ff_K%C3%B6r%C3%B6mvir%C3%A1gos%20jobbra%20cs%C3%BAsz%C3%A1s%2041F%20(80%25)%20(vil%C3%A1gosabb).json",
        slideJSON: null
      }, {
        name: "kakaovajas",
        hoverURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f2402299098ceb17a7fe271_Kaka%C3%B3vajas%20balra%20befordul%C3%A1s%2050F%20(70%25)%20(vil%C3%A1gosabb).json",
        hoverJSON: null,
        slideURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f240099f1651d354df42de0_Kaka%C3%B3vajas%20jobbra%20cs%C3%BAsz%C3%A1s%2041F%20(80%25)%20(vil%C3%A1gosabb).json",
        slideJSON: null
      }, {
        name: "himalajai-sos",
        hoverURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f242298ec55e8ed24da18f7_Himal%C3%A1jai%20s%C3%B3s%20balra%20befordul%C3%A1s%2050F%20(70%25).json",
        hoverJSON: null,
        slideURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f24228f3d52ec3016ced101_Himal%C3%A1jai%20s%C3%B3s%20jobbra%20cs%C3%BAsz%C3%A1s%2041F%20(80%25).json",
        slideJSON: null
      },{
        name: "levendulas",
        hoverURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f242cc5649c48e84f452503_Levendul%C3%A1s%20balra%20befordul%C3%A1s%2050F%20(70%25).json",
        hoverJSON: null,
        slideURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f242cbc649c4830e245249c_Levendul%C3%A1s%20jobbra%20cs%C3%BAsz%C3%A1s%2041F%20(80%25).json",
        slideJSON: null
      },{
        name: "kamillas",
        hoverURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f243491b1577e21c46b66c1_Kamill%C3%A1s%20balra%20befordul%C3%A1s%2050F%20(70%25).json",
        hoverJSON: null,
        slideURL: "https://uploads-ssl.webflow.com/5ef8a157cc549864e98718cc/5f243486549ce7d9c943e25c_Kamill%C3%A1s%20jobbra%20cs%C3%BAsz%C3%A1s%2041F%20(80%25).json",
        slideJSON: null
}];

//Snipcart eseménylog
document.addEventListener('snipcart.ready', function() {
    //console.log("snipcart ready");

    //Subscribing to different events
    /*Snipcart.events.on('cart.created', (cartState) => {
        console.log("cart created event triggered");
        console.log(cartState);
    });
    */

    Snipcart.events.on('item.added',  (cartItem) => {
        console.log("item added event triggered");
        itemAdded(cartItem);
    });

    Snipcart.events.on('item.removed', (cartItem) =>  {
        console.log("item removed event triggered");    
        itemRemoved(cartItem);
    });

    Snipcart.events.on('item.updated', (cartItem) => {
        console.log("item updated event triggered");
        itemUpdated(cartItem);
    });

    Snipcart.events.on('theme.routechanged', (routesChange) => {
        if (routesChange.from === "/cart" && routesChange.to === "/checkout") {
            console.log('tovább a fizetéshez gomb lekattintva');
            goToCheckout();
        };      
        /*
        if (routesChange.from === "/" && routesChange.to !== "/") {
            console.log('cart opened');
            cartOpened();
        };
        if (routesChange.from !== "/" && routesChange.to === "/") {
            console.log('cart closed');
            cartClosed();
        }
        */
    })
    Snipcart.events.on('shipping.selected', (shippingMethod) => {
       console.log("shipping selected event triggered");
       console.log(shippingMethod)
       shippingSelected(shippingMethod);
    });

    Snipcart.events.on('cart.confirmed',  (cartConfirmResponse) => {
        console.log("cart confirmed event triggered");
        orderCompleted(cartConfirmResponse);
    });
    /*
    Snipcart.events.on('cart.confirm.error', (confirmError) => {
        console.log("cart confirm error event triggered");
        cartConfirmError(confirmError);
    });

    Snipcart.events.on('summary.checkout_clicked', () => {
        console.log("summary checkout event triggered");
        cartOpened();
    });

    Snipcart.events.on('page.change', function(page) {
        pageChanged(page);
    });
    */
});
/*
function cartCreated(cartState){
    console.log("cartCreated function");
    dataLayer.push({
        event: 'snipcartEvent',
        eventCategory: 'Kosár létrehozva',
        eventAction: 'Kosár létrehozva',
        eventLabel: cartState.name,
        eventValue: cartState.price,
        ecommerce: {
            currencyCode: window.currency,
            add: {
               products: createProductsFromItems([cartState])
            }
        }
    });
};
*/
function itemAdded(cartItem){
    console.log("item added function");
    dataLayer.push({
        event: 'snipcartEvent',
        eventCategory: 'Kosár frissítve',
        eventAction: 'Termék hozzáadva a kosárhoz',
        eventLabel: cartItem.name,
        eventValue: cartItem.price,
        ecommerce: {
            currencyCode: window.currency,
            add: {
               products: createProductsFromItems([cartItem])
            }
        }
    });
};

function itemRemoved(cartItem){
    console.log("item removed function");
    dataLayer.push({
        event: 'snipcartEvent',
        eventCategory: 'Kosár frissítve',
        eventAction: 'Termék eltávolítva a kosárból',
        eventLabel: cartItem.name,
        eventValue: cartItem.price,
        ecommerce: {
            currencyCode: window.currency,
            remove: {
                products: createProductsFromItems([cartItem])
            }
        }
    });
};

function itemUpdated(cartItem){
    console.log("item updated function");
    dataLayer.push({
        event: 'snipcartEvent',
        eventCategory: 'Kosár frissítve',
        eventAction: 'Termék frissítve',
        eventLabel: cartItem.name,
        eventValue: cartItem.price,
        ecommerce: {
            currencyCode: window.currency,
            remove: {
                products: createProductsFromItems([cartItem])
            }
        }
    });
};

function goToCheckout(){
    console.log("goToCheckout function");
    dataLayer.push({
        event: 'snipcartEvent',
        eventCategory: 'Checkout',
        eventAction: 'Tovább az adatmegadáshoz',
        ecommerce: {
            cartopen: {
                //products: createProductsFromItems(Snipcart.api.items.all())
            }
        }
    });
};

function shippingSelected(shippingMethod){
    console.log("shipping selected function");
    dataLayer.push({
        event: 'snipcartEvent',
        eventCategory: 'Checkout',
        eventAction: 'Szállítás kiválasztva',
        eventLabel: shippingMethod.method,
        eventValue: shippingMethod.cost,
        ecommerce: {
            currencyCode: window.currency,
            remove: {
                //products: createProductsFromItems([cartItem])
            }
        }
    });
};

function orderCompleted(order){
    console.log("cart confirmed function");
    console.log(order);
    /*console.log("order.currency = "+order.currency);
    console.log("order.total = "+order.total);
    console.log("order.taxes.items[0].amount = "+order.taxes.items[0].amount);
    console.log("order.shippingDetails.cost = "+order.shippingDetails.cost);
    console.log("order.invoiceNumber = "+order.invoiceNumber);
    console.log("order.user.id = "+order.user.id);    
    console.log(order.items);
    console.log(order.items.items);*/
    dataLayer.push({
        event: 'snipcartEvent',
        eventCategory: 'Order Completed',
        eventAction: 'Rendelés leadva',
        eventLabel: order.paymentDetails.display,
        eventValue: order.total,
        ecommerce: {
            currencyCode: order.currency,
            purchase: {
                actionField: {
                    id: order.token,
                    affiliation: 'Website',
                    revenue: order.total,
                    tax: order.taxes.items[0].amount,
                    shipping: order.shippingDetails.cost,
                    invoiceNumber: order.invoiceNumber
                },
                products: createProductsFromItems(order.items.items),
                //userId: order.user.id
            }
        }
    });
};
/*
function cartConfirmError(confirmError){
    console.log("cart confirm error function");
    console.log(confirmError)
    dataLayer.push({
        event: 'snipcartEvent',
        eventCategory: 'Rendelés',
        eventAction: 'Rendelés jóváhagyási hiba',
        ecommerce: {
            currencyCode: order.currency,
            purchase: {
                actionField: {
                    id: order.token,
                    affiliation: 'Website',
                    revenue: order.total,
                    tax: order.taxesTotal,
                    shipping: order.shippingInformation.fees,
                    invoiceNumber: order.invoiceNumber
                },
                products: createProductsFromItems(order.items),
                userId: order.user.id
            }
        }
    });
};
*/
/*
function cartOpened(){
    console.log("cartOpened function");
    dataLayer.push({
        event: 'snipcartEvent',
        eventCategory: 'Kosár megnyitása',
        eventAction: 'Kosár megnyitása',
        ecommerce: {
            cartopen: {
                //products: createProductsFromItems(Snipcart.api.items.all())
            }
        }
    });
};

function cartClosed(){
    console.log("cartClosed function");
    dataLayer.push({
        event: 'snipcartEvent',
        eventCategory: 'Cart Action',
        eventAction: 'Cart Closed',
        ecommerce: {
            cartclose: {
                //products: createProductsFromItems(Snipcart.api.items.all())
            }
        }
    });
};

function pageChanged(page){
    dataLayer.push({
        event: 'snipcartEvent',
        eventCategory: 'Page Change',
        eventAction: page,
        ecommerce: {
            checkout: {
                products: createProductsFromItems(Snipcart.api.items.all())
            }
        }
    });
};
*/
function createProductsFromItems (items) {
    return items.map(function (item) {
        console.log("name: "+item.name+", category: "+item.categories[0]+", description: "+item.description+", id: "+item.id+", price: "+item.price+", quantity: "+item.quantity)
        return {
            name: item.name,
            category: item.categories[0],
            description: item.description,
            id: item.id,
            price: item.price,
            quantity: item.quantity
        };
    });
}