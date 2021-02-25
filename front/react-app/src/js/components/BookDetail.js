import { React, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../actions/bookActions";
import { createReview } from "../actions/reviewActions";
import { Link as RouteLink, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import RateReviewIcon from '@material-ui/icons/RateReview';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '50%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    margin: 'auto',

    marginBottom: theme.spacing(3),
  },
  bookImg: {
    marginRight: theme.spacing(3),
  },
  bookDetail: {
    flexDirection: 'column',
  },
  reviewText: {
    fontWeight: 'bold',
  },
}));

const BookDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const book = useSelector(state => state.bookReducer.book);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({content: '', bookId: bookId});

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createReview(state));
  };

  useEffect(() => {
    dispatch(getBook(bookId));
  }, [bookId])


  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <img src={book.largeImageUrl} className={classes.bookImg} />
        <div className={classes.bookDetail}>
          <Typography variant="h4" color="textPrimary" gutterBottom className={classes.title}>
            {book.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            著者：{book.author}
          </Typography>
          <Typography variant="body1" gutterBottom>
            出版社：{book.publisherName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            発売日：{book.salesDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            ページ数：{book.pageCount}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {book.itemCaption}
          </Typography>

          <Button target="_blank" variant="outlined" color="primary" href={book.itemUrl} >
            楽天購入ページへ
          </Button>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="outlined" color="secondary" startIcon={<AddCircleIcon />}>
            本棚に登録
              </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem to="/book-shelf">読みたい本</MenuItem>
            <MenuItem onClick={handleClose}>読んでる本</MenuItem>
            <MenuItem to="/book-shelf" component={RouteLink}>読み終わった本</MenuItem>
            <MenuItem onClick={handleClose}>積読本</MenuItem>
          </Menu>

          <Button variant="outlined" color="default" startIcon={<RateReviewIcon />} onClick={handleDialogOpen}>
            レビューを書く
            </Button>
          <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
            <DialogTitle id="form-dialog-title">書評・レビュー</DialogTitle>
            <DialogContent>
              <DialogContentText>
              </DialogContentText>
              <form noValidate autoComplete="off">
                <TextField
                  id="standard-multiline-static"
                  name="content"
                  label="書評・レビューを書く"
                  multiline
                  rows={10}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                閉じる
              </Button>
              <Button onClick={handleSubmit} color="primary">
                投稿
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      </Paper>
      <Divider />
      <Typography variant="h4" gutterBottom className={classes.reviewText} color="textSecondary">
        書評・レビュー
      </Typography>

    </Container>
  );
}

export default BookDetail;