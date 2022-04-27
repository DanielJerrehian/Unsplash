import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';


import Header from './components/Header';
import Search from './components/Search';
import Welcome from './components/Welcome';
import ImageCard from './components/ImageCard';


const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050'

function App() {
    const [searchParameter, setSearchParamter] = useState('');
    const [images, setImages] = useState([])

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = axios.get(`${API_URL}/new-image?query=${searchParameter}`)
            setImages(prevImages => { [{ ...response.data, title: searchParameter }, ...prevImages] })
        } catch (error) {
            console.log(error.toJSON());
        }
        
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
                {images.length ? (
                    <Row xs={1} md={2} lg={4}>
                        {images.map((image, i) => {
                            return (
                                <div className="image-card">
                                    <Col key={i} className="pb-4">
                                        <ImageCard image={image} handleDeleteImage={handleDeleteImage} />
                                    </Col>
                                </div>
                            )
                        })}
                    </Row>
                ) : (
                    <Welcome />
                )}
            </Container>
        </div>
    );
}

export default App;
