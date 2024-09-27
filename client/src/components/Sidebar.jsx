import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Backdrop,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "Client Facing", icon: null },
  { text: "Products", icon: <ShoppingCartOutlined /> },
  { text: "Customers", icon: <Groups2Outlined /> },
  { text: "Transactions", icon: <ReceiptLongOutlined /> },
  { text: "Geography", icon: <PublicOutlined /> },
  { text: "Sales", icon: null },
  { text: "Overview", icon: <PointOfSaleOutlined /> },
  { text: "Daily", icon: <TodayOutlined /> },
  { text: "Monthly", icon: <CalendarMonthOutlined /> },
  { text: "Breakdown", icon: <PieChartOutlined /> },
  { text: "Management", icon: null },
  { text: "Admin", icon: <AdminPanelSettingsOutlined /> },
  { text: "Performance", icon: <TrendingUpOutlined /> },
];

const Sidebar = ({
  user,
  drawerWidth,
  isNonMobile,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  // Ensure sidebar is closed on page load
  useEffect(() => {
    setIsSidebarOpen(false); // Sidebar starts closed by default
  }, [setIsSidebarOpen]);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleNavigation = (lcText) => {
    navigate(`/${lcText}`);
    setActive(lcText);

    // Only close sidebar if on mobile (not non-mobile)
    if (!isNonMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <>
          {/* Backdrop for mobile */}
          {!isNonMobile && (
            <Backdrop
              open={isSidebarOpen}
              onClick={() => setIsSidebarOpen(false)}
              sx={{ zIndex: theme.zIndex.drawer - 1 }}
            />
          )}

          <Drawer
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                color: theme.palette.secondary[200],
                backgroundColor: theme.palette.background.alt,
                boxSizing: "border-box",
                borderWidth: isNonMobile ? 0 : "2px",
                width: drawerWidth,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflowY: "auto",
              },
            }}
          >
            <Box sx={{ flex: 1, overflowY: "auto" }}>
              <Box m="1.5rem 2rem 2rem 3rem">
                <FlexBetween color={theme.palette.secondary.main}>
                  <Box display="flex" alignItems="center" gap="0.5rem">
                    <Typography variant="h4" fontWeight="bold">
                      FairyGlow
                    </Typography>
                  </Box>
                  {!isNonMobile && (
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                      <ChevronLeft />
                    </IconButton>
                  )}
                </FlexBetween>
              </Box>
              <List>
                {navItems.map(({ text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.toLowerCase();

                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => handleNavigation(lcText)} // Handle sidebar close on navigation
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>

            <Box
              position="relative"
              bottom="0"
              width="100%"
              sx={{ marginTop: "auto", padding: "1rem 0" }}
            >
              <Divider />
              <FlexBetween
                textTransform="none"
                sx={{ marginTop: "0.5rem" }}
                gap="1rem"
                m="0 auto"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="center">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user?.name || "Guest"}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user?.occupation || "Occupation"}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px",
                  }}
                />
              </FlexBetween>
            </Box>
          </Drawer>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
