
#include "genetic_algorithm.h"

#include <vector>
#include <cstdlib>
#include <climits>
#include <iostream>

long fittness(const std::vector<int>& sol) {
    long ret = 0;
    for(int i = 1; i < sol.size(); i++) {
        ret += std::abs(sol[i] - sol[i-1])*(i%20);
    }
    return ret;
}

int main() {
    permutation_genatic_algorithm<decltype(fittness), fittness, CROSSOVER_ORDER1> ga(256);
    ga.initialize();

    long last_best = 0;
    for(int i = 0; i < 10; i++) {
        ga.iterate(500);
        if(ga.get_best_result() > last_best) {
            std::cout << ga.get_best_result() << std::endl;
            last_best = ga.get_best_result();
        }
    }
    std::cout << ga.get_best_solution() << std::endl;

    return EXIT_SUCCESS;
}

