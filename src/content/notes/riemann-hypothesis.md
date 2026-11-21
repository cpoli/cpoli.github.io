---
title: The Riemann hypothesis may have just fallen. Here is what it says.
description: On 20 November 2026 a machine-checked proof of the Riemann hypothesis was announced. It is not verified yet, but this is the most serious attempt in 167 years. What the conjecture says, why primes care, and how to explore it in a few lines of Python.
date: 2026-11-21
kit: mathematicskit
draft: false
---

On 20 November 2026, Levent Alpöge, a mathematician at Anthropic, announced a proof of the **generalized Riemann hypothesis**, and with it the Riemann hypothesis itself. The proof was produced with Anthropic's Claude models. It comes as a [four-page note](https://alpo.ge/remark.pdf) and a [Lean formalization](https://github.com/CocoSgt/riemann-hypothesis-lean) of about 17 million lines.

The problem has been open since 1859. It is one of the seven Millennium Prize Problems and the one most mathematicians would pick as the most important open question in their field. So it is worth being precise about two things: what the hypothesis says, and where the claim stands today.

## Where the claim stands

The short version is *very promising, not yet confirmed*.

- **The Lean code compiles.** Andrew Sutherland (MIT) rebuilt it separately and reported that it "has been compiled and independently rechecked by the Lean kernel with only the three standard axioms." A kernel check is a strong guarantee that every step follows from the last.
- **The open question is the statement.** Kevin Buzzard (Imperial) put it plainly: what matters is "what is the statement of the theorem in the Lean code, and does this correspond to the actual theorem statement". A perfect proof of a subtly wrong definition proves nothing. A *comparator* run checks the formal statement against an independently written one, the axioms used, and the proof itself with several checkers. As of 21 November, one run reportedly passed the statement and axiom checks with its kernel checks still running, so there is no final verdict yet.
- **Reactions are mixed.** James Maynard: "If this fully checks out, it is clearly a historic milestone in mathematics." Andrew Granville found the human-readable write-up "garbled". Scott Aaronson [bets the proof will stand](https://scottaaronson.blog/?p=10344). Gary Marcus says celebration is premature.

Coverage: [Nature](https://www.nature.com/articles/d41586-026-03812-7), [Scientific American](https://www.yahoo.com/news/science/articles/ai-riemann-hypothesis-proof-almost-210000837.html), [The Washington Post](https://www.washingtonpost.com/technology/2026/11/20/using-anthropic-ai-mathematician-claims-have-solved-riemann-hypothesis/). I will update this note when the comparator verdict is in.

Now, the mathematics.

## 1735: a sum that knows about π

Add up the reciprocals of the squares:

$$1 + \frac{1}{4} + \frac{1}{9} + \frac{1}{16} + \cdots = \frac{\pi^2}{6}.$$

Euler proved this in 1735 and solved the Basel problem, which had beaten the Bernoullis. The general sum is the **zeta function**:

$$\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}, \qquad s > 1.$$

## 1737: the same sum knows about primes

Two years later Euler found the identity that started analytic number theory:

$$\sum_{n=1}^{\infty} \frac{1}{n^s} = \prod_{p\ \mathrm{prime}} \frac{1}{1 - p^{-s}}.$$

The left side runs over all integers, the right side over the primes only. They agree because every integer factors into primes in exactly one way. That is the bridge: anything you learn about $\zeta$ is information about the primes.

You can watch the product creep up to $\pi^2/6$ with [mathematicskit](https://cpoli.github.io/mathematicskit/):

```python
import math
from mathematicskit.special_functions import riemann_zeta
from mathematicskit.number_theory import euler_product

print(riemann_zeta(2.0), math.pi**2 / 6)   # 1.6449340668... twice
for N in (10, 100, 10_000):
    print(N, euler_product(2.0, N))        # 1.5951, 1.6419, 1.644918
```

Ten primes' worth of product already gets two digits right. The [Basel and Euler product gallery example](https://cpoli.github.io/mathematicskit/api/gallery/number_theory/zeta/plot_01_basel_euler_product.html) plots the convergence.

## 1859: Riemann goes complex

In an eight-page paper, his only one on number theory, Bernhard Riemann did three things:

1. He let $s$ be a **complex** number and extended $\zeta(s)$ to the whole plane except $s = 1$, by analytic continuation.
2. He found a **functional equation** relating $\zeta(s)$ to $\zeta(1-s)$, a mirror symmetry about the line $\mathrm{Re}\ s = 1/2$.
3. He wrote down an **explicit formula** for counting primes as a sum over the zeros of $\zeta$.

The continuation gives famous values that the original series cannot: $\zeta(0) = -1/2$, $\zeta(-1) = -1/12$, and $\zeta(-2) = \zeta(-4) = \zeta(-6) = \cdots = 0$. Those last ones are the **trivial zeros**:

```python
import numpy as np

print(riemann_zeta(0.0), riemann_zeta(-1.0))          # -0.5  -0.08333...
print(riemann_zeta(np.array([-2.0, -4.0, -6.0])))     # [0. 0. 0.]
```

All the other zeros, the **nontrivial** ones, lie in the strip $0 < \mathrm{Re}\ s < 1$. The first is at $s \approx \tfrac12 + 14.1347\ i$.

## The hypothesis

> Every nontrivial zero of $\zeta(s)$ has real part exactly $\tfrac12$.

Riemann wrote that this was "very probable" and that he had put the search for a proof aside. Since then, more than ten trillion zeros have been computed, and every one sits on the line $\mathrm{Re}\ s = \tfrac12$. Numerical evidence on that scale does not prove anything about the infinitely many zeros beyond, which is why the problem has been open so long.

## Why primes care

Let $\pi(x)$ count the primes up to $x$. Gauss guessed that $\pi(x)$ is close to the logarithmic integral $\operatorname{li}(x) = \int_0^x dt/\ln t$. The prime number theorem (1896) proved that the ratio tends to 1. It did not say how big the error is.

The zeros of $\zeta$ control that error. In Riemann's explicit formula, each zero $\rho$ contributes a wave of size about $x^{\mathrm{Re}\ \rho}$. Zeros on the critical line give waves of size $\sqrt{x}$, and von Koch showed in 1901 that RH is *equivalent* to

$$|\pi(x) - \operatorname{li}(x)| \le C\sqrt{x}\ \ln x.$$

In words, the primes are as regular as they can possibly be. They are as random as coin flips, and no more.

```python
from mathematicskit.number_theory import prime_counting, logarithmic_integral

x = np.array([10**3, 10**4, 10**5, 10**6])
print(prime_counting(x))          # [  168  1229  9592 78498]
print(logarithmic_integral(x))    # [  177.6  1246.1  9629.8  78627.5]
print(x / np.log(x))              # [  144.8  1085.7  8685.9  72382.4]
```

At a million, $\operatorname{li}(x)$ is off by 130 primes, while the naive $x/\ln x$ is off by more than 6,000. The [prime number theorem gallery example](https://cpoli.github.io/mathematicskit/api/gallery/number_theory/prime_distribution/plot_01_prime_number_theorem.html) draws the race.

Hundreds of published theorems begin "assuming RH…" or "assuming GRH…". They cover how quickly a primality test runs, the size of the least quadratic non-residue, and class numbers. If the proof holds, all of them become unconditional at once. That is why this claim matters even to people who never think about $\zeta$.

## What to watch

The mathematics will not be settled by press releases. It will be settled by three things:

- the comparator run on the Lean statement;
- experts reading the formal definitions of $\zeta$, the zeros and the critical line;
- a human-readable account of *why* the proof works.

Each of these can be checked in public. That is new, and whatever the verdict, it is how big claims in mathematics will be tested from now on.

For the history up to the eve of this announcement, see the [special functions history page](https://cpoli.github.io/mathematicskit/history/special_functions_breakthroughs.html) and the [number theory history page](https://cpoli.github.io/mathematicskit/history/number_theory_breakthroughs.html) of mathematicskit, and the [Riemann zeta gallery example](https://cpoli.github.io/mathematicskit/api/gallery/special_functions/zeta/plot_01_riemann_zeta.html).
