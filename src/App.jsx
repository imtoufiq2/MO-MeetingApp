import ToasterContext from "./helpers/context/ToasterContext";
import Routers from "./routers";
import ThemeCustomization from "./themes";
import "./App.css";

function App() {
  return (
    <ThemeCustomization>
      <ToasterContext />
      <Routers />
    </ThemeCustomization>
  );
}

export default App;
