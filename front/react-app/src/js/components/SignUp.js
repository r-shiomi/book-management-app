import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { React, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link as RouteLink, useHistory } from 'react-router-dom';
import { signUp } from "../actions/userActions";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({ name: '', email: '', password: '', history: history });
  const [error, setError] = useState(null);
  const [helperText, setHelperText] = useState({ name: '20文字以内', email: '', password: '8 〜 128文字' });
  const [errFlg, setErrFlg] = useState({ name: false, email: false, password: false });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signUp(state, setError));
  };

  useEffect(() => {
    if (error) {
      //エラー項目にはエラーメッセージを設定
      setHelperText({
        ...helperText,
        name: error.data.errors.name == null ? "20文字以内" : "ユーザー名" + error.data.errors.name[0],
        email: error.data.errors.email == null ? "" : "メールアドレス" + error.data.errors.email[0],
        password: error.data.errors.password == null ? "8 〜 128文字" : "パスワード" + error.data.errors.password[0]
      });
      setErrFlg({
        ...errFlg,
        name: error.data.errors.name == null ? false : true,
        email: error.data.errors.email == null ? false : true,
        password: error.data.errors.password == null ? false : true
      });
    }
  }, [error])

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          新規登録
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="ユーザー名"
                autoFocus
                onChange={handleChange}
                helperText={helperText.name}
                error={errFlg.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                helperText={helperText.email}
                error={errFlg.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                helperText={helperText.password}
                error={errFlg.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            登録
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              すでにアカウントをお持ちの方：
                <Link to="/login" component={RouteLink} variant="body2">
                ログイン
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;