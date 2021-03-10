import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BookIcon from '@material-ui/icons/Book';
import SearchIcon from '@material-ui/icons/Search';
import { React, useState } from 'react';
import HeaderMenu from './HeaderMenu';
import HomeIcon from '@material-ui/icons/Home';
import { Link as RouteLink, useHistory, useLocation } from 'react-router-dom';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import RateReviewIcon from '@material-ui/icons/RateReview';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  toolbarSecondary: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [value, setValue] = useState(JSON.parse(localStorage.getItem('headerPage')) || 0);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    localStorage.setItem('headerPage', JSON.stringify(newValue));
    setValue(newValue);
  };

  const clickHome = () => {
    localStorage.setItem('headerPage', JSON.stringify(0));
    setValue(0);
  }

  //戻るボタンを押下した時
  window.onpopstate = e => {
    console.log(location.pathname)
    let value 
    switch (location.pathname) {
      case "/":
        value = 0
        break;
      case "/book-search":
        value = 1
        break;
      case "/book-shelf":
        value = 2
        break;
      case "/book-review":
        value = 3
        break;
    }
    handleChange(e, value);
  }

  return (
    <AppBar position="relative">
      <Toolbar className={classes.toolbar}>
        <BookIcon className={classes.icon} />
        <Typography variant="h6" noWrap className={classes.toolbarTitle}>
          <Link to="/" component={RouteLink} onClick={clickHome} underline="none" color="inherit">Book Management App</Link>
        </Typography>
        <HeaderMenu />
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary} >
        <Tabs value={value} onChange={handleChange} >
          <Tab to="/" component={RouteLink} label={<div><HomeIcon style={{ verticalAlign: 'middle' }} /> トップ </div>} className={classes.tab} />
          <Tab to="/book-search" component={RouteLink} label={<div><SearchIcon style={{ verticalAlign: 'middle' }} /> 書籍検索 </div>} className={classes.tab} />
          <Tab to="/book-shelf" component={RouteLink} label={<div><LocalLibraryIcon style={{ verticalAlign: 'middle' }} /> 本棚 </div>} className={classes.tab} />
          <Tab to="/book-review" component={RouteLink} label={<div><RateReviewIcon style={{ verticalAlign: 'middle' }} /> 書評・レビュー </div>} className={classes.tab} />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Header;