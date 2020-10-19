using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;

public class Object1 : MonoBehaviour
{    
    public Dropdown selectFormObject1;

    public Dropdown selectColorObject1;
    public GameObject object1;

    void Start()
    {
        object1.GetComponent<Renderer>().material.color = Color.red;
        selectColorObject1 = selectColorObject1.GetComponent<Dropdown>();

        selectColorObject1.onValueChanged.AddListener(delegate {
            DropdownColorChanged(selectColorObject1);
        });

        selectFormObject1 = selectFormObject1.GetComponent<Dropdown>();
        selectFormObject1.onValueChanged.AddListener(delegate {
            DropdownFormChanged(selectFormObject1);
        });
    }

    void DropdownFormChanged(Dropdown change)
    {
        var tempObject = Utils.ChangeObjectForm(object1, change.value);
        Destroy(object1.GetComponent<Renderer>());
        object1 = tempObject;
        Debug.Log("Создаем новый объект");  
    }

    void DropdownColorChanged(Dropdown change)
    {
        Utils.ChangeColorForObject(object1, change.value);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
