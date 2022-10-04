from flask import Flask, send_from_directory, render_template, request, url_for

app = Flask(__name__)

@app.route("/local-apple-pay-demo")
def local_demo():
    jellyfishUri = url_for('static', filename='jellyfish.js')
    return render_template('index.html', currentEnvironment="local", jellyfishUri=jellyfishUri, appId="429252",  accountId="56221a85-2386-4e26-b470-a10b560fb969")

@app.route("/apple-pay-demo")
def demo():
    currentEnvironment = request.args.get("environment")
    appId = "429252"
    accountId = "56221a85-2386-4e26-b470-a10b560fb969"
    jellyfishUri = url_for('static', filename='jellyfish.js')
    if currentEnvironment == 'poc':
        jellyfishUri = url_for('static', filename='jellyfish-poc.js')
        appId = "429252"
        accountId = "56221a85-2386-4e26-b470-a10b560fb969"
    elif currentEnvironment == 'tst':
        jellyfishUri = "https://tst-cdn.wepay-inc.com/wepay.min.js"
        appId = "339596"
        accountId = "7c0f12f4-b279-41bb-a7bf-96a909f49187"
    elif currentEnvironment == "devtest":
        jellyfishUri = "https://devtest-cdn.devops.wepay-inc.com/wepay.min.js"
        appId = "175756"
        accountId = "7e454bf1-eeb0-43fe-bc66-80744f0c25d1"
    elif currentEnvironment == "stg":
        jellyfishUri = "https://stage-cdn.wepay.com/wepay.min.js"
        appId = "849356"
        accountId = "0368ef22-702b-4408-8713-194df1203686"
    
    return render_template('index.html', currentEnvironment=currentEnvironment, jellyfishUri=jellyfishUri, appId=appId, accountId=accountId)

@app.route('/.well-known/<path:path>')
def send_cert(path):
    return send_from_directory('.well-known', path)

if __name__ == "__main__":
    app.run()