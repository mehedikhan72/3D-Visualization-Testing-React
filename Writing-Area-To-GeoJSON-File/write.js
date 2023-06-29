const fs = require("fs");
require('isomorphic-fetch');

const getCountryArea = async (countryCode) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3/alpha/${countryCode}`
    );
    const data = await response.json();

    if (response.ok) {
      const area = data[0].area;
      return area;
    } else{
      // If the response is not OK, throw an error with the status text
      // throw new Error(data.message);
      return -1; // -1 means that the area is not available
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const inputFilePath = "./input.geojson";
const outputFilePath = "./output.geojson";

fs.readFile(inputFilePath, "utf8", async (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  try {
    const geojson = JSON.parse(data);

    for (const feature of geojson.features) {
      const countryCode = feature.properties.ADM0_A3;
      const area = await getCountryArea(countryCode);
      feature.properties.area_km2 = area;

      console.log("Country:", countryCode, "Area:", area);
    }

    const modifiedGeoJSON = JSON.stringify(geojson);

    fs.writeFile(outputFilePath, modifiedGeoJSON, (err) => {
      if (err) {
        console.error("Error writing modified GeoJSON file:", err);
        return;
      }
      console.log("Modified GeoJSON file written successfully!");
    });
  } catch (error) {
    console.error("Error processing GeoJSON data:", error);
  }

});
