import * as React from 'react';
import '../App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import { logout } from '../service/api-service';

export default function Navbar() {

  const isLogin = () => {
    if (localStorage.getItem("ACCESS_TOKEN") !== null && localStorage.getItem("ACCESS_TOKEN") !== "null") {
      return true;
    } else {
      return false;
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    (isLogin) && (
      <Menu
        sx={{ mt: '35px' }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => (window.location.href = "/member/apikey")}>apikey 변경</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    )
  );



  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    (isLogin) && (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={() => (window.location.href = "/member/apikey")}>apikey 변경</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    )
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: "#000", fontWeight: "bold", textAlign: "center", paddingBottom: 0.5, paddingTop: 0.5 }}>
        <span className='notification'>주간 숙제 버튼 우클릭시 한번에 체크됩니당!</span>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='inherit' style={{ backgroundColor: "var(--nav-color)" }}>
          <Toolbar>
            <MenuItem onClick={() => (window.location.href = "/")}>
              <img src='/logo.png' style={{ width: 150 }} />
            </MenuItem>
            {/* <MenuItem style={{ color: "white" }} onClick={() => (window.location.href = "/todo")}>
              <p>이전버전</p>
            </MenuItem> */}
            <MenuItem style={{ color: "white" }} onClick={() => (window.location.href = "/comments")}>
              <p>방명록</p>
            </MenuItem>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {isLogin &&
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  style={{ color: "white" }}
                >
                  <AccountCircle />
                </IconButton>
              }
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                style={{ color: "white" }}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>

    </>
  );
}