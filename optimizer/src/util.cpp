
#include "util.h"

#include <random>

std::mt19937_64 generator(time(NULL));

long random() {
    long n = (long)(generator());
    return n < 0 ? -n : n;
}

