
#include "genetic_algorithm.h"

#include <vector>
#include <cstdlib>
#include <climits>
#include <iostream>

long fittness(const std::vector<int>& sol) {
    long ret = 0;
    for(int i = 1; i < sol.size(); i++) {
        ret += std::abs(sol[i] - sol[i-1]);
    }
    return ret;
}

int main() {
    permutation_genatic_algorithm<decltype(fittness), fittness, PMX> ga(256);
    ga.initialize();

    long last_best = 0;
    for(int i = 0; i < 100; i++) {
        ga.iterate(50);
        if(ga.get_best_result() > last_best) {
            std::cout << ga.get_best_result() << /*" " << ga.get_best_solution() <<*/ std::endl;
            last_best = ga.get_best_result();
        }
    }

    return EXIT_SUCCESS;
}

