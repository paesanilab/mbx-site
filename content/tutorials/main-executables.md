---
heading: "Main executables"
path: "main-executables"
order: 4
---
## Main executables
After installation, there will be the main executables in `$MBX_HOME/bin/`.
- `single_point` will return the energy (Binding Energy) in kcal/mol for a given configuration. One can have multiple systems in the nrg file, and single point will return the energies of each one of them. If `PRINT_GRADS` is manually enabled in the source code in (`$MBX_HOME/src/main/single_point.cpp`) it will also print the gradients.
- `optimize` will optimize a given configuration. You can optimize a single nrg system, or pass an XYZ file with a set of configurations, in which all of them will be optimized.
- `mb_decomp` will compute energies for subsystems for the given system(s), then performs many-body decomposition and prints the n-body contribution for all subsystems. If the flag to skip many-body decomposition ("`-e`") is activated, it instead prints the binding energy for all subsystems.
- `order_frames` will compute the energies for a given list of configurations from the XYZ file, and rearranges the configuration frames in the order of increasing energy.
- `normal_modes` will compute the normal modes for an optimized nrg file. Requires the GSL library.
