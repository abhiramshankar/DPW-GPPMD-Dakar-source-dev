import Modules from "@src/models/Modules";

export interface IDmsPortalNavigationItem {
  path: string;
  headerText: string;
  itemIcon: string;
}

export const getDmsPortalMainNavigationOptions = (modules: Modules, isController: boolean) => {
  const navItems: IDmsPortalNavigationItem[] = [];
  return navItems;
};

