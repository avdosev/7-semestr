using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class Main : MonoBehaviour
{
    public List<GameObject> units;

    private int lastExecutedObjectIndex = 0; 
    // Start is called before the first frame update
    void Start()
    {
        
    }

    void MoveRight(GameObject obj)
    {
        if (obj.transform.position.x < 10)
        {
            obj.transform.position += Vector3.right;
        }
    }

    void MoveLeft(GameObject obj)
    {
        if (obj.transform.position.x > -10)
        {
            obj.transform.position += Vector3.left;
        }
    }
    
    void MoveUp(GameObject obj)
    {
        if (obj.transform.position.x < 4)
        {
            obj.transform.position += Vector3.up;
        }
    }
    
    void MoveDown(GameObject obj)
    {
        if (obj.transform.position.y > -4)
        {
            obj.transform.position += Vector3.down;
        }
    }

    // Update is called once per frame
    void Update()
    {
        for (int i=0; i<units.Count; i++)
        {
            if (i >= lastExecutedObjectIndex)
            {
                return;
            }
            MoveRight(units[i]);
            MoveDown(units[i]);
            Debug.Log(units[i].transform.position);
            lastExecutedObjectIndex++;
        }
    }
}
