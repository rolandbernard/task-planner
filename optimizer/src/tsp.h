#ifndef TSP_H
#define TSP_H

#include <vector>

std::vector<int> tspCircle(const std::vector<std::vector<long>>& dists);

std::vector<int> tspFromTo(int from, int to, const std::vector<std::vector<long>>& dists);

#endif
