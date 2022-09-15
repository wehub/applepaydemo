/* global WePay */

import React from "react";
import createApplePayIframe from "./apple-pay";

class CheckoutDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { iframeCreated: false };
    }


    componentDidMount() {
        if (typeof WePay !== 'object') {
            return;
        }
        
        const environmentMap = {
            "local": {
                endpoint: "http://vm.wepay.com",
                // TODO: this needs to be updated
                uploadEndpoint: "http://vm.wepay.com",
                iframeEndpoint: "https://localhost:8001",
            },
            "tst-pci": {
                endpoint: "https://tst-api-v3.wepay-inc.com",
                uploadEndpoint: "https://tst-uploads.wepay-inc.com/",
                iframeEndpoint: "https://tst-iframe.wepay-inc.com/",
            },
            "devtest-pci": {
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
        
        // TODO set currentEnvironment based on query param
        const currentEnvironment = "local";
        WePay.STAGING_ENDPOINT = environmentMap[currentEnvironment].endpoint;
        WePay.STAGING_UPLOAD_ENDPOINT = environmentMap[currentEnvironment].uploadEndpoint;
        WePay.STAGE_IFRAME_ENDPOINT = environmentMap[currentEnvironment].iframeEndpoint;
        
        // TODO client ID from query param
        const appId = '499054';
        const apiVersion = "3.0";
        const error = WePay.configure("stage", appId, apiVersion);
        
        if (error) {
            console.log(error);
            return;
        }

        if (!this.state.iframeCreated){
            createApplePayIframe();
            this.setState({iframeCreated: true});
        }
          
    }

    render() {
        return (
            <div>
                <p>
                    This App is a very barebones proof of concept for how a partner might integrate with our Apple Pay iframe.
                    It is intended to be used to check that the domain issue is resolved and as a demo for WePay's security team.
                </p>
                <p>
                    This app is pointing to local Phoenix running on port 8001 and has wepay.min.js pasted from this branch of Jellyfish: 
                    UIUX-8077-apple-pay-domain-issue. The reason Jellyfish is hardcoded as a script tag is that Apple Pay requires https.
                    If the app is running on https, it cannot make requests to local Jellyfish running on http.
                </p>
                <p>
                    Future improvements:
                    <ol>
                        <li>run Jellyfish locally on a secure server. </li>
                        <li>Allow for query params to set the env so this app can use Phoenix + Jellyfish either locally, or in a higher env</li>
                        <li>Move the instantiation of the iframe somewhere other than componentDidMount so we don't end up with 2 instances of the iframe</li>
                    </ol>
                </p>
                <p>
                    To see the Apple Pay button inspect the UI and uncheck "display:none" on the apple-pay-button.
                </p>
                <div className="digital-wallets">
                    <h2>Apple Pay Iframe below</h2>
                    <div id="apple_pay"></div>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action" id="submit-credit-card-button">
                    Submit
                </button>
                <div id="token-container">
                    <div className="token-container-header">
                        Results:
                    </div>
                    <div id="token"></div>
                </div>
            </div>
        );
    }
}

export default CheckoutDemo;