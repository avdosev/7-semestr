using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Object2 : MonoBehaviour
{
    public Dropdown selectColorObject2;
    public Dropdown selectFormObject2;


    public GameObject object2;
    void Start()
    {
        selectColorObject2 = selectColorObject2.GetComponent<Dropdown>();
        //Add listener for when the value of the Dropdown changes, to take action
        selectColorObject2.onValueChanged.AddListener(delegate {
            DropdownValueChanged(selectColorObject2);
        });
        selectFormObject2 = selectFormObject2.GetComponent<Dropdown>();
        selectFormObject2.onValueChanged.AddListener(delegate {
            DropdownFormChanged(selectFormObject2);
        });
    }

    void DropdownFormChanged(Dropdown change)
    {
        var tempObject = Utils.ChangeObjectForm(object2, change.value);
        Destroy(object2.GetComponent<Renderer>());
        object2 = tempObject;
        Debug.Log("Создаем новый объект");  
    }

    void DropdownValueChanged(Dropdown change)
    {
        Utils.ChangeColorForObject(object2, change.value);
    }

    // Update is called once per frame
    void Update()
    {

    }
}
