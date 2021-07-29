import { Component } from 'react'
import { Form, Button } from "react-bootstrap"
import ExperiencesService from '../../../services/experience.service'
import TerracesService from '../../../services/terraces.service'
import UploadsService from '../../../services/upload.service'
import { LocationSearchInput } from '../../AutocompleteAddress/AutocompleteAddress'


class NewTerraceReview extends Component {

    constructor() {
        super()
        this.state = {
            terraceCity: '',
            terraceName: '',
            comments: '',
            rating: undefined,
            tableDistance: "0-1'5 metros",
            booking: false,
            music: false,
            outdoors: "Abierta",
            image: '',
            imageFile: undefined,
            loading: false,
            lat: '',
            lng: ''
        }
        this.terracesService = new TerracesService()
        this.experienceService = new ExperiencesService()
        this.uploadsService = new UploadsService()
    }

    handleFormSubmit = e => {
        e.preventDefault()

        const { terrace, terraceCity, terraceName, comments, rating, tableDistance, booking, music, outdoors, image, lat, lng} = this.state

        this.saveExperience({ terrace, terraceCity, terraceName, comments, rating, tableDistance, booking, music, outdoors, image })
    }


    saveExperience = (data) => {
        this.terracesService
            .saveTerrace(data)
            .then(response => {

                data.terrace = response.data._id

                this.experienceService
                    .saveExperience(data)
                    .then(response => {
                        this.setState({ experience: response.data })
                        console.log(response.data)
                        this.props.history.push('/terracelist')
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleCheck = (e) => {
        const { name, checked } = e.target
        this.setState({ [name]: checked })
    }

    handleFileUpload = e => {

        this.setState({ loading: true })

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        this.uploadsService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    loading: false,
                    image: response.data.cloudinary_url
                })
            })
            .catch(err => console.log(err))
    }
    



    render() {
        return (
            <div className="newTerraceForm">
                <Form onSubmit={this.handleFormSubmit}>
                    <div className="flexbox-centering">
                        <Form.Group className="inputForm" >

                            <Form.Label>Terraza</Form.Label>
                            <Form.Control type="text" value={this.state.terraceName} onChange={this.handleChange} name="terraceName" />


                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control type="text" value={this.state.terraceCity} onChange={this.handleChange} name="terraceCity" />

                            <Form.Label>Latitud </Form.Label>
                            <Form.Control value={this.state.lat} onChange={this.handleChange} name="lat" />
                            <Form.Label>Longitud </Form.Label>
                            <Form.Control value={this.state.lng} onChange={this.handleChange} name="lng" />
                            <Form.Label>Ubicación GPS</Form.Label>
                            <LocationSearchInput></LocationSearchInput>
                            
                            
                            <Form.Label>Puntuación</Form.Label>
                            <Form.Control value={this.state.rating} onChange={this.handleChange} as="select" name="rating">
                                <option value="1" >1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5" >5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Form.Control>


                            <Form.Label>Comentarios</Form.Label>
                            <Form.Control type="text" value={this.state.comments} onChange={this.handleChange} name="comments" />


                            <Form.Label>Distancia entre mesas</Form.Label>
                            <Form.Control value={this.state.tableDistance} onChange={this.handleChange} as="select" name="tableDistance">
                                <option value="0-1'5 metros">0-1´5 metros</option>
                                <option value="1,5-2 metros">1'5-2 metros</option>
                                <option value="más de 2 metros">más de 2 metros</option>

                            </Form.Control>


                            <Form.Check className="row">
                                <div className="selections">
                                    <Form.Label>Reservas</Form.Label>
                                    <Form.Check type="checkbox" value={this.state.booking} onChange={this.handleCheck} name="booking" />
                                    <Form.Label>Música</Form.Label>
                                    <Form.Check type="checkbox" value={this.state.music} onChange={this.handleCheck} name="music" />
                                </div>
                            </Form.Check>

                            <Form.Label> Terraza </Form.Label>
                            <Form.Control onChange={this.handleChange} as="select" name="outdoors">
                                <option value="Abierta" >Abierta</option>
                                <option value="Cubierta">Cubierta</option>
                                <option value="Semicubierta">Semicubierta</option>
                            </Form.Control>

                            <br></br>
                            <Form.Control type="file" value={this.state.imageFile} onChange={this.handleFileUpload} name="image" />
                        </Form.Group>

                        <br></br>
                        <Button disabled={this.state.loading} type="submit" className="btn btn-success"> Guardar </Button>
                    </div>
                </Form>
            </div>
        )
    }
}
export default NewTerraceReview