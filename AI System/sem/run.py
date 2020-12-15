import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier, AdaBoostClassifier, RandomForestRegressor, BaggingClassifier, ExtraTreesClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

df1 = pd.read_csv('wine/winemag-data-130k-v2.csv')
df2 = pd.read_csv('wine/winemag-data_first150k.csv')


X = df1[[
    'country', 'designation', 
'province', 'region_1', 'region_2', 'variety', 'winer']]
y = df1['price']

from sklearn.preprocessing import LabelEncoder, OneHotEncoder 
label_encoder = LabelEncoder()   
ohe = OneHotEncoder()  

def stringFieldtoInt(fieldName, obj):
    tectonic = label_encoder.fit_transform(obj[fieldName]) 
    ohe.fit_transform(tectonic.reshape(-1,1)) 
    obj[fieldName] = tectonic


def arrayFieldsToInt(fieldNames, obj):
    for field in fieldNames:
        stringFieldtoInt(field, obj)


arrayFieldsToInt(['country', 'designation', 
'province', 'region_1', 'region_2', 'variety', 'winer'], X)
arrayFieldsToInt(['country', 'designation', 
'province', 'region_1', 'region_2', 'variety', 'winer'], df2)



models = [
    # (AdaBoostClassifier(), 'ada'),
    (BaggingClassifier(n_jobs=-1), 'bagging'),
    (ExtraTreesClassifier(n_jobs=-1,), 'extra_trees'),
    (ExtraTreesClassifier(n_jobs=-1, n_estimators=200,), 'extra_trees n_est=200'),
    (ExtraTreesClassifier(n_jobs=-1, max_depth=5), 'extra_trees max_d=5'),
    (ExtraTreesClassifier(n_jobs=-1, max_depth=5, n_estimators=200), 'extra_trees max_d=5 n_est=200'),
    (ExtraTreesClassifier(n_jobs=-1, max_depth=10), 'extra_trees max_d=10'),
    (ExtraTreesClassifier(n_jobs=-1, max_depth=10, n_estimators=200), 'extra_trees max_d=5 n_est=200'),
    (GradientBoostingClassifier(), 'grad_boosting'),
    (RandomForestClassifier(n_estimators=200, n_jobs=-1), 'rand_forset n_est=200'),
    (RandomForestClassifier(n_estimators=100, n_jobs=-1), 'rand_forset n_est=100'),
    (RandomForestClassifier(n_estimators=50, n_jobs=-1), 'rand_forset n_est=50'),
    (RandomForestClassifier(n_estimators=25, n_jobs=-1), 'rand_forset n_est=25'),
    (RandomForestClassifier(n_estimators=10, n_jobs=-1), 'rand_forset n_est=10'),
    (RandomForestClassifier(n_estimators=5, n_jobs=-1), 'rand_forset n_est=5'),
    (RandomForestClassifier(n_estimators=2, n_jobs=-1), 'rand_forset n_est=2'),
    (DecisionTreeClassifier(), 'tree'),
    (DecisionTreeClassifier(max_features=20, max_depth=10), 'tree 20feat'),
]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# model.fit(X, y)
# print('score: ', model.score(X, y))

# res = model.predict(df2)

# print(res)


for model, name  in models:
    model.fit(X_train, y_train)
    print(name, 'score: ', accuracy_score(y_test, model.predict(X_test)))

    out = model.predict(df2)
    with open(f'predict_{name}', 'w') as file:
        for val in out:
            print(val, file=file)



prediction = pd.DataFrame(res).to_csv('prediction.csv', index=False)
