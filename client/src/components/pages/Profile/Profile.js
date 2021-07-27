import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'



class ProfileNav extends Component {


    render() {
        return (
 
            <Container>
            <div className="profileMenu">

                <div>
                     <div className='user-info-container'>
                         <h2 className='user-name-profile'>  {this.props.loggedUser.username}</h2>
                         <h4 className='user-name-profile'>  {this.props.loggedUser.city} </h4>
                         <img className='user-image-profile' src={this.props.loggedUser.image} alt="Avatar" />
                     </div>
        
                     <nav className='profile-nav'>
                        <Link to={`/editProfile/${this.props.loggedUser._id}`} className='profile-links' >  <i className="fa fa-cogs" /> <p className='texthover'>Editar perfil</p></Link>
                         <Link to='/newTerrace' className='profile-links' >  <i className="fa fa-car" /> <p className='texthover-1 texthover'>Crear nueva terraza </p></Link>
                         <Link to='/terraceList' className='profile-links' >  <i className="fa fa-bell" /> <p className='texthover-1 texthover'>Lista de Terrazas</p></Link>
        
                     </nav>
                 </div> 
            </div>
                
            </Container>
        

        )
    }
}
export default ProfileNav