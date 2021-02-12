import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';

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

const App = () => {

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
          </Switch>
        </main>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
