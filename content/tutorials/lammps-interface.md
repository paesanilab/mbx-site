---
heading: "LAMMPS interface"
path: "lammps-interface"
order: 6
---
### LAMMPS
MBX is an official LAMMPS package (https://docs.lammps.org/pair_mbx.html), and needs to be installed using the [LAMMPS CMake build-chain](https://docs.lammps.org/Build_cmake.html):

```console
git clone -b stable https://github.com/lammps/lammps.git
cd lammps

cmake -S cmake -B build -C ./cmake/presets/basic.cmake -D PKG_MBX=yes -D PKG_EXTRA-PAIR=yes
cmake --build build --parallel 4   # compilation (can use higher --parallel on powerful computers)
```
This special installation using MPI is **only compatible with LAMMPS** and is incompatible with i-PI, Python, Fortran or standalone usage. If you need to use any of these other MBX plugins, perform a separate [basic installation](compilation-and-installation) in a different directory.

Additional LAMMPS build options are available, such as using a different compiler or enabling additional packages. Please refer to the [LAMMPS CMake build documentation](https://docs.lammps.org/Build_basics.html) for more information.

Examples for MBX+LAMMPS simulations are located in `$MBX_HOME/plugins/lammps/examples/`. Also see the LAMMPS documentation for more information about how to use MBX with LAMMPS: https://docs.lammps.org/pair_mbx.html.

For any questions, please use the MBX Google Group: https://groups.google.com/g/mbx-users.
