import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {/* Your actual logo */}
        <img
          src="/TGS-Logo.png"
          alt="The Green Standard"
          className="h-28 w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
