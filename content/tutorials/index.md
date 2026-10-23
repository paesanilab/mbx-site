---
heading: "Introduction to MBX"
---
# MBX v1.4.0
MBX: A many-body energy and force calculator for data-driven many-body simulations.
[J. Chem. Phys. 159, 054802 (2023)](https://doi.org/10.1063/5.0156036)

Video tutorials are available on our [YouTube page](https://www.youtube.com/@paesanilab8913/videos).

MBX is a C++ software that can either be used as a standalone software for calculating energies and forces of MB-nrg potential energy functions (PEFs) for the molecular systems of interest or interfaced with external molecular dynamics engines to perform classical and quantum simulations of the molecular system of interest across different thermodynamic states and phases, in both periodic and non-periodic conditions, using the corresponding MB-nrg PEFs.
The current version of MBX provides interfaces to LAMMPS (https://www.lammps.org) and i-PI (http://ipi-code.org) which allow for performing classical and path-integral molecular dynamics simulations using MB-nrg PEFs. MBX also includes an Atomic Simulation Environment (ASE) calculator plugin for evaluating MB-nrg energies and forces from Python-based ASE workflows.
For details on the MB-pol and MB-nrg PEFs, please visit: https://paesanigroup.ucsd.edu/software/mbx.html.

MBX is periodically updated with performance improvements and the addition of other MB-nrg PEFs. For any questions about MBX, installation issues, or general usage inquiries, please use the MBX Google Group: https://groups.google.com/g/mbx-users.
