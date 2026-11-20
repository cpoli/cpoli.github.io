---
name: tbkit
title: tbkit, tight-binding models from bands to devices
description: tbkit is an open-source Python package in which one tight-binding model gives band structures, topological invariants, linear response and scattering through devices.
tagline: One tight-binding model, from band structure to device transport.
repo: cpoli/tbkit
docs: https://cpoli.github.io/tbkit/
install: pip install tbkit
image: tbkit
imageAlt: Hofstadter's butterfly of a tight-binding flake, from the tbkit gallery
keywords: [tight-binding, condensed matter physics, topological insulators, Chern number, quantum transport, scattering matrix, Python]
---

## The problem

Tight-binding models are the workhorse of condensed-matter physics, but the tools are split. One package computes bands and Berry phases on a Bloch mesh, another computes transport through a finite device, and the same lattice has to be defined twice, in two APIs.

## What tbkit does

In tbkit one model definition serves every calculation:

- **Bands** on periodic lattices and spectra of finite flakes, with magnetic fields and disorder.
- **Topology**: Chern, Z₂, Bott and higher-order invariants.
- **Response**: Kubo linear response.
- **Transport**: scattering matrices of devices with leads.

The documentation follows the history of the field, with chapters on models, fields, topology, response, interactions and driven systems, and each breakthrough has a runnable gallery example.

## Results

- Results agree with [Kwant](https://kwant-project.org) and [PythTB](https://www.physics.rutgers.edu/pythtb/) to within 10⁻¹².
- On Bloch meshes, speed is comparable to PythTB.
- With the MUMPS solver, scattering calculations run 1.1 to 2 times faster than Kwant, for devices of up to 4 × 10⁵ sites.

## My role

I wrote tbkit. It grew out of tbee, a tight-binding package I started in 2015 during my postdoc at Lancaster University.

## Get started

```bash
pip install tbkit
# or
conda install -c conda-forge tbkit
```

Cite a release through its [Zenodo record](https://doi.org/10.5281/zenodo.23803781).
