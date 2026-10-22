# Dashboard Methodology Notes

## Common interpretation

The dashboard summarizes modeled temporal/geometric overlap between a reference sensor and MODIS/VIIRS partner views. Gap values are partner time minus reference-scene time. The source atlases search for a covering partner view around each modeled reference scene center.

## Landsat

Reference sensors are Landsat 7, Landsat 8 and Landsat 9. A MODIS + VIIRS candidate requires the nearest qualifying MODIS-family view and VIIRS-family view to both lie within the selected time threshold.

## ASTER

ASTER is carried on Terra. Terra MODIS is therefore simultaneous with the modeled ASTER reference point (`Δt = 0 s`, cross-track = 0 km). In practice, the informative temporal filter for an ASTER triple candidate is the VIIRS gap. Aqua remains a separate partner where relevant.

## Important exclusions

The atlas does not guarantee cloud-free imagery, a real acquisition, a fire occurrence, useful image quality, or full-footprint overlap. Use it for candidate discovery and geometric screening, then verify real observations in the authoritative mission archives.
