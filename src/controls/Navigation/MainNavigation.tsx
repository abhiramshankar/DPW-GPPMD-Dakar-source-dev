import {
  initializeIcons,
  Pivot,
  PivotItem,
  ThemeProvider,
} from "@fluentui/react";
import styles from "@src/controls/Navigation/MainNavigation.module.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { IDmsPortalNavigationItem } from "@dmsPortal/components/DmsPortalNavigation";

interface IMainNavigationProps {
  tabs: IDmsPortalNavigationItem[];
}

function MainNavigation({
  tabs,
}: IMainNavigationProps): React.ReactElement<IMainNavigationProps> {
  const location = useLocation();
  const navigate = useNavigate();

  function handleNavigationChange(item: PivotItem): void {
    const path = item.props.itemKey as string;
    navigate(path);
  }
  initializeIcons();
  return (
    <nav className={styles.nav}>
      <ThemeProvider>
        <Pivot
          onLinkClick={handleNavigationChange}
          selectedKey={location.pathname}
          overflowBehavior="menu"
          className={styles.pivot}
        >
          {tabs.map((tab) => (
            <PivotItem
              key={tab.path}
              itemKey={tab.path}
              headerText={tab.headerText}
              itemIcon={tab.itemIcon}
            />
          ))}
        </Pivot>
      </ThemeProvider>
    </nav>
  );
}
export default MainNavigation;
