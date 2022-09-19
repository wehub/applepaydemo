"use strict";var WePay=window.WePay=WePay||{};WePay.PRODUCTION_ENDPOINT="https://api.wepay.com",WePay.STAGING_ENDPOINT="https://stage-api.wepay.com",WePay.PRODUCTION_UPLOAD_ENDPOINT="https://uploads.wepay.com",WePay.STAGING_UPLOAD_ENDPOINT="https://stage-uploads.wepay.com",WePay.PRODUCTION_IFRAME_ENDPOINT="https://iframe.wepay.com",WePay.STAGE_IFRAME_ENDPOINT="https://localhost:8001",WePay.configure=WePay.configure||function(e,r,t,n){var o=WePay._internal.validateSDKConfiguration(e,r,t);if(o.hasError())return o.buildInvalidParams();WePay._internal.setEnvironment(e),WePay._internal.setAppID(r),WePay._internal.setAPIVersion(t),WePay._internal.setSessionToken(n),WePay._internal.generate_risk_token_delayed()};var isIe11=!!window.MSInputMethodContext&&!!document.documentMode;if(isIe11){var script=document.createElement("script");script.src="https://cdn.wepay.com/bluebird.min.js",document.head.appendChild(script)}WePay.createCreditCardIframe=WePay.createCreditCardIframe||function(e,r){r=r||{};var t=WePay._internal.validateSDKIsConfigured();if(t.hasError())return t.buildSDKConfigurationError();var n=new WePay._internal.errorCollection;if("string"!=typeof e&&n.addWrongStringTypeError("iframe_container_id",e),document.getElementById(e)||n.addIDNotFoundError("iframe_container_id",e),"object"!=typeof r)n.addWrongObjectTypeError("options",r);else for(var o in r)r.hasOwnProperty(o)&&WePay._internal.allowOptions(o,["custom_style","show_labels","show_placeholders","show_error_messages","show_error_messages_when_unfocused","use_one_liner","show_error_icon","show_required_asterisk","resize_on_error_message","custom_required_field_error_message"]);if(n.hasError())return n.buildInvalidParams();var a="76px";if(WePay._internal.checkNested(r,"custom_style","styles","base","height")){var i=r.custom_style.styles.base.height;if(i){var s=i.split("px")[0];isNaN(s)||(a=2*s+10+"px")}}var d=new WePay._internal.iframe;return d.init(e,r,{iframe_route:"/paymentMethods/creditCard/v3",initial_height:a,sandbox_enabled:!0,sandbox_attributes:"allow-forms allow-scripts allow-same-origin"}),delete d.test,d},WePay.createGooglePayIframe=WePay.createGooglePayIframe||function(e,r){var t=r||{},n=WePay._internal.validateSDKIsConfigured();if(n.hasError())return n.buildSDKConfigurationError();var o=new WePay._internal.errorCollection;if("string"!=typeof e&&o.addWrongStringTypeError("iframe_container_id",e),document.getElementById(e)||o.addIDNotFoundError("iframe_container_id",e),"object"!=typeof t)o.addWrongObjectTypeError("iframeConfigs",t);else for(var a in t)t.hasOwnProperty(a)&&WePay._internal.allowOptions(a,["button_configs","on_success","on_error","on_update_payment_data"]);if(t.button_configs)if("object"!=typeof t.button_configs)o.addWrongObjectTypeError("button_configs",t.button_configs);else if(t.button_configs.paymentRequest)if("object"!=typeof t.button_configs.paymentRequest)o.addWrongObjectTypeError("button_configs.paymentRequest",t.button_configs.paymentRequest);else if(t.button_configs.paymentRequest.transactionInfo)if("object"!=typeof t.button_configs.paymentRequest.transactionInfo)o.addWrongObjectTypeError("button_configs.paymentRequest.transactionInfo",t.button_configs.paymentRequest.transactionInfo);else for(var i=["currencyCode","countryCode","totalPrice"],s=0;s<i.length;s++){var d=i[s];d in t.button_configs.paymentRequest.transactionInfo||o.addParamIsMissing("button_configs.paymentRequest.transactionInfo."+d)}else o.addParamIsMissing("button_configs.paymentRequest.transactionInfo");else o.addParamIsMissing("button_configs.paymentRequest");else o.addParamIsMissing("button_configs");if(o.hasError())return console.error(o.buildInvalidParams()),o.buildInvalidParams();var _=new WePay._internal.wallet_iframe("Google Pay");return _.init(e,t,{iframe_route:"/paymentMethods/googlePay",initial_height:"100%",sandbox_enabled:!0,sandbox_attributes:"allow-forms allow-scripts allow-same-origin allow-popups"}),delete _.test,_},WePay.createApplePayIframe=WePay.createApplePayIframe||function(e,r){var t=r||{},n=WePay._internal.validateSDKIsConfigured();if(n.hasError())return n.buildSDKConfigurationError();var o=new WePay._internal.errorCollection;if("string"!=typeof e&&o.addWrongStringTypeError("iframe_container_id",e),document.getElementById(e)||o.addIDNotFoundError("iframe_container_id",e),"object"!=typeof t)o.addWrongObjectTypeError("iframeConfigs",t);else for(var a in t)t.hasOwnProperty(a)&&WePay._internal.allowOptions(a,["button_configs","on_success","on_error","on_update_payment_data"]);if(t.button_configs?"object"!=typeof t.button_configs?o.addWrongObjectTypeError("button_configs",t.button_configs):t.button_configs.accountId?"string"!=typeof t.button_configs.accountId?o.addWrongStringTypeError("button_configs.accountId",t.button_configs.accountId):t.button_configs.paymentRequest?"object"!=typeof t.button_configs.paymentRequest&&o.addWrongObjectTypeError("button_configs.paymentRequest",t.button_configs.paymentRequest):o.addParamIsMissing("button_configs.paymentRequest"):o.addParamIsMissing("button_configs.accountId"):o.addParamIsMissing("button_configs"),o.hasError())return console.error(o.buildInvalidParams()),o.buildInvalidParams();var i=new WePay._internal.wallet_iframe("Apple Pay");return i.init(e,t,{iframe_route:"/paymentMethods/applePay",initial_height:"100%",sandbox_enabled:!0,sandbox_attributes:"allow-forms allow-scripts allow-same-origin allow-popups"}),delete i.test,i},WePay.createKycIframe=WePay.createKycIframe||function(e,r){var t=WePay._internal.validateSDKIsConfigured(),n=["US","CA"];if(t.hasError())return t.buildSDKConfigurationError();var o=new WePay._internal.errorCollection;if("string"!=typeof e&&o.addWrongStringTypeError("iframe_container_id",e),document.getElementById(e)||o.addIDNotFoundError("iframe_container_id",e),r)if("object"!=typeof r)o.addWrongObjectTypeError("options",r);else if(r.country_code)if("string"!=typeof r.country_code)o.addWrongStringTypeError("options.country_code",r.country_code);else if(-1==n.indexOf(r.country_code))o.addParamValueIsInvalidEnumError("options.country_code",n);else for(var a in r)r.hasOwnProperty(a)&&WePay._internal.allowOptions(a,["custom_style","country_code","ssn4_enabled"]);else o.addParamIsMissing("options.country_code");else o.addParamIsMissing("options");if(o.hasError())return o.buildInvalidParams();var i=new WePay._internal.iframe;return i.init(e,r,{iframe_route:"/kyc/web_view/v3",initial_height:"800px"}),delete i.test,i},WePay.createPayoutIframe=WePay.createPayoutIframe||function(e,r){var t=WePay._internal.validateSDKIsConfigured();if(t.hasError())return t.buildSDKConfigurationError();var n=new WePay._internal.errorCollection;if("string"!=typeof e&&n.addWrongStringTypeError("iframe_container_id",e),document.getElementById(e)||n.addIDNotFoundError("iframe_container_id",e),r)if(r!==Object(r))n.addWrongObjectTypeError("options",r);else if(r.country_code)if("string"!=typeof r.country_code)n.addWrongStringTypeError("options.country_code",r.country_code);else if("US"!==r.country_code&&"CA"!=r.country_code)n.addParamValueIsInvalidEnumError("options.country_code",["US","CA"]);else for(var o in r)r.hasOwnProperty(o)&&WePay._internal.allowOptions(o,["country_code","custom_style"]);else n.addParamIsMissing("options.country_code");else n.addParamIsMissing("options");if(n.hasError())return n.buildInvalidParams();var a=new WePay._internal.iframe;return a.init(e,r,{initial_height:"500px",iframe_route:"/payouts/addBank/tokenize"}),delete a.test,a},WePay.tokens=WePay.tokens||{},WePay.tokens.create=WePay.tokens.create||function(e,r,t){return WePay._internal.makeJSONRequest("general","/tokens","POST",e,r,t)},WePay.documents=WePay.documents||{},WePay.documents.create=WePay.documents.create||function(e,r,t){return WePay._internal.makeFormRequest("upload","/documents","POST",e,r,t)},WePay.tags=WePay.tags||{device_token:0,uuid:function(){for(var e=[],r="0123456789abcdef",t=0;t<36;t++)e[t]=r.substr(Math.floor(16*Math.random()),1);return e[14]="4",e[19]=r.substr(3&e[19]|8,1),e[8]=e[13]=e[18]=e[23]="-",e.join("")},generate:function(e){var r=document.createElement("div"),t=document.createElement("div"),n=document.createElement("img"),o=document.createElement("script"),a=document.createElement("object"),i=document.createElement("param"),s=document.createElement("div");return r.id="WePay-tags",r.style.position="absolute",r.style.left="-1000px",r.style.maxHeight="0px",r.style.overflow="hidden",t.style.background="url('https://t.wepay.com/fp/clear.png?org_id=ncwzrc4k&session_id="+e+"&m=1')",n.src="https://t.wepay.com/fp/clear.png?org_id=ncwzrc4k&session_id="+e+"&m=2",n.alt="",o.src="https://t.wepay.com/fp/check.js?org_id=ncwzrc4k&session_id="+e,o.type="text/javascript",o.async="true",a.type="application/x-shockwave-flash",a.data="https://t.wepay.com/fp/fp.swf?org_id=ncwzrc4k&session_id="+e,a.width=1,a.height=1,a.id="obj_id",i.name="movie",i.value="https://t.wepay.com/fp/fp.swf?org_id=ncwzrc4k&session_id="+e,a.appendChild(i),a.appendChild(s),r.appendChild(t),r.appendChild(n),r.appendChild(o),r.appendChild(a),r},enable_device:function(e){this.device_token=e},insert:function(e){return e=e||this.device_token||WePay.tags.uuid(),document.getElementById("WePay-tags")||document.body.appendChild(WePay.tags.generate(e)),e}},WePay.createPaymentBankLightBox=WePay.createPaymentBankLightBox||function(e,r){r=r||{};var t=WePay._internal.validateSDKIsConfigured();if(t.hasError())return t.buildSDKConfigurationError();var n=new WePay._internal.errorCollection;if("object"!=typeof r)n.addWrongObjectTypeError("options",r);else for(var o in r)r.hasOwnProperty(o)&&WePay._internal.allowOptions(o,["avoid_micro_deposits"]);if(n.hasError())return n.buildInvalidParams();var a=new WePay._internal.light_box;return a.init(WePay._internal.plaidEventHandler,e,r,{iframe_route:"/paymentMethods/bankAccount",sandbox_enabled:!0,sandbox_attributes:"allow-forms allow-scripts allow-same-origin"}),delete a.test,a},WePay._internal=WePay._internal||new function(){var i={},e=this;return this.setAppID=function(e){i.app_id=e},this.setAPIVersion=function(e){i.api_version=e},this.setSessionToken=function(e){i.session_token=e},this.endpointsMapper=function(e){return{general:i.endpoint,upload:i.upload_endpoint,iframe:i.iframe_endpoint}[e]},this.setEnvironment=function(e){switch(i.environment=e){case"stage":i.endpoint=WePay.STAGING_ENDPOINT,i.upload_endpoint=WePay.STAGING_UPLOAD_ENDPOINT,i.iframe_endpoint=WePay.STAGE_IFRAME_ENDPOINT;break;case"production":i.endpoint=WePay.PRODUCTION_ENDPOINT,i.upload_endpoint=WePay.PRODUCTION_UPLOAD_ENDPOINT,i.iframe_endpoint=WePay.PRODUCTION_IFRAME_ENDPOINT}},this.getAppID=function(){return i.app_id},this.getAPIVersion=function(){return i.api_version},this.getSessionToken=function(){return i.session_token},this.validateSDKIsConfigured=function(){return this.validateSDKConfiguration(i.environment,i.app_id,i.api_version)},this.plaidErrorHandler=function(e){var r={error_code:"UNEXPECTED_ERROR",error_message:"There was an unknown error."},t={INVALID_CREDENTIALS:{error_code:"COULD_NOT_AUTHENTICATE",error_message:"The supplied credentials do not have permission to perform this action.",details:[{reason_code:"INVALID_CREDENTIALS",message:"The credentials provided are invalid. Please try again."}]},INVALID_MFA:{error_code:"COULD_NOT_AUTHENTICATE",error_message:"The supplied credentials do not have permission to perform this action.",details:[{reason_code:"INVALID_MFA",message:"MFA responses provided are invalid. Please try again."}]},ITEM_LOCKED:{error_code:"PAYMENT_METHODS_COULD_NOT_BE_RETRIEVED",error_message:"The payment methods could not be retrieved.",details:[{reason_code:"REJECTED_BY_ISSUING_BANK",message:"User account locked. Contact the financial institution to unlock."}]},ITEM_NOT_SUPPORTED:{error_code:"PAYMENT_METHODS_COULD_NOT_BE_RETRIEVED",error_message:"The payment methods could not be retrieved.",details:[{reason_code:"REJECTED_BY_ISSUING_BANK",message:"This account is restricted by the financial institution selected. User Account canâ€™t be supported by Plaid."}]},USER_SETUP_REQUIRED:{error_code:"PAYMENT_METHODS_COULD_NOT_BE_RETRIEVED",error_message:"The payment methods could not be retrieved.",details:[{reason_code:"USER_SETUP_REQUIRED",message:"Pending action with the financial institution. Please log in directly to resolve and then retry."}]},NO_ACCOUNTS:{error_code:"PAYMENT_METHODS_COULD_NOT_BE_RETRIEVED",error_message:"The payment methods could not be retrieved.",details:[{reason_code:"NO_ACCOUNT_FOUND",message:"No matching accounts found."}]},NO_AUTH_ACCOUNTS:{error_code:"PAYMENT_METHODS_COULD_NOT_BE_RETRIEVED",error_message:"The payment methods could not be retrieved.",details:[{reason_code:"NO_AUTH_ACCOUNT_FOUND",message:"No valid checking or savings accounts found to retrieve routing numbers."}]},INSTITUTION_NOT_RESPONDING:{error_code:"PAYMENT_METHODS_COULD_NOT_BE_RETRIEVED",error_message:"The payment methods could not be retrieved.",details:[{reason_code:"INSTITUTE_NOT_RESPONDING",message:"No response from the financial institution. Please try again later."}]}};if(e.errorCode in t){var n=t[e.errorCode];r.error_code=n.error_code,r.error_message=n.error_message,r.details=JSON.parse(JSON.stringify(n.details))}return r},this.microDepositsErrorHandler=function(e){var r={error_code:"UNEXPECTED_ERROR",error_message:"There was an unknown error."},t={INVALID_EMAIL_TYPE:{error_code:"INVALID_PARAMS",error_message:"Invalid parameter(s).",details:[{reason_code:"PARAM_VALUE_IS_INVALID_PATTERN",message:"Expected a value matching the regular expression '^([^,:;=@\"'\\\\\\s()\\[\\]]+)+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$'."}]},INVALID_ACCOUNT_NUMBER:{error_code:"INVALID_PARAMS",error_message:"Invalid parameter(s).",details:[{reason_code:"PARAM_VALUE_IS_INVALID_PATTERN",message:"Expected a value matching the regular expression '^[0-9]{3,17}$'."}]},INVALID_ROUTING_NUMBER:{error_code:"INVALID_PARAMS",error_message:"Invalid parameter(s).",details:[{reason_code:"PARAM_VALUE_IS_INVALID_PATTERN",message:"Expected a value matching the regular expression '^[0-9]{9}$'."}]}};if(e.errorCode in t){var n=t[e.errorCode];r.error_code=n.error_code,r.error_message=n.error_message,r.details=JSON.parse(JSON.stringify(n.details))}return r},this.plaidEventHandler=this.plaidEventHandler||function(e){var r;try{r=e.data&&"string"==typeof e.data?JSON.parse(e.data):e.data}catch(e){return void console.log("Could not parse JSON")}var t="errorCode"in r,n=r.popup_closing,o={errorOccurred:void 0,popupClosing:n,response:void 0};return t&&(o.errorOccurred=!0,"happyPath"===r.flow?o.response=WePay._internal.plaidErrorHandler(r):"microdeposits"===r.flow?o.response=WePay._internal.microDepositsErrorHandler(r):o.response={error_code:"UNEXPECTED_ERROR",error_description:"There was an unknown error."}),n&&("error"in r&&"window_closed"===r.error?(o.errorOccurred=!0,o.response={error_code:"TOKEN_CANNOT_BE_CREATED",error_message:"Token cannot be created.",details:[{reason_code:"USER_CANCELED",message:"The user has canceled the action."}]}):(o.errorOccurred=!1,delete r.popup_closing,o.response=r)),o},this.makeBaseRequest=function(e,r,t,n,o){n=null!=o;var a=new XMLHttpRequest;return n&&(a.onreadystatechange=function(){4==this.readyState&&o(JSON.parse(this.responseText))}),a.open(t,this.endpointsMapper(e)+r,n),a.setRequestHeader("App-Id",i.app_id),a.setRequestHeader("Api-Version",i.api_version),this.getSessionToken()&&a.setRequestHeader("Session-Token",i.session_token),this.get_risk_token()&&a.setRequestHeader("WePay-Risk-Token",this.get_risk_token()),a},this.makeJSONRequest=function(e,r,t,n,o,a){var i=null!=a,s=this.validateSDKIsConfigured();if(s.hasError())return a?void a(s.buildSDKConfigurationError()):s.buildSDKConfigurationError();var d=this.makeBaseRequest(e,r,t,i,a);return d instanceof Error?d:(d.setRequestHeader("Content-Type","application/json"),this.setXhttpHeader(d,o),"POST"===t&&n?d.send(JSON.stringify(n)):d.send(),i?void 0:JSON.parse(d.responseText))},this.makeFormRequest=function(e,r,t,n,o,a){var i=null!=a,s=this.validateSDKIsConfigured();if(s.hasError())return a?void a(s.buildSDKConfigurationError()):s.buildSDKConfigurationError();var d=this.makeBaseRequest(e,r,t,i,a);if(this.setXhttpHeader(d,o),"POST"===t&&n){var _=new FormData;for(var c in n)_.append(c,n[c]);d.send(_)}else d.send();return i?void 0:JSON.parse(d.responseText)},this.setXhttpHeader=function(e,r){var t=["Content-Type","App-Id","App-Token","Api-Version","WePay-Risk-Token"];if(r)for(var n=Object.keys(r),o=0;o<n.length;o++)-1==t.indexOf(n[o])&&e.setRequestHeader(n[o],r[n[o]])},this.validateSDKConfiguration=function(e,r,t){var n=new WePay._internal.errorCollection;return void 0===r?n.addParamIsMissing("app_id"):"string"!=typeof r&&n.addWrongStringTypeError("app_id",r),void 0===e?n.addParamIsMissing("environment"):"string"!=typeof e?n.addWrongStringTypeError("environment",e):"stage"!==e&&"production"!=e&&n.addParamValueIsInvalidEnumError("environment",["stage","production"]),void 0===t?n.addParamIsMissing("api_version"):"string"!=typeof t&&n.addWrongStringTypeError("api_version",t),n},this.get_risk_token=function(){return WePay.tags.device_token},this.generate_risk_token=function(){var e=WePay.tags.insert();WePay.tags.enable_device.bind(WePay.tags,e)()},this.generate_risk_token_delayed=function(){setTimeout(e.generate_risk_token,5e3)},this.checkNested=function(e){for(var r=Array.prototype.slice.call(arguments,1),t=0;t<r.length;t++){if(!e||!e.hasOwnProperty(r[t]))return!1;e=e[r[t]]}return!0},this.errorCollection=function(){var t=[];return{hasError:function(){return 0!==t.length},buildInvalidParams:function(){return{error_code:"INVALID_PARAMS",error_message:"Invalid parameter(s).",details:t}},buildUnexpectedError:function(){return{error_code:"UNEXPECTED_ERROR",error_message:"There was an unknown error."}},buildSDKConfigurationError:function(){return{error_code:"INVALID_SDK_CONFIGURATION",error_message:"The application is not configured correctly.",details:t}},addParamIsMissing:function(e){t.push({target:e,target_type:"SDK_PARAMETER",reason_code:"PARAM_IS_MISSING",message:"A required parameter is missing."})},addParamValueIsInvalidEnumError:function(e,r){t.push({target:e,target_type:"SDK_PARAMETER",reason_code:"PARAM_VALUE_IS_INVALID_ENUM",message:"Expected value in [ "+r.join(", ")+" ]."})},addIDNotFoundError:function(e,r){t.push({target:e,target_type:"SDK_PARAMETER",reason_code:"ID_NOT_FOUND",message:"ID "+r+" not found."})},addWrongStringTypeError:function(e,r){t.push({target:e,target_type:"SDK_PARAMETER",reason_code:"PARAM_VALUE_IS_WRONG_TYPE",message:"Expected type in [ string ] but found type "+typeof r+"."})},addWrongObjectTypeError:function(e,r){t.push({target:e,target_type:"SDK_PARAMETER",reason_code:"PARAM_VALUE_IS_WRONG_TYPE",message:"Expected type in [ object ] but found type "+typeof r+"."})}}},this.allowOptions=function(e,r){return!!new Set(r).has(e)||(console.warn(e+" is not a supported property."),!1)},this.light_box=function(){var d={is_init:!1,iframe_route:void 0,iframe:void 0,light_box:void 0},_=function(){d.iframe_endpoint=WePay._internal.endpointsMapper("iframe"),d.ref_id=WePay.tags.uuid(),d.app_id=WePay._internal.getAppID(),d.api_version=WePay._internal.getAPIVersion();var e=encodeURIComponent(d.ref_id),r=encodeURIComponent(d.app_id),t=encodeURIComponent(d.api_version);d.iframe_src=d.iframe_endpoint+d.iframe_route+"?ref_id="+e+"&client_id="+r+"&api_version="+t,d.iframe_src+="&light_box=true",d.iframe_src+="&v3=true",d.avoid_micro_deposits&&(console.log("info","avoid micro deposits"),d.iframe_src+="&avoidMicrodeposits=true")},t=function(e){if(e.origin===d.iframe_endpoint){var r=d.event_handler(e);!0===r.popupClosing?(document.body.removeChild(d.light_box),window.removeEventListener?window.removeEventListener("message",t):window.detachEvent&&window.detachEvent("message",t),!0===r.errorOccurred?d.promise_map.reject(r.response):d.promise_map.resolve(r.response)):!1===r.popupClosing&&d.internal_events_listener&&d.internal_events_listener(r.response)}else console.log("message is ignored, origin:%s, data:%s",e.origin,e.data)}.bind(this);window.addEventListener?window.addEventListener("message",t,!1):window.attachEvent&&window.attachEvent("message",t,!1);return{init:function(e,r,t,n){d.is_init||(d.is_init=!0,d.iframe_route=n.iframe_route,d.event_handler=e,d.internal_events_listener=r,d.avoid_micro_deposits=t.avoid_micro_deposits);var o="height: 665px;";t.hasOwnProperty("avoid_micro_deposits")&&t.avoid_micro_deposits&&screen.width<400&&(o="height: 550px;");var a="position: absolute; top: 0; width:360px; border: 0; left: 50%; margin-left: -180px; border-radius: 8px; margin-top: 30px;"+o;_();var i=document.createElement("iframe");i.setAttribute("name","paymentBankIFrame"),i.setAttribute("id","paymentBankIFrame"),i.setAttribute("style",a),i.src=d.iframe_src;var s=document.createElement("div");s.setAttribute("style","z-index: 2000; position: fixed; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); overflow: scroll;"),s.appendChild(i),s.setAttribute("id","paymentBankLightBox"),d.iframe=i,d.light_box=s,document.body.appendChild(s)},tokenize:function(){return new Promise(function(e,r){d.promise_map={resolve:e,reject:r}})},test:function(){var e={_eventListener:t};return Object.assign(e,d)}}},this.iframe=function(){var i={is_init:!1,iframe_id:void 0,promise_map:{},custom_style:void 0,show_labels:void 0,show_placeholders:void 0,show_error_messages:void 0,show_error_messages_when_unfocused:void 0,show_error_icon:void 0,show_required_asterisk:void 0,resize_on_error_message:void 0,custom_required_field_error_message:void 0,use_one_liner:void 0,country_code:void 0,promise_count:0,iframe_endpoint:void 0,iframe_route:void 0,iframe_container_id:void 0},o=function(e){if(e.origin===i.iframe_endpoint){var r=e.data,t=r.promise_count;if(null==t||null!=i.promise_map[t])if("wepay-token"===r.event_id&&r.ref_id===i.ref_id&&null!=r.data)i.promise_map[e.data.promise_count].resolve(r.data),delete i.promise_map[e.data.promise_count];else if("wepay-token"===r.event_id&&r.ref_id===i.ref_id&&null!=r.error)i.promise_map[e.data.promise_count].reject(r.error),delete i.promise_map[e.data.promise_count];else{if("wepay-style"===r.event_id&&r.ref_id===i.ref_id&&null!=r.error)throw r.error;"wepay-resize"===r.event_id&&r.ref_id===i.ref_id?(i.iframe.style.height=r.height,r.event_id="wepay-resize-acknowledged",i.iframe.contentWindow.postMessage(r,i.iframe_src)):"closeCAEcheckIframe"===r.message&&document.body.removeChild(document.getElementById("paymentBankLightBox"))}}}.bind(this),a=function(){i.iframe_endpoint=WePay._internal.endpointsMapper("iframe"),i.ref_id=WePay.tags.uuid(),i.app_id=WePay._internal.getAppID(),i.api_version=WePay._internal.getAPIVersion();var e=encodeURIComponent(i.ref_id),r=encodeURIComponent(i.app_id),t=encodeURIComponent(i.api_version);i.iframe_src=i.iframe_endpoint+i.iframe_route+"?ref_id="+e+"&client_id="+r+"&api_version="+t,i.country_code&&(i.iframe_src+="&country="+i.country_code),!1===i.ssn4_enabled&&(i.iframe_src+="&ssn4_enabled=false"),!0===i.show_labels&&(i.iframe_src+="&show_labels=true"),!1===i.show_placeholders&&(i.iframe_src+="&show_placeholders=false"),!0===i.show_error_messages&&(i.iframe_src+="&show_error_messages=true"),!1===i.show_error_messages_when_unfocused&&(i.iframe_src+="&show_error_messages_when_unfocused=false"),!1===i.show_error_icon&&(i.iframe_src+="&show_error_icon=false"),!0===i.show_required_asterisk&&(i.iframe_src+="&show_required_asterisk=true"),!0===i.resize_on_error_message&&(i.iframe_src+="&resize_on_error_message=true"),i.custom_required_field_error_message&&(i.iframe_src+="&custom_required_field_error_message="+i.custom_required_field_error_message),!0===i.use_one_liner&&(i.iframe_src+="&use_one_liner=true");var n="#custom_style="+window.btoa(JSON.stringify(i.custom_style));i.custom_style&&i.iframe_src.length+n.length<2e3&&(i.iframe_src+=n)};return{init:function(e,r,t){if(!i.is_init){i.is_init=!0,i.iframe_container_id=e,i.iframe_id=e+"_iframe",i.custom_style=r&&r.custom_style?r.custom_style:null,i.iframe_route=t.iframe_route,i.country_code=r&&r.country_code?r.country_code:null,i.ssn4_enabled=!r||!1!==r.ssn4_enabled,i.show_labels=!(!r||!0!==r.show_labels),i.show_placeholders=!r||!1!==r.show_placeholders,i.show_error_messages=!(!r||!0!==r.show_error_messages),i.show_error_messages_when_unfocused=!r||!1!==r.show_error_messages_when_unfocused,i.show_error_icon=!r||!1!==r.show_error_icon,i.show_required_asterisk=!(!r||!0!==r.show_required_asterisk),i.resize_on_error_message=!(!r||!0!==r.resize_on_error_message),i.custom_required_field_error_message=r&&r.custom_required_field_error_message?r.custom_required_field_error_message:"",i.use_one_liner=!(!r||!0!==r.use_one_liner),i.sandbox_enabled=t.sandbox_enabled,i.sandbox_attributes=t.sandbox_attributes,a();var n=document.createElement("iframe");n.id=i.iframe_id,n.title="Credit Card Information Form",i.sandbox_enabled&&(n.sandbox=i.sandbox_attributes),i.iframe=n,i.iframe.style.border="none",i.iframe.style.width="100%",i.iframe.style.height=t.initial_height,i.iframe.src=i.iframe_src,document.getElementById(i.iframe_container_id).appendChild(i.iframe),i.iframe.addEventListener("load",function(){if(i.custom_style){var e={event_id:"wepay-style",ref_id:i.ref_id,data:{custom_style:i.custom_style}};i.iframe.contentWindow.postMessage(e,i.iframe_src)}window.addEventListener("message",o,!1)})}},tokenize:function(){var a=i.promise_count++;return new Promise(function(e,r){i.promise_map[a]={resolve:e,reject:r};var t={event_id:"wepay-tokenize",ref_id:i.ref_id,promise_count:a},n=document.getElementById(i.iframe_id);if(n)n.contentWindow.postMessage(t,i.iframe_src),setTimeout(function(){if(null!=i.promise_map[a]){var e=new WePay._internal.errorCollection;i.promise_map[a].reject(e.buildUnexpectedError()),delete i.promise_map[a]}},5e3);else{var o=new WePay._internal.errorCollection;o.addIDNotFoundError("iframe_id",i.iframe_id),o.hasError()&&i.promise_map[a].reject(o.buildInvalidParams())}})},setFocus:function(e){var r={event_id:"wepay-focus",ref_id:i.ref_id,input_key:e};["cc-number","cvv-number","expiration-month","expiration-year"].includes(r.input_key)?document.getElementById(i.iframe_id).contentWindow.postMessage(r,i.iframe_src):console.warn(r.input_key+" is not a supported key")},test:function(){var e={_receiveMessageHandler:o};return Object.assign(e,i)}}},this.wallet_iframe=function(a){var _={is_init:!1,iframe_id:void 0,iframe_endpoint:void 0,iframe_route:void 0,iframe_container_id:void 0,button_configs:void 0,on_success:void 0,on_error:void 0},t=function(e,r,t){console.log("_handlePaymentDataChangeEvent"),console.log("this.updatedPaymentData: ",this.updatedPaymentData);var n={shippingContact:e.shippingContact,paymentMethod:e.paymentMethod,shippingMethod:e.shippingMethod,couponCode:e.couponCode,updatedPaymentData:this.updatedPaymentData},o=_.on_update_payment_data(n)||{};console.log("updated_payment_data: ",o);try{if(o.errors){for(var a=[],i=0;i<o.errors.length;i++){var s=new ApplePayError(o.errors[i].code,o.errors[i].contactField,o.errors[i].message);a.push(s)}o.errors=o}console.log("updateCompleteName: ",t),r[t](o),console.log("after session");var d=["newTotal","newLineItems","newShippingMethods","newRecurringPaymentRequest","newMultiTokenContexts","newAutomaticReloadPaymentRequest"].reduce(function(e,r){return e[r]=void 0===o[r]?n.updatedPaymentData[r]:o[r],e},{});this.updatedPaymentData.errors&&(d.errors=this.updatedPaymentData.errors),this.updatedPaymentData=d}catch(e){console.error("Failed to update ApplePaySession with new PaymentData",e,o)}}.bind(this),i=function(e,r){this.updatedPaymentData={},this.session=new ApplePaySession(e,r),this.session.onvalidatemerchant=function(e){_.iframe.contentWindow.postMessage({event_id:"wepay-onvalidate-merchant"},_.iframe_src)}.bind(this),this.session.onpaymentmethodselected=function(e){t(e,this.session,"completePaymentMethodSelection")}.bind(this),this.session.onshippingmethodselected=function(e){t(e,this.session,"completeShippingMethodSelection")}.bind(this),this.session.onshippingcontactselected=function(e){console.log("onshippingcontactselected - event: ",e),t(e,this.session,"completeShippingContactSelection")}.bind(this),this.session.oncouponcodechanged=function(e){t(e,this.session,"completeCouponCodeChange")}.bind(this),this.session.onpaymentauthorized=function(e){var r=e.payment.token;console.log("token from onpaymentauthorized: ",r);var t={applePayToken:btoa(JSON.stringify({token:r}))};_.on_success(t),this.session.completePayment({status:this.session.STATUS_SUCCESS})}.bind(this),this.session.oncancel=function(e){console.log(e)}.bind(this),this.session.begin()}.bind(this),s=function(e){var r=e.data;if(console.log("event data: ",r),r.ref_id===_.ref_id){var t=null!=r.data,n=null!=r.error;if("wepay-token"===r.event_id&&t)_.on_success(r.data);else if("wepay-token"===r.event_id&&n)_.on_error(r.error);else if("wepay-initialize-session"===r.event_id)console.log("event received - wepay-initialize-session"),window.ApplePaySession?ApplePaySession.canMakePayments()?(console.log("payment request data: ",r.data.paymentRequest),i(r.data.webVersion,r.data.paymentRequest)):console.log("Unable to create ApplePaySession, ApplePaySession.canMakePayments resolving to false"):console.log("Unable to create ApplePaySession, global ApplePaySession does not exist");else if("wepay-complete-validation"===r.event_id)console.log("paymentSession: ",r.data.paymentSession),this.session.completeMerchantValidation(r.data.paymentSession),console.log("done");else if("wepay-payment-data-update"===r.event_id&&t){var o=_.on_update_payment_data(r.data)||{},a={event_id:"wepay-payment-data-update",ref_id:_.ref_id,data:o};_.iframe.contentWindow.postMessage(a,_.iframe_src)}else"wepay-payment-data-update"===r.event_id&&n?_.on_error(r.error):"wepay-error"===r.event_id&&n&&console.log(r.error)}}.bind(this),d=function(){_.iframe_endpoint=WePay._internal.endpointsMapper("iframe"),_.ref_id=WePay.tags.uuid(),_.app_id=WePay._internal.getAppID(),_.api_version=WePay._internal.getAPIVersion();var e=encodeURIComponent(_.ref_id),r=encodeURIComponent(_.app_id),t=encodeURIComponent(_.api_version);_.iframe_src=_.iframe_endpoint+_.iframe_route+"?ref_id="+e+"&client_id="+r+"&api_version="+t,_.account_id&&(_.iframe_src+="&account_id="+_.account_id)};return{init:function(e,r,t){var n=r||{};if(!_.is_init){_.is_init=!0,_.iframe_container_id=e,_.iframe_id=e+"_iframe",_.transaction_info=n.transaction_info,_.button_configs=n.button_configs||{},_.account_id=_.button_configs.accountId||null,_.iframe_route=t.iframe_route,_.country_code=n.country_code||null,_.sandbox_enabled=t.sandbox_enabled,_.sandbox_attributes=t.sandbox_attributes,_.on_success=n.on_success||function(){},_.on_error=n.on_error||function(){},_.on_update_payment_data=n.on_update_payment_data||function(){},d();var o=document.createElement("iframe");o.id=_.iframe_id,o.title=a,_.sandbox_enabled&&(o.sandbox=_.sandbox_attributes),_.iframe=o,_.iframe.style.border="none",_.iframe.style.width="100%",_.iframe.style.height=t.initial_height,_.iframe.allowPaymentRequest=!0,_.iframe.src=_.iframe_src,document.getElementById(_.iframe_container_id).appendChild(_.iframe),_.iframe.addEventListener("load",function(){if(_.button_configs){var e={event_id:"wepay-button-configs",ref_id:_.ref_id,data:{button_configs:_.button_configs}};_.iframe.contentWindow.postMessage(e,_.iframe_src)}window.addEventListener("message",s,!1)})}},test:function(){var e={_receiveMessageHandler:s};return Object.assign(e,_)}}},this},WePay.risk=WePay.risk||{},WePay.risk.generate_risk_token=WePay.risk.generate_risk_token||function(){WePay._internal.generate_risk_token()},WePay.risk.generate_risk_token_onload=WePay.risk.generate_risk_token_onload||function(){WePay._internal.generate_risk_token_delayed()},WePay.risk.get_risk_token=WePay.risk.get_risk_token||function(){return WePay._internal.get_risk_token()};try{window.addEventListener("load",WePay._internal.generate_risk_token_delayed,!1)}catch(e){window.attachEvent("onload",WePay._internal.generate_risk_token_delayed)}