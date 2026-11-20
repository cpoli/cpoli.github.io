---
title: The first option-pricing model came back in 2020
description: Louis Bachelier priced options in 1900 with a model that allows negative prices. Black-Scholes replaced it, until oil went to −$37.63 a barrel.
date: 2026-12-08
kit: financialkit
draft: true
---

On 20 April 2020 the expiring May contract for West Texas Intermediate crude oil settled at **−37.63 dollars a barrel**. Storage at Cushing, Oklahoma, was nearly full, so holders of the contract paid others to take delivery.

That broke the standard model for options on futures, and the fix was a formula from 1900.

## 1900: Bachelier

Louis Bachelier's doctoral thesis, supervised by Henri Poincaré, modelled prices on the Paris Bourse as a random walk. Its continuous limit is Brownian motion, five years before Einstein. In his model price changes are normally distributed, with a spread that grows like $\sqrt{T}$, and a call on a futures price $F$ with strike $K$ is worth

$$
c = e^{-rT}\left[(F - K) N(d) + \sigma_N\sqrt{T}\ n(d)\right], \qquad d = \frac{F - K}{\sigma_N\sqrt{T}}.
$$

Here $\sigma_N$ is an *absolute* volatility, in dollars rather than percent. The model's one flaw for stocks is that prices can go negative.

## 1973: Black-Scholes

Fischer Black and Myron Scholes fixed that flaw by making prices lognormal. Their real insight was hedging: an option plus the right number of shares is instantaneously riskless, so the option's price cannot depend on the stock's expected return. The paper was rejected twice before the *Journal of Political Economy* published it, weeks after the Chicago Board Options Exchange opened. Scholes and Merton won the 1997 Nobel prize; Black had died in 1995.

## 1987: the smile

Under Black-Scholes every option on the same stock and maturity has the same implied volatility. After the crash of 19 October 1987 that stopped being true: out-of-the-money puts became permanently expensive, and implied volatility has sloped down with the strike ever since. The smile is the market correcting the lognormal assumption.

## 2020: back to Bachelier

A lognormal model has no value at all for an option on a negative price. CME Clearing announced that from 22 April 2020 it would value crude oil options with Bachelier's normal model instead. A hundred and twenty years after the thesis, the first option-pricing model was back in production.

With [financialkit](https://cpoli.github.io/financialkit/) the whole episode fits in a few lines:

```python
import numpy as np
from financialkit.options import bachelier_price, black76_price

F, T, r = -37.63, 20 / 365, 0.002
strikes = np.linspace(-60.0, 20.0, 81)
calls = bachelier_price(F, strikes, T, r, 120.0, q=r)   # fine with any sign
black76_price(F, 5.0, T, r, 1.0)                        # raises ValueError
```

The gallery has runnable examples for [Bachelier's model](https://cpoli.github.io/financialkit/api/gallery/options/closed_form/plot_01_bachelier.html), [Black-Scholes](https://cpoli.github.io/financialkit/api/gallery/options/closed_form/plot_03_black_scholes.html) and [the volatility smile](https://cpoli.github.io/financialkit/api/gallery/options/implied_vol/plot_03_volatility_smile.html). The [history of option pricing](https://cpoli.github.io/financialkit/history/options_breakthroughs.html) covers the whole story, including the negative-oil example.

*financialkit is educational software, not investment advice.*
