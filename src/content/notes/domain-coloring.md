---
title: Seeing complex functions in colour
description: A complex function needs four dimensions to graph. Domain colouring squeezes it into one picture, where zeros, poles and branch cuts are visible at a glance.
date: 2026-12-22
kit: mathematicskit
draft: true
---

A real function $f(x)$ has a graph you can draw on paper. A complex function $f(z)$ takes two real numbers to two real numbers, so its graph lives in four dimensions. For two centuries mathematicians reasoned about complex functions without being able to look at them.

## Colour instead of height

The trick, made practical by computer graphics, is to colour each point $z$ of the plane by the value $f(z)$:

- the **hue** gives the argument of $f(z)$: red for positive real values, cycling through the rainbow once around the circle;
- the **brightness** gives the modulus.

Frank Farris named this *domain colouring* in 1998, and Elias Wegert's *Visual Complex Functions* (2012) turned these *phase portraits* into a systematic tool.

## What the picture tells you

Much of complex analysis can be read straight off the image:

- around a **zero** of order $k$, every hue appears $k$ times going counter-clockwise;
- around a **pole**, the hues cycle the other way;
- a **branch cut**, like the one of $\sqrt{z}$, is a seam where the colours jump;
- near an **essential singularity**, such as $e^{1/z}$ at $0$, every colour appears infinitely often, as the Casorati–Weierstrass theorem predicts.

Counting the colour cycles around a closed curve is the argument principle in pictures: it gives the number of zeros minus the number of poles inside.

## Try it

With [mathematicskit](https://cpoli.github.io/mathematicskit/):

```python
from mathematicskit.complex_analysis import domain_coloring
from mathematicskit.complex_analysis.visualizers import plot_domain_coloring

f = lambda z: (z - 1) ** 2 * (z + 1) / (z**2 + 1)
plot_domain_coloring(domain_coloring(f, (-2, 2), (-2, 2), resolution=300))
```

The double zero at $1$, the simple zero at $-1$ and the two poles at $\pm i$ are easy to spot. The [domain colouring gallery example](https://cpoli.github.io/mathematicskit/api/gallery/complex_analysis/domain_coloring/plot_01_domain_coloring.html) draws six functions side by side.

The same toolkit covers the history that led here: [Cauchy's integral theorem](https://cpoli.github.io/mathematicskit/api/gallery/complex_analysis/contour_integrals/plot_01_cauchy_integral_theorem.html) of 1825 and the [Joukowski airfoil](https://cpoli.github.io/mathematicskit/api/gallery/complex_analysis/conformal_maps/plot_02_joukowski_airfoil.html), where a conformal map turns a circle into a wing. Both are on the [complex analysis history page](https://cpoli.github.io/mathematicskit/history/complex_analysis_breakthroughs.html).
