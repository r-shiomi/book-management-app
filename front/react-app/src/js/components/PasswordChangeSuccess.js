import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#e3f2fd',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    paddingBottom: theme.spacing(3),
    wordWrap: 'break-word'
  },
  link: {
    margin: "auto",
  },
}));

const PasswordChangeSuccess = () => {
  const classes = useStyles();
  const message = useSelector(state => state.userReducer.message);

  return (
    <Container maxWidth="lg">
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center" color="textSecondary" component="p" className={classes.content}>
          {message}
          </Typography>
        <Button to="/" component={Link} variant="contained" className={classes.link}>
          TOP画面へ
        </Button>
      </Paper>
    </Container>
  );
}

export default PasswordChangeSuccess;