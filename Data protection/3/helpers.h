//
// Created by Sapfir on 28.11.2020.
//

#ifndef INC_3_HELPERS_H
#define INC_3_HELPERS_H

#include <string>
using namespace std;

string convertDecimalToBinary(int decimal);

int convertBinaryToDecimal(string binary);

// Function to do a circular left shift by 1
string shift_left_once(string key_chunk);

// Function to do a circular left shift by 2
string shift_left_twice(string key_chunk);

// Function to compute xor between two strings
string Xor(string a, string b);


#endif //INC_3_HELPERS_H
