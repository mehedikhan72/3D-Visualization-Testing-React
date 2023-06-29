# 3D visualization using react-globe.gl
Showing geo data on a 3D globe is really fulfilling so I tried out this awesome library called [react-globe.gl](https://github.com/vasturiano/react-globe.gl).

I have two globes in this react app. One showing recent earthquakes and the other one showing the population density of the countries of the world. The first one was straight-forward to implement but the second one was a bit tricky. I had to use an external API to write 'area' data to the geojson file and then use that file to render the globe. 

## Recent Earthquakes
Recent earthquakes happening around the world.
<br />
<div align="center">
  <img src="./readme-images/earthquake.png" alt="Image Description">
</div>
<br />

## Population Density
Population density of the countries of the world, though the data is not very recent.
<br />
<div align="center">
  <img src="./readme-images/population-density.png" alt="Image Description">
</div>
<br />

## How to run the app
- Clone the repo
- Run `npm install` or `yarn install` to install the dependencies
- Run `npm start` or `yarn start` to start the app
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## References
- [react-globe.gl](https://github.com/vasturiano/react-globe.gl)