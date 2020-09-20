//-------------------------------------------------------------------
#include "windows.h"
#include "Wincrypt.h"
#include <stdio.h>
#include <iostream>
#include <ctime>
#include <fstream>
#include "vector"
#include "string"

int main() {
    DWORD dwIndex = 0;
    DWORD dwType;
    DWORD cbName;
    LPTSTR pszName;
    while (CryptEnumProviders(dwIndex, NULL, 0, &dwType, NULL, &cbName)) {
        if (!cbName)
            break;

        if (!(pszName = (LPTSTR) LocalAlloc(LMEM_ZEROINIT, cbName)))
            return 0;

        if (!CryptEnumProviders(dwIndex++, NULL, 0, &dwType, pszName, &cbName)) {
            //Error("CryptEnumProviders");
            return 0;
        }

        std::cout << "--------------------------------" << std::endl;
        std::cout << "Provider name: " << pszName << std::endl;
        std::cout << "Provider type: " << dwType << std::endl;

        LocalFree(pszName);
    }


    std::cout << std::endl;

    // тест времени

    HCRYPTPROV hCryptProv = NULL; // дескриптор криптопровайдера
    LPCSTR UserName = "MyKeyContainer"; // название ключевого контейнера
    HCRYPTKEY hKey; // дескриптор ключа
//-------------------------------------------------------------------
    unsigned int start_time_all = clock(); // начальное время

// Инициализация криптопровайдера, получение дескриптора криптопровайдера
    if(CryptAcquireContext(
            &hCryptProv, // дескриптор криптопровайдера
            UserName, // название ключевого контейнера
            NULL, // используем криптопровайдер по-умолчанию (Microsoft)
            PROV_RSA_FULL, // тип провайдера
            0)) // значение флага (выставляется в 0, чтобы предоставить
// возможность открывать существующий ключевой контейнер)
    {
        printf("A cryptographic context with the %s key container \n",
               UserName);
        printf("has been acquired.\n\n");

    }
    else
    {
//-------------------------------------------------------------------
// Возникла ошибка при инициализации криптопровайдера. Это может
// означать, что ключевой контейнер не был открыт, либо не существует.
// В этом случае функция получения дескриптора криптопровайдера может быть
// вызвана повторно, с измененным значением флага, что позволит создать
// новый ключевой контейнер.Коды ошибок определены в Winerror.h.
        if (GetLastError() == NTE_BAD_KEYSET)
        {
            if(CryptAcquireContext(
                    &hCryptProv,
                    UserName,
                    NULL,
                    PROV_RSA_FULL,
                    CRYPT_NEWKEYSET))
            {
                printf("A new key container has been created.\n");
            }
            else
            {
                printf("Could not create a new key container.\n");
                exit(1);
            }
        }
        else
        {
            printf("A cryptographic service handle could not be "
                   "acquired.\n");
            exit(1);
        }
    } // Конец если.
//-------------------------------------------------------------------

// Создание случайного сессионного ключа


    int resultOfKeyGenerator = CryptGenKey(
            hCryptProv,
            CALG_RC4,
            CRYPT_EXPORTABLE,
            &hKey);


    std::ifstream file("../Automotive_5.json");
    if (!file.is_open()) {
        std::cout << "File not opened";
        return 0;
    }

    std::vector<char> vector;


    for (std::string line; std::getline(file, line); ){
        for (auto ch: line) {
            vector.push_back(ch);
        }
    }

    auto string = vector.data();


    DWORD count= vector.size();


    unsigned int start_time = clock(); // начальное время
    if (!CryptEncrypt(hKey, 0, true, 0, (BYTE*)string, &count, strlen(string)))
    {
        std::cout << "CryptEncrypt Error";
        return 0;
    }
    //std::cout << string << std::endl;
    unsigned int end_time = clock(); // конечное время
    unsigned int search_time = end_time - start_time;
    std::cout << "Encrypted time: " << search_time << "ms" << std::endl;


    unsigned int start_time2 = clock(); // начальное время
    if(!CryptDecrypt(hKey, 0, true, 0, (BYTE*)string, &count))
    {
        std::cout << "CryptDecrypt";
        return 0;
    }
    //std::cout << string << std::endl;
    unsigned int end_time2 = clock(); // конечное время
    unsigned int search_time2 = end_time2 - start_time2;
    std::cout << "Decrypted time: " << search_time2 << "ms" << std::endl;



    //
    if(resultOfKeyGenerator)
    {
        printf("A session key has been created.\n");

    }
    else
    {
        printf("Error during CryptGenKey.\n");
        exit(1);
    }
//-------------------------------------------------------------------
// По окончании работы все дескрипторы должны быть удалены.
    if (!CryptDestroyKey(hKey)) // удаление дескриптора ключа
    {
        printf("Error during CryptDestroyKey.\n");
        exit(1);
    }
    if (CryptReleaseContext(hCryptProv,0)) // удаление дескриптора криптопровайдера
    {
        printf("The handle has been released.\n");
    }
    else
    {
        printf("The handle could not be released.\n");
    }


    unsigned int end_time_all = clock(); // конечное время
    unsigned int search_time_all = end_time_all - start_time_all;
    std::cout << "All work time: " << search_time_all << "ms" << std::endl;

}

