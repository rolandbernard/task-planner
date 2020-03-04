
#include <emscripten.h>
#include <emscripten/bind.h>

#include <vector>

#include "task-planner.h"

EMSCRIPTEN_BINDINGS(Bindings) {
    emscripten::value_object<PlannedTask>("PlannedTask")
        .field("worker", &PlannedTask::worker)
        .field("client", &PlannedTask::client)
        .field("day", &PlannedTask::day)
        .field("time_of_day", &PlannedTask::time_of_day);
    emscripten::value_object<Worker>("Worker")
        .field("id", &Worker::id)
        .field("name", &Worker::name)
        .field("address", &Worker::address)
        .field("maximum_time", &Worker::maximum_time)
        .field("lon", &Worker::lon)
        .field("lat", &Worker::lat);
    emscripten::value_object<Client>("Client")
        .field("id", &Client::id)
        .field("address", &Client::address)
        .field("working_time", &Client::working_time)
        .field("priority", &Client::priority)
        .field("lon", &Client::lon)
        .field("lat", &Client::lat);
    emscripten::register_vector<PlannedTask>("VectorOfPlannedTask");
    emscripten::register_vector<std::vector<PlannedTask>>("BectorOfVectorOfPlannedTask");
    emscripten::register_vector<std::vector<std::vector<PlannedTask>>>("VectorOfVectorOfVectorOfPlannedTask");
    emscripten::register_vector<Worker>("VectorOfWorker");
    emscripten::register_vector<Client>("VectorOfClient");
    emscripten::register_vector<long>("VectorOfLong");
    emscripten::register_vector<std::vector<long>>("VectorOfVectorOfLong");
    emscripten::class_<TaskPlanner>("TaskPlanner")
        .constructor<>()
        .function("setWorkers", &TaskPlanner::setWorkers)
        .function("setClients", &TaskPlanner::setClients)
        .function("setDurations", &TaskPlanner::setDurations)
        .function("initialize", &TaskPlanner::initialize)
        .function("getPlan", &TaskPlanner::getPlan)
        .function("getPlanQuality", &TaskPlanner::getPlanQuality)
        .function("getPlanPerWorkerPerDay", &TaskPlanner::getPlanPerWorkerPerDay)
        .function("optimize", &TaskPlanner::optimize);
}

