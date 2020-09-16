#include <iostream>
#include "lib.h"

int main(int argc, char** argv) {

    char* src = "C:\\Users\\Sapfir\\Documents\\6\\libpngc\\data\\4.png";
    char* dest0 = "C:\\Users\\Sapfir\\Documents\\6\\libpngc\\data\\out0.png";
    char* dest6 = "C:\\Users\\Sapfir\\Documents\\6\\libpngc\\data\\out6.png";
    char* dest9 = "C:\\Users\\Sapfir\\Documents\\6\\libpngc\\data\\out9.png";

    read_png_file(src);
    process_file();
    write_png_file(dest0, 0);
    write_png_file(dest6, 6);
    write_png_file(dest9, 9);


    return 0;
}
