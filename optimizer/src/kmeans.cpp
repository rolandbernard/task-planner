
#include "kmeans.h"

#include <vector>
#include <utility>
#include <random>
#include <cstdlib>
#include <climits>
#include <algorithm>

// computes only the means and not the clustering
static std::vector<std::pair<long, long>> kmeansGetMeans(int k, const std::vector<std::pair<long, long>>& points) {
    std::vector<std::pair<long, long>> means(k);
    // compute the initial means
    means[0] = points[0];
    for(int i = 1; i < k; i++) {
        long max_dist = LONG_MIN;
        int max_point = 0;
        for(int j = 0; j < points.size(); j++) {
            long min_dist = LONG_MAX;
            for(int p = 0; p < i; p++) {
                long dx = (means[p].first - points[j].first);
                long dy = (means[p].second - points[j].second);
                if(dx*dx + dy*dy < min_dist) {
                    min_dist = dx*dx + dy*dy;
                }
            }
            if(min_dist > max_dist) {
                max_dist = min_dist;
                max_point = j;
            }
        }
        means[i] = points[max_point];
    }
    bool change = true;
    for(int i = 0; i < 100 && change; i++) {
        change = false;
        // recompure means
        std::vector<std::pair<long, long>> new_means(k);
        std::vector<int> new_means_count(k);
        for(int j = 0; j < points.size(); j++) {
            long min_dist = LONG_MAX;
            int min_mean = 0;
            for(int p = 0; p < k; p++) {
                long dx = (means[p].first - points[j].first);
                long dy = (means[p].second - points[j].second);
                if(dx*dx + dy*dy < min_dist) {
                    min_dist = dx*dx + dy*dy;
                    min_mean = p;
                }
            }
            new_means[min_mean].first += points[j].first;
            new_means[min_mean].second += points[j].second;
            new_means_count[min_mean]++;
        }
        for(int j = 0; j < k; j++) {
            new_means[j].first /= new_means_count[j];
            new_means[j].second /= new_means_count[j];
            if(new_means[j] != means[j]) {
                change = true;
                means[j] = new_means[j];
            }
        }
    }
    return means;
}
std::vector<std::vector<int>> kmeans(int k, const std::vector<std::pair<long, long>>& points) {
    auto means = kmeansGetMeans(k, points);
    // compute the clusters
    std::vector<std::vector<int>> ret(k);
    for(int i = 0; i < points.size(); i++) {
        long min_dist = LONG_MAX;
        int min_mean = 0;
        for(int j = 0; j < k; j++) {
            long dx = (means[j].first - points[i].first);
            long dy = (means[j].second - points[i].second);
            if(dx*dx + dy*dy < min_dist) {
                min_dist = dx*dx + dy*dy;
                min_mean = j;
            }
        }
        ret[min_mean].push_back(i);
    }
    return ret;
}

std::vector<std::vector<int>> kmeansMaxn(int k, int n, const std::vector<std::pair<long, long>>& points) {
    auto means = kmeansGetMeans(k, points);
    // compute initial clusters
    std::vector<std::vector<int>> ret(k);
    for(int i = 0; i < points.size(); i++) {
        long min_dist = LONG_MAX;
        int min_mean = 0;
        for(int j = 0; j < k; j++) {
            long dx = (means[j].first - points[i].first);
            long dy = (means[j].second - points[i].second);
            if(dx*dx + dy*dy < min_dist) {
                min_dist = dx*dx + dy*dy;
                min_mean = j;
            }
        }
        ret[min_mean].push_back(i);
    }
    std::vector<std::pair<long, int>> dist_trade(points.size());
    std::vector<int> sorted_means(k);
    std::iota(sorted_means.begin(), sorted_means.end(), 0);
    std::sort(sorted_means.begin(), sorted_means.end(), [&ret](int a, int b) {
        return ret[a].size() > ret[b].size();
    });
    for(int i = 0; i < k; i++) {
        auto& col = ret[sorted_means[i]];
        while(col.size() > n) {
            // compute opertunity cost of changing to second best
            for(int j = 0; j < col.size(); j++) {
                long min_dist[2] = { LONG_MAX, LONG_MAX };
                int min_mean[2] = { 0, 0 };
                for(int p = i; p < k; p++) {
                    int o = sorted_means[p];
                    long dx = (means[o].first - points[col[j]].first);
                    long dy = (means[o].second - points[col[j]].second);
                    if(dx*dx + dy*dy < min_dist[0]) {
                        min_dist[1] = min_dist[0];
                        min_mean[1] = min_mean[0];
                        min_dist[0] = dx*dx + dy*dy;
                        min_mean[0] = o;
                    } else if(dx*dx + dy*dy < min_dist[1]) {
                        min_dist[1] = dx*dx + dy*dy;
                        min_mean[1] = o;
                    }
                }
                dist_trade[col[j]].first = min_dist[1] - min_dist[0];
                dist_trade[col[j]].second = min_mean[1];
            }
            // move last element to second option
            std::nth_element(col.begin(), col.end()-1, col.end(), [&dist_trade](int a, int b) {
                return dist_trade[a].first > dist_trade[b].first;
            });
            ret[dist_trade[col.back()].second].push_back(col.back());
            col.pop_back();
            // recompure means
            std::vector<std::pair<long, long>> new_means(k);
            std::vector<int> new_means_count(k);
            for(int j = 0; j < points.size(); j++) {
                long min_dist = LONG_MAX;
                int min_mean = 0;
                for(int p = 0; p < k; p++) {
                    long dx = (means[p].first - points[j].first);
                    long dy = (means[p].second - points[j].second);
                    if(dx*dx + dy*dy < min_dist) {
                        min_dist = dx*dx + dy*dy;
                        min_mean = p;
                    }
                }
                new_means[min_mean].first += points[j].first;
                new_means[min_mean].second += points[j].second;
                new_means_count[min_mean]++;
            }
            for(int j = 0; j < k; j++) {
                new_means[j].first /= new_means_count[j];
                new_means[j].second /= new_means_count[j];
                if(new_means[j] != means[j]) {
                    means[j] = new_means[j];
                }
            }
        }
    }
    return ret;
}

