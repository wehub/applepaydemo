// for nested objects, returns nested value, otherwise if object or any keys are undefined, returns undefined
// keys is an array of string keys
// currIdx used for recursive calls
const chained = (obj, keys, currIdx = 0) => {
    const curVal = obj && obj[keys[currIdx]];
    if (typeof curVal === "object"){
        return chained(curVal, keys, currIdx + 1);
    }
    if(currIdx === keys.length - 1){
        return curVal;
    }
    return undefined;
}

const apple_pay_configs = {
    button_configs: {
        accountId: "56221a85-2386-4e26-b470-a10b560fb969",
        locale: "fr",
        merchantDisplayName: 'WePay',
        paymentRequest: {
            countryCode: "US",
            currencyCode: "USD",
            merchantCapabilities: [
                "supports3DS",
                "supportsDebit",
                "supportsCredit"
            ],
            shippingMethods: [
                {
                    label: "Standard Shipping",
                    detail: "Arrives in 5-7 days",
                    identifier: "standard",
                    amount: "0.00"
                },
                {
                    label: "Express Shipping",
                    detail: "Arrives in 2-3 days",
                    identifier: "express",
                    amount: "15.99"
                },
                {
                    label: "Next Day Shipping",
                    detail: "Arrives in 1 day",
                    identifier: "nextDay",
                    amount: "399.99"
                }
            ],
            shippingType: "shipping",
            supportedNetworks: [
                "visa",
                "masterCard",
                "amex",
                "discover"
            ],
            requiredBillingContactFields: [
                "postalAddress",
                "name",
            ],
            requiredShippingContactFields: [
                "postalAddress",
                "name",
                "phone",
                "email"
            ],
            lineItems: [
                { label: '20x Primo Mop', amount: '300.00' },
                { label: "Tax", amount: '0' },
            ],
            total: {
                label: "Total",
                amount: "300.00"
            },
            supportsCouponCode: true,
        }
    },
    on_success: function (data) {
        console.log(data);
        document.getElementById('token').innerHTML = `<pre>${data.applePayToken}</pre>`;
    },
    on_error: function (error) {
        document.getElementById('token').innerHTML = `<pre>${error}</pre>`;
    },
    on_update_payment_data: function (intermediatePaymentData) {
        console.log("on_update_payment_data");
        return getNewPaymentMethodData(intermediatePaymentData);
    }
};

const SHIPPING_METHODS = [
    {
        label: "Standard Shipping",
        detail: "Arrives in 5-7 days",
        identifier: "standard"
    },
    {
        label: "Express Shipping",
        detail: "Arrives in 2-3 days",
        identifier: "express"
    },
    {
        label: "Next Day Shipping",
        detail: "Arrives in 1 day",
        identifier: "nextDay"
    }
]

const SHIPPING_COSTS = {
    CA: {
        standard: 12.99,
        express: 29.99,
        nextDay: 1199.99,
    },
    US: {
        standard: 0,
        express: 15.99,
        nextDay: 399.99,
    }
};

const CARD_FEES = {
    Amex: 2.99
};

const COUPON_CODES = {
    SPRING25: {
        label: "25% Off Order",
        value: .25,
    },
    BIGSPENDER: {
        label: "10% Off Orders of $100 or more",
        value: .1,
    }
};



const TAX_RATES = {
    CA: .12,
    US: .0925,
};

// input: intermediatePaymentData: { 
//     (each of these keys be undefined)
//         shippingContact: {
//             countryCode: "CA"
//             ...
//         },
//         paymentMethod {
//             type: "credit"
//         },
//         couponCode: "20PERCENTOF",
//         shippingMethod: {
//             identifier: "express"
//             ...
//         }
//     }

