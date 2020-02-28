#ifndef SAMPLE_H
#define SAMPLE_H

namespace sample {
    double linearBias(double r, double min, double max);

    double nonLinearBias(double r, double min, double max);

    double nonLinear(double r, double min, double max);

    double nonLinearAbsolute(double r, double min, double max);
}

#endif
