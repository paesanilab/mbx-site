---
heading: "JSON File"
path: "json-file"
order: 3
---
## JSON File
To make life easier for you, a JSON configuration file must be used to pass all the information that MBX needs. Usually, one does not need to change anything except a couple of options. In any case, all the options of the json file are explained below.

The JSON file template is the following:
```
{
"Note": "This is a  MBX v1.0.0 configuration file",
"MBX": {
    "box": [21.0, 0.0, 0.0, 0.0, 21.0, 0.0, 0.0, 0.0, 21.0],
    "realspace_cutoff": 9.0,
    "twobody_cutoff": 9.0,
    "threebody_cutoff": 7.0,
    "dipole_tolerance": 1E-08,
    "dipole_max_it": 100,
    "dipole_method": "cg",
    "alpha_ewald_elec": 0.6,
    "grid_density_elec": 2.5,
    "spline_order_elec": 6,
    "alpha_ewald_disp": 0.6,
    "grid_density_disp": 2.5,
    "spline_order_disp": 6,
    "ignore_2b_poly": [],
    "ignore_3b_poly": []
},
"i-pi": {
    "localhost": "localhost3",
    "port": 34567
}
}
```
In this file:
- `box` is either a 9 element list, with the 3 vectors of the box: `[ax, ay, az, bx, by, bz, cx, cy, cz]` or an empty list `[]` if one wants to run gas-phase calculations.
- `realspace_cutoff` is the distance at which the dispersion, Lennard-Jones, and electrostatics interactions will switch from the real space to the reciprocal space (Particle-Mesh Ewald). Usually a value of about `9.0` is good for calculations in periodic boundary conditions. In gas phase calculations, this should be set to a large number that exceeds the farthest interatomic distance in your system so that all interactions are computed in the real space. For backwards compatibility reasons, if `realspace_cutoff` is not specified, then it will be set to the `twobody_cutoff`.
- `twobody_cutoff` is the cutoff for the 2-body polynomials. If only water is used, one can set that to `6.5`, but if alkali metal ions or halides are used, it should be set to the maximum cutoff in any of the dimers used (`9.0`).
- `threebody_cutoff` is the cutoff for the 3-body polynomials. If only water is used, one can set that to `4.5`, but if alkali metal ions or halides are used, it should be set to the maximum cutoff in any of the trimers used (`7.0`).
- `dipole_tolerance` is the tolerance accepted for the induced dipoles iterative calculation. From one iteration to the other one, |mu(i,t+1) - mu(i,t)|^2 < dipole tolerance for any i. A value of `1E-08` is usually small enough. However, if the dipole solver used is aspc, the magnitude of the tolerance may have to be decreased up to `1E-10` or `1E-12`. It is recommended to run a few thousand steps using aspc and cg for the dipole solver, and decide which is the dipole tolerance needed.
- `dipole_max_it` is the maximum number of iterations allowed in the dipole iterative method calculation. If the number of iterations exceeds this value, MBX will throw an error message saying that the dipoles have diverged.
- `dipole_method` is the method adopted to calculate the induced dipoles. Current options are `iter` (iterative), `cg` (conjugate gradient, faster than iter), and `aspc` (always stable predictor-corrector). `aspc` is only suitable for simulations. Only `cg` and `aspc` are currently available in LAMMPS.
- `alpha_ewald_{elec/disp}` is the alpha used in the reciprocal space. It should be set to `0.0` when running gas-phase calculations/simulations.
- `grid_density_{elec/disp}` is the Ewald grid points density.
- `spline_order_{elec/disp}` is the order of the splines used for interpolation.
- `ignore_2b_poly` a list of 2 element lists with the monomer pairs for which the 2-body polynomials will not be calculated. Example: `"ignore_2b_poly": [
["na+","h2o"
]]`
- `ignore_3b_poly` has a similar format as ignore_2b_poly, but with the difference that the list is a list of 3-element list. If a set of three monomer types is specified in this list, MBX won't calculate the 3-body polynomials for that given trimer. Example: `"ignore_3b_poly": [
["na+","h2o","h2o"
]]`
- `localhost` is the name of the socket. It MUST match the name in the XML file, otherwise it will send an error saying that the socket was not found.
- `port` is used when interfacing with i-pi. It is the port that will hold the socket. Should be greater than `34500`.
