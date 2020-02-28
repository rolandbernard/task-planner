#ifndef KMEANS_H
#define KMEANS_H

#include <vector>
#include <utility>

std::vector<std::vector<int>> kmeans(int k, const std::vector<std::pair<long, long>>& points);

std::vector<std::vector<int>> kmeansMaxn(int k, int n, const std::vector<std::pair<long, long>>& points);

#endif
