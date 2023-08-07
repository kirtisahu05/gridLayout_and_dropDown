import "./styles.css";
import { useState } from "react";
import ReactGridLayout from "../src/Components/ReactGridLayout";
import CustomizableDropdown from "../src/Components/CustomizableDropdown";
import { options } from "./dummyData";
import { VIEW_TYPE } from "./constants";

export default function App() {
  const [viewType, setViewType] = useState(VIEW_TYPE.HOME);

  return (
    <div className="App">
      {viewType === VIEW_TYPE.HOME && (
        <div>
          <h1>WorkOnGrid</h1>
          <h4>Front-End Developer Assignment</h4>
          <button className="button" onClick={() => setViewType("grid")}>
            React Grid Layout
          </button>
          <br />
          <br />
          <button className="button" onClick={() => setViewType("dropdown")}>
            Customizable Dropdown
          </button>
        </div>
      )}

      {viewType === VIEW_TYPE.GRID && (
        <>
          <div className="header">
            <button className="back-button" onClick={() => setViewType("home")}>
              Back
            </button>
            <h1 className="page-heading">React Grid Layout</h1>
          </div>
          <ReactGridLayout columns={3} numOfBoxes={35} />
        </>
      )}
      {viewType === VIEW_TYPE.DROPDOWN && (
        <>
          <div className="header">
            <button className="back-button" onClick={() => setViewType("home")}>
              Back
            </button>
            <h1 className="page-heading">Custom Dropdown Component</h1>
          </div>
          <div>
            <CustomizableDropdown options={options} multiple />
          </div>
        </>
      )}
    </div>
  );
}
