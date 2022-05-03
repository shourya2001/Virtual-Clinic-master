import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from "react-player";


const useStyles = makeStyles({
  root: {
    maxWidth: 265,
    marginLeft: '50px',
  },
  media: {
    height: 140,
  },
  title:{
      marginBottom: '15px'
  },
  container: {
      display: 'flex',
      justifyContent: 'center',
      alignContent:'center',
      alignItems: 'center'
  },
  precaution: {
    marginTop: '50px'
  },
  video:{
    display: 'inline-block',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: '40px',
  },
  container2: {
    display: 'flex',
    justifyContent: 'center',
    alignContent:'center',
    alignItems: 'center',
    marginTop: '20px'
}
});


function Card2() {
    const classes = useStyles();

    return (
        <>
        <Typography variant="h4" style={{color: '#000'}} component="p" className={classes.title}>
                        Our Services
            </Typography>
        <div className={classes.container}>
        
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Annual Wellness Visit
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Set healthy goals for the coming year with a speciality trained people.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Advanced Care Planning
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Get assistance with creating end-of-life documents and plans.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1555708982-8645ec9ce3cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Physical Intergration
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Connect the dots with symptoms and with physical conditions.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
        <div className={classes.container2} >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Collaborative Care Model
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        All providers remain up-to-date on their patient's physical records.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1599045118108-bf9954418b76?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                         Patient Monitoring
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Smart Devices mointer patients chronic conditions and records it.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Chronic Care
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Providers can keep track of patient's condition over period of time.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
        <div id ="precaution" className={classes.precaution}>
            <Typography variant="h4" style={{color: '#000'}} component="p" className={classes.title}>
                        Precautions to take care during covid
            </Typography>
            <ReactPlayer className= {classes.video} url="https://www.youtube.com/watch?v=IT7ghcGy6r0"/>
            <ReactPlayer className= {classes.video} url="https://www.youtube.com/watch?v=BtN-goy9VOY"/>
        </div>
        </>
    )
}

export default Card2
