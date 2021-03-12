import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { React, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link as RouteLink, useHistory, useLocation, useParams } from 'react-router-dom';
import { changePassword } from "../actions/userActions";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const PasswordChange = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({ password: '', passwordConfirmation: '', history: history });
  const [errorText, setErrorText] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      let query = decodeURIComponent(location.search).slice(1).split('&');
      let authHeaders = {};
      query.map((str) => {
        let targetKey = str.substring(0, str.indexOf('='));
        if (['access-token', 'client', 'uid'].includes(targetKey)) {
          authHeaders[targetKey] = str.substring(str.indexOf('=') + 1);
        }
      })
      window.localStorage.setItem('authHeaders', JSON.stringify(authHeaders));
    }

  }, [])

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(changePassword(state, setErrorText));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          パスワード変更
        </Typography>
        {errorText && <Alert severity="error">{errorText}</Alert>}
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="新しいパスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            error={errorText ? true : false}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label="新しいパスワード（確認）"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            error={errorText ? true : false}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            送信
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default PasswordChange;