TARGET=test
OBJECTS=$(BUILD)/test.o
LIBS=
ARGS=-g -Wall -Og
CLEAN=rm -f
CPPC=g++
SRC=./src
BUILD=./build

all:
	mkdir -p $(BUILD)
	make $(TARGET)

$(TARGET): $(OBJECTS)
	$(CPPC) -o $(TARGET) $(ARGS) $(OBJECTS) $(LIBS)

$(BUILD)/test.o: $(SRC)/test.cpp $(SRC)/util.h $(SRC)/genetic_algorithm.h
	$(CPPC) -c -o $(BUILD)/test.o $(ARGS) $(SRC)/test.cpp

clean:
	$(CLEAN) $(OBJECTS)

cleanall:
	$(CLEAN) $(OBJECTS) $(TARGET)
