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

        };
    }

    handleInput(e) {
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
    };

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
                                <input type="file" id="inputImage" className="file-input" onChange={this.handleInput.bind(this)} />
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
                                            <p>asd</p>
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
