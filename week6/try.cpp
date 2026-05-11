#include <iostream>
using namespace std;

class Employee
{
private:
    string name;
    int age;

public:
    Employee(string name, int age)
    {
        this->name = name;
        this->age = age;
    }
}