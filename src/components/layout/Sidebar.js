import { Fragment } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

const Sidebar = () => {
  return (
    <Fragment>
      <div>
        <ProSidebar>
          <Menu iconShape="square">
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Dashboard</MenuItem>
            <SubMenu title="Components">
              <MenuItem>Component 1</MenuItem>
              <MenuItem>Component 2</MenuItem>
              <MenuItem>Component 2</MenuItem>
            </SubMenu>
          </Menu>
        </ProSidebar>
      </div>
    </Fragment>
  );
};

export default Sidebar;
