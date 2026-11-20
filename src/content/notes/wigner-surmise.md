---
title: Why neighbouring energy levels repel
description: In 1956 Eugene Wigner guessed the spacing law of nuclear energy levels from a 2×2 matrix. Seventy years on, the same formula fingerprints quantum chaos.
date: 2026-11-24
kit: physicskit
draft: true
---

In the 1950s, neutron-scattering experiments were producing long lists of resonance energies in heavy nuclei such as uranium. Nobody could compute those levels from first principles; the nucleus was far too complicated. Eugene Wigner asked a different question: if you cannot predict the levels, can you predict their *statistics*?

His idea was to replace the unknown Hamiltonian by a random symmetric matrix, and to look at the gap $s$ between neighbouring eigenvalues, rescaled to a mean spacing of one. For a 2×2 matrix the calculation fits on a napkin, and it gives what is now called the **Wigner surmise**:

$$
P_\beta(s) = a(\beta)\ s^\beta\ e^{-b(\beta) s^2}.
$$

Here $\beta = 1$ for systems with time-reversal symmetry (GOE), $2$ without it (GUE) and $4$ with spin–orbit coupling (GSE). The constants $a$ and $b$ just normalise the distribution and its mean.

The striking part is the factor $s^\beta$: the probability of two levels sitting on top of each other goes to zero. Levels **repel**. Uncorrelated levels would instead follow a Poisson law, $P(s) = e^{-s}$, where small gaps are the most likely.

## Checking it in a few lines

The surmise is exact only for 2×2 matrices, yet it describes large random matrices remarkably well. With [physicskit](https://cpoli.github.io/physicskit/) you can check that directly:

```python
import physicskit.rmt as rmt

spectrum = rmt.ensembles.GOE(n=1000, seed=2026).sample(n_samples=30)
spacings = rmt.stats.nearest_neighbor_spacings(spectrum, rmt.stats.semicircle_cdf)
result = rmt.validation.WignerSurmise(beta=1).validate(spacings, seed=2026)
```

The [Wigner surmise gallery example](https://cpoli.github.io/physicskit/api/gallery/rmt/spacings/plot_wigner_surmise.html) does this for all three ensembles. It also cross-checks against the ratio of consecutive spacings, a statistic that needs no unfolding.

## From nuclei to chaos

For almost thirty years this was a theory of nuclei. Then, in 1984, Bohigas, Giannoni and Schmit conjectured something much bolder: *any* quantum system whose classical counterpart is chaotic shows these random-matrix statistics, while integrable systems show Poisson statistics. A billiard table shaped like a stadium, a microwave cavity or a hydrogen atom in a strong magnetic field all inherit Wigner's formula. The [BGS example](https://cpoli.github.io/physicskit/api/gallery/rmt/spacings/plot_bohigas_giannoni_schmit_rigidity.html) contrasts the two regimes through spectral rigidity.

This is personal history too. My own [2012 paper](https://doi.org/10.1103/PhysRevLett.108.174101) with Luna-Acosta and Stöckmann generalised the Wigner surmise to *open* chaotic systems, where energy leaks out and the levels become complex resonances.

The rest of the story, from Wishart's covariance matrices in 1928 to the SYK model, is on physicskit's [random-matrix history page](https://cpoli.github.io/physicskit/history/rmt_breakthroughs.html). Every entry there has a runnable example.
