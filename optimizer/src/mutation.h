#ifndef MUTATION_H
#define MUTATION_H

#include <vector>

namespace mutation {
    void swap(std::vector<int>& chrom);

    void insert(std::vector<int>& chrom);

    void inversion(std::vector<int>& chrom);

    void scramble(std::vector<int>& chrom);

    void rotate(std::vector<int>& chrom);

    void moveRange(std::vector<int>& chrom);

    void oneOf(std::vector<int>& chrom);

    void none(std::vector<int>& chrom);
}

#endif
