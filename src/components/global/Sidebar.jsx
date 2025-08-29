import React, { useMemo, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { pages } from "./Pages";
import { useSelector } from "react-redux";
import logo from '../../assets/logo.png';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const { user } = useSelector(state => state.auth);
  const fullName = useMemo(() => {
    if (!user) return '';
    return `${user.first_name || ''} ${user.last_name || ''}`.trim();
  }, [user]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[900],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.redAccent[600]}>
                  {/* ADMINIS */}
                  {/* <img src={logo} alt="logo"width='150px' /> */}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={userPhoto}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                /> */}
              <Avatar sx={{ bgcolor: 'primary.main', fontSize: '30px', mr: 2, width:'100px', height: '100px' }}>
                { fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'M' }
              </Avatar>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                {fullName || "Manager"}                
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {user?.role??"Admin"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>

            {
              /* by map  */
              pages.map( (category, index) => (
                <React.Fragment key={index} >
                  <Typography
                      variant="h6"
                      color={colors.blueAccent[500]}
                      sx={{ m: "15px 0 5px 20px" }}
                    >
                      {!isCollapsed? category.name: undefined}
                    </Typography>
                    {
                      category.property.map( (page, i) => {
                        const IconComponent = page.icon;
                        return (
                          <Item 
                            key={i}
                            title={page.title}
                            to={`/${page.path}`}
                            icon={<IconComponent />}
                            selected={selected}
                            setSelected={setSelected}
                          />
                        )}
                      )
                    }
                  </React.Fragment>
              ))
            }

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
