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
        var lengthOfPlatform = 7;
        var destroyPointZ = -5;

        if (street[0].transform.position.z < destroyPointZ) {
            street.RemoveAt(0);
        }

        if (street.Count < 7) {
            var newStreetElement = street[rand.Next(street.Count-1)];
            
            newStreetElement.transform.position = new Vector3(0, 0, street[street.Count-1].transform.position.z + lengthOfPlatform);

            street.Add(newStreetElement);
        }

        foreach (GameObject item in street)
        {
            item.transform.position += new Vector3(0, 0, -speed * Time.deltaTime);
        }
    }
}
