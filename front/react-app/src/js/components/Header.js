import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import BookIcon from '@material-ui/icons/Book';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 0.8),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BookIcon className={classes.icon} />
          <Typography variant="h6" noWrap className={classes.toolbarTitle}>
            Book Management App
          </Typography>
          <Button to="/signup" component={Link} variant="contained" className={classes.link}>
            新規登録
          </Button>
          <Button to="/signin" component={Link} variant="outlined" color="inherit" className={classes.link}>
            ログイン
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;