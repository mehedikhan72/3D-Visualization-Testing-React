import React, { useMemo, useState, useEffect } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";
import Loading from "./Loading";

export default function PopulationDensity() {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [loading, setLoading] = useState(true);

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  const calculatePopulationDensity = (population, area) => {
    if (area === null || area === undefined || area === -1) {
      // If somehow the API was unable to get the area...
      return 100;
    }
    return population / area;
  };

  const maxVal = useMemo(
    () =>
      Math.max(
        ...countries.features.map((d) =>
          calculatePopulationDensity(
            d.properties.POP_EST,
            d.properties.area_km2
          )
        )
      ),
    [countries]
  );

  colorScale.domain([0, maxVal]);

  const fetchGeoJson = () => {
    fetch("/3D-Visualization-Testing-React/data/data-w-area.geojson")
      .then((response) => response.json())
      .then(setCountries);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchGeoJson();
  }, []);

  return (
    <div className="fixed top-0 left-0">
      {loading && <Loading />}
      {!loading && (
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          polygonsData={countries.features}
          polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.06)}
          polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
          polygonStrokeColor={() => "#111"}
          onPolygonHover={setHoverD}
          polygonsTransitionDuration={300}
          polygonCapColor={(d) =>
            d === hoverD
              ? "steelblue"
              : colorScale(
                  calculatePopulationDensity(
                    d.properties.POP_EST,
                    d.properties.area_km2
                  )
                )
          }
          polygonLabel={({ properties: d }) => `
        <div style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">
          <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
          POPULATION DENSITY: <i>${calculatePopulationDensity(
            d.POP_EST,
            d.area_km2
          ).toFixed(2)}</i>
        </div>
      `}
        />
      )}
    </div>
  );
}
