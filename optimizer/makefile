OBJECTS=$(BUILD)/optimizer.o $(BUILD)/util.o $(BUILD)/mutation.o $(BUILD)/crossover.o $(BUILD)/sample.o $(BUILD)/tsp.o $(BUILD)/kmeans.o $(BUILD)/task-planner.o
LIBS=
ARGS=-Wall -std=c++17 -O3
DEBUGARGS=-Wall -std=c++17 -O0 -g -fsanitize=address,undefined
WASMARGS=--bind -s MODULARIZE=1 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s EXPORT_NAME=Optimizer -s ENVIRONMENT=web,worker -s FILESYSTEM=0
CLEAN=rm -f
CPPC=emcc
SRC=./src
BUILD=./build

all:
	mkdir -p $(BUILD)
	make $(BUILD)/optimizer.js

$(BUILD)/optimizer.js: $(OBJECTS)
	$(CPPC) $(ARGS) $(WASMARGS) $(OBJECTS) $(LIBS) -o $(BUILD)/optimizer.js
	sed -i '1s;^;/* eslint-disable */\n;' $(BUILD)/optimizer.js
	cp $(BUILD)/optimizer.js ../app/src/
	cp $(BUILD)/optimizer.wasm ../app/public/

$(BUILD)/test.o: $(SRC)/test.cpp $(SRC)/util.h $(SRC)/mutation.h $(SRC)/task-planner.h $(SRC)/crossover.h $(SRC)/sample.h
	$(CPPC) -c -o $(BUILD)/test.o $(ARGS) $(SRC)/test.cpp

$(BUILD)/util.o: $(SRC)/util.cpp $(SRC)/util.h
	$(CPPC) -c -o $(BUILD)/util.o $(ARGS) $(SRC)/util.cpp

$(BUILD)/mutation.o: $(SRC)/mutation.cpp $(SRC)/util.h $(SRC)/mutation.h
	$(CPPC) -c -o $(BUILD)/mutation.o $(ARGS) $(SRC)/mutation.cpp

$(BUILD)/crossover.o: $(SRC)/crossover.cpp $(SRC)/util.h $(SRC)/crossover.h
	$(CPPC) -c -o $(BUILD)/crossover.o $(ARGS) $(SRC)/crossover.cpp

$(BUILD)/sample.o: $(SRC)/sample.cpp $(SRC)/sample.h
	$(CPPC) -c -o $(BUILD)/sample.o $(ARGS) $(SRC)/sample.cpp

$(BUILD)/tsp.o: $(SRC)/tsp.cpp $(SRC)/tsp.h
	$(CPPC) -c -o $(BUILD)/tsp.o $(ARGS) $(SRC)/tsp.cpp

$(BUILD)/kmeans.o: $(SRC)/kmeans.cpp $(SRC)/kmeans.h
	$(CPPC) -c -o $(BUILD)/kmeans.o $(ARGS) $(SRC)/kmeans.cpp

$(BUILD)/task-planner.o: $(SRC)/task-planner.cpp $(SRC)/task-planner.h $(SRC)/permutation-genetic-algorithm.h $(SRC)/genetic-algorithm.h 
	$(CPPC) -c -o $(BUILD)/task-planner.o $(ARGS) $(SRC)/task-planner.cpp

$(BUILD)/optimizer.o: $(SRC)/optimizer.cpp $(SRC)/task-planner.h
	$(CPPC) -c -o $(BUILD)/optimizer.o $(ARGS) $(SRC)/optimizer.cpp

clean:
	$(CLEAN) $(OBJECTS)
