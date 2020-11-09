using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float maxSpeed = 10f; 
    private bool isMovingRight = false;
    private bool isMovingLeft = false;


    private Animator anim;
    
    // Start is called before the first frame update
    void Start()
    {
        anim = GetComponent<Animator>();
    }

    // Update is called once per frame
    void Update()
    {

        if (Input.GetButtonDown("Jump"))
        {
            Debug.Log("Jump");
        }

        var inputHorizontal = Input.GetAxis("Horizontal");

        if (inputHorizontal > 0.0)
        {
            Debug.Log("right");
        }
        else if (inputHorizontal < 0.0)
        {
            Debug.Log("Left");

        }

    }
}
