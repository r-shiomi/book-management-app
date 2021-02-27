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
import Pagination from '@material-ui/lab/Pagination';
import { React, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link as RouteLink, useParams } from 'react-router-dom';
import { search } from "../actions/booksActions";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  searchResult: {
    marginTop: theme.spacing(3),
    fontWeight: 'bold',
  },
  alert: {
    width: '100%',
  },
  listItemText: {
    marginLeft: theme.spacing(3),
  },
  img: {
    width: '90px',
    objectFit: 'contain',
  },
  list: {
    width: '100%',
  },
  pagenationRoot: {
    margin: 'auto'
  }
}));

const BookSearch = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({ keyword: '', page: 1 });
  const [errorText, setErrorText] = useState("");
  const books = useSelector(state => state.booksReducer.books);
  const fetched = useSelector(state => state.booksReducer.fetched);
  const [searchErrorText, setSearchErrorText] = useState("");
  const isFirstRender = useRef(false);

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (state.keyword) {
      setErrorText("");
      dispatch(search(state));
      setState({ ...state, page: 1 });
    } else {
      setErrorText("キーワードを入力してください。");
    }

  };

  useEffect(() => { // このeffectは初回レンダー時のみ呼ばれる
    isFirstRender.current = true;
  }, [])

  //ページネーションのページを押下すると検索アクションが発行
  useEffect(() => {
    if (isFirstRender.current) { // 初回レンダー判定
      isFirstRender.current = false;
    } else {
      dispatch(search(state));
    }
  }, [state.page]);

  useEffect(() => {
    if (fetched) {
      books.length === 0 ? setSearchErrorText(`『${state.keyword}』` + "に該当する書籍が見つかりませんでした。") : setSearchErrorText("");
    }
  }, [books])

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
        書籍検索
      </Typography>
      <div className={classes.alert}>
        {errorText && <Alert severity="error">{errorText}</Alert>}
        {searchErrorText && <Alert severity="error">{searchErrorText}</Alert>}
      </div>
      <form onSubmit={handleSubmit} noValidate className={classes.form}>
        <TextField
          name="keyword"
          variant="outlined"
          size="small"
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

      {books.length !== 0 &&
        <div className={classes.root}>
          <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom className={classes.searchResult}>
            検索結果
          </Typography>
          <List className={classes.list} >
            {books.Items.map((book,idx) =>
              <Paper key={idx}>
                <ListItem alignItems="flex-start">
                  <Link to={`/book/${book.id}`} component={RouteLink}>
                    <img className={classes.img} src={book.mediumImageUrl} />
                  </Link>
                  <ListItemText
                    primary={<Link to={`/book/${book.id}`} component={RouteLink}>{book.title}</Link>}
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
              </Paper>
            )}
          </List>
          <div className={classes.pagenationRoot}>
            <Pagination
              count={books.totalPageCount >= 10 ? 10 : books.totalPageCount}
              color="primary"
              shape="rounded"
              onChange={(e, page) => setState({ ...state, page: page })}
              page={state.page}
            />
          </div>
        </div>
      }
    </Container>
  );
}

export default BookSearch;