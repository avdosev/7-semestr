cmake_minimum_required(VERSION 3.17)
project(mylibpng)

set(CMAKE_CXX_STANDARD 17)

include(conanbuildinfo.cmake)
conan_basic_setup()

add_executable(mylibpng src/main.cpp src/lib.cpp src/lib.h)

target_link_libraries(mylibpng ${CONAN_LIBS})