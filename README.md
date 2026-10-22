# Satellite Overlap Atlas

A polished, static dashboard for exploring potential Landsat and ASTER overlaps with MODIS and VIIRS from 2012–2026.

## Dashboard

The project uses two top-level reference-satellite tabs:

- **Landsat** — Landsat 7, 8 and 9 coincidence opportunities
- **ASTER** — ASTER/Terra coincidence opportunities

The analytical structure is intentionally consistent across both tabs: Explore, Satellites, Candidate scenes, and Method.

## Interpretation

The dashboard label **Potential satellite overlaps — Based on orbit timing and location** means the results identify places and times where the modeled satellite geometry supports a close overpass. They do not by themselves confirm that both instruments acquired usable imagery.

Read [`docs/AUDIT.md`](docs/AUDIT.md) and [`docs/METHODOLOGY.md`](docs/METHODOLOGY.md) before scientific interpretation.

## GitHub Pages build

The GitHub Pages version is optimized for browser performance. It retains the full atlas-level summary statistics and uses a coarser web map grid plus representative candidate-table samples. The original full-resolution project/data bundle should be retained separately for archival analysis and reproducibility.

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

Open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
