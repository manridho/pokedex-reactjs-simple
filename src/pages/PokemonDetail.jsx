import React from 'react'
import Axios from 'axios'
import { Container, Tabs, Tab, Badge } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import PageTitle from '../components/pageTitle'

class PokeDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonCont: null,
            isLoadingDetail: false,
            pokeName: "",
            pokeImgUrl: "",
            key: "home",
            pokeSpecies: "",
            pokeStat: {
                hp: "",
                attack: "",
                defense: "",
                spAttack: "",
                spDefense: ""
            },
            pokeHeight: "",
            pokeWeight: "",
            pokeAbilities: "",
            types: [],
            pokeMoves: [],
            pokeColor: "",
            urlEvolve: "",
            evo1: "",
            evo2: "",
            evo3: "",
        }
    }
    //Get Pokemon Info
    fetchData = () => {
        const idPokemon = this.props.location.search.substring(1)
        this.setState({ isLoadingDetail: true })
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
            .then((res) => {
                // console.log("detail idPokemon", res.data)
                this.setState({
                    pokeName: res.data.name.toLowerCase().split('-')
                        .map(x => x.charAt(0).toUpperCase() + x.substring(1))
                        .join(' '),
                    pokeImgUrl: res.data.sprites.other.dream_world.front_default,
                    pokeHeight: Math.round((res.data.height * 0.328084 + 0.00001) * 100) / 100 + " ft" + " or " + res.data.height / 10 + " m",
                    pokeWeight: Math.round((res.data.weight * 0.220462 + 0.00001) * 100) / 100 + " lbs" + " or " + res.data.weight / 10 + " kg",
                    types: res.data.types.map(type => type.type.name),
                    pokeAbilities: res.data.abilities.map(ability => {
                        return ability.ability.name
                            .toLowerCase().split('-')
                            .map(x => x.charAt(0).toUpperCase() + x.substring(1))
                            .join(' ')
                    }).join(', '),
                    pokeStat: {
                        hp: res.data.stats[0].base_stat,
                        attack: res.data.stats[1].base_stat,
                        defense: res.data.stats[2].base_stat,
                        spAttack: res.data.stats[3].base_stat,
                        spDefense: res.data.stats[4].base_stat
                    },
                    pokeMoves: res.data.moves.map(move => move.move.name),
                    pokeColor: `${TypeColors[res.data.types[0].type.name]}`
                })
            })
            .catch((err) => { console.log("err-detail-idPoke", err) })

        //get species
        const pokeSpeciesLink = `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`
        Axios.get(pokeSpeciesLink)
            .then((res) => {
                // console.log("species", res.data)
                this.setState({
                    pokeSpecies: res.data.egg_groups.map(egg => {
                        return egg.name
                            .toLowerCase().split('-')
                            .map(x => x.charAt(0).toUpperCase() + x.substring(1))
                            .join(' ')
                    }).join(', '),
                    urlEvolve: res.data.evolution_chain.url,
                    isLoadingDetail: false
                })
                Axios.get(this.state.urlEvolve)
                    .then((res) => {
                        console.log("get-evolve", res.data)
                        this.setState({
                            evo1: res.data.chain.species,
                            evo2: res.data.chain.evolves_to[0].species,
                            evo3: res.data.chain.evolves_to[0].evolves_to[0].species
                        })
                    })
                    .catch((err) => { console.log("err-get-evolve", err) })
            })
            .catch((err) => { console.log("err-get-species", err) })



    }

    componentDidMount() {
        // console.log(this.props.location.search.substring(1))
        this.fetchData()
    }


    render() {
        console.log("state", this.state.evo3)
        return (
            <div>
                <NavigationBar />
                <PageTitle pageTitle="Pokemon Detail" />
                <div >
                    <Container style={{ backgroundColor: `${this.state.pokeColor}`, height: '100%', width: '100%', borderRadius: '20px', }}>
                        <div className="m-2" style={{ textAlign: 'center' }}>

                            {this.state.isLoadingDetail && <h5>Loading Data...</h5>}

                            <h4 className="m-1">
                                {this.state.types.map((item, index) => {
                                    return (
                                        <Badge pill bg="dark" className="m-2" key={index}>
                                            {item}
                                        </Badge>
                                    )
                                })}
                            </h4>

                            <img style={{ width: '300px', height: '300px', borderRadius: '15px' }} src={this.state.pokeImgUrl} />

                            <h3 className="m-1"><strong>{this.state.pokeName}</strong></h3>

                        </div>

                        <Tabs eventKey="home" onSelect={(x) => this.setState({ key: x })}>
                            <Tab className="m-2" eventKey="home" title="About" >
                                <div >
                                    <div className="row align-items-center m-1">
                                        <div className={`col-12 col-md-3`}>
                                            <strong>Species</strong>
                                        </div>
                                        <div className={`col-12 col-md-9`}>
                                            {this.state.pokeSpecies}
                                        </div>
                                    </div>

                                    <div className="row align-items-center m-1">
                                        <div className={`col-12 col-md-3`}>
                                            <strong>Height</strong>
                                        </div>
                                        <div className={`col-12 col-md-9`}>
                                            {this.state.pokeHeight}
                                        </div>
                                    </div>

                                    <div className="row align-items-center m-1">
                                        <div className={`col-12 col-md-3`}>
                                            <strong>Weight</strong>
                                        </div>
                                        <div className={`col-12 col-md-9`}>
                                            {this.state.pokeWeight}
                                        </div>
                                    </div>

                                    <div className="row align-items-center m-1">
                                        <div className={`col-12 col-md-3`}>
                                            <strong>Abilities</strong>
                                        </div>
                                        <div className={`col-12 col-md-9`}>
                                            {this.state.pokeAbilities}
                                        </div>
                                    </div>
                                </div>


                            </Tab>
                            <Tab eventKey="profile1" title="Base Stats">
                                <div className="row align-items-center m-1">
                                    <div className={`col-12 col-md-3`}>
                                        <strong>HP</strong>
                                    </div>
                                    <div className={`col-12 col-md-9`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: `${this.state.pokeStat.hp}%`, backgroundColor: `#FF000F` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>{this.state.pokeStat.hp}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center m-1">
                                    <div className={`col-12 col-md-3`}>
                                        <strong>Attack</strong>
                                    </div>
                                    <div className={`col-12 col-md-9`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: `${this.state.pokeStat.attack}%`, backgroundColor: `#BB9400` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>{this.state.pokeStat.attack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center m-1">
                                    <div className={`col-12 col-md-3`}>
                                        <strong>Defense</strong>
                                    </div>
                                    <div className={`col-12 col-md-9`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: `${this.state.pokeStat.defense}%`, backgroundColor: `#0015FF` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>{this.state.pokeStat.defense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center m-1">
                                    <div className={`col-12 col-md-3`}>
                                        <strong>Sp.Atk</strong>
                                    </div>
                                    <div className={`col-12 col-md-9`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: `${this.state.pokeStat.spAttack}%`, backgroundColor: `#000000` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>{this.state.pokeStat.spAttack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center m-1">
                                    <div className={`col-12 col-md-3`}>
                                        <strong>Sp.Def</strong>
                                    </div>
                                    <div className={`col-12 col-md-9`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: `${this.state.pokeStat.spDefense}%`, backgroundColor: `#700060` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>{this.state.pokeStat.spDefense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>

                            {this.state.evo1 === "" && this.state.evo3 === "" && this.state.evo2 === ""
                                ?
                                null
                                :
                                <Tab eventKey="profile2" title="Evolution">
                                    <div className="row align-items-center m-1">

                                        <div className={`col-12 col-md-3`}>
                                            <strong>Evolve - 1</strong>
                                        </div>
                                        <div className={`col-12 col-md-9`}>
                                            <Badge>{this.state.evo1.name}</Badge>{" "}
                                            <Badge>{`#${this.state.evo1.url.split('/')[this.state.evo1.url.split('/').length - 2]}`}</Badge>
                                        </div>

                                        <div className={`col-12 col-md-3`}>
                                            <strong>Evolve - 2</strong>
                                        </div>
                                        <div className={`col-12 col-md-9 `}>
                                            <Badge>{this.state.evo2.name}</Badge>{" "}
                                            <Badge>{`#${this.state.evo2.url.split('/')[this.state.evo2.url.split('/').length - 2]}`}</Badge>
                                        </div>

                                        <div className={`col-12 col-md-3`}>
                                            <strong>Evolve - 3</strong>
                                        </div>
                                        <div className={`col-12 col-md-9`}>
                                            <Badge>{this.state.evo3.name}</Badge>{" "}
                                            <Badge>{`#${this.state.evo3.url.split('/')[this.state.evo3.url.split('/').length - 2]}`}</Badge>
                                        </div>

                                    </div>
                                </Tab>
                            }

                            <Tab eventKey="profile3" title="Moves">
                                <div className="m-1">
                                    {this.state.pokeMoves.map((item, index) => {
                                        return (
                                            <Badge pill bg="secondary" className="m-1" key={index}>
                                                {item}
                                            </Badge>
                                        )
                                    })}
                                </div>
                            </Tab>
                        </Tabs>
                    </Container>
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

export default PokeDetail