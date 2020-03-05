
#include "task-planner.h"

#include <vector>
#include <algorithm>
#include <climits>

#include "crossover.h"
#include "mutation.h"
#include "sample.h"
#include "kmeans.h"
#include "tsp.h"
#include "util.h"

std::ostream& operator<<(std::ostream& os, const Worker& w) {
    os << "[\"" << w.name << "\", \"" << w.address << "\", " << w.maximum_time << ", " << w.lon << ", " << w.lat << "]";
    return os; 
}

std::ostream& operator<<(std::ostream& os, const Client& c) {
    os << "[\"" << c.name << "\", \"" << c.address << "\", " << c.working_time << ", " << c.priority << ", " << c.lon << ", " << c.lat << "]";
    return os; 
}

std::ostream& operator<<(std::ostream& os, const PlannedTask& pt) {
    os << "[" << pt.worker << ", " << pt.client << ", " << pt.day << ", " << pt.time_of_day << "]";
    return os; 
}

double TaskPlanner::fittness(const std::vector<int>& sol, void* user_data) {
    TaskPlanner* planner = (TaskPlanner*)user_data;
    int worker_count = planner->workers.size();
    long loss = 1;
    int current_worker = 0;
    int current_position = 0;
    int current_day = 0;
    int current_time_of_day = 0;
    for(int i = 0; i < sol.size(); i++) {
        if(sol[i]+1 < worker_count) {
            int next_worker = sol[i]+1;
            loss += planner->durations[current_position][current_worker];
            current_worker = next_worker;
            current_position = next_worker;
            current_day = 0;
            current_time_of_day = 0;
        } else {
            int next_position = sol[i]+1;
            int next_client = sol[i]+1-worker_count;
            if(current_time_of_day + planner->durations[current_position][next_position] + planner->clients[next_client].working_time
               + planner->durations[next_position][current_worker] > planner->workers[current_worker].maximum_time && current_time_of_day != 0)
            {
                loss += planner->durations[current_position][current_worker];
                current_position = current_worker;
                current_day++;
                current_time_of_day = 0;
            }
            loss += planner->durations[current_position][next_position];
            current_time_of_day += planner->durations[current_position][next_position];
            loss += planner->clients[next_client].priority * (current_time_of_day + current_day*1440);
            current_time_of_day += planner->clients[next_client].working_time;
            current_position = next_position;
        }
    }
    loss += planner->durations[current_position][current_worker];
    return 1.0L / (double)loss;
}

TaskPlanner::TaskPlanner() : ga(TaskPlanner::fittness, (void*)this, crossover::pmx, mutation::oneOf, sample::nonLinearAbsolute, 200, 1, 1, 0.5, 0.95) { }

void TaskPlanner::initialize() {
    int total_count = workers.size() + clients.size();
        /* std::vector<std::pair<long, long>> client_cords(clients.size()); */
        /* for(int i = 0; i < clients.size(); i++) { */
        /*     client_cords[i] = std::make_pair((long)(clients[i].lat*(1e8)), (long)(clients[i].lon*(1e8))); */
        /* } */
        /* auto clusters = kmeansMaxn(workers.size(), std::max<int>(15, 2*clients.size()/workers.size()), client_cords); */
        /* /1* auto clusters = kmeans(workers.size(), client_cords); *1/ */
        /* for(auto& cluster : clusters) { */
        /*     if(cluster.size() <= 15) { */
        /*         std::vector<std::vector<long>> sub_dists(cluster.size(), std::vector<long>(cluster.size())); */
        /*         for(int e1 = 0; e1 < cluster.size(); e1++) { */
        /*             for(int e2 = 0; e2 < cluster.size(); e2++) { */
        /*                 sub_dists[e1][e2] = durations[cluster[e1]][cluster[e2]]; */
        /*             } */
        /*         } */
        /*         auto tsp_cicle = tspCircle(sub_dists); */
        /*         std::vector<int> orderd_cluster(cluster.size()); */
        /*         for(int i = 0; i < cluster.size(); i++) { */
        /*             orderd_cluster[i] = cluster[tsp_cicle[i]]; */
        /*         } */
        /*         cluster.swap(orderd_cluster); */
        /*     } */
        /* } */
        /* ga.initialize(total_count-1, [&clusters, this](std::vector<int>& a) { */
        /*     int order[clusters.size()]; */
        /*     std::iota(order, order + clusters.size(), 0); */
        /*     std::shuffle(order, order + clusters.size(), generator); */
        /*     int i = 0; */
        /*     int current_worker = 0; */
        /*     for(auto o : order) { */
        /*         if(current_worker != 0) { */
        /*             a[i] = current_worker-1; */
        /*             i++; */
        /*         } */
        /*         auto& cluster = clusters[o]; */
        /*         if(cluster.size() <= 15) { */
        /*             long min_dist = LONG_MAX; */
        /*             int min_rot = 0; */
        /*             for(int j = 0; j < cluster.size(); j++) { */
        /*                 long dist = (durations[current_worker][cluster[j] + workers.size()] */
        /*                              + durations[current_worker][cluster[(cluster.size() + j - 1) % cluster.size()] + workers.size()]); */
        /*                 if(dist < min_dist) { */
        /*                     min_dist = dist; */
        /*                     min_rot = j; */
        /*                 } */
        /*             } */
        /*             std::rotate(cluster.begin(), cluster.begin() + min_rot, cluster.end()); */
        /*         } else { */
        /*             std::shuffle(cluster.begin(), cluster.end(), generator); */
        /*         } */
        /*         for(int j = 0; j < cluster.size(); j++) { */
        /*             a[i] = cluster[j] + workers.size() - 1; */
        /*             i++; */
        /*         } */
        /*         current_worker++; */
        /*     } */
        /* }, 100000); */
    ga.initialize(total_count-1, PermutationGeneticAlgorithm::default_init_function, 1000);
    ga.iterate(1);
}

