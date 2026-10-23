---
heading: "Testing"
path: "testing"
order: 2
---
## Testing
After [basic installation](compilation-and-installation), running the unit tests is highly recommended. Run the following commands to run the tests:
```
make check
```
All tests must pass. If you encounter any errors, please report them in the [MBX Google Group](https://groups.google.com/g/mbx-users).

Tests will fail if using an MPI compiler instead of `g++`/`icpc`, such as if you performed alternative installation with MBX_MPI with LAMMPS. Please instead perform basic installation first with `g++`/`icpc` and then run the tests.
