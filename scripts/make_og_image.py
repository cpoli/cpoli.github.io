"""Render public/og-stadium.png, the 1200x630 share image used by LinkedIn and others.

Needs physicskit; run with its environment from the repo root:

    ../physicskit/.venv/bin/python scripts/make_og_image.py [output.png]
"""

import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.collections import LineCollection
from matplotlib.colors import LinearSegmentedColormap

from physicskit.chaos.systems.billiards import BunimovichStadium

OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / "public" / "og-stadium.png"
W, H, DPI = 1200, 630, 100
BG, FG, MUTED, ACCENT = "#fdfdfc", "#1f2328", "#5d6670", "#1b5fbf"
PT = 72 / DPI  # points per pixel

# Stadium trajectory, rotated upright so it fills the right-hand column.
stadium = BunimovichStadium(radius=1.0, straight_length=2.0)
path, _ = stadium.trajectory_segments((0.3, 0.2), vel=(0.5, 0.9), n_bounces=110)
path = path[:, ::-1]
boundary = stadium.boundary_polyline()[:, ::-1]

fig = plt.figure(figsize=(W / DPI, H / DPI), dpi=DPI, facecolor=BG)

# Accent bar along the top, as on the site.
fig.add_artist(plt.Rectangle((0, 1 - 10 / H), 1, 10 / H, transform=fig.transFigure, color=ACCENT, lw=0))

# Billiard: right-hand column, no axes, frame or colorbar.
ax = fig.add_axes((780 / W, 45 / H, 360 / W, 545 / H))
ax.set_axis_off()
segments = np.stack([path[:-1], path[1:]], axis=1)
cmap = LinearSegmentedColormap.from_list("og", ["#1b5fbf", "#6a3fb5", "#d0457a", "#f08a24"])
lines = LineCollection(segments, cmap=cmap, linewidths=1.6, alpha=0.9, capstyle="round")
lines.set_array(np.arange(len(segments)))
ax.add_collection(lines)
ax.plot(boundary[:, 0], boundary[:, 1], color=FG, lw=2.2, solid_capstyle="round")
ax.set_xlim(-1.08, 1.08)
ax.set_ylim(-2.05, 2.05)
ax.set_aspect("equal")

# Text: left-hand column, sized to stay legible as a small LinkedIn card.
fig.text(70 / W, 1 - 215 / H, "Charles Poli, PhD", fontsize=78 * PT, fontfamily="Georgia", fontweight="bold", color=FG)
fig.text(72 / W, 1 - 300 / H, "Data scientist & theoretical physicist", fontsize=38 * PT, fontfamily="Helvetica", color=MUTED)
fig.text(72 / W, 1 - 355 / H, "Open-source scientific Python", fontsize=38 * PT, fontfamily="Helvetica", color=MUTED)
fig.text(72 / W, 1 - 560 / H, "cpoli.github.io", fontsize=36 * PT, fontfamily="Helvetica", color=ACCENT)

fig.savefig(OUT, dpi=DPI, facecolor=BG)
print(f"wrote {OUT}")
