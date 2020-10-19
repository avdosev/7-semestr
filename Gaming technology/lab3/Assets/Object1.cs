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
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("Started");
        selectColorObject1 = selectColorObject1.GetComponent<Dropdown>();
        //Add listener for when the value of the Dropdown changes, to take action
        selectColorObject1.onValueChanged.AddListener(delegate {
            DropdownValueChanged(selectColorObject1);
        });
    }

    //Ouput the new value of the Dropdown into Text
    void DropdownValueChanged(Dropdown change)
    {
        Utils.ChangeColorForObject(object1, change.value);
    }

    //Run your mouse over the GameObject to change the Renderer's material color to black

    // Update is called once per frame
    void Update()
    {
        
    }
}
