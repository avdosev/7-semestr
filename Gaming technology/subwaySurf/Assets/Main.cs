using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Main : MonoBehaviour
{
    public List<GameObject> street = new List<GameObject>();
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        var speed = 5;
        // Debug.Log(street[0].transform.position.z);

        var destroyPointZ = -15;
        if (street[0].transform.position.z < destroyPointZ) {
            var newStreetElement = street[0];
            newStreetElement.transform.position += new Vector3(0, 0, 25);

            street.Add(newStreetElement);

            Debug.Log(street[0].transform.position.z);

            street.RemoveAt(0);
        }

        foreach (GameObject item in street)
        {
            item.transform.position += new Vector3(0, 0, -speed * Time.deltaTime);
        }
    }
}
