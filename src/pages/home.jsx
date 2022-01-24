import React from 'react'
import { Card, Button, Container } from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'
import PageTitle from '../components/pageTitle'
import intro from '../assets/AvatarPokemon.mp4'
import {Link} from 'react-router-dom'


class HomePage extends React.Component {

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <PageTitle pageTitle="Home" />
                <div style={{height: '85vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="m-1" style={{ textAlign: 'center' }}>
                        <Card style={{backgroundImage: 'radial-gradient(circle, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)'}}>
                            <Card.Header>
                                <video src={intro} width="400px" height="400px" controls="controls" autoPlay="true" />
                            </Card.Header>
                            <Card.Body style={{backgroundImage: 'radial-gradient(circle, #faf5f5, #ffc3c0, #ff9087, #f75a4b, #e20000)'}}>
                                <Card.Title>Welcome to Pokedex</Card.Title>
                                <Button variant="danger"
                                as={Link} to="/pokemon-list">Find Pokemon</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage