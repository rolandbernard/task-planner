
#include "sample.h"

#include <iostream>

namespace sample {
    double linearBias(double r, double min, double max) {
        return (r - min) + (max - min)/2 + (max - min)*1e-5;
    }

    double nonLinearBias(double r, double min, double max) {
        double d = (r - min) + (max - min)/2 + (max - min)*1e-5;
        d *= d;
        d *= d;
        return d;
    }

    double nonLinear(double r, double min, double max) {
        double d = (r - min) + (max - min)*1e-5;
        d *= d;
        d *= d;
        d *= d;
        return d;
    }

    double nonLinearAbsolute(double r, double min, double max) {
        double d = r;
        d *= d;
        d *= d;
        d *= d;
        return d;
    }
}

