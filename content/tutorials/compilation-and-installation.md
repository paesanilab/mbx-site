---
heading: "Compilation and Installation"
path: "compilation-and-installation"
order: 1
---
## Compilation and Installation
The following requirements need to be fulfilled in order to successfully install the software:
- g++/gcc v9.3 or higher
- icpx/icx v2020 or higher [optional]
- FFTW libraries
- **Read the entire README before doing anything!**

The following requirements are optional, depending on how you plan to use MBX:
- MPI compilers [sometimes used for MBX+LAMMPS]
- GSL libraries [needed only for normal_modes executable]
- Python packages `ase` and `numpy` [needed only for the ASE plugin]

### Compilation
MBX has different compilation instructions depending on how you plan to use it:
- For use with **i-PI**, **Python**, **ASE**, **Fortran**, or **standalone**, perform a basic installation using the steps below.
- For use with **LAMMPS**, perform an [alternative MBX_MPI installation](lammps-interface)

#### Basic installation of MBX (for use with i-PI, Python, ASE, Fortran, or standalone. **NOT LAMMPS**)
```console
git clone https://github.com/paesanilab/MBX.git
cd MBX/

autoreconf -fi
./configure
make -j2 && make install
 ```

`./configure` has additional flags and options if you want to customize your installation:
- `CXX=` if you want to use a different compiler than the system default. Popular options include `CXX=icpx` or `CXX=g++`
- `--enable-shared` if you want to also compile MBX as a shared library. This is **required for using MBX with Python or ASE**.
- `--enable-debug` for debugging using GDB.
- `--enable-verbose` will turn on additional logging to the console.
- `--disable-optimization` will disable compiler optimizations. This is **not recommended** unless you are debugging.
- `--help` to see additional configuration options

After performing basic installation, you should [run the unit tests](testing) to make sure everything is working properly.

#### [Alternative installation of MBX_MPI](lammps-interface) (**LAMMPS only**)
If you want to use MBX with LAMMPS, instead [skip to this section about the LAMMPS plugin](lammps-interface). This special installation using MPI is **only compatible with LAMMPS** and is incompatible with i-PI, Python, ASE, Fortran or standalone usage. If you need to use any of these other plugins, perform a separate basic installation in a different directory.
