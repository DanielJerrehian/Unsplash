import React, { useState, useEffect } from 'react';
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
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const getSavedImages = () => {
        axios
            .get(`${API_URL}/images`)
            .then(response => { setImages(response.data || []) })
            .catch(function (error) {
                console.log(error.toJSON());
            });
    }

    useEffect(getSavedImages, [])

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/new-image?query=${searchParameter}`)
            setImages(prevImages => [{ ...response.data, title: searchParameter }, ...prevImages])
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
        setSearchParamter('');
    }

    const handleOnChange = (e) => {
        const { value } = e.target
        setSearchParamter(value)
    }

    const handleDeleteImage = (imageId) => {
        setImages(images.filter(image => image.id !== imageId));
    }

    const handleSaveImage = async (imageId) => {
        const imageToSave = images.find(image => image.id === imageId);
        imageToSave.saved = true;
        try {
            const response = await axios.post(`${API_URL}/images`, imageToSave)
            if (response.data?.insertedId) {
                setImages(
                    images.map(image => image.id === imageId ? {...image, saved: true} : image)
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Header title="Unsplash Image Gallery" />
            <Search 
                searchParameter={searchParameter}
                setSearchParameter={setSearchParamter}
                handleSearchSubmit={handleSearchSubmit}
                handleOnChange={handleOnChange}
                loading={loading}
            />
            <Container className="mt-4">
                {images.length ? (
                    <Row xs={1} md={2} lg={4}>
                        {images.map((image, i) => {
                            return (
                                <div key={i} className="ml-4 mr-4">
                                    <Col className="pb-4">
                                        <ImageCard image={image} handleDeleteImage={handleDeleteImage} handleSaveImage={handleSaveImage} />
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
