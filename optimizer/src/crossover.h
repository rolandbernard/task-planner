#ifndef CROSSOVER_H
#define CROSSOVER_H

#include <vector>

namespace crossover {
    void cycle(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child_a, std::vector<int>& child_b);

    void order1(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child_a, std::vector<int>& child_b);

    void pmx(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child_a, std::vector<int>& child_b);
}

#endif
