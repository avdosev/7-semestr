// Including dependencies
#include <iostream>
#include <string>
#include <cmath>
#include "constants.h"
#include "helpers.h"

using namespace std;

// Array to hold 16 keys
string round_keys[16];
// String to hold the plain text
string pt;
// Function to convert a number in decimal to binary

// Function to generate the 16 keys.
void generate_keys(string key){
    // 1. Compressing the key using the PC1 table
    string perm_key ="";
    for(int i : pc1){
        perm_key+= key[i-1];
    }
    // 2. Dividing the key into two equal halves
    string left= perm_key.substr(0, 28);
    string right= perm_key.substr(28, 28);
    for(int i=0; i<16; i++){
        // 3.1. For rounds 1, 2, 9, 16 the key_chunks
        // are shifted by one.
        if(i == 0 || i == 1 || i==8 || i==15 ){
            left= shift_left_once(left);
            right= shift_left_once(right);
        }
            // 3.2. For other rounds, the key_chunks
            // are shifted by two
        else{
            left= shift_left_twice(left);
            right= shift_left_twice(right);
        }
        // Combining the two chunks
        string combined_key = left + right;
        string round_key = "";
        // Finally, using the PC2 table to transpose the key bits
        for(int i : pc2){
            round_key += combined_key[i-1];
        }
        round_keys[i] = round_key;
    }

}
// Implementing the algorithm
string DES(){

    //1. Applying the initial permutation
    string perm = "";
    for(int i : initial_permutation){
        perm += pt[i-1];
    }
    // 2. Dividing the result into two equal halves
    string left = perm.substr(0, 32);
    string right = perm.substr(32, 32);
    // The plain text is encrypted 16 times
    for(int i=0; i<16; i++) {
        string right_expanded;
        // 3.1. The right half of the plain text is expanded
        for(int i : expansion_table) {
            right_expanded += right[i-1];
        };  // 3.3. The result is xored with a key
        string xored = Xor(round_keys[i], right_expanded);
        string res;
        // 3.4. The result is divided into 8 equal parts and passed
        // through 8 substitution boxes. After passing through a
        // substituion box, each box is reduces from 6 to 4 bits.
        for(int i=0;i<8; i++){
            // Finding row and column indices to lookup the
            // substituition box
            string row1= xored.substr(i*6,1) + xored.substr(i*6 + 5,1);
            int row = convertBinaryToDecimal(row1);
            string col1 = xored.substr(i*6 + 1,1) + xored.substr(i*6 + 2,1) + xored.substr(i*6 + 3,1) + xored.substr(i*6 + 4,1);;
            int col = convertBinaryToDecimal(col1);
            int val = substition_boxes[i][row][col];
            res += convertDecimalToBinary(val);
        }
        // 3.5. Another permutation is applied
        string perm2;
        for(int i : permutation_tab){
            perm2 += res[i-1];
        }
        // 3.6. The result is xored with the left half
        xored = Xor(perm2, left);
        // 3.7. The left and the right parts of the plain text are swapped
        left = xored;
        if(i < 15){
            string temp = right;
            right = xored;
            left = temp;
        }
    }
    // 4. The halves of the plain text are applied
    string combined_text = left + right;
    string ciphertext;
    // The inverse of the initial permuttaion is applied
    for(int i : inverse_permutation){
        ciphertext+= combined_text[i-1];
    }
    //And we finally get the cipher text
    return ciphertext;
}
int main(){
    // A 64 bit key
    string key= "1010101010111011000010010001100000100111001101101100110011011101";
    // A block of plain text of 64 bits
    pt= "1010101111001101111001101010101111001101000100110010010100110110";
    // Calling the function to generate 16 keys
    generate_keys(key);
    cout<<"Plain text: "<<pt<<endl;
    // Applying the algo
    string ct= DES();
    cout<<"Ciphertext: "<<ct<<endl;
}