---
title: Why CERN says "evidence" at 3σ and "discovery" only at 5σ
description: LHCb has seen a B meson decay that happens once in ten billion, at 3.2 standard deviations. Particle physics calls that evidence, not discovery. What a sigma is, why the bar sits at five, and how much more data it takes to get there.
date: 2026-11-26
kit: physicskit
draft: false
---

On 3 November 2026 the LHCb collaboration at CERN reported **evidence for the decay $B^0 \to \mu^+\mu^-$**: a neutral B meson, made of a beauty antiquark and a down quark, turning into two muons. The Standard Model says this should happen about once in ten billion B⁰ decays, roughly $1.03 \times 10^{-10}$. LHCb measures $1.14 \times 10^{-10}$, in agreement. The search started in 1984, when the CLEO experiment set the first upper limit.

"This process only happens for one in every ten billion beauty particles, so it's incredibly difficult to find," said Harry Cliff (Cambridge). The paper is [arXiv:2611.00230](https://arxiv.org/abs/2611.00230), *Evidence for the decay B⁰→μ⁺μ⁻ and improved measurements of the decay B⁰ₛ→μ⁺μ⁻*. Coverage: [Sci.News](https://www.sci.news/physics/cern-ultra-rare-particle-decay-15171.html).

The word that matters is *evidence*. The new data alone give **3.0 standard deviations**, and **3.2** combined with LHCb's earlier runs. Particle physics reserves *observation*, the word the press translates as discovery, for 5. Why five, and what does a sigma even measure?

## A sigma is a probability in disguise

Suppose the decay did not exist and only background were there. How often would the background alone fluctuate up to look at least this much like a signal? That probability is the **p-value**. Physicists quote it as the number of standard deviations of a normal distribution that leaves the same probability in its upper tail:

```python
from scipy.stats import norm

for z in [3.0, 3.2, 5.0]:
    print(z, f"1 in {1 / norm.sf(z):,.0f}")
# 3.0 1 in 741
# 3.2 1 in 1,455
# 5.0 1 in 3,488,556
```

So 3.2σ means a background-only world would produce something this striking about once in 1,500 tries. That sounds convincing, and in most of science it would be: a medical trial publishes at about 2σ. Particle physics asks for one in 3.5 million.

Two cautions about what the number is *not*. It is not the probability that the decay is fake. And it only counts **statistical** flukes. In 2011, OPERA's faster-than-light neutrinos were a six-sigma result traced to a loose fibre-optic cable. No threshold protects against a mistake in the apparatus.

## Why the bar is five

**Looking everywhere.** A bump search scans many masses, and each one is a new chance for a fluke. A 3σ excess at *some* mass in a wide scan is unremarkable. Physicists distinguish the *local* significance at the bump from the *global* one after this **look-elsewhere effect**. In December 2015, ATLAS and CMS both saw an excess of photon pairs near 750 GeV, about 3.9σ local in ATLAS, but only about 2σ global. Theorists wrote hundreds of papers explaining it. By August 2016, with more data, it was gone.

**History.** Three-sigma effects in particle physics have come and gone often enough that the community set itself a margin. The 5σ convention became standard in the 1990s and was the bar both ATLAS and CMS cleared on 4 July 2012 for the Higgs boson.

The LHCb result is in a better position than a bump hunt. The mass of the B⁰ is known, so there is nowhere else to look. The rate is predicted, and the measurement agrees with it. This is the Standard Model passing a test, not a surprise that needs explaining.

## How much more data?

For a fixed signal rate, significance grows like the **square root of the amount of data**. The signal $S$ and the background $B$ both grow in proportion to the luminosity $L$, and a fluctuation of the background grows like $\sqrt{B}$:

$$
Z \approx \frac{S}{\sqrt{B}} \propto \frac{L}{\sqrt{L}} = \sqrt{L}.
$$

Going from 3.2σ to 5σ therefore takes $(5/3.2)^2 \approx 2.4$ times the data, if the signal is real and nothing else changes. LHCb's upgraded detector, running since 2024, collects data about five times faster than before, which is why the collaboration talks about "when" rather than "if".

The [Higgs diphoton example](https://cpoli.github.io/physicskit/api/gallery/particle/resonance_discovery/plot_04_higgs_diphoton_discovery.html) in [physicskit](https://cpoli.github.io/physicskit/) runs this whole argument. It generates Higgs decays to two photons on top of a falling background, fits the background from the sidebands, computes the local significance $Z = \sqrt{2\,\Delta \ln L}$ from a Poisson likelihood, and repeats it in pseudo-experiments at growing luminosity. The median significance follows $\sqrt{L}$ and crosses the 5σ line within the scan, while individual pseudo-experiments scatter around it. Watching that scatter is the best intuition for why one 3σ result is not yet enough.

## Why this decay is worth the wait

In the Standard Model a b quark cannot turn into a d quark directly. It has to go through a loop of virtual W bosons and top quarks, and the pair of muons then has to come out with the wrong handedness. Both suppressions together give the one-in-ten-billion rate. Any undiscovered heavy particle that can run in the loop would change it. The rate also depends on how strongly the top quark couples to the down quark, an entry of the CKM matrix that Kobayashi and Maskawa introduced in 1973 to explain CP violation. The [CKM example](https://cpoli.github.io/physicskit/api/gallery/particle/flavor_physics/plot_01_ckm_matrix.html) builds that matrix from three angles and a phase.

The sister decay $B^0_s \to \mu^+\mu^-$, with a strange quark in place of the down quark, is predicted to be about 35 times more common. CMS and LHCb jointly observed it in 2015, and the new paper gives its most precise measurement, $3.31 \times 10^{-9}$ against a predicted $3.66 \times 10^{-9}$. The ratio of the two rates is one of the cleanest tests in flavour physics, because many theoretical uncertainties cancel. With $B^0$ now in reach, that test can begin.

The road from the positron in 1932 to the Higgs in 2012 is on physicskit's [particle physics history page](https://cpoli.github.io/physicskit/history/particle_breakthroughs.html), and every entry has a runnable example. When LHCb crosses 5σ, this decay will earn its own.
