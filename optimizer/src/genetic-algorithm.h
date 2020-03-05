#ifndef GENETIC_ALGORITHM_H
#define GENETIC_ALGORITHM_H

#include <vector>
#include <algorithm>
#include <array>
#include <random>
#include <map>
#include <cstdlib>
#include <climits>
#include <thread>
#include <cfloat>

#include "util.h"

template<typename G>
class GeneticAlgorithm {
protected:
    typedef double (*FittnessFunction)(const G&, void*);
    typedef void (*CrossoverFunction)(const G&, const G&, G&, G&);
    typedef void (*MutationFunction)(G&);
    typedef double (*SamplingFunction)(double, double, double);

    FittnessFunction F;
    void* user_data;
    CrossoverFunction X;
    MutationFunction M;
    SamplingFunction S;

    int population_size;
    int surviver_count;
    int mutation_count;
    double mutation_rate;
    double crossover_rate;

    std::vector<G> population_a;
    std::vector<G> population_b;

    G best_solution;
    double best_result = 0;
    double current_worst = DBL_MAX;
    double current_best = 0;

    std::vector<double> evaluation_results;
    std::vector<double> evaluation_results_single;

public:
    GeneticAlgorithm(
        FittnessFunction F,
        void* user_data,
        CrossoverFunction X,
        MutationFunction M,
        SamplingFunction S,
        int population_size = 200,
        int surviver_count = 5,
        int mutation_count = 1,
        double mutation_rate = 0.1,
        double crossover_rate = 0.95
    ) : F(F), user_data(user_data), X(X), M(M), S(S), population_size(population_size), surviver_count(surviver_count), mutation_count(mutation_count), mutation_rate(mutation_rate), crossover_rate(crossover_rate) {
        population_b.resize(population_size+1);
        population_a.resize(population_size+1);
        evaluation_results.resize(population_size);
        evaluation_results_single.resize(population_size);
    }

    template<typename CI, CI I>
    void initialize() {
        for(auto& chrom : population_a) {
            I(chrom);
        }
        this->best_result = 0;
    }

    void iterate(int n = 1) {
        while(n--) {
            singleIteration();
        }
    }

    const G& getBestSolution() {
        return best_solution;
    }

    double getBestResult() {
        return best_result;
    }

    double getCurrentWorst() {
        return current_worst;
    }

    double getCurrentBest() {
        return current_best;
    }

protected:
    template <int N>
    std::array<G*, N> sample() {
        std::array<G*, N> selection;
        for(auto& samp : selection) {
            double position = (random() * evaluation_results[population_size-1]) / (double)LONG_MAX;
            int index = std::lower_bound(evaluation_results.begin(), evaluation_results.end(), position) - evaluation_results.begin();
            samp = &population_a[index < population_size ? index : population_size-1];
        }
        return selection;
    }


    void singleIteration() {
        evaluation();
        combination();
        mutation();
    }

    void evaluation() {
        current_worst = DBL_MAX;
        current_best = 0;
        for(int i = 0; i < population_size; i++) {
            double result = F(population_a[i], user_data);
            evaluation_results_single[i] = result;
            if(result > best_result) {
                best_solution = population_a[i];
                best_result = result;
            }
            if(result < current_worst) {
                current_worst = result;
            }
            if(result > current_best) {
                current_best = result;
            }
        }
        evaluation_results[0] = S(evaluation_results_single[0], current_worst, best_result);
        for(int i = 1; i < population_size; i++) {
            evaluation_results[i] = evaluation_results[i-1] + S(evaluation_results_single[i], current_worst, best_result);
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
        for(int i = surviver_count; i < population_size; i+=2) {
            auto selection = sample<2>();
            if(random() % 1000000 < (long)(crossover_rate * 1000000)) {
                X(*(selection[0]), *(selection[1]), population_b[i], population_b[i+1]);
            } else {
                population_b[i] = *(selection[0]);
                population_b[i+1] = *(selection[1]);
            }
        }
        population_a.swap(population_b);
    }

    void mutation() {
        if(mutation_count == 1) {
            for(int i = surviver_count; i < population_a.size(); i++) {
                if(random() % 1000000 < (long)(mutation_rate * 1000000)) {
                    M(population_a[i]);
                }
            }
        } else {
            std::binomial_distribution<int> binomial(mutation_count, mutation_rate);
            for(int i = surviver_count; i < population_a.size(); i++) {
                int n = binomial(generator);
                for(int i = 0; i < n; i++) {
                    M(population_a[i]);
                }
            }
        }
    }
};

#endif
