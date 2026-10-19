import { Pivot, PivotItem } from "@fluentui/react/lib/components/Pivot";
import { TNavTab } from "@src/models/NavTab";
import { Dispatch, SetStateAction } from "react";
import styles from './CustomPivotStyles.module.scss'; // Import custom styles

interface IListTabsNavigationProps {
  tabs: TNavTab[];
  activeTab: TNavTab;
  setActiveTab: Dispatch<SetStateAction<TNavTab>>;
  defaultTab?: TNavTab;
}

export default function ListViewsNavigation({
  tabs,
  activeTab,
  setActiveTab,
  defaultTab,
}: IListTabsNavigationProps) {
  const handleNavigationChange = (item?: PivotItem): void => {
    if (item) {
      const tabKey = item.props.itemKey as string;
      const selectedTab = tabs.find((tab) => tab.key === tabKey);
      if (selectedTab) {
        setActiveTab(selectedTab);
      }
    }
  };

  return (
    <>
      <Pivot
        linkFormat="tabs"
        linkSize="large"
        onLinkClick={handleNavigationChange}
        selectedKey={activeTab.key}
        className={styles.pivotControl}
        overflowBehavior="menu"
      >
        {tabs.map((tab) => (
          <PivotItem key={tab.key} itemKey={tab.key} headerText={tab.text} />
        ))}
      </Pivot>
    </>
  );
}

