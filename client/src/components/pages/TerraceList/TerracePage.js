import TerraceList from './TerraceList'

import Container from 'react-bootstrap/esm/Container'

const TerracePage = ({ loggedUser }) => {

    return (
        <Container>

            <h1>Lista de Terrazas</h1>
            <TerraceList loggedUser={loggedUser} />

        </Container>
    )
}

export default TerracePage