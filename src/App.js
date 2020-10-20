import React, { useState, useEffect } from 'react';
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
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Statistics from './components/stats/Statistics';

const useStyles = makeStyles({
  root: {
    width: "99%",
    position: "absolute",
    bottom: 0,
    textAlign: "center"
  },
  app: {
    margin: "2em"
  }
});
function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Router>
      {/** here comes the nav bar */}

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction component={Link} to="/" label="Quiz List" icon={<ListIcon />} />
        <BottomNavigationAction component={Link} to="/stats" label="Stats" icon={<EqualizerIcon />} />
        <BottomNavigationAction component={Link} to="/create" label="Create Quiz" icon={<AddIcon />} />
      </BottomNavigation>
      <div className={classes.app}>
        <Switch>
          <Route path="/stats">
            <Statistics />
          </Route>
          <Route path="/quiz/:id">
            <QuizDetail />
          </Route>
          <Route path="/create">
            <CreateQuiz />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
