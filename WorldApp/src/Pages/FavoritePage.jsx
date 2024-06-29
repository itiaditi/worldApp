import { useEffect, useState } from 'react';
import axios from 'axios';
import './CountryDetail.css';
import CountryCard from '../Components/CountryCard';
import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon from Material-UI

export default function FavoritePage() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = () => {
        axios.get('http://localhost:5000/api/favorite')
            .then(response => {
                setFavorites(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching favorites:', error);
                // Handle error
            });
    };

    const handleDeleteFavorite = (id) => {
        axios.delete(`http://localhost:5000/api/favorite/${id}`)
            .then(response => {
                console.log('Favorite deleted successfully:', response.data.message);
                // Refresh the favorites list after deletion
                fetchFavorites();
            })
            .catch(error => {
                console.error('Error deleting favorite:', error);
                // Handle error
            });
    };

    return (
        <div className='favorite-wrapper'>
            <h2>Favorite Countries</h2>
            <div className='favorites-grid'>
                {favorites.length === 0 ? (
                    <p>Add items in favorite</p>
                ) : (
                    favorites.map((favorite, index) => (
                        <div key={favorite._id} className='favorite-item'>
                            <CountryCard
                                name={favorite.name}
                                capital={favorite.capital}
                                population={favorite.population}
                                flagUrl={favorite.flagUrl}
                            />
                            <DeleteIcon onClick={() => handleDeleteFavorite(favorite._id)} style={{ cursor: 'pointer' }} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
