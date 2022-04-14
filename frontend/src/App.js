import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Search from './components/Search';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY; 
const unsplashURL = "https://api.unsplash.com"


function App() {
    const [searchParameter, setSearchParamter] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetch(`${unsplashURL}/photos/random/?query=${searchParameter}&client_id=${UNSPLASH_ACCESS_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleOnChange = (e) => {
        const {value} = e.target
        setSearchParamter(value)
    }

    return (
        <div>
            <Header title="Unsplash Image Gallery" />
            <Search searchParamter={searchParameter} setSearchParameter={setSearchParamter} handleSearchSubmit={handleSearchSubmit} handleOnChange={handleOnChange}/>
        </div>
    );
}

export default App;
