import { Component } from 'react'
import TerracesService from './../../../services/terraces.service'

import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class TerraceList extends Component {

    constructor() {
        super()
        this.state = {
            terraces: [],
            experiences: []

        }
        this.terracesService = new TerracesService()


    }

    loadTerraces = () => {
        this.terracesService
            .getTerraces()
            .then(response => this.setState({ terraces: response.data }))
            .catch(err => console.log(err))
    }


    componentDidMount = () => {
        this.loadTerraces()


    }

    render() {
        return (
            <div className="tabla">
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>

                                <th>Nombre</th>
                                <th>Ciudad</th>
                                <th>Puntuación</th>
                                <th>Detalle</th>

                            </tr>
                        </thead>

                        <tbody>
                            {this.state.terraces.map(elm => (
                                <tr>
                                    <td className="nameTable">{elm.terraceName}</td>
                                    <td className="cityTable">{elm.terraceCity}</td>
                                    <td className="ratingTable">{elm.numberOfRatings !== 0 ? elm.rating / (elm.numberOfRatings + 1): elm.rating}</td>
                                    <td className="detailTable"><Link to={`/terracedetails/${elm._id}`} className="detail"> Ver detalles </Link></td>
                                </tr>


                            ))}
                        </tbody>

                    </Table>
                </div>
            </div>
        )
    }
}
export default TerraceList