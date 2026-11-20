---
name: Gators
title: Gators, fast feature engineering on Polars
description: Gators is PayPal's open-source Python package for data preprocessing and feature engineering on Polars, with a scikit-learn-style API and ONNX export.
tagline: scikit-learn-style preprocessing, running on Polars.
repo: paypal/Gators
docs: https://paypal.github.io/gators/
install: pip install gators
image: gators
imageAlt: The Gators logo
logo: true
keywords: [feature engineering, data preprocessing, Polars, scikit-learn, ONNX, machine learning, Python]
---

## The problem

Machine-learning pipelines spend much of their time in preprocessing: encoding categories, imputing missing values, building features. Doing it in pandas and scikit-learn is familiar but slow on large tables, and the fitted pipeline then has to be rebuilt for production.

## What Gators does

Gators gives preprocessing a scikit-learn-style `fit` / `transform` API on top of [Polars](https://pola.rs):

- **131 transformers in 12 categories**: encoders, imputers, scalers, binning, feature generation, feature selection and more.
- **Lazy execution.** Transformers accept Polars `LazyFrame`s, so a whole pipeline can be optimised before it runs.
- **ONNX export.** A fitted pipeline exports to ONNX for low-latency serving.

## Results

On 500,000 rows (Apple M3 Max), compared with scikit-learn:

| Transformer | Speed-up |
| --- | --- |
| `TargetEncoder` | 15.0× |
| `OrdinalEncoder` | 9.1× |
| `OneHotEncoder` | 6.2× |

## My role

I created Gators at PayPal, where it was open-sourced, and I am its main contributor and maintainer.

## Get started

```bash
pip install gators           # or gators[onnx] for ONNX export
```

The [documentation](https://paypal.github.io/gators/) covers every transformer with examples.
