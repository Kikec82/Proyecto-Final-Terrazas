import { Component } from 'react'
import { Card, ListGroupItem, ListGroup, Container, Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import TerracesService from './../../../services/terraces.service'
import ExperiencesService from '../../../services/experience.service'


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
                        <Row className="justify-content-space-around">
                            <Col md={3}>
                                {this.state.experience.map(elm => (

                                    <Card border="primary" style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={elm.features.image} />
                                        <div className="details">
                                            <Card.Body>
                                                <Card.Text>
                                                    Comentarios: {elm.comments}
                                                </Card.Text>
                                            </Card.Body>
                                        </div>

                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem>Ciudad:{this.state.terrace.terraceCity} </ListGroupItem>
                                            {/* <ListGroupItem> Foto:{elm.features.image} </ListGroupItem> */}
                                            <ListGroupItem>Distancia entre mesas: {elm.features.tableDistance}</ListGroupItem>
                                            <ListGroupItem>Reservas: {elm.features.booking ? "Sí" : "No"} </ListGroupItem>
                                            <ListGroupItem>Música: {elm.features.music ? "Si" : "No"}</ListGroupItem>
                                            <ListGroupItem>Espacio:  {elm.features.outdoors}</ListGroupItem>
                                        </ListGroup>

                                    </Card>
                                ))}
                                <br></br>
                                <Link to="/terraceList" className="btn btn-dark">Volver al listado</Link>
                            </Col>
                        </Row>

                    </>
                }
            </Container>
        )
    }
}
export default TDetails