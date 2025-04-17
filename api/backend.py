from flask import request, jsonify
from flask import Flask
from predict import predict_model
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/api/v1/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print("THIS IS THE DATA")
    print(data)
    prediction = predict_model(data) # handles all preprocessing, running model, and returning in Json
    print("THE PREDICTION")
    print(prediction)
    return jsonify(prediction)





if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
