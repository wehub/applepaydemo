from flask import Flask, send_from_directory, render_template

app = Flask(__name__)

@app.route("/local-apple-pay-demo")
def local_demo():
    return render_template('index.html', currentEnvironment="local")

# TODO - query params for environment - serve a different HTML file
@app.route("/apple-pay-demo")
def demo():
    return {"environment": "poc"}

@app.route('/.well-known/<path:path>')
def send_cert(path):
    return send_from_directory('.well-known', path)

if __name__ == "__main__":
    app.run(ssl_context='adhoc')