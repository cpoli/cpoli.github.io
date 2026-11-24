---
title: COP31 failed. The physics it was arguing about is 130 years old.
description: The Antalya climate talks collapsed on 22 November 2026 without a word on fossil fuels. Underneath the politics sits one number, the warming per doubling of CO₂, and scientists have been pinning it down since 1896.
date: 2026-11-24
kit: earthsciencekit
draft: false
---

On 22 November 2026, after two weeks and two days of overtime, the UN climate summit in Antalya ended with no agreement. The talks were hosted by Türkiye, with Australia as lead negotiator. Oil-producing states blocked any mention of moving away from fossil fuels. The European Union rejected the weaker text that was left, and only $142 million of new money was pledged. It was the first COP to collapse outright in more than a decade. UN Secretary-General António Guterres said he was "deeply disappointed", and added that there is "no ambiguity in the science".

Coverage: [UN News](https://news.un.org/en/story/2026/11/1168855), [The Washington Post](https://www.washingtonpost.com/climate-environment/2026/11/22/cop31-negotiations-break-down-countries-fail-agree-climate-deal/), [CNN](https://www.cnn.com/2026/11/22/climate/cop31-summit-collapses-in-fossil-fuel-failure), [NPR](https://www.npr.org/2026/11/22/nx-s1-6046195/cop31-climate-talks-close-disappointment).

The science he means comes down to one number: how much the Earth eventually warms if the carbon dioxide in the air doubles. It is called the **climate sensitivity**, and its history is older than the car.

## 1824–1859: a blanket of gas

Joseph Fourier noticed that sunlight alone, radiated straight back to space, would leave the Earth far colder than it is. In modern numbers, a planet that reflects 30% of the sunlight it receives should sit near 255 K, but the surface averages about 288 K. The atmosphere must hold heat in. In 1856 Eunice Foote showed that a glass cylinder of carbon dioxide heats up more in the sun than one of ordinary air, and in 1859 John Tyndall measured which gases absorb infrared radiation. Water vapour and CO₂ do; nitrogen and oxygen do not.

## 1896: every doubling counts the same

Svante Arrhenius spent a year of hand calculation on one question: what happens if CO₂ is halved or doubled? His key finding survives intact. Warming grows with the **logarithm** of the concentration, so going from 280 to 560 ppm warms the planet as much as going from 560 to 1120. His number, 5 to 6 °C per doubling, was too high, but the shape was right.

A century later, Gunnar Myhre and colleagues fitted line-by-line radiation codes and gave the shape a coefficient. The extra energy trapped, the *radiative forcing*, is

$$
\Delta F = 5.35\ \ln\frac{C}{C_0}\ \ \mathrm{W\,m^{-2}},
$$

about 3.7 W/m² per doubling. The logarithm comes from saturation: the centre of the CO₂ absorption band is already opaque, so each extra molecule acts only on the band's edges.

## 1938–1958: measuring it

Guy Callendar, a steam engineer, compiled about 200 station records in 1938, showed the world had warmed, and blamed burning fuel. The scientific establishment was unimpressed. Twenty years later Charles David Keeling started measuring CO₂ continuously at Mauna Loa, at about 315 ppm. Within two years the record showed both the breathing of northern forests and a steady climb. It now passes 420 ppm.

## 1967–1979: from a column to a range

Forcing alone gives only about 1 °C per doubling: a warmer planet radiates more, as $\sigma T^4$, and that pushes back. Everything else is **feedback**. Warmer air holds more water vapour, a greenhouse gas; melting ice exposes darker ground. Syukuro Manabe and Richard Wetherald built the first physically consistent model of a single column of atmosphere in 1967, with water vapour free to respond. Doubling CO₂ warmed its surface by 2.3 °C.

In 1979 a US National Academy panel chaired by Jule Charney reviewed the models of the day and wrote down the answer that has framed every negotiation since: **3 °C per doubling, probably between 1.5 and 4.5 °C**. The panel also warned that the ocean's heat capacity would delay the warming by decades, so that by the time it is obvious, more is already committed.

With [earthsciencekit](https://cpoli.github.io/earthsciencekit/), the whole chain is two functions:

```python
from earthsciencekit.climate import co2_forcing, equilibrium_warming

doubling = co2_forcing(560, 280, 5.35)            # 3.71 W/m²
for sensitivity in [1.5, 3.0, 4.5]:               # Charney's range, K per doubling
    feedback = doubling / sensitivity             # W/m² per K
    today = equilibrium_warming(co2_forcing(420, 280, 5.35), feedback)
    print(sensitivity, round(today, 2))
# 1.5 0.88
# 3.0 1.75
# 4.5 2.63
```

At today's 420 ppm, CO₂ alone commits the planet to between 0.9 and 2.6 °C of eventual warming, depending only on where in Charney's range the truth lies. This ignores methane, aerosols and the ocean's delay, all of which the gallery examples add one at a time. The point is how much the answer depends on that one uncertain number. The [Charney report example](https://cpoli.github.io/earthsciencekit/api/gallery/climate/plot_12_charney_report_sensitivity.html) also shows the delay: a more sensitive climate responds more slowly.

## 2004: reading the number from the energy budget

Jonathan Gregory found a way to read sensitivity without waiting for equilibrium. Quadruple CO₂ abruptly in a model, then plot the yearly imbalance at the top of the atmosphere against the warming so far. The points fall on a line: its intercept is the forcing, its slope the feedback, and where it crosses zero is the final warming. The [Gregory regression example](https://cpoli.github.io/earthsciencekit/api/gallery/climate/plot_15_gregory_forcing_feedback_regression.html) recovers both from a noisy run.

Combining such model runs with paleoclimate records and the observed warming, the IPCC's 2021 assessment narrowed Charney's range for the first time in 42 years: likely 2.5 to 4 °C, best estimate 3 °C. Charney's central value stood.

## Meanwhile, El Niño

The same week, NASA's Jet Propulsion Laboratory reported that the 2026 El Niño is building faster than the record 1997–98 event, judging by satellite measurements of Pacific sea level. A strong El Niño can lift a single year well above the trend, as the 2023–24 event did when 2024 became the first calendar year above 1.5 °C.

Why does a slow, irregular wobble like that exist at all? Klaus Hasselmann gave a general answer in 1976. The ocean integrates fast, random weather the way a heavy particle integrates molecular kicks in Brownian motion, and the result is slow "red noise" with no slow cause. The [Hasselmann example](https://cpoli.github.io/earthsciencekit/api/gallery/climate/plot_11_hasselmann_stochastic_climate.html) shows the spectrum. The lesson for the coming year is that a record-breaking 2027 will be weather riding on climate. The ride is temporary; the ramp underneath is the logarithm Arrhenius found. Hasselmann and Manabe shared the 2021 Nobel prize in physics.

## What did not change in Antalya

The negotiators failed to agree on words. None of the numbers above moved: the forcing per doubling, Charney's 3 °C, Keeling's climbing curve. The full chronology, from Fourier to the sea-level budget, is on earthsciencekit's [climate history page](https://cpoli.github.io/earthsciencekit/history/climate_breakthroughs.html). Every entry there has a runnable example with deterministic inputs, so you can check each step for yourself.
