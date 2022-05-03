import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <div style={{marginTop: '40px'}}>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        ₹3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {`on 
          ${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}
      </Typography>
    </div>
  );
}