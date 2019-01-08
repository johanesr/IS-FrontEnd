import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
    Container,
    Card,
    CardBody,
    CardText,
    Row,
    Col
     } from "reactstrap";

import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "default",
            percentage: 0,
            nearestRestaurant: []
        };
    }


    handleInput(e) {
        // Prevent Double Clicking
        e.preventDefault();

        // Show image file on canvas
        var imageLoader = document.getElementById('inputImage');
        var canvas = document.getElementById('imageCanvas');
        var ctx = canvas.getContext('2d');

        const maxWidth = 500;
        const maxHeight = 500;

        var reader = new FileReader();
        reader.onload = function(event) {
            var img = new Image();
            img.onload = function(){
                let ratio = 1;

                // if (img.width > maxWidth) {
                //     ratio = maxWidth / img.width;
                // } else if (img.height > maxHeight) {
                //     ratio = maxHeight / img.height;
                // }

                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                ctx.drawImage(img,0,0);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);

        // Fetching Data from the Classification Application
        this.classificationAPI();

        // Fetching Data from Zomato to obtain nearest restaurant
        this.zomatoAPI();

        // Fetching Data from Edamam for popular recipes and average calories
        // this.edamamAPI();

    };

    classificationAPI() {
        var input = document.getElementById('inputImage');
        // var fileInput = document.querySelector('inputImage');

        var formData = new FormData();
        // formData.append('file',fileInput.files[0]);
        formData.append('image',input.files[0]);

        console.log(input);
        console.log(input.files[0]);
        console.log(input.files);
        console.log(formData);

        const upload = (inputFile) => {
            fetch('http://192.168.1.134:5000/classify-image', {
                method: 'POST',
                // headers: {
                //     "Content-type": "application/json",
                // },
                body: inputFile
            })
                .then(res => {return res.json()})
                .then(data => {
                    console.log(data);
                    this.setState({
                        type: data.food,
                        percentage: data.probability
                    });
                    console.log(this.state)
                })
                .catch(err => console.log(err));
        }

        upload(formData);
    }

    zomatoAPI() {
        const httpOptionsZomato = {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                "user-key": "1c5365b7b3563fb943f4fd4997012f3e"
            },
            params: {
                q: "pizza",
                la: -6.1123883999999995,
                lon: 106.7529629,
                sort: "real_distance"
            }
        };

        fetch('https://developers.zomato.com/api/v2.1/search?', httpOptionsZomato)
            .then(res => {return res.json()})
            .then(data => {
                console.log(data.restaurants);
                var newArray = [];
                newArray.push(data.restaurants[0]);
                newArray.push(data.restaurants[1]);
                newArray.push(data.restaurants[2]);
                this.setState({
                    nearestRestaurant: newArray
                });
            })
            .catch(err => console.log(err));
    }

    edamamAPI() {
        const httpOptionsEdamam = {
            method: 'GET',
            params: {
                q: "pizza",
                app_id: "cb7fa61b",
                app_key: "b6f6c3ba14703edc0762250c1009976c",
            }
        };

        console.log("Edamam");
        fetch('https://api.edamam.com/search?', httpOptionsEdamam)
            .then(res => console.log(res));
    }

    render() {
        return (
            <div className="home-page">
                <Container>
                    <Card>
                        <CardBody>
                            <Row>
                                <span className="specText">Display: [Max Width: 500px] [Max Height: 500px]</span>
                            </Row>
                            <br/>
                            <Row>
                                <span className="enterText">Enter Your File:</span>
                                <input type="file" id="inputImage" name="image" className="file-input" onChange={this.handleInput.bind(this)} />

                                {/*<form action="http://192.168.1.134:5000/classify-image" method="POST"*/}
                                      {/*encType="multipart/form-data">*/}
                                    {/*<input type="file" name="image"/>*/}
                                    {/*<input type="submit"/>*/}
                                {/*</form>*/}
                            </Row>
                            <br/>
                            <Row>
                                <canvas id="imageCanvas" className="image-canvas" />
                            </Row>
                            <br/>
                            <span>Result:</span>
                            <Row>
                                <Col xs="12" md="6">
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <p><strong>Dish Name: </strong>{this.state.type}</p>
                                            </Row>
                                            <br/>
                                            <Row>
                                                <p><strong>Percentage: </strong>{this.state.percentage}%</p>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="12" md="6">
                                    <Card>
                                        <CardBody>
                                            <p>asd</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Home;
