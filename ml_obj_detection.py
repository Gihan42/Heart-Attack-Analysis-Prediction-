import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import HistGradientBoostingClassifier
from pydantic import BaseModel

class Patient(BaseModel):
    age : int
    sex : int
    cp : int
    trtbps : int
    chol : int
    fbs : int
    restecg : int
    thalachh : int
    exng : int
    oldpeak : float
    slp : int
    caa : int
    thall : int
    

def detect(patient:Patient):
   

    data = pd.read_csv('/home/gihan/Documents/workingPlace/GDSE/4sem/machine_learning/HeartAttackAnalysisAndPredictionProject/src/dataset/heart.csv')
    print(data)

#Preprocess Data
    print(data.isnull().sum())
    data.isnull().sum()

    print(data.describe())
    data.describe()

    data.hist(figsize=(15,10))
    plt.show()

#Creating The Model
    x = data.drop('output',axis = 1)
    y = data['output'].values.reshape(-1,1)

    x_train, x_test, y_train, y_test = train_test_split(x, y ,test_size = .2, random_state = 0)
    logreg = LogisticRegression(solver = 'liblinear')
    logreg.fit(x_train,y_train)

    y_pred = logreg.predict(x_test)
    print( y_pred)

#Evaluation
    print('Accuracy',metrics.accuracy_score(y_test,y_pred))

#Plots
    fpr,tpr,_ = metrics.roc_curve(y_test,y_pred)
    plt.plot(fpr,tpr, label = 'data')
    plt.legend(loc = 4)
    plt.show()

    y_pred_proba = logreg.predict_proba(x_test)[::,1]
    fpr,tpr,_ = metrics.roc_curve(y_test, y_pred_proba)
    plt.plot(fpr,tpr, label = 'data2')
    plt.show()

    print(logreg.intercept_)
    print(logreg.coef_)

    print(logreg.predict_proba(x))
    print(logreg.predict(x))

    print( logreg.score(x,y))

#Confusion Matrix
    confusion_matrix(y,logreg.predict(x))
    print(confusion_matrix(y,logreg.predict(x)))

    cm = confusion_matrix(y,logreg.predict(x))

    fig ,ax = plt.subplots(figsize = (8,8))
    ax.imshow(cm)
    ax.xaxis.set(ticks = (0,1),ticklabels = ('predicted 0s','predicted 1s'))
    ax.yaxis.set(ticks = (0,1),ticklabels = ('actual 0s','actual 1s'))
    ax.set_ylim(1.5,-0.5)
    for i in range(2):
        for j in range(2):
            ax.text(j,i ,cm[i,j], ha = 'center', va = 'center', color = 'red')
    plt.show()

#Classification Report
    print(classification_report(y,logreg.predict(x)))

#Evaluate By Giving An Input
    input_data = pd.DataFrame({'age' : [patient.age],
             'sex' : [patient.sex],
             'cp' : [patient.cp],
             'trtbps' : [patient.trtbps],
             'chol' : [patient.chol],
             'fbs' : [patient.fbs],
             'restecg' : [patient.restecg],
             'thalachh' : [patient.thalachh],
             'exng' : [patient.exng],
             'oldpeak' : [patient.oldpeak],
             'slp' : [patient.slp],
             'caa' : [patient.caa],
             'thall' : [patient.thall]
            #  'output' : [0]
               })
    print( input_data)
    
    last_data = pd.concat([data , input_data], axis =0)
    print(last_data)

    last_data.reset_index()
    print(last_data.reset_index())

    x = last_data.drop('output', axis = 1)[:303]
    y = last_data['output'].values.reshape(-1,1)[:303]
    x_test = last_data.drop('output',axis = 1)[303:]

    print(x)

    logreg.fit(x,y)

    y_pred_test = logreg.predict(x_test)

    y_pred_test_list = y_pred_test.tolist()

    print(y_pred_test_list)
    return y_pred_test_list