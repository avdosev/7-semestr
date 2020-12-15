using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlayerController : MonoBehaviour
{
    private Animator anim;
    private int speed = 100;
    private int coins = 0;
    public Text loserUiText; 
    public Text coinsScore; 


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
        loserUiText.text = "";

        InvokeRepeating("Move", 0f, 0.2f);

    }


    void OnCollisionEnter(Collision collision)
    {
        Debug.Log("Бах");
        loserUiText.text = "Проигрыш";
    }

    private void OnTriggerEnter(Collider other)
    {
        coins += 10;
        Debug.Log($"Чпоньк, Счет: {coins}");
        coinsScore.text = $"Счет: {coins}";
    }


    void Move()
    {
        var inputHorizontal = Input.GetAxis("Horizontal");
        
        if (inputHorizontal > 0.0)
        {
            if (line == Lines.left || line == Lines.middle)
            {
                anim.SetTrigger("isMovingRight");
                Vector3 movement = new Vector3 (3.1f, 0.0f, 0f);
 
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
