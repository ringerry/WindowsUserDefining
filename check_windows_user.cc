#include <napi.h>

#ifndef UNICODE
#define UNICODE
#endif
#pragma comment(lib, "netapi32.lib")
#pragma warning(disable : 4996)

#include <stdio.h>
#include <windows.h>
#include <lm.h>
#include <locale.h>
#include <string>
#include <vector>
#include <algorithm>
#include <fstream>

std::string LPWSTRToString(LPWSTR str) 
{
    char buffer[5000];
    wcstombs(buffer, str, 5000);
    std::string newString(buffer);
    return newString;
}

bool IsUserExist(std::string userName)
{
    setlocale(LC_ALL, "Rus");
    DWORD dwlevel = 0;
    DWORD dwfilter = 0;
    USER_INFO_0* theEntries = new USER_INFO_0[2000];
    DWORD dwprefmaxlen = 512;
    DWORD dwentriesread;
    DWORD dwtotalentries;
    NET_API_STATUS result;

    

    std::ofstream out;          // поток для записи
    
    out.open(".\\Names.txt", std::ofstream::out | std::ofstream::trunc);
    out.close();
    
    // out.open(".\\Names.txt",ios_base::out | ios_base::app); // окрываем файл для записи
    // if (out.is_open())
    // {
    //     out << userName << std::endl;
    // }
     

    result = NetUserEnum(NULL, dwlevel, dwfilter, (LPBYTE*)&theEntries, dwprefmaxlen, &dwentriesread, &dwtotalentries, NULL);
    std::transform(userName.begin(), userName.end(), userName.begin(), ::toupper);

    for (int i = 0; i < dwentriesread; i++)
    {
        std::string curUserName = LPWSTRToString(theEntries[i].usri0_name);
        std::transform(curUserName.begin(), curUserName.end(), curUserName.begin(), ::toupper);

        // out << curUserName << std::endl;

        if ( curUserName == userName) 
        {
            return true;
        }
    }

    NetApiBufferFree(theEntries);

    return false;
}

Napi::Boolean IsUserNameExist(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() != 1) {
        Napi::TypeError::New(env, "Amount of parameters required: 1.").ThrowAsJavaScriptException();
    }
    
    if (!info[0].IsString()) {
        Napi::TypeError::New(env, "String expected.").ThrowAsJavaScriptException();
    }

    Napi::String userName = info[0].As<Napi::String>();


    return Napi::Boolean::New(env, IsUserExist(userName));
}

Napi::Object init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "IsUserNameExist"), Napi::Function::New(env, IsUserNameExist));
    return exports;
};

NODE_API_MODULE(check_windows_user, init);