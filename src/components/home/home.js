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
            restaurantName: ["","",""],
            restaurantAddress: ["","",""],
            foodCalories: [0,0,0],
            foodRecipe: ["","",""],
            foodImage: ["","",""],
            loading: ""
        };
    }


    handleInput(e) {
        // Prevent Double Clicking
        e.preventDefault();

        this.setState({
            loading: "Please Wait, Your Data is being Processed"
        });
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

    };

    classificationAPI() {
        var input = document.getElementById('inputImage');
        // var fileInput = document.querySelector('inputImage');

        var formData = new FormData();
        // formData.append('file',fileInput.files[0]);
        formData.append('image',input.files[0]);

        const upload = (inputFile) => {
            fetch('http://localhost:5000/classify-image', {
                method: 'POST',
                // headers: {
                //     "Content-type": "application/json",
                // },
                body: inputFile
            })
                .then(res => {return res.json()})
                .then(data => {
                    this.setState({
                        type: data.food,
                        percentage: data.probability
                    });
                  // Fetching Data from Zomato to obtain nearest restaurant
                })
                .then(data2 => {
                    var food = this.state.type;
                    this.zomatoAPI(food);
                    // Fetching Data from Edamam for popular recipes and average calories
                    this.edamamAPI(food);
                })
                .catch(err => console.log(err));
        }

          upload(formData);
    }

    zomatoAPI(food) {
        const httpOptionsZomato = {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                "user-key": "1c5365b7b3563fb943f4fd4997012f3e"
            }
        };

        var url = "https://developers.zomato.com/api/v2.1/search?";
        var langitude = -6.175110;
        var longitude = 106.865036;
        var sort = "real_distance"

        fetch(url + "q=" + food + "&la=" + langitude + "&lon=" + longitude + "&sort=" + sort, httpOptionsZomato)
            .then(res => { return res.json() })
            .then(data => {
                var newArray = [];
                newArray.push(data.restaurants[0]);
                newArray.push(data.restaurants[1]);
                newArray.push(data.restaurants[2]);
                this.setState({
                  restaurantName: [newArray[0].restaurant.name,newArray[1].restaurant.name,newArray[2].restaurant.name],
                  restaurantAddress: [newArray[0].restaurant.location.address,newArray[1].restaurant.location.address,newArray[2].restaurant.location.address]
                });
            })
            .catch(err => console.log(err));
    }

    edamamAPI(food) {
        const httpOptionsEdamam = {
            method: 'GET'
        };

        var url = 'https://api.edamam.com/search?';
        var q = food;
        var app_id = "cb7fa61b";
        var app_key = "b6f6c3ba14703edc0762250c1009976c";


        console.log("Edamam");
        fetch(url + "q=" + q + "&app_id=" + app_id + "&app_key=" + app_key, httpOptionsEdamam)
            .then(res => { return res.json() })
            .then(data => {
              var calories = [];
              calories.push(data.hits[0].recipe.calories);
              calories.push(data.hits[1].recipe.calories);
              calories.push(data.hits[2].recipe.calories);

              var recipe = [];
              recipe.push(data.hits[0].recipe.url);
              recipe.push(data.hits[1].recipe.url);
              recipe.push(data.hits[2].recipe.url);

              var image = [];
              image.push(data.hits[0].recipe.image);
              image.push(data.hits[1].recipe.image);
              image.push(data.hits[2].recipe.image);

              this.setState({
                  foodCalories: [calories[0],calories[1],calories[2]],
                  foodRecipe: [recipe[0],recipe[1],recipe[2]],
                  foodImage: [image[0],image[1],image[2]],
                  loading: "Complete"
              });
            });
    }

    render() {
        return (
            <div className="home-page">
                <Container>
                    <Card>
                        <CardBody>
                            <h3><span className="specText">Food Identifier</span></h3>
                                <label className="input-file">
                                    Enter Your Image Here!
                                    <input type="file" id="inputImage" name="image" className="file-input" onChange={this.handleInput.bind(this)} />
                                </label>
                            <Row>
                                <canvas id="imageCanvas" className="image-canvas" />
                            </Row>
                            <br/>
                            <span>Result:</span>
                            <br/>
                            <span className="loadingText">{this.state.loading}</span>
                            <Row>
                                <Col xs="12" md="3">
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
                                <Col xs="12" md="9">
                                    <Card>
                                        <CardBody>
                                            <strong>Nearest Restaurant</strong>
                                            <hr />
                                            <Row>
                                              <Col sm="12" md="4">
                                                  <Card>
                                                      <CardBody>
                                                          <strong><u><p>Restaurant</p></u></strong>
                                                          <p><strong>Name:</strong> {this.state.restaurantName[0]}</p>
                                                          <strong><p>Address:</p></strong>
                                                          <p>{this.state.restaurantAddress[0]}</p>
                                                      </CardBody>
                                                  </Card>
                                              </Col>
                                              <Col sm="12" md="4">
                                                <Card>
                                                  <CardBody>
                                                    <strong><u><p>Restaurant</p></u></strong>
                                                    <p><strong>Name:</strong> {this.state.restaurantName[1]}</p>
                                                    <strong><p>Address:</p></strong>
                                                    <p>{this.state.restaurantAddress[1]}</p>
                                                  </CardBody>
                                                </Card>
                                              </Col>
                                              <Col sm="12" md="4">
                                                <Card>
                                                  <CardBody>
                                                    <strong><u><p>Restaurant</p></u></strong>
                                                    <p><strong>Name:</strong> {this.state.restaurantName[2]}</p>
                                                    <strong><p>Address:</p></strong>
                                                    <p>{this.state.restaurantAddress[2]}</p>
                                                  </CardBody>
                                                </Card>
                                              </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="4">
                                    <Card>
                                      <CardBody>
                                          <p><strong>Link to Popular Recipe:</strong></p>
                                          <a href={this.state.foodRecipe[0]}>{this.state.foodRecipe[0]}</a>
                                          <br/><br/>
                                          <p><strong>Calories:</strong></p>
                                          <p>{this.state.foodCalories[0]}</p>
                                          <img src={this.state.foodImage[0]} alt="Default Image" height="150" width="150" />
                                      </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="12" md="4">
                                  <Card>
                                    <CardBody>
                                      <p><strong>Link to Popular Recipe:</strong></p>
                                      <a href={this.state.foodRecipe[1]}>{this.state.foodRecipe[1]}</a>
                                      <br/><br/>
                                      <p><strong>Calories:</strong></p>
                                      <p>{this.state.foodCalories[1]}</p>
                                      <img src={this.state.foodImage[1]} alt="Default" height="150" width="150" />
                                    </CardBody>
                                  </Card>
                                </Col>
                                <Col xs="12" md="4">
                                  <Card>
                                    <CardBody>
                                      <p><strong>Link to Popular Recipe:</strong></p>
                                      <a href={this.state.foodRecipe[2]}>{this.state.foodRecipe[2]}</a>
                                      <br/><br/>
                                      <p><strong>Calories:</strong></p>
                                      <p>{this.state.foodCalories[2]}</p>
                                      <img src={this.state.foodImage[2]} alt="Default Image" height="150" width="150" />
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
