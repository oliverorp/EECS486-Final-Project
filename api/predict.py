"""Code for Backend Endpoint"""

import joblib
import pandas as pd
from sklearn.compose import make_column_transformer
from sklearn.preprocessing import OneHotEncoder


def makeBinary(x):
    if x == True:
        return 1
    return 0

model = joblib.load('/model/random_forest_model.pkl')

def predict_model(data):
    """Takes in data, preprocesses it, sends it to model,
        Assumes data is JSON format 
    """
    features = pd.DataFrame([data])
    features['HasDebt'] = ['HasDebt'].apply(makeBinary)
    features['OwnsProperty'] = features['OwnsProperty'].apply(makeBinary)

    simple_preprocessing = make_column_transformer(
    (OneHotEncoder(drop='first', handle_unknown='ignore'),
        ['Gender', 'Country', 'Demographics', 'Platform', 'TimeOfDay',
       'WatchReason', 'CurrentActivity']))
    
    transformed = simple_preprocessing.transform(features)

    prediction = model.predict(transformed)

    return {"prediction": prediction.tolist()}




