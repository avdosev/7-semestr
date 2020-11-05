using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class Main : MonoBehaviour
{
    public List<GameObject> street = new List<GameObject>();
    public System.Random rand = new System.Random();

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        var speed = 5;
        // Debug.Log(street[0].transform.position.z);

        var destroyPointZ = -10;
        if (street[0].transform.position.z < destroyPointZ) {
            // Debug.Log(rand.Next(street.Count-1));
            // var newStreetElement = street[0];
            // newStreetElement.transform.position = new Vector3(0, 0, 25);
            var newStreetElement = street[rand.Next(street.Count-1)];
            newStreetElement.transform.position = new Vector3(5, -12, 25);

            street.Add(newStreetElement);

            // Debug.Log(street[0].transform.position.z);

            street.RemoveAt(0);
        }

        foreach (GameObject item in street)
        {
            item.transform.position += new Vector3(0, 0, -speed * Time.deltaTime);
        }
    }
}
