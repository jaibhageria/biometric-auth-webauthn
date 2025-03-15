from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

# Simulating trusted devices
TRUSTED_DEVICES = {"device123"}

@app.route("/verify", methods=["POST"])
def verify():
    data = request.json
    user_id = data.get("userId")
    device_id = data.get("deviceId")
    expires = data.get("expires")

    if not user_id or not device_id or not expires:
        return jsonify({"message": "Invalid request"}), 400

    if device_id not in TRUSTED_DEVICES:
        return jsonify({"message": "Device not trusted"}), 403

    if expires < (time.time()*1000):
        return jsonify({"message": "Token expired"}), 401

    return jsonify({"message": f"Authentication successful for {user_id}"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
