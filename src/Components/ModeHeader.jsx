import React from "react";

const ModeHeader = ({ mode, themeColor }) => {
  const modeText = mode === "work" ? "Çalışma Süresi" : "Mola Süresi";
  const modeEmoji = mode === "work" ? "💪" : "☕";

  return (
    <div className="mode-header">
      <h1 style={{ color: themeColor }}>
        {modeEmoji} {modeText}
      </h1>
    </div>
  );
};

export default ModeHeader;

