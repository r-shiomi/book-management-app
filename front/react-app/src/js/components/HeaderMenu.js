import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 0.8),
  },
  simpleMenu: {
    textTransform: 'none',
    color: 'white',
  }
}));

const HeaderMenu = () => {
  const classes = useStyles();
  const user = useSelector(state => state.userReducer.user);
  const isLoggedin = useSelector(state => state.userReducer.isLoggedin);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.go(location.pathname);
  };

  return (
    isLoggedin ?
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.simpleMenu}>
          {user.name}
          {open ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>プロフィール</MenuItem>
          <MenuItem onClick={handleClose}>マイページ</MenuItem>
          <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
        </Menu>
      </div>
      :
      <div>
        <Button to="/signup" component={Link} variant="contained" className={classes.link}>
          新規登録
          </Button>
        <Button to="/login" component={Link} variant="outlined" color="inherit" className={classes.link}>
          ログイン
          </Button>
      </div>

  );
}

export default HeaderMenu;