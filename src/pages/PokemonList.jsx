import React from 'react'
import Axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import { Row, Col, Stack, Pagination, Card, Button, Spinner } from 'react-bootstrap'

import NavigationBar from '../components/NavigationBar'
import PageTitle from '../components/pageTitle'


class PokeList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: null,
            loading: true,
            site: 'https://pokeapi.co/api/v2/pokemon/'
        }
    }

    getList = async () => {
        let pokeArray = []
        for (let i = 1; i <= 898; i++) {
            pokeArray.push(await this.getData(i))
        }

        console.log("hasil get-list", pokeArray)
        this.setState({ pokemon: pokeArray, loading: false })
    }

    getData = async (id) => {
        const resGetData = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return resGetData
    }
    componentDidMount() {
        this.getList()
        window.scrollTo(0, 0)
        
    }

    render() {
        
        return (
            <div>
                <NavigationBar />
                <PageTitle pageTitle="Pokedex" />
                <div className="listCard" style={{ backgroundImage: 'radial-gradient(circle, #dca7a7, #e1b6b6, #e6c4c4, #ebd3d3, #efe2e2)', marginBottom: '2%' }}>
                    {this.state.loading ? (
                        <div className='d-flex justify-content-center mt-5' style={{ height: '100vh' }}>
                            <Row>
                                <Col>
                                    <Spinner
                                        className='spinner-border  spinner-border-lg'
                                        role='status'
                                        style={{ height: '5vh', width: '5vh' }}
                                    >
                                    </Spinner>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='mx-3'> Loading Pokemon Data....</div>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <Row xs={2} md={4} xl={6}>
                            {this.state.pokemon.map((item, index) => {
                                // console.log(item.data.types[0].type.name)
                                return (
                                    <div className="col-md-3 col-sm-6 mb-3" style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap', marginTop: '1%', justifyContent: 'space-evenly' }} key={index}>
                                        <Card className="align-items-center" style={{ backgroundColor: TypeColors[item.data.types[0].type.name],borderRadius: "15px", margin: '2%', width: '100%', flexbasis: '33%'}}>
                                            <Card.Img variant="top" src={item.data.sprites.other.dream_world.front_default} style={{width:'150px',height:'150px',marginTop:'5%'}}/>
                                            <Card.Body>
                                                <Card.Title>
                                                    {item.data.name.toLowerCase().split(' ')
                                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                                                </Card.Title>
                                                <Card.Text><strong>{item.data.types.map(typePokemon => typePokemon.type.name).join(' || ')}</strong></Card.Text>
                                                <Button disabled>#{item.data.id}</Button>{' '}
                                                <Button
                                                as={Link} to={`/pokemon-detail/?${item.data.id}`}>
                                                    Info</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    // <PokeCard/>
                                )
                            })}
                        </Row>
                    )}
                </div>
            </div>
        )
    }
}

const TypeColors = {
    bug: '#729f3f',
    dragon: '#53a4cf',
    fairy: '#fdb9e9',
    fire: '#fd7d24',
    ghost: '#7b62a3',
    ground: '#f7de3f',
    normal: '#a4acaf',
    pyschic: '#f366b9',
    steel: '#9eb7b',
    dark: '#707070',
    electric: '#eed535',
    fighting: '#d56723',
    flying: '#3dc7ef',
    grass: '#9bcc50',
    ice: '#51c4e7',
    poison: '#b97fc9',
    rock: '#a38c21',
    water: '#4592c4'
}



export default PokeList