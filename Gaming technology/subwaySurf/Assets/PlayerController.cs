using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float maxSpeed = 10f; 
    /*private bool isMovingRight = false;
    private bool isMovingLeft = false;*/
    public Avatar player;
    private float gravity = 20f;
    private Animator anim;
    private float verticalSpeed = 500f;
    private int line = 1;
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
            anim.SetTrigger("isJump");
            verticalSpeed -= gravity * Time.deltaTime;

            transform.position += new Vector3(0f, verticalSpeed * Time.deltaTime, 0f);

            if (transform.position.y <= 0.0)
            {
                transform.position = new Vector3(transform.position.x, 0f, transform.position.z);
            }
        }

        var inputHorizontal = Input.GetAxis("Horizontal");
        
        if (inputHorizontal > 0.0)
        {
            if (line < 2)
            {
                anim.SetTrigger("isMovingRight");
            }
            
        }
        else if (inputHorizontal < 0.0)
        {
            if (line > 0)
            {
                anim.SetTrigger("isMovingLeft");
            }
        }

    }
}
