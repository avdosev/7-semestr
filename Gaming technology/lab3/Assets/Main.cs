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
            objects[i].GetComponent<Renderer>().material.color = Color.red;
            var selectColorObject = colorsDropdown[i].GetComponent<Dropdown>();

            var newIndex = i; // чтобы при исполнении таски, мы не использовали последнее значение
            selectColorObject.onValueChanged.AddListener(delegate
            {
                DropdownColorChanged(objects[newIndex], selectColorObject);
            });

            var selectFormObject1 = formsDropdown[i].GetComponent<Dropdown>();
            selectFormObject1.onValueChanged.AddListener(delegate
            {
                DropdownFormChanged(newIndex, objects[newIndex], selectFormObject1);
            });
        }
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

    void Update()
    {
    }
}
