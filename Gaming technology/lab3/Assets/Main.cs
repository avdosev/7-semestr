using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Main : MonoBehaviour
{
    public List<GameObject> objects;

    public List<Dropdown> colorsDropdown;

    public List<Dropdown> formsDropdown;


    void Start()
    {
        for (int i = 0; i < objects.Count; i++)
        {
            var currentObject = objects[i];
            currentObject.GetComponent<Renderer>().material.color = Color.red;
            var selectColorObject = colorsDropdown[i].GetComponent<Dropdown>();

            selectColorObject.onValueChanged.AddListener(delegate
            {
                DropdownColorChanged(currentObject, selectColorObject);
            });
        }

        for (int i = 0; i < objects.Count; i++)
        {

        }
        var selectFormObject1 = formsDropdown[0].GetComponent<Dropdown>();
        selectFormObject1.onValueChanged.AddListener(delegate
        {
            DropdownFormChanged(0, objects[0], selectFormObject1);
        });
        var selectFormObject2 = formsDropdown[1].GetComponent<Dropdown>();
        selectFormObject2.onValueChanged.AddListener(delegate
        {
            DropdownFormChanged(1, objects[1], selectFormObject2);
        });

        var selectFormObject3 = formsDropdown[2].GetComponent<Dropdown>();
        selectFormObject3.onValueChanged.AddListener(delegate
        {
            DropdownFormChanged(2, objects[2], selectFormObject3);
        });
    }

    void DropdownColorChanged(GameObject entity, Dropdown change)
    {
        Utils.ChangeColorForObject(entity, change.value);
    }

    GameObject DropdownFormChanged(int index, GameObject entity, Dropdown change)
    {
        var tempObject = Utils.ChangeObjectForm(entity, change.value);
        Destroy(entity.GetComponent<Renderer>());
        objects[index] = tempObject;

        return tempObject;
    }

    // Update is called once per frame
    void Update()
    {



    }
}
