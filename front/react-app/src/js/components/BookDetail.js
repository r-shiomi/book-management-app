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
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

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
    height: '200px',
    objectFit: 'contain',
  },
  bookDetail: {
    flexDirection: 'column',
  },
  reviewItemName: {
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
  },
  reviewPaper: {
    padding: theme.spacing(2),
    overflow: 'auto',
    margin: 'auto',
    marginTop: theme.spacing(3),
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    display: 'flex'
  },
  buttonGroup: {
    marginRight: theme.spacing(1),
    overflow: 'auto',
  },
  openTextLink: {
    marginLeft: 'auto',
  },
  openTextButton: {
    display: 'flex',
  }
}));

const BookDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const book = useSelector(state => state.bookReducer.book);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ content: '', bookId: bookId });
  const [checked, setChecked] = useState({});
  const [openText, setOpenText] = useState(false);
  const fetched = useSelector(state => state.reviewReducer.fetched);
  // const [createdReviewText, setCreatedReviewText] = useState('');
  const [reviewAlertOpen, setReviewAlertOpen] = useState(false);

  const reviewAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setReviewAlertOpen(false);
  };

  //続きを読むをクリックされた時のテキスト表示変更処理
  const handleReviewContentChange = (idx) => {
    setChecked({ ...checked, [idx]: !checked[idx] });
    setOpenText(!openText);
  };

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
    handleDialogClose();
  };

  //テキストの行数が設定行数より高いか判定
  const isHighThanMaxTextHeight = (text) => {
    const maxHeight = 10;
    const textHeight = text.split("\n").length;
    if (textHeight > maxHeight) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    dispatch(getBook(bookId));
  }, [bookId])

  //レビューを投稿した時
  useEffect(() => {
    if (fetched) {
      setReviewAlertOpen(true);
    }
  },[fetched])

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
          <div>
            <Button target="_blank" variant="outlined" color="primary" href={book.itemUrl} className={classes.buttonGroup}>
              楽天購入ページへ
          </Button>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="outlined" color="secondary" startIcon={<AddCircleIcon />} className={classes.buttonGroup}>
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

            <Snackbar open={reviewAlertOpen} autoHideDuration={6000} onClose={reviewAlertClose}>
              <Alert elevation={6} variant="filled" onClose={reviewAlertClose} severity="success">
                レビューを投稿しました
              </Alert>
            </Snackbar>
            
            <Button variant="outlined" color="default" startIcon={<RateReviewIcon />} onClick={handleDialogOpen} className={classes.buttonGroup}>
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
        </div>
      </Paper>
      <Divider />
      <Typography variant="h4" gutterBottom className={classes.reviewItemName} color="textSecondary">
        書評・レビュー
      </Typography>
      {(book.reviews !== undefined) && (book.reviews.length !== 0) ?
        book.reviews.map((review, idx) =>
          <Paper key={idx} className={classes.reviewPaper}>
            <Typography variant="body1" color="secondary" gutterBottom>
              {review.userName}さんのレビュー
            </Typography>
            <Collapse in={checked[idx] || false} collapsedHeight={320}>
              <Typography variant="h6" gutterBottom>
                {review.content}
              </Typography>
            </Collapse>
            {
              isHighThanMaxTextHeight(review.content) &&
              <Link component="button" className={classes.openTextLink}>
                <Typography className={classes.openTextButton } variant="body1" onClick={() => handleReviewContentChange(idx)} >
                  {openText ? "閉じる" : "続きを読む"}
                  {openText ? <ExpandLess /> : <ExpandMore />}
                </Typography>
              </Link>
            }
            <Typography variant="subtitle2" gutterBottom>
              {review.createdAt}
            </Typography>
          </Paper>
        )
        :
        <Typography variant="body1" gutterBottom color="textSecondary">
          書評・レビューがありません
        </Typography>
      }
    </Container >


  );
}

export default BookDetail;