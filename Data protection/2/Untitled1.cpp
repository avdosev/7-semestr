//-------------------------------------------------------------------
#include "windows.h"
#include "Wincrypt.h"
#include <stdio.h>
#include <iostream>


int main() {
	DWORD dwIndex=0;
	DWORD dwType;
	DWORD cbName;
	LPTSTR pszName;
	while (CryptEnumProviders(dwIndex, NULL, 0, &dwType, NULL, &cbName))
	{
	  if (!cbName)
	    break;
	   
	  if (!(pszName = (LPTSTR)LocalAlloc(LMEM_ZEROINIT, cbName)))
	    return 0;
	  
	  if (!CryptEnumProviders(dwIndex++, NULL, 0, &dwType, pszName, &cbName))
	  { 
	    //Error("CryptEnumProviders");
	    return 0;
	  }
	  
	  std::cout<<"--------------------------------"<<std::endl;
	  std::cout<<"Provider name: "<<pszName<<std::endl; 
	  std::cout<<"Provider type: "<<dwType<<std::endl;
	  
	  LocalFree(pszName);
	}	
	
}

