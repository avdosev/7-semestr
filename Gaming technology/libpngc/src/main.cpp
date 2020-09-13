#include <string>
#include "lib.h"
#include <iostream>

int main(int argc, char** argv) {
    if (argc < 3) {
        std::cout << "args not found";
        std::cout << "args: src_image destination_image";
        return -1;
    }

    std::string src = argv[1], dest = argv[2];
    std::cout << "src: " <<  src;
    std::cout << "dest: " <<  dest;


    read_png_file(src);


    return 0;
}


