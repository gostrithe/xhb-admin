import flatMenu from "./flatMenu";

export interface MenuItem {
  label: string;
  path: string;
  parent: string;
  key?: string;
  children?: Array<MenuItem>;
  icon?: string;
}

const deflattenMenu = (menu: Array<MenuItem>) => {
  for (const item of menu) {
    const subMenu = menu.filter((m) => m.parent === item.path);
    subMenu.length && (item.key = item.path) && (item.children = [...subMenu]);
  }
  return menu.filter((m) => m.parent === "");
};

const menu: Array<MenuItem> = deflattenMenu(flatMenu);

export default menu;
