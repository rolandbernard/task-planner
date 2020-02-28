
#include "crossover.h"

#include <vector>

#include "util.h"

namespace crossover {
    void cycle(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child_a, std::vector<int>& child_b) {
        int chromosome_lenght = parent_a.size();
        int start = random() % chromosome_lenght;
        int end = random() % chromosome_lenght;
        if(start > end) {
            int tmp = start;
            start = end;
            end = tmp;
        }
        bool ins[chromosome_lenght];
        int ind[chromosome_lenght];
        for(int i = 0; i < chromosome_lenght; i++) {
            ins[i] = false;
            ind[parent_b[i]] = i;
        }
        for(int i = 0; i < chromosome_lenght; i++) {
            if(i%2 == 0) {
                int index = i;
                while(!ins[index]) {
                    child_a[index] = parent_b[index];
                    child_b[index] = parent_a[index];
                    ins[index] = true;
                    index = ind[parent_a[index]];
                }
            } else {
                int index = i;
                while(!ins[index]) {
                    child_a[index] = parent_a[index];
                    child_b[index] = parent_b[index];
                    ins[index] = true;
                    index = ind[parent_a[index]];
                }
            }
        }
    }

    void order1(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child_a, std::vector<int>& child_b) {
        int chromosome_lenght = parent_a.size();
        int start = random() % chromosome_lenght;
        int end = random() % chromosome_lenght;
        if(start > end) {
            int tmp = start;
            start = end;
            end = tmp;
        }
        bool ins[chromosome_lenght];
        for(int i = 0; i < chromosome_lenght; i++) {
            ins[i] = false;
        }
        for(int i = start; i < end; i++) {
            child_a[i] = parent_a[i];
            ins[parent_a[i]] = true;
        }
        int index = 0;
        for(int i = 0; i < chromosome_lenght; i++) {
            if(!ins[parent_b[i]]) {
                if(index == start) {
                    index = end;
                }
                child_a[index] = parent_b[i];
                index++;
            }
        }
        for(int i = 0; i < chromosome_lenght; i++) {
            ins[i] = false;
        }
        for(int i = start; i < end; i++) {
            child_b[i] = parent_b[i];
            ins[parent_b[i]] = true;
        }
        index = 0;
        for(int i = 0; i < chromosome_lenght; i++) {
            if(!ins[parent_a[i]]) {
                if(index == start) {
                    index = end;
                }
                child_b[index] = parent_a[i];
                index++;
            }
        }
    }

    void pmx(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child_a, std::vector<int>& child_b) {
        int chromosome_lenght = parent_a.size();
        int start = random() % chromosome_lenght;
        int end = random() % chromosome_lenght;
        if(start > end) {
            int tmp = start;
            start = end;
            end = tmp;
        }
        bool ins[chromosome_lenght];
        int ind[chromosome_lenght];
        for(int i = 0; i < chromosome_lenght; i++) {
            ins[i] = false;
            ind[parent_b[i]] = i;
        }
        for(int i = start; i < end; i++) {
            child_a[i] = parent_a[i];
            ins[parent_a[i]] = true;
        }
        for(int i = start; i < end; i++) {
            if(!ins[parent_b[i]]) {
                int index = i;
                while(index >= start && index < end) {
                    index = ind[parent_a[index]];
                }
                child_a[index] = parent_b[i];
                ins[parent_b[i]] = true;
            }
        }
        for(int i = 0; i < start; i++) {
            if(!ins[parent_b[i]]) {
                child_a[i] = parent_b[i];
            }
        }
        for(int i = end; i < chromosome_lenght; i++) {
            if(!ins[parent_b[i]]) {
                child_a[i] = parent_b[i];
            }
        }

        for(int i = 0; i < chromosome_lenght; i++) {
            ins[i] = false;
            ind[parent_a[i]] = i;
        }
        for(int i = start; i < end; i++) {
            child_b[i] = parent_b[i];
            ins[parent_b[i]] = true;
        }
        for(int i = start; i < end; i++) {
            if(!ins[parent_a[i]]) {
                int index = i;
                while(index >= start && index < end) {
                    index = ind[parent_b[index]];
                }
                child_b[index] = parent_a[i];
                ins[parent_a[i]] = true;
            }
        }
        for(int i = 0; i < start; i++) {
            if(!ins[parent_a[i]]) {
                child_b[i] = parent_a[i];
            }
        }
        for(int i = end; i < chromosome_lenght; i++) {
            if(!ins[parent_a[i]]) {
                child_b[i] = parent_a[i];
            }
        }
    }
}

