from flask import Flask, send_from_directory, render_template, request, url_for
import json

app = Flask(__name__)

@app.route("/local-apple-pay-demo")
def local_demo():
    jellyfishUri = url_for('static', filename='jellyfish.js')
    return render_template('index.html', currentEnvironment="local", jellyfishUri=jellyfishUri, appId="429252",  accountId="56221a85-2386-4e26-b470-a10b560fb969")

@app.route("/apple-pay-demo")
def demo():

    # use POC by default if no environment is passed
    currentEnvironment = request.args.get('environment', 'poc')
    jellyfishUri = url_for('static', filename='jellyfish-poc.js')
    defaultAppId = '429252'
    defaultAccountId = '56221a85-2386-4e26-b470-a10b560fb969'
    
    if currentEnvironment == 'tst':
        jellyfishUri = 'https://tst-cdn.wepay-inc.com/wepay.min.js'
        defaultAppId = '339596'
        defaultAccountId = '7c0f12f4-b279-41bb-a7bf-96a909f49187'
    elif currentEnvironment == "devtest":
        jellyfishUri = "https://devtest-cdn.devops.wepay-inc.com/wepay.min.js"
        defaultAppId = "175756"
        defaultAccountId = "7e454bf1-eeb0-43fe-bc66-80744f0c25d1"
    elif currentEnvironment == "stg":
        jellyfishUri = "https://stage-cdn.wepay.com/wepay.min.js"
        defaultAppId = "849356"
        defaultAccountId = "0368ef22-702b-4408-8713-194df1203686"
    elif currentEnvironment == "prod":
        jellyfishUri = "https://cdn.wepay.com/wepay.min.js"
        # we do not have a default app and account in prod
        # default to 0
        # apple pay button will not load if client_id and account_id are not passed by query param
        defaultAppId = "0"
        defaultAccountId = "0"
    
    # use client_id and account_id from query params if passed, otherwise use defaults 
    appIdFromQueryParams = request.args.get('client_id')
    appId = defaultAppId if appIdFromQueryParams is None else appIdFromQueryParams
    accountIdFromQueryParams = request.args.get('account_id')
    accountId = defaultAccountId if accountIdFromQueryParams is None else accountIdFromQueryParams

    cssString = request.args.get('css')
    cssVariables = json.loads(cssString) if cssString is not None else {}
    locale = request.args.get('locale')
    
    return render_template('index.html', currentEnvironment=currentEnvironment, jellyfishUri=jellyfishUri, appId=appId, accountId=accountId, locale=locale, cssVariables=cssVariables)


@app.route("/error-demo")
def error_demo():
    return render_template('index.html', currentEnvironment="stg", jellyfishUri="https://stage-cdn.wepay.com/wepay.min.js", appId="849356", accountId="a864da3a-c370-4103-a661-59ddad481fd9")

@app.route('/.well-known/<path:path>')
def send_cert(path):
    return send_from_directory('.well-known', path)

if __name__ == "__main__":
    app.run()