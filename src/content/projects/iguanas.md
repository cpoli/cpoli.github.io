---
name: Iguanas
title: Iguanas, rule generation for fraud detection
description: Iguanas is PayPal's open-source Python package for generating, evaluating and selecting human-readable fraud rules, built on Polars.
tagline: Readable fraud rules, generated from data and from tree models.
repo: paypal/Iguanas
docs: https://paypal.github.io/Iguanas/
install: pip install iguanas
image: iguanas
imageAlt: The Iguanas logo
logo: true
keywords: [fraud detection, rule generation, rule-based systems, Polars, XGBoost, LightGBM, Python]
---

## The problem

Fraud teams run on rules: short, readable conditions such as "amount above X and account younger than Y days" that analysts can audit, explain and switch off. Writing and tuning those rules by hand is slow, and the machine-learning models that catch more fraud are hard to turn into something an analyst can read.

## What Iguanas does

Iguanas generates, evaluates and selects rules from labelled data:

- **Rules from tree models.** It reads candidate rules from the decision paths of XGBoost, LightGBM and random-forest models, including models trained with monotone constraints.
- **Rule induction.** A sequential-covering learner builds rules directly from the data.
- **Evaluation and selection.** Every rule gets precision, recall and other metrics, and a selection step keeps a small, non-redundant set.
- **Deployment.** Rules export to SQL or ONNX, so they run where the transactions are.

It is built on [Polars](https://pola.rs), so it handles large transaction tables quickly.

## My role

I co-developed Iguanas in the PSP Data Team at PayPal, where it was open-sourced, and I still maintain it.

## Get started

```bash
pip install iguanas          # or iguanas[onnx] for ONNX export
```

The [documentation](https://paypal.github.io/Iguanas/) has a user guide and worked examples.
