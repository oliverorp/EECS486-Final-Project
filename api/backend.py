from flask import request, jsonify
from flask import Flask
from predict import predict_model


app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    prediction = predict_model(data) # handles all preprocessing, running model, and returning in Json
    return jsonify(prediction)


if __name__ == '__main__':
    app.run(debug=True)
