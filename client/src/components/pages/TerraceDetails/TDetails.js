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





                        <Row className="justify-content-center">
                            {this.state.experience.map(elm => (
                                <Col sm={4}>

                                    <Card border="success" style={{ width: '350px', height: '550px' }}>
                                        <Card.Img variant="top" src={elm.features.image} />

                                        <ListGroup className="list-group-flush tarjeta">
                                            <ListGroupItem><b>Ciudad: </b> {this.state.terrace.terraceCity} </ListGroupItem>
                                            <ListGroupItem><b>Distancia entre mesas:</b> {elm.features.tableDistance}</ListGroupItem>
                                            <ListGroupItem><b>Reservas:</b> {elm.features.booking ? "Sí" : "No"} </ListGroupItem>
                                            <ListGroupItem><b>Música:</b> {elm.features.music ? "Si" : "No"}</ListGroupItem>
                                            <ListGroupItem><b>Espacio: </b> {elm.features.outdoors}</ListGroupItem>
                                            <ListGroupItem><b>Comentarios:</b> {elm.comments}</ListGroupItem>
                                        </ListGroup>


                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <div className="abajo">
                            <div className="regreso">
                                <Link to="/terraceList" className="btn btn-dark regreso">Volver al listado</Link>
                            </div>
                            <div className="mapas">
                                <h4>Ubicación</h4>
                                <Maps terrace={this.state.terrace}></Maps>
                            </div>
                            
                        </div>



                    </>
                }
            </Container>
        )
    }
}
export default TDetails