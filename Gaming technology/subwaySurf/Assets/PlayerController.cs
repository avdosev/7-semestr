using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float maxSpeed = 10f; 
    /*private bool isMovingRight = false;
    private bool isMovingLeft = false;*/
    public Avatar player;
    public GameObject player2;
    private float gravity = 20f;
    private Animator anim;

    private Rigidbody rb;
    private float verticalSpeed = 500f;
    private Lines line = Lines.middle;

    enum Lines
    {
    left, middle, right
    }
    void Start()
    {
        anim = GetComponent<Animator>();
        InvokeRepeating("Move", 0f, 0.1f);
    }

    void Move()
    {
        var inputHorizontal = Input.GetAxis("Horizontal");
        Debug.Log(line);
        
        if (inputHorizontal > 0.0)
        {
            if (line == Lines.left || line == Lines.middle)
            {
                anim.SetTrigger("isMovingRight");
                player2.transform.position += new Vector3(3f, 0.0f, 0.0f);;
                line++;
            }
            
        }
        else if (inputHorizontal < 0.0)
        {
            if (line == Lines.right || line == Lines.middle)
            {
                anim.SetTrigger("isMovingLeft");
                player2.transform.position += new Vector3(-3f, 0.0f, 0.0f);;
                line--;
            }
        }
    }

    // Update is called once per frame
    void Update()
    {
        
        if (Input.GetButtonDown("Jump"))
        {
            anim.SetTrigger("isJump");
        }
        

    }
}
