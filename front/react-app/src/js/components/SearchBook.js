import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Alert from '@material-ui/lab/Alert';
import { React, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { search } from "../actions/booksActions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  searchResult: {
    marginTop: theme.spacing(3),
  },
  alert: {
    width: '100%',
  },
  listItemText: {
    marginLeft: theme.spacing(3),
  }
}));

const SearchBook = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [errorText, setErrorText] = useState("");
  const books = useSelector(state => state.booksReducer.books);

  const handleChange = e => {
    setKeyword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (keyword) {
      setErrorText("");
      dispatch(search(keyword));
    } else {
      setErrorText("キーワードを入力してください。");
    }

  };


  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
        書籍検索
      </Typography>
      <div className={classes.alert}>
        {errorText && <Alert severity="error">{errorText}</Alert>}
      </div>
      <form onSubmit={handleSubmit} noValidate className={classes.form}>
        <TextField
          name="keyword"
          variant="outlined"
          fullWidth
          id="keyword"
          label="本のタイトル、著者名"
          autoFocus
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment >
                <IconButton onClick={handleSubmit}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </form>

      <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom className={classes.searchResult}>
        検索結果
      </Typography>
      <List>
        {books.map(book =>
          <div>
            <ListItem alignItems="flex-start">
              <Link href="/">
                <img src={book.mediumImageUrl} />
              </Link>
              <ListItemText
                primary={<Link href="/">{book.title}</Link>}
                className={classes.listItemText}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {book.author} / {book.salesDate}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
          </div>
        )}
      </List>

    </Container>
  );
}

export default SearchBook;