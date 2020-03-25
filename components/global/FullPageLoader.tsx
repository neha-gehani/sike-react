import React from "react";
import classnames from "classnames";

interface LoaderProps {
  isDark?: boolean;
  className?: string;
}

const FullPageLoader: React.FC<LoaderProps> = ({ isDark, className }) => {
  return (
    <div className="h-50 w-100 d-flex justify-content-center align-items-center text-center">
      <div
        className={classnames(["full-loader", className], {
          dark: isDark
        })}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default FullPageLoader;
