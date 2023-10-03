# leaflet-challenge

Using USGS data create a visualization of earthquake data.

## Data Retrieval

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I visited the USGS GeoJSON Feed and choose a dataset to work with.
Then using D3 I queried the URL. 

## Visualization

After importing the data I used Leaflet to create a map that plots all the earthwuakes from your dataset based on their longitude and latitude.  The data markers
indicate the size and depth of the earthquake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear in color scale. 
Also included are popups that provide additional information about the earthquake when its associated marker is clicked.

### Technologies used:

Javascript
HTML/CSS
Libraries: D3, Leaflet
