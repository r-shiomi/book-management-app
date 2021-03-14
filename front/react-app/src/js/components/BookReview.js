import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Link as RouteLink, useParams, Prompt, useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { findReviewsByStatus } from "../actions/bookReviewActions";
import { useDispatch, useSelector } from "react-redux";
import Divider from '@material-ui/core/Divider';
import Pagination from '@material-ui/lab/Pagination';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexWrap: 'wrap',
    // flexDirection: 'column',
    // width: '50%',
  },
  listItem: {
    display: 'flex',
  },
  toolbar: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  tab: {
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
  },
  listItemText: {
    wordWrap: 'break-word',
    width: '50%'
  },
  img: {
    width: '90px',
    objectFit: 'contain',
  },
  pagenationRoot: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  listItemRight: {
    marginLeft: theme.spacing(3),
    width: '100%',
    flexDirection: 'column',
  },
  listItemRightBook: {
    display: 'flex',
  },
  review: {
    marginTop: theme.spacing(2),
  },
  reviewPaper: {
    padding: theme.spacing(1),
    whiteSpace: 'pre-wrap',
    backgroundColor: "#eeeeee",
    // margin: 'auto',
    flexDirection: 'column',
    display: 'flex'
  },
  reviewText: {
    padding: theme.spacing(1),
  },
  openTextLink: {
    marginLeft: 'auto',
  },
  openTextButton: {
    display: 'flex',
  },
  noReviewsText: {
    padding: theme.spacing(3),
    textAlign: 'center',
  }
}));

const BookReview = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(JSON.parse(localStorage.getItem('bookReviewStatus')) || 'your_reviews');
  const data = useSelector(state => state.bookReviewReducer.data);
  const [page, setPage] = useState(JSON.parse(localStorage.getItem('bookReviewPage')) || 1);
  const [checked, setChecked] = useState({});


  const handleBookReviewTabsChange = (event, newValue) => {
    localStorage.setItem('bookReviewStatus', JSON.stringify(newValue));
    setValue(newValue);
    setPage(1);
    dispatch(findReviewsByStatus(newValue, 1));
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

  //続きを読むをクリックされた時のテキスト表示変更処理
  const handleReviewContentChange = (idx) => {
    setChecked({ ...checked, [idx]: !checked[idx] });
  };

  useEffect(() => {
    localStorage.setItem('bookReviewPage', JSON.stringify(page));
    dispatch(findReviewsByStatus(value, page));

  }, [page])

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper>
        <Tabs id="bookReviewTabs" value={value} onChange={handleBookReviewTabsChange} aria-label="disabled tabs example" indicatorColor="primary"
          textColor="primary"
          variant="fullWidth">
          <Tab value="your_reviews" label="あなたの書評・レビュー" className={classes.tab} />
          <Tab value="other_users_reviews" label="他ユーザの書評・レビュー（共読）" className={classes.tab} />
          <Tab value="rough_draft" label="下書き" className={classes.tab} />
        </Tabs>
        {(data.reviews !== undefined) && (data.reviews.length !== 0) ?
          data.reviews.map((review, idx) =>
            <Paper key={idx}>
              <ListItem alignItems="flex-start" className={classes.listItem}>
                <Link to={`/book/${review.bookId}`} component={RouteLink}>
                  <img className={classes.img} src={review.bookMediumImageUrl} />
                </Link>
                <div className={classes.listItemRight}>
                  <div className={classes.listItemRightBook}>
                    <ListItemText
                      primary={<Link to={`/book/${review.bookId}`} component={RouteLink}>{review.bookTitle}</Link>}
                      className={classes.listItemText}
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {review.bookAuthor} / {review.bookSalesDate}
                        </Typography>
                      }
                    />
                    <Typography
                      component="span"
                      variant="body2"
                      color="secondary"
                    >
                      レビュー日：{review.reviewDate}
                    </Typography>
                  </div>
                  <div className={classes.review}>
                    <Typography
                      component="span"
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      {review.userName && `${review.userName}さんによる`}書評・レビュー
                      </Typography>
                    <Paper
                      variant="outlined"
                      className={classes.reviewPaper}
                    >
                      {
                        isHighThanMaxTextHeight(review.content) ?
                          <Collapse in={checked[idx] || false} collapsedHeight={210}>
                            <Typography
                              variant="body2"
                              component="p"
                              color="textPrimary"
                              className={classes.reviewText}
                            >
                              {review.content}
                            </Typography>
                          </Collapse>
                          :
                          <Typography
                            variant="body2"
                            component="p"
                            color="textPrimary"
                            className={classes.reviewText}
                          >
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
                    </Paper>
                  </div>
                </div>
              </ListItem>
              <Divider />
            </Paper>
          )
          :
          <Typography
            className={classes.noReviewsText}
            variant="body1"
            color="textSecondary">
            書評・レビューがありません
          </Typography>}
      </Paper>
      {(data.reviews !== undefined && data.reviews.length !== 0) &&
        <Pagination
          className={classes.pagenationRoot}
          count={data.totalPage}
          color="primary"
          shape="rounded"
          onChange={(e, page) => setPage(page)}
          page={page}
        />}
    </Container>
  );
}

export default BookReview;