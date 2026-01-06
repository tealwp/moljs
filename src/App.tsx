import { useState } from "react";
import {
  fetchMoleculeData,
  type InputType,
  type MoleculeMetadata,
} from "./api";
import { MoleculeViewer, type VisualizationStyle } from "./MoleculeViewer";
import { MoleculeInput } from "./components/MoleculeInput";
import { DisplayControls } from "./components/DisplayControls";
import { MoleculeDetails } from "./components/MoleculeDetails";
import "./App.css";
import { GithubLink } from "./components/GithubLink";
import { ErrorModal } from "./components/ErrorModal";

function App() {
  const [inputValue, setInputValue] = useState<string>("Aspirin");
  const [inputType, setInputType] = useState<InputType>("name");
  const [sdfData, setSdfData] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<MoleculeMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [visualizationStyle, setVisualizationStyle] =
    useState<VisualizationStyle>("stick");
  const [spin, setSpin] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState<string>("#333");
  const [error, setError] = useState<string | null>(null);

  const handleRender = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) {
      setInputType("name");
      setInputValue("Aspirin");
    }

    setLoading(true);
    setError(null);
    setSdfData(null);
    setMetadata(null);

    try {
      const result = await fetchMoleculeData(inputValue, inputType);
      setSdfData(result.sdf);
      setMetadata(result.metadata);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        gap: "1rem",
        minWidth: "700px",
      }}
    >
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
      <header>
        <h1>Render A Molecule</h1>
      </header>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}
      >
        <MoleculeInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputType={inputType}
          setInputType={setInputType}
          loading={loading}
          onSubmit={handleRender}
        />
        <DisplayControls
          visualizationStyle={visualizationStyle}
          setVisualizationStyle={setVisualizationStyle}
          spin={spin}
          setSpin={setSpin}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
        />
        <MoleculeViewer
          sdfData={sdfData}
          style={visualizationStyle}
          spin={spin}
          backgroundColor={backgroundColor}
        />
        {metadata && <MoleculeDetails metadata={metadata} />}
      </div>
      <GithubLink />
    </div>
  );
}

export default App;