void TaskPlanner::optimize(int n) {
    ga.iterate(n);
}

void TaskPlanner::setWorkers(std::vector<Worker> workers) {
    this->workers = workers;
}

void TaskPlanner::setClients(std::vector<Client> clients) {
    this->clients = clients;
}

void TaskPlanner::setDurations(std::vector<std::vector<long>> durations) {
    this->durations = durations;
}

double TaskPlanner::getPlanQuality() {
    return ga.getBestResult();
}

std::vector<std::vector<std::vector<PlannedTask>>> TaskPlanner::getPlanPerWorkerPerDay() {
    std::vector<std::vector<std::vector<PlannedTask>>> ret(workers.size(), std::vector<std::vector<PlannedTask>>(1));
    const auto& sol = ga.getBestSolution();
    int worker_count = workers.size();
    int current_worker = 0;
    int current_position = 0;
    int current_day = 0;
    int current_time_of_day = 0;
    for(int i = 0; i < sol.size(); i++) {
        if(sol[i]+1 < worker_count) {
            int next_worker = sol[i]+1;
            current_worker = next_worker;
            current_position = next_worker;
            current_day = 0;
            current_time_of_day = 0;
        } else {
            int next_position = sol[i]+1;
            int next_client = sol[i]+1-worker_count;
            if(current_time_of_day + durations[current_position][next_position] + clients[next_client].working_time
               + durations[next_position][current_worker] > workers[current_worker].maximum_time && current_time_of_day != 0)
            {
                current_position = current_worker;
                current_day++;
                ret[current_worker].push_back(std::vector<PlannedTask>());
                current_time_of_day = 0;
            }
            current_time_of_day += durations[current_position][next_position];
            ret[current_worker][current_day].push_back({
                .worker = workers[current_worker],
                .client = clients[next_client],
                .day = current_day,
                .time_of_day = current_time_of_day,
            });
            current_time_of_day += clients[next_client].working_time;
            current_position = next_position;
        }
    }
    return ret;
}

std::vector<PlannedTask> TaskPlanner::getPlan() {
    std::vector<PlannedTask> ret;
    const auto& sol = ga.getBestSolution();
    int worker_count = workers.size();
    int current_worker = 0;
    int current_position = 0;
    int current_day = 0;
    int current_time_of_day = 0;
    for(int i = 0; i < sol.size(); i++) {
        if(sol[i]+1 < worker_count) {
            int next_worker = sol[i]+1;
            current_worker = next_worker;
            current_position = next_worker;
            current_day = 0;
            current_time_of_day = 0;
        } else {
            int next_position = sol[i]+1;
            int next_client = sol[i]+1-worker_count;
            if(current_time_of_day + durations[current_position][next_position] + clients[next_client].working_time
               + durations[next_position][current_worker] > workers[current_worker].maximum_time && current_time_of_day != 0)
            {
                current_position = current_worker;
                current_day++;
                current_time_of_day = 0;
            }
            current_time_of_day += durations[current_position][next_position];
            ret.push_back({
                .worker = workers[current_worker],
                .client = clients[next_client],
                .day = current_day,
                .time_of_day = current_time_of_day,
            });
            current_time_of_day += clients[next_client].working_time;
            current_position = next_position;
        }
    }
    return ret;
}

