# Data & Package Audit

Audit date: 2026-10-22

## Decision

**PASS — no structural blocker to dashboard publication.**

The audit covers the four supplied archives:

- `landsat_coincidence_atlas_v1.zip`
- `landsat_coincidence_scenes_2012-2026.zip`
- `aster_coincidence_atlas_v1.zip`
- `aster_coincidence_scenes_2012-2026.zip`

## Integrity findings

| Check | Landsat | ASTER | Result |
|---|---:|---:|---|
| Main candidate rows | 17,469 | 277,760 | Pass |
| Pair-level rows | 360,497 | 290,537 | Pass |
| Duplicate output rows | 0 | 0 | Pass |
| Invalid UTC values | 0 | 0 | Pass |
| Invalid latitude/longitude | 0 | 0 | Pass |
| Coincidence gaps outside ±300 s in ≤300 s files | 0 | 0 | Pass |
| Missing required values | 0 | 0* | Pass |

\* ASTER `aqua_dt_s` is intentionally missing when no Aqua view exists inside the wider search window. It is not a required triple-coincidence field.

Both scene archives contain all 15 yearly NPZ files from 2012 through 2026 and use the same core per-scene fields (`t`, `lat`, `lon`, reference sensor code, partner time gaps, and cross-track distances).

## Scientific interpretation that the UI must preserve

1. **These products are orbit simulations.** They represent geometric coincidence opportunities, not proof that imagery was acquired, cloud-free, or useful for a fire event.
2. **2026 contains projected/future opportunities.** The supplied Landsat pair file continues through 2026-12-31 and ASTER outputs through 2026-11-11. They should not be presented as observations.
3. **ASTER is not equivalent to Landsat operationally.** ASTER rides on Terra; therefore Terra MODIS has Δt = 0 s and cross-track distance = 0 km by construction for every ASTER scene center.
4. **ASTER scene centers are modeled opportunities, not the scheduled ASTER archive.** Actual ASTER acquisitions should be checked against NASA CMR / AST_L1T for observation confirmation.
5. **Known lower-confidence model periods must stay visible.** The Landsat package documentation flags Landsat 7 after its 2017 drift, NOAA-21 phasing, drifting Terra/Aqua periods, and late-2026 extrapolation.
6. **Scene-center geometry is used.** Full footprint/corner timing can differ.

## Reproducibility note

The supplied package includes hold-out, independent-overpass, and solver-vs-brute-force validation scripts. A direct execution of `validate2.py` in this environment was blocked because the optional runtime dependency `global_land_mask` is not installed here. This does **not** change the output-integrity results above; it means the orbit-model validation claims in the supplied technical documentation were not independently rerun during this dashboard packaging step.

## Dashboard decision

The data are suitable for a shared two-tab dashboard provided the interface clearly labels the products as **potential satellite overlaps based on orbit timing and location** and preserves the Landsat/ASTER methodological differences. The delivered dashboard does this.
