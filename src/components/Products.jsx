import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
   media: {
      height: 200,
   },
});

function Products({ name, imageUrl, price, currency }) {
   const classes = useStyles();
   return (
      <Card>
         <CardActionArea>
            <CardMedia className={classes.media} image={imageUrl} title={name} />
            <CardContent>
               <Typography gutterBottom variant="h5" component="h2" align="center">
                  {name}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p" align="center">
                  Price: {currency} {price.toFixed(0)}
               </Typography>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}

export default Products;
