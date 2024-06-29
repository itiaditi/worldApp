import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import Favorite icon from Material-UI icons
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import { Link } from 'react-router-dom';
export default function CountryCard(props) {
  const handleFavoriteClick = () => {
    // Send a POST request to backend to add this country to favorites
    axios.post('http://localhost:5000/api/favorite', {
      name: props.name,
      capital: props.capital,
      population: props.population,
      flagUrl: props.flagUrl
    })
    .then(response => {
      console.log('Country added to favorites:', response.data);
      // Optionally, you can update state or notify user of success
    })
    .catch(error => {
      console.error('Error adding country to favorites:', error);
      // Handle error
    });
  };
 
  return (
    <Card sx={{ maxWidth: 345, width: 250, minHeight: 280 }}>
      <CardMedia
        component="img"
        alt={props.name}
        height="140"
        image={props.flagUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.capital} | {props.population}
        </Typography>
      
        {/* Favorite Icon */}
                    
        <FavoriteIcon color="secondary" style={{ float: 'right', cursor: 'pointer' }} onClick={handleFavoriteClick} />
      </CardContent>
    </Card>
  );
}
