import React from "react";
import classnames from "classnames";

interface LoaderProps {
  isDark?: boolean;
  className?: string;
}

const InlineLoader: React.FC<LoaderProps> = ({ isDark, className }) => {
  return (
    <div
      className={classnames(["inline-loader", className], {
        dark: isDark
      })}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default InlineLoader;
