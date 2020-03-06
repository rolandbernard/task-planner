
#include "crossover.h"

#include <vector>
#include <cassert>

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

    void half_eadge_recompination(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child) {
        int chromosome_lenght = parent_a.size();
        int eadges[chromosome_lenght][4];
        int counts[chromosome_lenght];
        int unused_count = chromosome_lenght;
        int unused[chromosome_lenght];
        int unused_pos[chromosome_lenght];
        for(int i = 0; i < chromosome_lenght; i++) {
            counts[i] = 0;
            unused[i] = i;
            unused_pos[i] = i;
        }
        auto add_eadge = [&eadges, &counts](int from, int to) {
            for(int i = 0; i < counts[from]; i++) {
                if(eadges[from][i] == to) {
                    return;
                }
            }
            eadges[from][counts[from]] = to;
            counts[from]++;
        };
        for(int i = 0; i < chromosome_lenght; i++) {
            add_eadge(parent_a[i], parent_a[(i + 1) % chromosome_lenght]);
            add_eadge(parent_a[i], parent_a[(chromosome_lenght + i - 1) % chromosome_lenght]);
            add_eadge(parent_b[i], parent_b[(i + 1) % chromosome_lenght]);
            add_eadge(parent_b[i], parent_b[(chromosome_lenght + i - 1) % chromosome_lenght]);
        }
        auto remove_eadge = [&eadges, &counts](int elem) {
            for(int i = 0; i < counts[elem]; i++) {
                int from = eadges[elem][i];
                for(int j = 0; j < counts[from]; j++) {
                    if(eadges[from][j] == elem) {
                        counts[from]--;
                        eadges[from][j] = eadges[from][counts[from]];
                        break;
                    }
                }
            }
            counts[elem] = 0;
        };
        int current = random() % chromosome_lenght;
        remove_eadge(current);
        child[0] = current;
        for(int i = 1; i < chromosome_lenght; i++) {
            unused_count--;
            unused[unused_pos[current]] = unused[unused_count];
            unused_pos[unused[unused_pos[current]]] = unused_pos[current];
            if(counts[current] > 0) {
                int min = eadges[current][0];
                for(int j = 1; j < counts[current]; j++) {
                    if(counts[min] > counts[eadges[current][j]]) {
                        min = eadges[current][j];
                    }
                }
                current = min;
            } else {
                current = unused[random() % unused_count];
            }
            remove_eadge(current);
            child[i] = current;
        }
    }

    void eadge_recompination(const std::vector<int>& parent_a, const std::vector<int>& parent_b, std::vector<int>& child_a, std::vector<int>& child_b) {
        half_eadge_recompination(parent_a, parent_b, child_a);
        half_eadge_recompination(parent_a, parent_b, child_b);
    }
}

