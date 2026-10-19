import { useEffect, useState } from "react";
import styles from "./DmsPortal.module.scss"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const buildInfo = require("../../../../build-info.json");

export default function VersionNumber() {
  const MAJOR_VERSION = 1; // Increase per major production release
  const MINOR_VERSION = 0; // New feature
  
  const [showVersionNumber, setShowVersionNumber] = useState<boolean>(false);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  
  // If Konami code is entered, show version number
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight") {
        setPressedKeys((prevKeys) => [...prevKeys, key]);
      } else if (key === "Escape") {
        setPressedKeys([]);
      }
    };
    
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  useEffect(() => {
    const konamiCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRight";
    console.log(pressedKeys.join(""));
    if (pressedKeys.join("") === konamiCode) {
      setShowVersionNumber(!showVersionNumber);
      setPressedKeys([]);
    }
  }, [pressedKeys]);

  function getFormattedUTCDateTime(date: string): string {
    const now = new Date(date);
    
    const components = [
        String(now.getUTCFullYear()).slice(-2),
        String(now.getUTCMonth() + 1).padStart(2, '0'),
        String(now.getUTCDate()).padStart(2, '0'),
        String(now.getUTCHours()).padStart(2, '0'),
        String(now.getUTCMinutes()).padStart(2, '0'),
        String(now.getUTCSeconds()).padStart(2, '0')
    ];

    return `${components.slice(0, 3).join('')}.${components.slice(3).join('')}`;
}

  return (
    <>
      {showVersionNumber && 
        <p className={styles.version}>App Version {MAJOR_VERSION}.{MINOR_VERSION}.{getFormattedUTCDateTime(buildInfo.buildDate)}</p>
      }
    </>
  )
}
