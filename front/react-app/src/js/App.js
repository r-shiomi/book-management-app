import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import SignUpConfirm from './components/SignUpConfirm';
import UserRoute from './components/auth/UserRoute';
import GuestRoute from './components/auth/GuestRoute';
import BookSearch from './components/BookSearch';
import BookDetail from './components/BookDetail';
import BookShelf from './components/BookShelf';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#009688',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.main}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/book-search' component={BookSearch} />
            <Route exact path='/book/:bookId' component={BookDetail} />
            <Route exact path='/book-shelf' component={BookShelf} />
            {/* <UserRoute>
              </UserRoute> */}
            <GuestRoute>
              <Route path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signup/confirm" component={SignUpConfirm} />
            </GuestRoute>
          </Switch>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
