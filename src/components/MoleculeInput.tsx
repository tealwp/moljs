import React from "react";
import { type InputType } from "../api";

interface MoleculeInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  inputType: InputType;
  setInputType: (type: InputType) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function MoleculeInput({
  inputValue,
  setInputValue,
  inputType,
  setInputType,
  loading,
  onSubmit,
}: MoleculeInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="inputType">Input Format</label>
        <select
          id="inputType"
          value={inputType}
          onChange={(e) => setInputType(e.target.value as InputType)}
          style={{ padding: "0.5rem" }}
        >
          <option value="name">Common Name (e.g., IUPAC)</option>
          <option value="smiles">SMILES</option>
          <option value="inchi">InChI</option>
          <option value="cid">PubChem CID</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="moleculeInput">Molecule Identifier</label>
        <input
          id="moleculeInput"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter molecule name..."
          style={{ padding: "0.5rem" }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "0.75rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Fetching..." : "Render Molecule"}
      </button>
    </form>
  );
}
