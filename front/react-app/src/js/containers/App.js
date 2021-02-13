import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider,makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';

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
  main: {
    display: 'flex',
    minHeight: '76.8vh', 
    flexDirection: 'column'
  },
}));

const App = () => {
  const classes = useStyles();

  return (
      <ThemeProvider theme={theme}>
        <Header />
        <main className={classes.main}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
          </Switch>
        </main>
          <Footer />
      </ThemeProvider>
  );
}

export default App;
