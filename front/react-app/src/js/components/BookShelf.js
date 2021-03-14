import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Link as RouteLink, useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { findBooksByStatus } from "../actions/bookShelfActions";
import { useDispatch, useSelector } from "react-redux";
import Divider from '@material-ui/core/Divider';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexWrap: 'wrap',
    // flexDirection: 'column',
    // width: '50%',
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
    marginLeft: theme.spacing(3),
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
  bookNotRegisteredText: {
    padding: theme.spacing(3),
    textAlign: 'center',
  }
}));

const BookShelf = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(JSON.parse(localStorage.getItem('bookShelfStatus')) || 'want_to_read');
  const data = useSelector(state => state.bookShelfReducer.data);
  const [page, setPage] = useState(JSON.parse(localStorage.getItem('bookShelfPage')) || 1);

  const handleBookShelfTabsChange = (event, newValue) => {
    localStorage.setItem('bookShelfStatus', JSON.stringify(newValue));
    setValue(newValue);
    setPage(1);
    dispatch(findBooksByStatus(newValue, 1));
  };

  useEffect(() => {
    localStorage.setItem('bookShelfPage', JSON.stringify(page));
    dispatch(findBooksByStatus(value, page));
  }, [page])

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper>
        <Tabs id="bookShelfTabs" value={value} onChange={handleBookShelfTabsChange} aria-label="disabled tabs example" indicatorColor="primary"
          textColor="primary"
          variant="fullWidth">
          <Tab value="want_to_read" label="読みたい本" className={classes.tab} />
          <Tab value="reading" label="読んでる本" className={classes.tab} />
          <Tab value="finished_reading" label="読み終わった本" className={classes.tab} />
          <Tab value="tsundoku" label="積読本" className={classes.tab} />
        </Tabs>
        {(data.books !== undefined) && (data.books.length !== 0) ?
          data.books.map((book, idx) =>
            <Paper key={idx}>
              <ListItem alignItems="flex-start" className={classes.listItem}>
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
                      color="textPrimary"
                    >
                      {book.author} / {book.salesDate}
                    </Typography>
                  }
                />
                <Typography
                  component="span"
                  variant="body2"
                  color="secondary">
                  追加日：{book.bookShelfAddedDate}
                </Typography>
              </ListItem>
              <Divider />
            </Paper>
          )
          :
          <Typography
            className={classes.bookNotRegisteredText}
            variant="body1"
            color="textSecondary">
            本が登録されていません
          </Typography>
        }
      </Paper>
      {(data.books !== undefined && data.books.length !== 0) &&
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

export default BookShelf;