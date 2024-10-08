## USDA Rural Eligibility Checker

This repository contains scripts and data used to determine whether businesses and/or event participants are located in areas eligible for USDA Rural Cooperative Development Grant funding. The determination is based on USDA-provided eligibility maps and shapefiles for all U.S. ZIP Code Tabulation Areas (ZCTAs).

## Components

Python Script: filter_eligible_zip_codes.py
This script processes ZIP code and USDA eligibility shapefiles to identify ZIP codes that are not located in rural ineligible areas.
The output is a CSV file (eligible_zips.csv) containing ZIP codes that are eligible for USDA Rural Development Cooperative funding.

Airtable Script: airtable_rural_check.js
This script is designed for use in an Airtable base. It checks participant or business records for their ZIP codes and determines whether they fall within USDA rural eligibility, based on the filtered list of ZIP codes. The results are then stored in Airtable.

ZIP Code List: eligible_zips.csv
A CSV file containing the final list of ZIP codes eligible for USDA Rural Cooperative Development Grants, created by the Python script.

## How It Works

1. Python Script (filter_eligible_zip_codes.py)
Fetches and processes two geographic datasets:
USDA Rural Business Service Eligibility: This dataset provides geographic boundaries for areas that are not eligible for USDA Rural Cooperative Development Grant funding.
U.S. Census 5-Digit ZIP Code Tabulation Areas (ZCTA5): This dataset provides the boundaries for all ZIP Code Tabulation Areas (ZCTAs) in the U.S.
The script checks for intersections between these two datasets and generates a list of ZIP codes that do not intersect with ineligible areas (i.e., those that are USDA-eligible).

2. List of Eligible Zip Codes
The output of the python script is a CSV file, eligible_zips.csv, which contains the list of USDA-eligible ZIP codes based on geographic intersection analysis between U.S. ZIP Code areas and the USDA-provided rural eligibility boundaries.

3. Airtable Script (airtable-participant-lookup-script.js)
Pulls participant or business records from an Airtable base.
Compares the ZIP codes in those records with the list of eligible ZIP codes generated by the Python script.
Marks records as eligible or ineligible based on the comparison and updates the Airtable base accordingly.


## Data Sources

[USDA Rural Development Property Eligibility - Rural Business Service](https://catalog.data.gov/dataset/usda-rural-development-property-eligibility-rural-business-service-bi-guaranteed-rbeg-rbog)

Provides shapefiles for areas that are ineligible for USDA Rural Cooperative Development Grant funding.

Last updated: November 10, 2020.

[TIGER/Line Shapefile, 2022, Nation, U.S., 2020 Census 5-Digit ZIP Code Tabulation Area (ZCTA5)](https://catalog.data.gov/dataset/tiger-line-shapefile-2022-nation-u-s-2020-census-5-digit-zip-code-tabulation-area-zcta5)

Provides shapefiles for all ZIP Code Tabulation Areas (ZCTA5) in the U.S.

Last updated: January 27, 2024.

## Disclaimer

While this tool uses data sources provided by USDA and the US Census Bureau, these methods for determining eligiblity by zip code have not been vetted by the USDA. Use at your own risk.
