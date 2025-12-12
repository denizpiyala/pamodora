import React from "react";

const ModeHeader = ({ themeColor }) => {
  return (
    <div className="mode-header">
       <h1 style={{ color: themeColor }}>
        🍅 Çalışma Zamanı
      </h1><p style={{ fontSize: "14px", opacity: 0.7, marginTop: "5px" }}>Odaklan ve verimliliğini artır</p>
    </div>
  );
};



export default ModeHeader;