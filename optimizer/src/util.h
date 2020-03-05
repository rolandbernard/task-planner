#ifndef UTIL_H
#define UTIL_H

#include <vector>
#include <utility>
#include <iostream>
#include <random>

template <typename T>
std::ostream& operator<<(std::ostream& os, const std::vector<T>& v) {
    os << "[";
    for (int i = 0; i < v.size(); ++i) { 
        os << v[i]; 
        if (i != v.size() - 1) 
            os << ", "; 
    } 
    os << "]"; 
    return os; 
}

template <typename T, typename R>
std::ostream& operator<<(std::ostream& os, const std::pair<T, R>& v) {
    os << "[" << v.first << ", " << v.second << "]";
    return os; 
}

extern std::mt19937_64 generator;

long random();

#endif
