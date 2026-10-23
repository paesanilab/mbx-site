---
heading: "Fortran and Python interfaces"
path: "fortran-and-python-interfaces"
order: 8
---
### Fortran90 and Python
In `${MBX_HOME}/examples/PEFs` there are sample scripts on how to use MBX called from Fortran90 and Python. Please remember to update the `LD_LIBRARY_PATH` variable and, if using python, the `PYTHONPATH` variable.
```console
export LD_LIBRARY_PATH=$MBX_HOME/lib/:$LD_LIBRARY_PATH
export PYTHONPATH=${PYTHONPATH}:${MBX_HOME}/plugins/python/mbx
```
