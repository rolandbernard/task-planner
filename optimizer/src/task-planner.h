#ifndef TASK_PLANNER_H
#define TASK_PLANNER_H

#include "permutation-genetic-algorithm.h"

#include <vector>
#include <string>

struct Worker {
    int id;
    std::string name;
    std::string address;
    int maximum_time;
    double lon;
    double lat;
};

struct Client {
    int id;
    std::string name;
    std::string address;
    int working_time;
    double priority;
    double lon;
    double lat;
};

struct PlannedTask {
    Worker worker;
    Client client;
    int day;
    int time_of_day;
};

class TaskPlanner {
private:
    std::vector<Worker> workers;
    std::vector<Client> clients;
    std::vector<std::vector<long>> durations;
    PermutationGeneticAlgorithm ga;

    static double fittness(const std::vector<int>& sol, void* planner);

public:
    TaskPlanner();

    void initialize();

    void optimize(int n = 1);

    void setWorkers(std::vector<Worker> workers);

    void setClients(std::vector<Client> clients);

    void setDurations(std::vector<std::vector<long>> durations);

    double getPlanQuality();

    std::vector<std::vector<std::vector<PlannedTask>>> getPlanPerWorkerPerDay();

    std::vector<PlannedTask> getPlan();
};

#endif
