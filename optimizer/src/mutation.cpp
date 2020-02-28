
#include "mutation.h"

#include <vector>
#include <random>
#include <algorithm>

#include "util.h"

namespace mutation {
    void swap(std::vector<int>& chrom) {
        int chromosome_lenght = chrom.size();
        int start = random() % chromosome_lenght;
        int end = random() % chromosome_lenght;

        int tmp = chrom[start];
        chrom[start] = chrom[end];
        chrom[end] = tmp;
    }

    void insert(std::vector<int>& chrom) {
        int chromosome_lenght = chrom.size();
        int original = random() % chromosome_lenght;
        int end = random() % chromosome_lenght;

        int tmp = chrom[original];
        if(original < end) {
            for(int i = original; i < end; i++) {
                chrom[i] = chrom[i+1];
            }
        } else {
            for(int i = original; i > end; i--) {
                chrom[i] = chrom[i-1];
            }
        }
        chrom[end] = tmp;
    }

    void inversion(std::vector<int>& chrom) {
        int chromosome_lenght = chrom.size();
        int start = random() % chromosome_lenght;
        int end = random() % chromosome_lenght;
        if(start > end) {
            int tmp = start;
            start = end;
            end = tmp;
        }

        for(int i = 0; i < (start-start)/2; i++) {
            int tmp = chrom[start+i];
            chrom[start+i] = chrom[end-1-i];
            chrom[end-1-i] = tmp;
        }
    }

    void scramble(std::vector<int>& chrom) {
        int chromosome_lenght = chrom.size();
        int start = random() % chromosome_lenght;
        int end = random() % chromosome_lenght;
        if(start > end) {
            int tmp = start;
            start = end;
            end = tmp;
        }
        std::shuffle(chrom.begin()+start, chrom.begin()+end, generator);
    }

    void rotate(std::vector<int>& chrom) {
        int chromosome_lenght = chrom.size();
        int extend = random() % chromosome_lenght;
        std::rotate(chrom.begin(), chrom.begin() + extend, chrom.end());
    }

    void moveRange(std::vector<int>& chrom) {
        int chromosome_lenght = chrom.size();
        int len = std::max<int>(1, random() % chromosome_lenght);
        int original = random() % (chromosome_lenght - len);
        int end = random() % (chromosome_lenght - len);
        int tmp[len];

        for(int i = 0; i < len; i++) {
            tmp[i] = chrom[original+i];
        }
        if(original < end) {
            for(int i = original; i < end; i++) {
                chrom[i] = chrom[i+len];
            }
        } else {
            for(int i = original-1; i >= end; i--) {
                chrom[i+len] = chrom[i];
            }
        }
        for(int i = 0; i < len; i++) {
            chrom[end+i] = tmp[i];
        }
    }

    void oneOf(std::vector<int>& chrom) {
        int i = random() % 6;
        switch(i) {
        case 0:
            swap(chrom);
            break;
        case 1:
            insert(chrom);
            break;
        case 2:
            inversion(chrom);
            break;
        case 3:
            scramble(chrom);
            break;
        case 4:
            moveRange(chrom);
            break;
        case 5:
            rotate(chrom);
            break;
        }
    }

    void none(std::vector<int>& chrom) { }
}

