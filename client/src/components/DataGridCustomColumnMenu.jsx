import { GridColumnMenuContainer } from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props;
  
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
      {/* Implement your own filtering options or any custom actions here */}
      <div onClick={hideMenu}>Custom Filter Option</div>
      {/* You can add more menu items here */}
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;
