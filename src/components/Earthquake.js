import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { scaleLinear } from "d3";

export default function Earthquake() {
  const [quake, setQuake] = useState([]);

  useEffect(() => {
    fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setQuake(data.features);
        console.log(data);
      });
  }, []);

  const weightColor = scaleLinear()
    .domain([0, 30])
    .range(["lightblue", "darkred"])
    .clamp(true);

  return (
    <div className="fixed top-0 left-0">
      <Globe
        hexBinPointsData={quake}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        hexBinPointLng={(d) => d.geometry.coordinates[0]}
        hexBinPointLat={(d) => d.geometry.coordinates[1]}
        hexBinPointWeight={(d) => d.properties.mag}
        hexBinResolution={4}
        hexAltitude={({ sumWeight }) => sumWeight * 0.005}
        hexTopColor={(d) => weightColor(d.sumWeight)}
        hexSideColor={(d) => weightColor(d.sumWeight)}
        hexLabel={(d) => `
        <b>${d.points.length}</b> earthquakes in the past month:<ul><li>
          ${d.points
            .slice()
            .sort((a, b) => b.properties.mag - a.properties.mag)
            .map((d) => d.properties.title)
            .join("</li><li>")}
        </li></ul>
      `}
      />
    </div>
  );
}
