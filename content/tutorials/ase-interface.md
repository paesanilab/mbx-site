---
heading: "ASE interface"
path: "ase-interface"
order: 9
---
### ASE
MBX includes an ASE calculator plugin in `$MBX_HOME/plugins/ase`. The plugin allows the Atomic Simulation Environment (ASE) to call MBX for MB-nrg energies and forces, making it useful for Python-based ASE molecular dynamics and analysis workflows.

To use ASE with MBX, build MBX with shared libraries, set `MBX_HOME`, and install the ASE plugin:
```console
export MBX_HOME=$(pwd)
./configure --enable-shared
make -j2 && make install
cd plugins/ase
pip install -e .
```

Direct `MBXCalculator` usage requires an `mbx.json` file. ASE molecular dynamics examples are available in `$MBX_HOME/plugins/ase/examples/water` and `$MBX_HOME/plugins/ase/examples/ion_water`, and the example MD scripts can generate `mbx.json` from the run settings.
