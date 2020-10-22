import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import "./style.css"
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 12,
  },
  
});

export default ({ name, id }) => {
  const classes = useStyles();

  return (
    <Card className={"card-g"} >
      <CardContent>
        <Typography className={"card-g-title"} color="textSecondary" gutterBottom>
          {name}
        </Typography>
        <Divider />
      </CardContent>
      <CardActions>
        <Link to={`/quiz/${id}`} component={Button} className={"card-g-button"} size="small">Take quiz</Link>
      </CardActions>
    </Card>
  );
}
