# Logistic Regression
from sklearn import datasets
from sklearn import metrics
from sklearn.linear_model import LogisticRegression
#import pandas as pd # To manage data as data frames
import numpy as np
# load the iris datasets
dataset = datasets.load_iris()
# fit a logistic regression model to the data
model = LogisticRegression(max_iter=1000)
model.fit(dataset.data, dataset.target)
#print(model)
# make predictions
#expected = dataset.target
#predicted = model.predict(dataset.data)
# summarize the fit of the model
##print(metrics.classification_report(expected, predicted))
#print(metrics.confusion_matrix(expected, predicted))
variety_mappings = {0: 'Setosa', 1: 'Versicolor', 2: 'Virginica'}
def classify(a, b, c, d):
    arr = np.array([a, b, c, d]) # Convert to numpy array
    arr = arr.astype(np.float64) # Change the data type to float
    query = arr.reshape(1, -1) # Reshape the array
    prediction = variety_mappings[model.predict(query)[0]] # Retrieve from dictionary
    #expected = dataset.target
    #print(metrics.classification_report(expected, prediction))
    return prediction