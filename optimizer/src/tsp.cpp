
#include "tsp.h"

#include <vector>
#include <utility>
#include <climits>

static long tspCircleHelper(int len, int curr, long visited, const std::vector<std::vector<long>>& dists, std::vector<std::vector<std::pair<long, int>>>& dym) {
    if(visited + 1 == (1L << len)) {
        return dists[curr][0];
    } else if(dym[visited][curr].first == -1) {
        long min = LONG_MAX;
        int min_next = -1;
        for(int i = 0; i < len; i++) {
            if((visited & (1 << i)) == 0) {
                long res = tspCircleHelper(len, i, visited | (1L << i), dists, dym);
                res += dists[curr][i];
                if(min > res) {
                    min = res;
                    min_next = i;
                }
            }
        }
        dym[visited][curr].first = min;
        dym[visited][curr].second = min_next;
    }
    return dym[visited][curr].first;
}

std::vector<int> tspCircle(const std::vector<std::vector<long>>& dists) {
    std::vector<std::vector<std::pair<long, int>>> dym(1L << (dists.size()), std::vector<std::pair<long, int>>(dists.size(), std::make_pair(-1, -1)));
    tspCircleHelper(dists.size(), 0, 1, dists, dym);
    std::vector<int> ret;
    int pos = 0;
    int visited = 1;
    while(dym[visited][pos].second != -1) {
        ret.push_back(pos);
        pos = dym[visited][pos].second;
        visited |= (1 << pos);
    }
    ret.push_back(pos);
    return ret;
}

static long tspFromToHelper(int len, int curr, int dest, long visited, const std::vector<std::vector<long>>& dists, std::vector<std::vector<std::pair<long, int>>>& dym) {
    if((visited | (1L << dest)) + 1 == (1L << len)) {
        dym[visited][curr].first = dists[curr][dest];
        dym[visited][curr].second = dest;
    } else if(dym[visited][curr].first == -1) {
        long min = LONG_MAX;
        int min_next = -1;
        for(int i = 0; i < len; i++) {
            if(((visited & (1 << i)) == 0) && i != dest) {
                long res = tspFromToHelper(len, i, dest, visited | (1L << i), dists, dym);
                res += dists[curr][i];
                if(min > res) {
                    min = res;
                    min_next = i;
                }
            }
        }
        dym[visited][curr].first = min;
        dym[visited][curr].second = min_next;
    }
    return dym[visited][curr].first;
}

std::vector<int> tspFromTo(int from, int to, const std::vector<std::vector<long>>& dists) {
    std::vector<std::vector<std::pair<long, int>>> dym(1L << (dists.size()), std::vector<std::pair<long, int>>(dists.size(), std::make_pair(-1, -1)));
    tspFromToHelper(dists.size(), from, to, (1L << from), dists, dym);
    std::vector<int> ret;
    int pos = 0;
    int visited = 1;
    while(dym[visited][pos].second != -1) {
        ret.push_back(pos);
        pos = dym[visited][pos].second;
        visited |= (1 << pos);
    }
    ret.push_back(pos);
    return ret;
}

