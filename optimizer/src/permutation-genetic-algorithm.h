#ifndef PERMUTATION_GENETIC_ALGORITHM_H
#define PERMUTATION_GENETIC_ALGORITHM_H

#include <vector>
#include <algorithm>
#include <array>
#include <random>
#include <map>
#include <cstdlib>
#include <climits>
#include <thread>

#include "genetic-algorithm.h"
#include "util.h"

class PermutationGeneticAlgorithm : public GeneticAlgorithm<std::vector<int>> {
protected:
    int chromosome_lenght;

public:
    static void default_init_function(std::vector<int>& chrom) {
        iota(chrom.begin(), chrom.end(), 0);
        std::shuffle(chrom.begin(), chrom.end(), generator);
    }

public:
    PermutationGeneticAlgorithm(
        GeneticAlgorithm<std::vector<int>>::FittnessFunction F,
        void* user_data,
        GeneticAlgorithm<std::vector<int>>::CrossoverFunction X,
        GeneticAlgorithm<std::vector<int>>::MutationFunction M,
        GeneticAlgorithm<std::vector<int>>::SamplingFunction S,
        int population_size = 200,
        int surviver_count = 1,
        int mutation_count = 1,
        double mutation_rate = 0.5,
        double crossover_rate = 0.95
    ) : GeneticAlgorithm<std::vector<int>>(F, user_data, X, M, S, population_size, surviver_count, mutation_count, mutation_rate, crossover_rate) {
    }

    template<typename C = decltype(default_init_function)>
    void initialize(int chromosome_lenght, C init_function = default_init_function, int init_size = 10000) {
        std::vector<std::vector<int>> init_population(init_size, std::vector<int>(chromosome_lenght));
        std::vector<double> init_population_fittness(init_size);
        for(int i = 0; i < init_size; i++) {
            init_function(init_population[i]);
            init_population_fittness[i] = F(init_population[i], user_data);
        }
        std::vector<int> sorted(init_size);
        std::iota(sorted.begin(), sorted.end(), 0);
        std::nth_element(sorted.begin(), sorted.begin() + population_size, sorted.end(), [&init_population_fittness](int a, int b) {
            return init_population_fittness[a] > init_population_fittness[b];
        });
        for(int i = 0; i < population_size+1; i++) {
            population_a[i].swap(init_population[sorted[i]]);
        }
        this->chromosome_lenght = chromosome_lenght;
        best_solution.resize(chromosome_lenght);
        iota(best_solution.begin(), best_solution.end(), 0);
        best_result = 0;
        for(auto& chrom : population_b) {
            chrom.resize(chromosome_lenght);
        }
    }
};

#endif
