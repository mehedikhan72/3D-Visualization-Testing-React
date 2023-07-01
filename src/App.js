import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Earthquake from "./components/Earthquake";
import PopulationDensity from "./components/PopulationDensity";

function App() {
  return (
    <div className="App">
      <p className="text-4xl font-bold text-center m-10">Hi mom</p>
      <p className="text-lg font-bold text-center p-2">
        Click{" "}
        <Link
          className="underline text-indigo-500"
          to={{ pathname: "/3d/earthquake/" }}
        >
          here
        </Link>{" "}
        to see the earthquake data
      </p>
      <p className="text-lg font-bold text-center p-2">
        Click{" "}
        <Link
          className="underline text-indigo-500"
          to={{ pathname: "/3d/population-density/" }}
        >
          here
        </Link>{" "}
        to see the population density data
      </p>
      <Routes>
        <Route path="/3d/population-density/" element={<PopulationDensity />} />
        <Route path="/3d/earthquake/" element={<Earthquake />} />/3d
      </Routes>
    </div>
  );
}

export default App;
