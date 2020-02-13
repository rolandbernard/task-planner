#ifndef GENETIC_ALGORITHM_H
#define GENETIC_ALGORITHM_H

#include <vector>
#include <algorithm>
#include <array>
#include <random>
#include <map>
#include <cstdlib>
#include <climits>

#include "util.h"

enum crossover_type {
    CROSSOVER_PMX,
    CROSSOVER_ORDER1,
    CROSSOVER_CYCLE,
};

template<typename Callable, Callable& F, crossover_type C>
class permutation_genatic_algorithm {
private:
    int chromosome_lenght;
    int population_size;
    int surviver_count;
    double mutation_rate;
    double crossover_rate;

    std::vector<std::vector<int>> population_a;
    std::vector<std::vector<int>> population_b;

    std::vector<int> best_solution;
    int best_result;

    std::vector<long> evaluation_results;
    std::vector<long> evaluation_results_single;
    std::mt19937_64 generator;

public:
    permutation_genatic_algorithm(
        int chromosome_lenght,
        int population_size = 200,
        int surviver_count = 5,
        double mutation_rate = 0.1,
        double crossover_rate = 0.95
    ) : chromosome_lenght(chromosome_lenght), population_size(population_size),
        surviver_count(surviver_count),  mutation_rate(mutation_rate), crossover_rate(crossover_rate) {
            best_solution.resize(chromosome_lenght);
            population_b.resize(population_size);
            population_a.resize(population_size);
            for(auto& chrom : population_a) {
                chrom.resize(chromosome_lenght);
            }
            for(auto& chrom : population_b) {
                chrom.resize(chromosome_lenght);
            }
            evaluation_results.resize(population_size);
            evaluation_results_single.reserve(population_size);
    }

    void initialize() {
        iota(best_solution.begin(), best_solution.end(), 0);
        best_result = F(best_solution);
        for(auto& chrom : population_a) {
            chrom = best_solution;
            std::shuffle(chrom.begin(), chrom.end(), generator);
        }
    }

    void iterate(int n = 1) {
        while(n--) {
            single_iteration();
        }
    }

    const std::vector<int>& get_best_solution() {
        return best_solution;
    }

    int get_best_result() {
        return best_result;
    }

private:

    template <int N>
    std::array<std::vector<int>*, N> sample() {
        std::array<std::vector<int>*, N> selection;
        for(auto& samp : selection) {
            long position = random() % evaluation_results[population_size-1];
            samp = &population_a[std::lower_bound(evaluation_results.begin(), evaluation_results.end(), position)-evaluation_results.begin()];
        }
        return selection;
    }


    void single_iteration() {
        evaluation();
        combination();
        mutation();
    }

    void evaluation() {
        for(int i = 0; i < population_size; i++) {
            long result = F(population_a[i]);
            evaluation_results_single[i] = result;
            evaluation_results[i] = (i == 0 ? 0 : evaluation_results[i-1]) + result;
            if(result > best_result) {
                best_solution = population_a[i];
                best_result = result;
            }
        }
    }

    void combination() {
        int sorted[population_size];
        std::iota(sorted, sorted+population_size, 0);
        std::nth_element(sorted, sorted+surviver_count-1, sorted+population_size, [this](int a, int b) {
            return evaluation_results_single[a] > evaluation_results_single[b];
        });
        for(int i = 0; i < surviver_count; i++) {
            population_b[i] = population_a[sorted[i]];
        }
        for(int i = surviver_count; i < population_size; i++) {
            if(random() % 1000000 < (long)(crossover_rate * 1000000)) {
                auto selection = sample<2>();
                crossover(*(selection[0]), *(selection[1]), population_b[i]);
            } else {
                population_b[i] = population_a[i];
            }
        }
        population_a.swap(population_b);
    }

    void crossover(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child) {
        if (C == CROSSOVER_ORDER1) {
            crossoverOrder1(parent_a, parent_b, child);
        } else if(C == CROSSOVER_PMX) {
            crossoverPMX(parent_a, parent_b, child);
        } else if(C == CROSSOVER_CYCLE) {
            crossoverCycle(parent_a, parent_b, child);
        }
    }

    void crossoverCycle(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child) {
        int start = random() % chromosome_lenght;
        int end = random() % chromosome_lenght;
        if(start > end) {
            int tmp = start;
            start = end;
            end = tmp;
        }

        bool ins[chromosome_lenght];
        int ind[chromosome_lenght];
        for(int i = 0; i < chromosome_lenght; i++) {
            ins[i] = false;
            ind[parent_b[i]] = i;
        }
        for(int i = 0; i < chromosome_lenght; i++) {
            if(i%2 == 0) {
                int index = i;
                while(!ins[index]) {
                    child[index] = parent_b[index];
                    ins[index] = true;
                    index = ind[parent_a[index]];
                }
            } else {
                int index = i;
                while(!ins[index]) {
                    child[index] = parent_a[index];
                    ins[index] = true;
                    index = ind[parent_a[index]];
                }
            }
        }
    }

    void crossoverOrder1(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child) {
        int start = random() % chromosome_lenght;
        int end = random() % chromosome_lenght;
        if(start > end) {
            int tmp = start;
            start = end;
            end = tmp;
        }

        bool ins[chromosome_lenght];
        for(int i = 0; i < chromosome_lenght; i++) {
            ins[i] = false;
        }
        for(int i = start; i < end; i++) {
            child[i] = parent_a[i];
            ins[parent_a[i]] = true;
        }
        int index = 0;
        for(int i = 0; i < chromosome_lenght; i++) {
            if(!ins[parent_b[i]]) {
                if(index == start) {
                    index = end;
                }
                child[index] = parent_b[i];
                index++;
            }
        }
    }

    void crossoverPMX(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child) {
        int start = random() % chromosome_lenght;
        int end = random() % chromosome_lenght;
        if(start > end) {
            int tmp = start;
            start = end;
            end = tmp;
        }

        bool ins[chromosome_lenght];
        int ind[chromosome_lenght];
        for(int i = 0; i < chromosome_lenght; i++) {
            ins[i] = false;
            ind[parent_b[i]] = i;
        }
        for(int i = start; i < end; i++) {
            child[i] = parent_a[i];
            ins[parent_a[i]] = true;
        }
        for(int i = start; i < end; i++) {
            if(!ins[parent_b[i]]) {
                int index = i;
                while(index >= start && index < end) {
                    index = ind[parent_a[index]];
                }
                child[index] = parent_b[i];
                ins[parent_b[i]] = true;
            }
        }
        for(int i = 0; i < start; i++) {
            if(!ins[parent_b[i]]) {
                child[i] = parent_b[i];
            }
        }
        for(int i = end; i < chromosome_lenght; i++) {
            if(!ins[parent_b[i]]) {
                child[i] = parent_b[i];
            }
        }
    }

    void mutation() {
        std::binomial_distribution<int> binomial(chromosome_lenght, mutation_rate);
        for(auto chrom : population_a) {
            int n = binomial(generator);
            for(int i = 0; i < n; i++) {
                mutate(chrom);
            }
        }
    }

    void mutate(std::vector<int>& chrom) {
        int start = random() % chromosome_lenght;
        int end = random() % chromosome_lenght;

        int tmp = chrom[start];
        chrom[start] = chrom[end];
        chrom[end] = tmp;
    }

    long random() {
        return (long)(generator() & 0x7fffffffffffffffL);
    }
};

#endif
