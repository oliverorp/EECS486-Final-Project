"""Code for Backend Endpoint"""

import joblib
import pandas as pd
from sklearn.compose import make_column_transformer
from sklearn.preprocessing import OneHotEncoder

model = joblib.load('../model/ridge_classifier.pkl')

def clean(x):
    if x == 'Work':
        return 'At work'
    elif x == 'Home':
        return 'At home'
    elif x == 'School':
        return 'At school'
    else:
        return 'Commuting'

RECOMMENDATIONS = pd.read_csv('recommendations.csv')
RECOMMENDATIONS = RECOMMENDATIONS.rename(columns={'Reason': 'WatchReason'})
RECOMMENDATIONS['CurrentActivity'] = RECOMMENDATIONS['CurrentActivity'].apply(lambda x: clean(x))

def makeBinary(x):
    return 1 if x in [True, 'True', 'true', 1] else 0


def predict_model(data):
    """Takes in data, preprocesses it, sends it to model,
        Assumes data is JSON format 
    """
    features = pd.DataFrame([data])
   
    features['HasDebt'] = features['HasDebt'].apply(makeBinary)
    features['OwnsProperty'] = features['OwnsProperty'].apply(makeBinary)
    
    features['Age'] = pd.to_numeric(features['Age'])
    features['Income'] = pd.to_numeric(features['Income'])
    features['MinutesSpent'] = pd.to_numeric(features['MinutesSpent'])
    features['NumSessions'] = pd.to_numeric(features['NumSessions'])
    features['NumVideos'] = pd.to_numeric(features['NumVideos'])

    
    print(features.dtypes)

    prediction = model.predict(features)[0]

    if prediction == 0:
        prediction = 'Low'
    elif prediction == 1:
        prediction = 'Medium'
    else:
        prediction = 'High'
    
    # query data base
    recommendation = RECOMMENDATIONS[
    (RECOMMENDATIONS['TimeOfDay'] == features['TimeOfDay'].values[0]) &
    (RECOMMENDATIONS['WatchReason'] == features['WatchReason'].values[0]) &
    (RECOMMENDATIONS['CurrentActivity'] == features['CurrentActivity'].values[0]) &
    (RECOMMENDATIONS['PredictedProductivityLoss'] == prediction )
]['Recommendation'].iloc[0]

    return {"prediction": prediction,
            "recommendation": recommendation}
