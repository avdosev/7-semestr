using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Main : MonoBehaviour
{
// Start is called before the first frame update
    public Dropdown selectColorObject3;
    public Dropdown selectFormObject3;
    public GameObject object3; 

    public Dropdown selectColorObject2;
    public Dropdown selectFormObject2;
    public GameObject object2;
    public Dropdown selectFormObject1;

    public Dropdown selectColorObject1;
    public GameObject object1;

    void Start()
    {
        var objects = new List<GameObject> {object1, object2, object3};
        var colorsDropdown = new List<Dropdown> {selectColorObject1, selectColorObject2, selectColorObject3};
        var formsDropdown = new List<Dropdown> {selectFormObject1, selectFormObject2, selectFormObject3};

        for (int i = 0; i < objects.Count; i++) {
            var currentObject = objects[i];
            currentObject.GetComponent<Renderer>().material.color = Color.red;
            var selectColorObject = colorsDropdown[i].GetComponent<Dropdown>();

            selectColorObject.onValueChanged.AddListener(delegate {
                DropdownColorChanged(currentObject, selectColorObject);
            });

            var selectFormObject = formsDropdown[i].GetComponent<Dropdown>();
            selectFormObject.onValueChanged.AddListener(delegate {
                DropdownFormChanged(currentObject, selectFormObject);
            });
        }
 
    }

    void DropdownFormChanged(GameObject entity, Dropdown change)
    {
        var tempObject = Utils.ChangeObjectForm(entity, change.value);
        Destroy(entity.GetComponent<Renderer>());
        entity = tempObject;
    }
    void DropdownColorChanged(GameObject entity, Dropdown change)
    {
        Utils.ChangeColorForObject(entity, change.value);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
