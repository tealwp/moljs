import { useEffect, useRef } from "react";
import * as $3Dmol from "3dmol/build/3Dmol.js";

export type VisualizationStyle = "stick" | "sphere" | "line";

interface MoleculeViewerProps {
  sdfData: string | null;
  style: VisualizationStyle;
  spin?: boolean;
  backgroundColor?: string;
}

interface GLViewer {
  clear: () => void;
  addModel: (data: string, format: string) => void;
  setStyle: (
    selection: Record<string, unknown>,
    style: Record<string, unknown>
  ) => void;
  setBackgroundColor: (color: string, alpha?: number) => void;
  spin: (axis: string | boolean, speed?: number) => void;
  zoomTo: () => void;
  render: () => void;
}

export const MoleculeViewer = ({
  sdfData,
  style,
  spin = true,
  backgroundColor = "#333",
}: MoleculeViewerProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<GLViewer | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    // Initialize the viewer if it doesn't exist
    if (!viewerInstance.current) {
      const config = { backgroundColor: "#333" };
      viewerInstance.current = $3Dmol.createViewer(viewerRef.current, config);
    }
  }, []);

  // Effect to handle data changes
  useEffect(() => {
    const viewer = viewerInstance.current;
    if (!viewer) return;

    if (sdfData) {
      // Clear previous models
      viewer.clear();

      // Add the new model (SDF format)
      viewer.addModel(sdfData, "sdf");

      // Set the initial style based on the current prop
      viewer.setStyle({}, { [style]: {} });

      // Zoom to fit the molecule in the view
      viewer.zoomTo();

      // Render the scene
      viewer.render();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdfData]); // We exclude 'style' to prevent resetting the view (zoom/rotation) when style changes

  // Effect to handle style changes
  useEffect(() => {
    const viewer = viewerInstance.current;
    if (!viewer || !sdfData) return;

    viewer.setStyle({}, { [style]: {} });
    viewer.render();
  }, [style, sdfData]);

  // Effect to handle background color changes
  useEffect(() => {
    const viewer = viewerInstance.current;
    if (!viewer) return;
    viewer.setBackgroundColor(backgroundColor);
    viewer.render();
  }, [backgroundColor]);

  // Effect to handle spin changes
  useEffect(() => {
    const viewer = viewerInstance.current;
    if (!viewer) return;
    // 'y' axis, speed 0.5
    viewer.spin(spin ? "y" : false, 0.5);
  }, [spin]);

  return (
    <div
      ref={viewerRef}
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "8px",
        position: "relative",
      }}
    />
  );
};
