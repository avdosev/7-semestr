using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Utils 
{
    public static GameObject ChangeObjectForm(GameObject yourObject, int form) {
        var type = PrimitiveType.Cube;
        switch (form) {
            case 0:
                type = PrimitiveType.Cube;
                break;
            case 1:
                type = PrimitiveType.Sphere;
                break;
            case 2:
                type = PrimitiveType.Capsule;
                break;
        }
        var oldObject1 = yourObject.GetComponent<Renderer>();

        var newObject1 = GameObject.CreatePrimitive(type);
        var newObjectComponent = newObject1.GetComponent<Renderer>();
        newObjectComponent.material.color = oldObject1.material.color;
        newObjectComponent.transform.position = yourObject.transform.position;
        newObjectComponent.transform.localScale = yourObject.transform.localScale;
        return newObject1;
    }

    public static Color ChangeColorForObject(GameObject yourObject, int color) {
        var currentObject = yourObject.GetComponent<Renderer>();
        switch (color) {
            case 0:
                currentObject.material.color = Color.red;
                return Color.red;
            case 1:
                currentObject.material.color = Color.blue;
                return Color.blue;
            case 2:
                currentObject.material.color = Color.green;
                return Color.green;
            default:
                throw new System.Exception("Undefined color");
        }
    }


}
