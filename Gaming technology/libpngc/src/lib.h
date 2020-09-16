//
// Created by Sapfir on 11.09.2020.
//

#ifndef MYLIBPNG_LIB_H
#define MYLIBPNG_LIB_H

#include <string>

void read_png_file(char* file_name);
void saveWithCompression(int compression);
void write_png_file(char* file_name, int compression);
void process_file();


#endif //MYLIBPNG_LIB_H
