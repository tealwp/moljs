import { type MoleculeMetadata } from "../api";

interface MoleculeDetailsProps {
  metadata: MoleculeMetadata;
}

export function MoleculeDetails({ metadata }: MoleculeDetailsProps) {
  return (
    <div style={{ textAlign: "left" }}>
      <h3>Molecule Details</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          fontSize: "0.9rem",
        }}
      >
        <div
          style={{
            padding: "0.5rem",
            backgroundColor: "#333",
            borderRadius: "8px",
            border: "1px solid #eee",
          }}
        >
          <h2 style={{ marginTop: 0 }}>{metadata.name}</h2>
          <p>
            <strong>Formula:</strong>
            <br /> <code>{metadata.formula}</code>
          </p>
          <p>
            <strong>IUPAC Name:</strong>
            <br /> <code>{metadata.iupacName}</code>
          </p>
          <p>
            <strong>PubChem CID:</strong> {metadata.cid}
          </p>
        </div>

        <div
          style={{
            padding: "0.5rem",
            backgroundColor: "#333",
            borderRadius: "8px",
            border: "1px solid #eee",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Properties</h2>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            <li>
              <strong>Molecular Weight:</strong> {metadata.molecularWeight}{" "}
              g/mol
            </li>
            <li>
              <strong>XLogP3 (Hydrophobicity):</strong>{" "}
              {metadata.xLogP ?? "N/A"}
            </li>
            <li>
              <strong>TPSA (Polar Surface Area):</strong>{" "}
              {metadata.tpsa ?? "N/A"} Å²
            </li>
            <li>
              <strong>Formal Charge:</strong> {metadata.charge ?? 0}
            </li>
          </ul>
          {metadata.cid && (
            <div style={{ marginTop: "1rem" }}>
              <a
                href={`https://pubchem.ncbi.nlm.nih.gov/compound/${metadata.cid}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#1d769aff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                View on PubChem ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
