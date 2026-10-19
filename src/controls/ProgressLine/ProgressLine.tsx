import React, { useEffect, useState } from "react";
import styles from "@src/controls/ProgressLine/ProgressLine.module.scss";

interface VisualPart {
  percentage: string | number;
  color: string;
}

interface ProgressLineProps {
  label?: string;
  backgroundColor?: string;
  visualParts?: VisualPart[];
}

const ProgressLine: React.FC<ProgressLineProps> = ({
  label,
  backgroundColor = "#e5e5e5",
  // expected format for visual parts
  visualParts = [
    {
      percentage: "0%",
      color: "white"
    }
  ]
}) => {
  // Starting values needed for the animation
  // Mapped by "visualParts" so it can work with multiple values dynamically
  // It's an array of percentage widths
  const [widths, setWidths] = useState(
    visualParts.map(() => {
      return 0;
    })
  );

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // You need to wrap it to trigger the animation
    requestAnimationFrame(() => {
      // Set a new array of percentage widths based on the props
      setWidths(
        visualParts.map(item => {
          // Convert "50%" to 50
          let pct = typeof item.percentage === "string"
            ? parseFloat(item.percentage)
            : item.percentage;
            // In case percentage is higher than 100, cap it at 100 to standardise animation speed
          return Math.min(pct, 100);
        })
      );
    });
  }, [visualParts]);


  // Create a lighter version of the base color
  function lightenColor(color: string, percent: number) {
    const num = parseInt(color.replace("#", ""), 16);
    const r = Math.min(255, (num >> 16) + percent);
    const g = Math.min(255, ((num >> 8) & 0x00ff) + percent);
    const b = Math.min(255, (num & 0x0000ff) + percent);
    return `rgb(${r}, ${g}, ${b})`;
  }

  const baseColor = visualParts[0].color;
  //const gradient = `linear-gradient(90deg, ${lightenColor(baseColor, 200)} 0%, ${baseColor} 100%)`;
  const gradient = `linear-gradient(90deg, ${baseColor} 0%, ${lightenColor(baseColor, 150)} 100%)`;
  return (
    <>
      {label && <div className={styles.progressLabel}>{label}</div>}
      <div
        className={styles.progressVisualFull}
        // to change the background color dynamically
        style={{
          backgroundColor
        }}
      >
        {visualParts.map((item, index) => {
          // map each part into separate div and each will be animated
          // because of the "transition: width 2s;" css in class "progressVisualPart"
          // and because of the new width ("widths[index]", previous one was 0)
          return (
            <div
              // There won't be additional changes in the array so the index can be used
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              style={{
                width: widths[index] + "%",
                // setting the actual color of bar part
                background: gradient
              }}
              className={styles.progressVisualPart}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProgressLine;
