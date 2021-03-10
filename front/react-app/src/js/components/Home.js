import React, { useEffect,useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import { findNewReviews } from "../actions/bookReviewActions";
import { useDispatch, useSelector } from "react-redux";
import Divider from '@material-ui/core/Divider';
import Pagination from '@material-ui/lab/Pagination';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CardActionArea from '@material-ui/core/CardActionArea';
import Link from '@material-ui/core/Link';
import { Link as RouteLink, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
  },
  cardMedia: {
    objectFit: 'contain',
    height: '200px',
    backgroundColor: '#bdbdbd'
  },
  reviewUser: {
    marginTop: theme.spacing(2)
  },
  reviewContent: {
    padding: theme.spacing(),
    whiteSpace: 'pre-wrap',
    backgroundColor: "#eeeeee",
    flexDirection: 'column',
    display: 'flex',
    wordBreak: 'break-all',
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
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector(state => state.bookReviewReducer.data);
  const [checked, setChecked] = useState({});

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
    dispatch(findNewReviews());
  }, [])

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" color="textSecondary" gutterBottom>
          新着レビュー
        </Typography>
        <Grid container spacing={4}>
          {(data.reviews !== undefined) &&
            data.reviews.map((review, idx) =>
              <Grid item key={idx} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <Link to={`/book/${review.bookId}`} component={RouteLink}>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      // height="140"
                      className={classes.cardMedia}
                      image={review.bookLargeImageUrl}
                      title="Contemplative Reptile"
                    />
                  </Link>
                  <CardContent>
                    <Link to={`/book/${review.bookId}`} component={RouteLink}>
                      <Typography variant="subtitle2" >
                        {review.bookTitle}
                      </Typography>
                    </Link>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {review.bookAuthor} / {review.bookSalesDate}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" color="secondary" className={classes.reviewUser}>
                      {review.userName}さんによるレビュー
                    </Typography>
                    <Paper
                      className={classes.reviewContent}
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
                  </CardContent>
                </Card>
              </Grid>
            )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Home;