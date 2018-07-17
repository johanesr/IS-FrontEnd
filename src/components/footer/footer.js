import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import { Container, Row, Col } from 'reactstrap';
import { Card, Button, CardTitle, CardText } from 'reactstrap';



class Footer extends Component {
    render () {
        return (
            <div className="Footer">
                <hr />
                <Container>
                    <Row>
                        <Col sm="4">
                            <Card body outline color="primary">
                                <i className="fas fa-envelope big-icon"></i>
                                <CardTitle>Email</CardTitle>
                                <hr />
                                <CardText>test@gmail.com</CardText>
                            </Card>
                        </Col>
                        <Col sm="4">
                            <Card body outline color="primary">
                                <i className="fas fa-map-marked-alt big-icon"></i>
                                <CardTitle>Address</CardTitle>
                                <hr />
                                <CardText>Taman Palem</CardText>
                            </Card>
                        </Col>
                        <Col sm="4">
                            <Card body outline color="primary">
                                <i className="fas fa-mobile-alt big-icon"></i>
                                <CardTitle>Phone</CardTitle>
                                <hr />
                                <CardText>(021) 902-8858</CardText>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <a href="http://www.twitter.com" className="Social big-icon">
                        <i className="fab fa-twitter-square"></i>
                    </a>
                    <a href="http://www.facebook.com" className="Social big-icon">
                        <i className="fab fa-facebook-square"></i>
                    </a>
                    <a href="http://www.linkedin.com" className="Social big-icon">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <p className="copyright">
                        © Copyright 2015-2016 Wifiku. All rights reserved.
                    </p>
                </Container>
            </div>
        );
    }
}

export default Footer;