using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    private Animator anim;
    private int speed = 100;

    public Rigidbody rb;
    private Lines line = Lines.middle;

    enum Lines
    {
    left, middle, right
    }
    void Start()
    {
        anim = GetComponent<Animator>();
        rb = GetComponent<Rigidbody>();
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
                Vector3 movement = new Vector3 (3f, 0.0f, 0f);
 
                rb.AddForce(movement * speed);
                line++;
            }
            
        }
        else if (inputHorizontal < 0.0)
        {
            if (line == Lines.right || line == Lines.middle)
            {
                anim.SetTrigger("isMovingLeft");
                Vector3 movement = new Vector3 (-3f, 0.0f, 0f);
 
                rb.AddForce (movement * speed);

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

    void FixedUpdate()
    {
        
        // Move(); // желательно move делать тут, но тогда срабатывает нажатие несколько раз, возможно, стоит анализировть keydown
    
    }
}
