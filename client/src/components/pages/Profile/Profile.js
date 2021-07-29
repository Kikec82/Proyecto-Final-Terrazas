import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'





function ProfileNav(props) {
    
        return (
 
            <Container>
            <div className="profileMenu">

                <div>
                     <div className='user-info-container'>
                         <h2 className='user-name-profile'>  {props.loggedUser.username}</h2>
                         <h4 className='user-name-profile'>  {props.loggedUser.city} </h4>
                         <img className='user-image-profile' src={props.loggedUser.image} alt="Avatar" />
                     </div>
        
                     <nav className='profile-nav'>
                            <Link to={`/editProfile/${props.loggedUser._id}`} > <button className='btn btn-success aux'>Editar perfil</button></Link>
                            <Link to='/newTerrace' ><button className='btn btn-success aux'>Crear nueva terraza</button></Link>
                            <Link to='/terraceList' ><button className='btn btn-success aux'>Lista de Terrazas</button></Link>
        
                     </nav>
                 </div> 
            </div>
                
            </Container>
        

        )
    }

export default ProfileNav