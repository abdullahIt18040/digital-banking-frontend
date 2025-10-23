import React from "react";
import ContentLoader from "react-content-loader";

const Grid = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ContentLoader
        viewBox="0 0 820 450"
        height="100%"
        width="100%"
        className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%]"
      >
        <rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
        <rect x="280" y="10" rx="5" ry="5" width="260" height="280" />
        <rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
        <rect x="10" y="160" rx="5" ry="5" width="260" height="280" />
        <rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
        <rect x="550" y="160" rx="5" ry="5" width="260" height="280" />
      </ContentLoader>
    </div>
  );
};

Grid.metadata = {
  name: "baptiste fkt",
  github: "baptistefkt",
  description: "Three column grid layout",
  filename: "Grid",
};

export default Grid;