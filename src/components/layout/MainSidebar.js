import { Fragment } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

const MainSidebar = () => {
  return (
    <Fragment>
      <div style={{position:'sticky', top:'0'}}>
        <ProSidebar> 
          <Menu iconShape="square">
          <SubMenu title="Marka">
             dsa
            </SubMenu>
            <SubMenu title="Cena">
              Min <input type="number" min={1} style={{marginLeft:'4px'}}/><br/> 
              Max <input type="number" min={1}/>
            </SubMenu>
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

export default MainSidebar;
