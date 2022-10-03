import createApplePayIframe from "./apple-pay.js";

window.addEventListener("load", () => {
    if (typeof WePay !== 'object') {
        console.log("returning");
        return;
    }

    const environmentMap = {
        "local": {
            endpoint: "http://vm.wepay.com",
            // TODO: this needs to be updated
            uploadEndpoint: "http://vm.wepay.com",
            iframeEndpoint: "https://localhost:8001",
        },
        "poc": {
            endpoint: "https://poc-api-v3.wepay-inc.com",
            uploadEndpoint: "https://poc-uploads.wepay-inc.com/",
            iframeEndpoint: "https://poc-iframe.wepay-inc.com/",
        },
        "tst": {
            endpoint: "https://tst-api-v3.wepay-inc.com",
            uploadEndpoint: "https://tst-uploads.wepay-inc.com/",
            iframeEndpoint: "https://tst-iframe.wepay-inc.com/",
        },
        "devtest": {
            endpoint: "https://devtest-apiv3.devops.wepay-inc.com",
            // TODO: this needs to be updated
            uploadEndpoint: "https://devtest.devops.wepay-inc.com/",
            iframeEndpoint: "https://devtest-iframe.devops.wepay-inc.com/",
        },
        "stg": {
            endpoint: "https://stage-api.wepay.com",
            uploadEndpoint: "https://stage-uploads.wepay.com",
            iframeEndpoint: "https://stage-iframe.wepay.com",
        },
        "prd-pci": {
            endpoint: "https://api.wepay.com",
            uploadEndpoint: "https://uploads.wepay.com",
            iframeEndpoint: "https://iframe.wepay.com",
        }
    };

    WePay.STAGING_ENDPOINT = environmentMap[currentEnvironment].endpoint;
    WePay.STAGING_UPLOAD_ENDPOINT = environmentMap[currentEnvironment].uploadEndpoint;
    WePay.STAGE_IFRAME_ENDPOINT = environmentMap[currentEnvironment].iframeEndpoint;

    const apiVersion = "3.0";
    const error = WePay.configure("stage", appId, apiVersion);

    if (error) {
        console.log(error);
        return;
    }

    createApplePayIframe();

});