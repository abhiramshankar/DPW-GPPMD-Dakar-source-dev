import { FontIcon, mergeStyles } from "@fluentui/react";
import styles from "./Error.module.scss";
import { config } from "@src/common/constants";

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  color: "#d13438",
});

export default function Error({ paneName }: { paneName: String}) {
  return (
    <div className={`${styles.container} ${styles.fadeIn}`}>
      <FontIcon
        iconName="Error"
        aria-label="Error"
        className={iconClass}
      />
      <div className={styles.value} style={{ fontFamily: config.WideFontFamily }}>Unable to load {paneName} data.</div>
      <div className={styles.details} style={{ fontFamily: config.FontFamily }}> Please try again later.</div>
    </div>
  );
}
