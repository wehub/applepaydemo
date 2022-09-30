from flask import Flask, send_from_directory, render_template, request, url_for

app = Flask(__name__)

@app.route("/local-apple-pay-demo")
def local_demo():
    jellyfishUri = url_for('static', filename='jellyfish.js')
    return render_template('index.html', currentEnvironment="local", jellyfishUri=jellyfishUri)

@app.route("/apple-pay-demo")
def demo():
    currentEnvironment = request.args.get("environment")
    jellyfishUri = url_for('static', filename='jellyfish.js')
    if currentEnvironment == 'poc':
        jellyfishUri = url_for('static', filename='jellyfish-poc.js')
    return render_template('index.html', currentEnvironment=currentEnvironment, jellyfishUri=jellyfishUri)

@app.route('/.well-known/<path:path>')
def send_cert(path):
    return send_from_directory('.well-known', path)

if __name__ == "__main__":
    app.run()