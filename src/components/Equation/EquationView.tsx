import React from "react";
import Latex from "react-latex";
import { EquationContainer } from "../../styles/layoutUtils";

/**
 * Component for rendering mathematical equations using react-latex
 */
const EquationViewer: React.FC<{equation: string, displayMode?: boolean}> = ({ 
  equation, 
  displayMode = true 
}) => {
  // Format equation based on display mode
  const formattedEquation = displayMode 
    ? `$$${equation}$$`  // Display mode uses double dollar signs
    : `$${equation}$`;   // Inline mode uses single dollar signs

  return (
    <EquationContainer 
      aria-label="Mathematical equation preview"
      className={displayMode ? "display-equation" : "inline-equation"} >
      <Latex>{formattedEquation}</Latex>
    </EquationContainer>
  );
};

export default EquationViewer;