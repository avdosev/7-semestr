

def prepare():
    pass


def stringFieldtoInt(fieldName, obj):
    tectonic = label_encoder.fit_transform(obj[fieldName]) 
    ohe.fit_transform(tectonic.reshape(-1,1)) 
    obj[fieldName] = tectonic


def arrayFieldsToInt(fieldNames, obj):
    for field in fieldNames:
        stringFieldtoInt(field, obj)
