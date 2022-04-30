import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Container, Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Search from './components/Search';
import Welcome from './components/Welcome';
import ImageCard from './components/ImageCard';


const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050'

function App() {
    const [searchParameter, setSearchParamter] = useState('');
    const [images, setImages] = useState([]);
    const [appLoading, setAppLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const notifyToast = (toastText) => toast(toastText);

    const getSavedImages = () => {
        setAppLoading(true);
        axios
            .get(`${API_URL}/images`)
            .then(response => {
                setAppLoading(false);
                setImages(response.data || []) 
                if (response?.data?._id) {
                    notifyToast("Fetched your images")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(getSavedImages, [])

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        try {
            setSearchLoading(true);
            const response = await axios.get(`${API_URL}/new-image?query=${searchParameter}`)
            setImages(prevImages => [{ ...response.data, title: searchParameter }, ...prevImages])
        } catch (error) {
            console.log(error);
        }

        setSearchLoading(false);
        setSearchParamter('');
    }

    const handleOnChange = (e) => {
        const { value } = e.target
        setSearchParamter(value)
    }

    const handleDeleteImage = (imageId) => {
        axios
            .delete(`${API_URL}/delete-image/${imageId}`)
            .then(response => {
                if (response?.data?.deletedId) {
                    setImages(images.filter(image => image.id !== imageId));
                    notifyToast("Image deleted");
                } else if (response?.status == 404) {
                    console.log("The image you tried to delete was not found in the database");
                    notifyToast("The image you tried to delete was not found");
                } else {
                    console.log("Something went wrong, please try again");
                    notifyToast("Something went wrong, please try again");
                }
             })
            .catch(function (error) {
                console.log(error);
            });
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
                notifyToast("Image saved!")
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
                searchLoading={searchLoading}
            />
            <Container className="mt-4">
                {
                    appLoading 
                        ? 
                            (
                                <div className="d-flex justify-content-center mt-5">
                                    <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true" className="mr-2" />
                                </div>
                            )
                        :
                    images.length 
                        ? 
                            (
                                <div>
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
                                </div>
                            )
                        : 
                            (
                                <Welcome />
                            )
                }
            </Container>
            <ToastContainer 
                position="bottom-right"
                autoClose={1500}
                closeOnClick
            />
        </div>
    );
}

export default App;