// updatedPaymentData is the updated state of the PaymentRequest data that takes into account other updates that have already been made
const getNewPaymentMethodData = (intermediatePaymentData) => {
    const { shippingContact, paymentMethod, shippingMethod, couponCode, updatedPaymentData} = intermediatePaymentData;

    const countryUpdate =  chained(shippingContact, ["countryCode"]);
    const shippingIdentifierUpdate = chained(shippingMethod, ["identifier"]);

    const getDiscount = (base, couponCode) => {
        if(couponCode){
            // could be valid or invalid
            const offerAmount = chained(COUPON_CODES, [couponCode, "value"]) || 0;
            return base * offerAmount;
        } else {
            // could have previous couponCode
            return -1 * getPreviousLineItemAmount("Discount");
        }
    }

    const getShippingCost = () => {
        if(countryUpdate){
            return chained(SHIPPING_COSTS, [countryUpdate, "standard"]) || 0;
        }
        if(shippingIdentifierUpdate){
            // use the existing shipping options with new identifier
            return parseFloat(updatedPaymentData.newShippingMethods.find(elem => elem.identifier === shippingIdentifierUpdate).amount) || 0;
        }
        return parseFloat(chained(updatedPaymentData, ["newShippingMethods", "0", "amount"])) || 0;
    }

    const getTax = (subTotal) => {
        if(countryUpdate){
            return subTotal * (TAX_RATES[countryUpdate] || 0);
        }
        return getPreviousLineItemAmount("Tax");
    }

    const getPreviousLineItemAmount = (label) => {
        const lineItem =  Array.isArray(updatedPaymentData.newLineItems) ? updatedPaymentData.newLineItems.find(item => item.label === label) : null;
        return lineItem ? parseFloat(lineItem.amount) : 0;
    }

    const base = 300;
    // or use previous shipping option
    const shipping = getShippingCost();
    // or use previously added discount
    const discount = getDiscount(base, couponCode);
    const subTotal = base - (discount || 0);
    const tax = getTax(subTotal);
    const cardFee = CARD_FEES[paymentMethod];
    const total = subTotal + tax + (shipping || 0) + (cardFee || 0);

    const priceDetails = {
        base: base.toFixed(2),
        shipping: shipping && shipping.toFixed(2),
        discount: discount && discount.toFixed(2),
        cardFee: cardFee && cardFee.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
    };
    
    const getNewTotal = () => {
        return {
            label: "Total",
            amount: priceDetails.total
        };
    }
    
    const getNewLineItems = () => {
        const {discount, shipping, cardFee} = priceDetails;
        return [
            { label: '20x Primo Mop', amount: priceDetails.base },
            { label: "Subtotal", amount: priceDetails.base },
            discount && { label: 'Discount', amount: `-${priceDetails.discount}` },
            shipping && { label: "Shipping", amount: priceDetails.shipping },
            cardFee && { label: "Card Fee", amount: priceDetails.cardFee },
            { label: "Tax", amount: priceDetails.tax },
        ].filter(Boolean);
    }


    const getNewShippingMethods = () => {
        // if a new shipping contact, use standard shuffle
        if(countryUpdate){
            if(!SHIPPING_COSTS[countryUpdate]){
                return null;
            }
            // add prices
            const newShippingMethods = SHIPPING_METHODS.map(elem => {
                elem.amount = SHIPPING_COSTS[countryUpdate][elem.identifier].toFixed(2);
                return elem;
            });
            return newShippingMethods;
        }

        // if new shipping method selected, use previous methods but reshuffle
        if(shippingIdentifierUpdate) {
            const prevShippingMethods = [...updatedPaymentData.newShippingMethods];
            const orderedMethods = prevShippingMethods.filter(elem => elem.identifier !== shippingIdentifierUpdate);
            const firstMethod = prevShippingMethods.find(elem => elem.identifier === shippingIdentifierUpdate);
            orderedMethods.splice(0, 0, firstMethod);
            return orderedMethods;
        }
        // otherwise use previous shippingMethods
        return updatedPaymentData.newShippingMethods;
    }

    // can't send error back for shippingMethod update
    const getErrors = () => {
        if(couponCode && !COUPON_CODES[couponCode]) {
            return [{
                message: "Coupon code invalid",
                code: "couponCodeInvalid"
            }]
        } if (countryUpdate && !SHIPPING_COSTS[countryUpdate]){
            return [{
                message: "We don't ship to this country brah",
                code: "addressUnserviceable"
            }]
        }
        return null;
    }

    const errors = getErrors();
    const newShippingMethods = getNewShippingMethods();


    const newPaymentData = {
        newTotal: getNewTotal(),
        newLineItems: getNewLineItems(),
    };

    if(errors) newPaymentData.errors = errors;
    if(newShippingMethods) newPaymentData.newShippingMethods = newShippingMethods;
    return newPaymentData;
};

const createApplePayIframe = () => {
    const apple_pay_container_id = "apple_pay";
    WePay.createApplePayIframe(apple_pay_container_id, apple_pay_configs);
};

export default createApplePayIframe;
