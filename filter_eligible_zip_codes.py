import pandas as pd
import geopandas as gpd

# File URLs
uszips_url = 'https://www2.census.gov/geo/tiger/TIGER2022/ZCTA520/tl_2022_us_zcta520.zip'
rural_ineligible_url = 'https://www.sc.egov.usda.gov/data/files/RBS_Ineligible.zip'

# Load shapefiles with required columns
us_zips = gpd.read_file(uszips_url)[['ZCTA5CE20', 'geometry']]
rural_ineligible = gpd.read_file(rural_ineligible_url)

# Align CRS (Coordinate Reference System)
rural_ineligible = rural_ineligible.to_crs(us_zips.crs)

# Spatial index for efficiency
rural_ineligible_sindex = rural_ineligible.sindex

# Check if each ZIP intersects with any ineligible rural area
us_zips['intersects'] = us_zips.geometry.apply(
    lambda zip_geom: rural_ineligible.geometry.intersects(zip_geom).any()
)

# Filter eligible ZIP codes
eligible_zips = us_zips[~us_zips['intersects']][['ZCTA5CE20']]

# Save eligible ZIPs to CSV
eligible_zips.to_csv('eligible_zips.csv', index=False)
