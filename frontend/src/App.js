import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';


import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const unsplashURL = "https://api.unsplash.com"


function App() {
    const [searchParameter, setSearchParamter] = useState('');
    const [images, setImages] = useState([])

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        axios
            .get(`${unsplashURL}/photos/random/?query=${searchParameter}&client_id=${UNSPLASH_ACCESS_KEY}`)
            .then(response => {
                setImages(prevImages => {
                    return [{ ...response.data, title: searchParameter }, ...prevImages]
                })
            })
            .catch(function (error) {
                console.log(error.toJSON());
            });
        setSearchParamter('');
    }

    const handleOnChange = (e) => {
        const { value } = e.target
        setSearchParamter(value)
    }

    const handleDeleteImage = (imageId) => {
        setImages(images.filter(image => image.id !== imageId));
    }

    return (
        <div>
            <Header title="Unsplash Image Gallery" />
            <Search searchParameter={searchParameter} setSearchParameter={setSearchParamter} handleSearchSubmit={handleSearchSubmit} handleOnChange={handleOnChange} />
            <Container className="mt-4">
                <Row xs={1} md={2} lg={4}>

                {images.map((image, index) => {
                    return (
                        <div className="image-card">
                            <Col key={index} className="pb-4">
                                <ImageCard image={image} handleDeleteImage={handleDeleteImage} />
                            </Col>
                        </div>
                    )
                })}
                </Row>
            </Container>
            
        </div>
    );
}

export default App;
