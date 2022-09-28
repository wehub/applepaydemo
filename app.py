from flask import Flask, send_from_directory, render_template, request

app = Flask(__name__)

@app.route("/local-apple-pay-demo")
def local_demo():
    return render_template('index.html', currentEnvironment="local")

@app.route("/apple-pay-demo")
def demo():
        return render_template('index.html', currentEnvironment=request.args.get("environment"))

@app.route('/.well-known/<path:path>')
def send_cert(path):
    return send_from_directory('.well-known', path)

if __name__ == "__main__":
    app.run()