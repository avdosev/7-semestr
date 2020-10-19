using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Object3 : MonoBehaviour
{
    public Dropdown selectColorObject3;

    public Dropdown selectFormObject3;

    public GameObject object3; 
    
    void Start()
    {
        object3.GetComponent<Renderer>().material.color = Color.red;

        selectColorObject3 = selectColorObject3.GetComponent<Dropdown>();
        //Add listener for when the value of the Dropdown changes, to take action
        selectColorObject3.onValueChanged.AddListener(delegate {
            DropdownValueChanged(selectColorObject3);
        });
        selectFormObject3 = selectFormObject3.GetComponent<Dropdown>();
        selectFormObject3.onValueChanged.AddListener(delegate {
            DropdownFormChanged(selectFormObject3);
        });
    }

    void DropdownFormChanged(Dropdown change)
    {
        var tempObject = Utils.ChangeObjectForm(object3, change.value);
        Destroy(object3.GetComponent<Renderer>());
        object3 = tempObject;
        Debug.Log("Создаем новый объект");  
    }

    void DropdownValueChanged(Dropdown change)
    {
        Utils.ChangeColorForObject(object3, change.value);
    }


    // Update is called once per frame
    void Update()
    {

    }
}
