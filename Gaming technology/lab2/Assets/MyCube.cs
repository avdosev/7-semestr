using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MyCube : MonoBehaviour
{
    public GameObject cube;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        float speed = 100;
        transform.RotateAround(new Vector3(0, 1, 0), new Vector3(0, 1, 0), speed * Time.deltaTime);
        
    }
}
