import React, { useState } from 'react';
import Home from './components/home/Home';
import CreateQuiz from "./components/create/CreateQuiz"
import QuizDetail from "./components/detail/QuizDetail"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Statistics from './components/stats/Statistics';
import "./index.css"

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    left:0,
    textAlign: "center",
    zIndex: 100,
    backgroundColor: "#6200EE",
  },
  app: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "4em"
  }
  
});
function App() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <Router>
      {/** here comes the nav bar */}
      <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction style={value === 0 ? {color: "#FFF"} : null} component={Link} to="/" label="Quiz List" icon={<ListIcon />} />
        <BottomNavigationAction style={value === 1 ? {color: "#FFF"} : null} component={Link} to="/stats" label="Stats" icon={<EqualizerIcon />} />
        <BottomNavigationAction style={value === 2 ? {color: "#FFF"} : null} component={Link} to="/create" label="Create Quiz" icon={<AddIcon />} />
      </BottomNavigation>
      </div>
      <Grid container>
        <Switch>
          <Route path="/stats">
          <Grid 
              container 
              item 
              className={classes.app} 
              xl={9} 
              md={10} 
              sm={11} 
              xs={12}
              justifyContent="center"
              width="100%">
            <Statistics />
            </Grid>

          </Route>
          <Route path="/quiz/:id">
            <Grid 
              container 
              item 
              className={classes.app} 
              xl={9} 
              md={10} 
              sm={11} 
              xs={12}
              justifyContent="center"
              width="100%">
              <QuizDetail />
            </Grid>
          </Route>
          <Route path="/create">
          <Grid 
              container 
              item 
              className={classes.app} 
              xl={9} 
              md={10} 
              sm={11} 
              xs={12}
              justifyContent="center"
              width="100%">
            <CreateQuiz />
            </Grid>

          </Route>
          <Route path="/">
          <Grid 
              container 
              item 
              className={classes.app} 
              xl={9} 
              md={10} 
              sm={11} 
              xs={12}
              justifyContent="center"
              width="100%">
            <Home />
            </Grid>

          </Route>
        </Switch>
      </Grid>
    </Router>
  );
}

export default App;
