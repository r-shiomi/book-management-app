import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import { React, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link as RouteLink, useParams } from 'react-router-dom';
import { getBook } from "../actions/bookActions";
import { createReview } from "../actions/reviewActions";
import { registerBook, changeBookShelfStatus } from "../actions/bookShelfActions";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckIcon from '@material-ui/icons/Check';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    flexDirection: 'column',
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
  buttonRoot: {
    display: 'flex',
  },
  rakutenButton: {
    marginRight: theme.spacing(1),
    overflow: 'auto',
  },
  reviewButton: {
    marginRight: theme.spacing(1),
    overflow: 'auto',
  },
  openTextLink: {
    marginLeft: 'auto',
  },
  openTextButton: {
    display: 'flex',
  },
  pagenationRoot: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  bookShelfButton: {
    marginRight: theme.spacing(1),
    overflow: 'auto',
  },
  bookShelfCheckedButton: {
    marginRight: theme.spacing(1),
    overflow: 'auto',
    color: '#ef6c00',
    borderColor: '#ef6c00',
  },
  listItemIcon: {
    marginRight: theme.spacing(-3),
  },
}));

const BookDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const book = useSelector(state => state.bookReducer.book);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ content: '', bookId: bookId, reviewPage: 1 });
  const [checked, setChecked] = useState({});
  const [reviewAlertOpen, setReviewAlertOpen] = useState(false);
  const isFirstRender = useRef(false);
  const isLoggedin = useSelector(state => state.userReducer.isLoggedin);
  const [errorText, setErrorText] = useState("");

  const reviewAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setReviewAlertOpen(false);
  };

  //続きを読むをクリックされた時のテキスト表示変更処理
  const handleReviewContentChange = (idx) => {
    setChecked({ ...checked, [idx]: !checked[idx] });
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setErrorText("");
  };

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!state.content) {
      setErrorText("レビューを入力してください");
      return;
    }
    setErrorText(""); 
    dispatch(createReview(state, setReviewAlertOpen));
    handleDialogClose();
  };

  const handleBookShelfClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBookShelfClose = () => {
    setAnchorEl(null);
  };

  const handleBookShelfMenuClick = (e) => {
    e.preventDefault();

    const { myValue } = e.currentTarget.dataset
    //対象の本が既に本棚に登録されているか否かによって登録/更新・削除処理を分ける
    if (book.bookShelfStatus !== undefined) {
      dispatch(changeBookShelfStatus(book, myValue, state))
    } else {
      dispatch(registerBook(state, myValue));
    }

    handleBookShelfClose();
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
    dispatch(getBook(state));
  }, [state.bookId])

  useEffect(() => { // このeffectは初回レンダー時のみ呼ばれる
    isFirstRender.current = true;
  }, [])

  //ページネーションのページを押下すると検索アクションが発行
  useEffect(() => {
    if (isFirstRender.current) { // 初回レンダー判定
      isFirstRender.current = false;
    } else {
      dispatch(getBook(state));
    }
  }, [state.reviewPage]);

  return (
    <Container maxWidth="md" className={classes.root}>
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
          <div className={classes.buttonRoot}>
            <Button target="_blank" variant="outlined" color="primary" href={book.itemUrl} className={classes.rakutenButton}>
              楽天購入ページへ
            </Button>

            {isLoggedin && (
              book.bookShelfStatus !== undefined ?
                <div>
                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleBookShelfClick} variant="outlined" startIcon={<CheckCircleIcon />} className={classes.bookShelfCheckedButton}>
                    本棚に登録済み
              </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleBookShelfClose}
                  >
                    <MenuItem data-my-value="want_to_read" onClick={handleBookShelfMenuClick} >
                      {book.bookShelfStatus == 'want_to_read' &&
                        <ListItemIcon className={classes.listItemIcon}>
                          <CheckIcon className={classes.checkIcon} />
                        </ListItemIcon>}
                      読みたい本
                  </MenuItem>
                    <MenuItem data-my-value="reading" onClick={handleBookShelfMenuClick} >
                      {book.bookShelfStatus == 'reading' &&
                        <ListItemIcon className={classes.listItemIcon}>
                          <CheckIcon />
                        </ListItemIcon>}
                    読んでる本
                  </MenuItem>
                    <MenuItem data-my-value="finished_reading" onClick={handleBookShelfMenuClick}>
                      {book.bookShelfStatus == 'finished_reading' &&
                        <ListItemIcon className={classes.listItemIcon}>
                          <CheckIcon />
                        </ListItemIcon>}
                      読み終わった本
                  </MenuItem>
                    <MenuItem data-my-value="tsundoku" onClick={handleBookShelfMenuClick}>
                      {book.bookShelfStatus == 'tsundoku' &&
                        <ListItemIcon className={classes.listItemIcon}>
                          <CheckIcon />
                        </ListItemIcon>}
                      積読本
                  </MenuItem>
                  </Menu>
                </div>
                :
                <div>
                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleBookShelfClick} variant="outlined" color="secondary" startIcon={<AddCircleIcon />} className={classes.bookShelfButton}>
                    本棚に登録
              </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleBookShelfClose}
                  >
                    <MenuItem data-my-value="want_to_read" onClick={handleBookShelfMenuClick}>読みたい本</MenuItem>
                    <MenuItem data-my-value="reading" onClick={handleBookShelfMenuClick}>読んでる本</MenuItem>
                    <MenuItem data-my-value="finished_reading" onClick={handleBookShelfMenuClick}>読み終わった本</MenuItem>
                    <MenuItem data-my-value="tsundoku" onClick={handleBookShelfMenuClick}>積読本</MenuItem>
                  </Menu>
                </div>)
            }

            {isLoggedin &&
              <Button variant="outlined" color="default" startIcon={<RateReviewIcon />} onClick={handleDialogOpen} className={classes.reviewButton}>
                レビューを書く
          </Button>
            }

            <Snackbar open={reviewAlertOpen} autoHideDuration={6000} onClose={reviewAlertClose}>
              <Alert elevation={6} variant="filled" onClose={reviewAlertClose} severity="success">
                レビューを投稿しました
              </Alert>
            </Snackbar>

            <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
              <DialogTitle id="form-dialog-title">書評・レビュー</DialogTitle>
              <DialogContent>
                <DialogContentText>
                {errorText && <Alert severity="error">{errorText}</Alert>}
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
                    error={errorText ? true : false}
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
            {
              isHighThanMaxTextHeight(review.content) ?
                <Collapse in={checked[idx] || false} collapsedHeight={320}>
                  <Typography variant="h6" gutterBottom>
                    {review.content}
                  </Typography>
                </Collapse>
                :
                <Typography variant="h6" gutterBottom>
                  {review.content}
                </Typography>
            }
            {
              isHighThanMaxTextHeight(review.content) &&
              <Link component="button" className={classes.openTextLink}>
                <Typography className={classes.openTextButton} variant="body1" onClick={() => handleReviewContentChange(idx)} >
                  {checked[idx] || false ? "閉じる" : "続きを読む"}
                  {checked[idx] || false ? <ExpandLess /> : <ExpandMore />}
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

      {(book.reviews !== undefined) && (book.reviews.length !== 0) &&
        <Pagination
          className={classes.pagenationRoot}
          count={book.totalPage}
          color="primary"
          shape="rounded"
          onChange={(e, page) => setState({ ...state, reviewPage: page })}
          page={state.reviewPage}
        />
      }
    </Container >


  );
}

export default BookDetail;