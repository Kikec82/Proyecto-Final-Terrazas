import { Component } from 'react'
import { Card, ListGroupItem, ListGroup, Container, Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import TerracesService from './../../../services/terraces.service'
import ExperiencesService from '../../../services/experience.service'
import Maps from '../../GoogleMapReact.js/Maps'


class TDetails extends Component {

    constructor() {
        super()
        this.state = {
            terrace: undefined,
            experience: undefined

        }
        this.terracesService = new TerracesService()
        this.experiencesService = new ExperiencesService()
    }
    //props.match.params
    componentDidMount() {

        const { id } = this.props.match.params
        // this.loadExperience()

        this.terracesService
            .getOneTerrace(id)
            .then(terrace_response => {
                this.experiencesService
                    .getExperienceByTerraceId(terrace_response.data._id)
                    .then(experience_response => this.setState({ terrace: terrace_response.data, experience: experience_response.data }))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <Container>

                {!this.state.terrace || !this.state.experience
                    ?
                    <h3>Cargando</h3>
                    :
                    <>
                        <h3>{this.state.terrace.terraceName}</h3>
                        
                      
                        <Maps terrace={this.state.terrace}></Maps>
                      
                        
                        <Row className="justify-content-center">
                            {this.state.experience.map(elm => (
                                <Col sm={3}>

                                    <Card border="success" style={{ width: '25rem' }}>
                                        <Card.Img variant="top" src={elm.features.image} />

                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem>Ciudad:{this.state.terrace.terraceCity} </ListGroupItem>
                                            <ListGroupItem>Distancia entre mesas: {elm.features.tableDistance}</ListGroupItem>
                                            <ListGroupItem>Reservas: {elm.features.booking ? "Sí" : "No"} </ListGroupItem>
                                            <ListGroupItem>Música: {elm.features.music ? "Si" : "No"}</ListGroupItem>
                                            <ListGroupItem>Espacio:  {elm.features.outdoors}</ListGroupItem>
                                        </ListGroup>

                                            <Card.Body>
                                        <div className="comments">
                                                <Card.Text>
                                                    Comentarios: <br></br> {elm.comments}
                                                </Card.Text>
                                        </div>
                                            </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                            <br></br>
                            <Link to="/terraceList" className="btn btn-dark">Volver al listado</Link>
                        </Row>

                    </>
                }
            </Container>
        )
    }
}
export default TDetails