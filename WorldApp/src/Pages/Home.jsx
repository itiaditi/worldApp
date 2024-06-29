import CountryCard from '../Components/CountryCard';
import './Home.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAllCountries } from '../Services';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
function Home() {
    
    const [allCountriesList, setCountriesList] = useState([]);
    const [filteredCountriesList, setFilteredCountriesList] = useState([]);
    const [region, setRegion] = useState('');
    const [countryName, setCountryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [sortBy, setSortBy] = useState('name'); // Default field to sort by
    const countriesPerPage = 10; // Number of countries to display per page
   
    const handleRegionChange = (event) => {
        setRegion(event.target.value);
        setCurrentPage(1); // Reset to first page when region changes
    };

    const handleCountryNameChange = (event) => {
        setCountryName(event.target.value);
        setCurrentPage(1); // Reset to first page when country name changes
    };
   
    
     
    const handleSortChange = (field) => {
        if (field === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };
    
    useEffect(() => {
        getAllCountries().then((result) => {
            const countries = result.data;
            setCountriesList(countries);
            setFilteredCountriesList(countries);
        });
    }, []);

    useEffect(() => {
        let filteredCountries = [...allCountriesList];

        if (region !== '') {
            filteredCountries = filteredCountries.filter(country => country.region === region);
        }

        if (countryName !== '') {
            const lowerCaseCountryName = countryName.toLowerCase();
            filteredCountries = filteredCountries.filter(country =>
                country.name.toLowerCase().includes(lowerCaseCountryName)
            );
        }

        // Sorting logic
        filteredCountries.sort((a, b) => {
            const fieldA = a[sortBy].toLowerCase();
            const fieldB = b[sortBy].toLowerCase();

            if (fieldA < fieldB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (fieldA > fieldB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setFilteredCountriesList(filteredCountries);
    }, [region, countryName, allCountriesList, sortBy, sortOrder]);

    // Logic for pagination
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = filteredCountriesList.slice(indexOfFirstCountry, indexOfLastCountry);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="App">
            <div className='filters-wrapper'   style={{margin:"12px", display:"flex", justifyContent:"space-between"}}>
              <div>
              <TextField
                    id="outlined-basic"
                    label="Search by name"
                    variant="outlined"
                    onChange={handleCountryNameChange}
                    value={countryName}
                    style={{margin:"2px"}}
                />
                <FormControl sx={{  minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Filter by Region</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={region}
                        label="Filter by Region"
                        onChange={handleRegionChange}
                    >
                        <MenuItem value={''}>All</MenuItem>
                        <MenuItem value={'Africa'}>Africa</MenuItem>
                        <MenuItem value={'Americas'}>Americas</MenuItem>
                        <MenuItem value={'Asia'}>Asia</MenuItem>
                        <MenuItem value={'Europe'}>Europe</MenuItem>
                        <MenuItem value={'Oceania'}>Oceania</MenuItem>
                    </Select>
                   
                </FormControl>
              </div>
                <div className="sort-buttons" style={{margin:"10px"}}>
                    <Button onClick={() => handleSortChange('name')} variant="contained" color="primary">
                       Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </Button>
                </div>
            </div>
            
            <div className='country-card-wrapper'>
               
                {
                    currentCountries.map(country => (
                        // <Link
                        //     to={`/countries/${country.alpha3Code}`}
                        //     key={country.alpha3Code}
                        //     style={{ textDecoration: 'none' }}
                        // >
                        <>
                            <CountryCard
                                key={country.name}
                                name={country.name}
                                capital={country.capital}
                                population={country.population}
                                flagUrl={country.flags.png}
                            />
                        
                        <Link
                            to={`/countries/${country.alpha3Code}`}
                            key={country.alpha3Code}
                            style={{ textDecoration: 'none' }}
                        >
        <VisibilityIcon onClick={() => handleViewFavorite(favorite._id)} style={{ cursor: 'pointer', marginRight: 10 }} />
                  </Link> 
                  </>
                    ))
                }
            </div>
            <Stack spacing={2} sx={{ justifyContent: 'center', mt: 3 }}>
                <Pagination
                    count={Math.ceil(filteredCountriesList.length / countriesPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Stack>
        </div>
    );
}

export default Home;
