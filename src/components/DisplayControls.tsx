import { type VisualizationStyle } from "../MoleculeViewer";

interface DisplayControlsProps {
  visualizationStyle: VisualizationStyle;
  setVisualizationStyle: (style: VisualizationStyle) => void;
  spin: boolean;
  setSpin: (spin: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

export function DisplayControls({
  visualizationStyle,
  setVisualizationStyle,
  spin,
  setSpin,
  backgroundColor,
  setBackgroundColor,
}: DisplayControlsProps) {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#333",
        borderRadius: "8px",
        border: "1px solid #eee",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {(["stick", "sphere", "line"] as VisualizationStyle[]).map(
            (style) => (
              <button
                key={style}
                onClick={() => setVisualizationStyle(style)}
                style={{
                  flex: 1,
                  padding: "0.4rem",
                  fontSize: "0.85rem",
                  backgroundColor:
                    visualizationStyle === style ? "#1d769aff" : "#ccc",
                  color: visualizationStyle === style ? "#ccc" : "#555",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </button>
            )
          )}
          <select
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            style={{ marginLeft: "0.5rem", padding: "0.25rem" }}
            defaultValue={backgroundColor}
          >
            <option value="#333">Dark</option>
            <option value="#ccc">Light</option>
          </select>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={spin}
              onChange={(e) => setSpin(e.target.checked)}
            />
            Spin
          </label>
        </div>
      </div>
    </div>
  );
}
