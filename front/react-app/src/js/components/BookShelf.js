import React, { useState, useEffect,useRef } from 'react';
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
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BookShelf = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState('want_to_read');
  const data = useSelector(state => state.bookShelfReducer.data);
  const [page, setPage] = useState(1);

  const handleBookShelfTabsChange = (event, newValue) => {
    setValue(newValue);
    console.log(page);
    dispatch(findBooksByStatus(newValue,page));
  };

  useEffect(() => {
    console.log(value);
    console.log(page);
    // console.log(data.books.length);
    // console.log(data.books.length / 10);
    // console.log(Math.ceil(data.books.length / 10));
    dispatch(findBooksByStatus(value,page));
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
        {(data !== undefined && data.books !== undefined) &&
          data.books.map((book, idx) => 
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
      </Paper>
      {data.books !== undefined &&
        <Pagination
          className={classes.pagenationRoot}
          count={data.totalPage}
          color="primary"
          shape="rounded"
          onChange={(e,page) => setPage(page)}
          page={page}
        />}
    </Container>
  );
}

export default BookShelf;