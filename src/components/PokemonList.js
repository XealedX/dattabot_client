import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./ListStyle.css";

const PokemonTable = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 22;
    const [hasMore, setHasMore] = useState(true);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const CheckLogin = async () => {
        const response = await Axios.get('https://api.keysclap.com/check-login', {withCredentials: true});
        if (response.status === 200 || response.status === 304) {
            setIsLoggedIn(true);
            console.log(isLoggedIn)
        } else {
            setIsLoggedIn(false);
        }
        
    }

    const RemoveCookie = async () => {
        const response = await Axios.get('https://api.keysclap.com/remove_cookie', {withCredentials: true});
        if (response.status === 200 || response.status === 304) {
            setIsLoggedIn(true);
            console.log(isLoggedIn)
        }
    }
    
    const fetchMore = async () => {
        try {
        const response = await Axios.get(`https://api.keysclap.com/pokemon_list?offset=${offset}&limit=${limit}`);
        const newData = response.data;
        if (newData.length === 0) {
            setHasMore(false);
        } else {
            setPokemonData(prevData => [...prevData, ...newData]);
            setOffset(offset + limit);
        }
        } catch (error) {
        console.error('Error fetching Pokémon:', error);
        }
    };

    useEffect(() => {
        fetchMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        CheckLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    const GetPokemonData = async (name) => {
        console.log(`Clicked on ${name}`);
        const clicked_pokemon = name;
        try {
            const response = await Axios.get(`https://api.keysclap.com/pokemon_details?name=${clicked_pokemon}`); // Replace with your endpoint
            const detailsData = response.data;

            setPokemonDetails(detailsData[0]);

            console.log(pokemonDetails)

            setButtonPopup(true);
        } catch (error) {
            console.error('Error fetching Pokémon details:', error);
        }
    };

    
    return (
        <div className="container mt-5">
            <div className="columns">
                <div>
                    {isLoggedIn ? (
                        <div>
                            {/* eslint-disable-next-line */}
                            <a href="/" onClick={RemoveCookie} className="logout">Log Out</a>
                            <a href="/visualize" className="visual">Data Visualization</a>
                        </div>
                    ) : (
                        <a className="reglog" href="/register">Register / Login</a>
                    )}
                </div>
                <div className="column is-centered">
                    <h1>Pokédex</h1>

                    <Popup trigger={buttonPopup}>
                            <h1 className="description">
                                <h2>#{pokemonDetails.pokedex_number}</h2>
                                <h2 className="name">{pokemonDetails.name}</h2>
                                <h2>Base exp {pokemonDetails.base_experience}</h2>
                                <h2>Weight {pokemonDetails.weight_kg}</h2>
                                <h2>Height {pokemonDetails.height_m}</h2>
                            </h1>
                            
                            <h1 className="stats">
                                <h2 className="stat">Stats</h2>
                                <h2>hp {pokemonDetails.hp}</h2>
                                <h2>attack {pokemonDetails.attack}</h2>
                                <h2>defense {pokemonDetails.defense}</h2>
                                <h2>special-attack {pokemonDetails.sp_attack}</h2>
                                <h2>special-defense{pokemonDetails.sp_defense}</h2>
                                <h2>speed {pokemonDetails.speed}</h2>
                            </h1>

                            <h1 className="types">
                                <h2 className="type">Types</h2>
                                <h2>{pokemonDetails.type_1}</h2>
                                <h2>{pokemonDetails.type_2}</h2>
                            </h1>

                            <h1 className="abilities">
                                <h2 className="ability">Abilities</h2>
                                <h2>{pokemonDetails.ability_1}</h2>
                                <h2>{pokemonDetails.ability_2}</h2>
                                <h2>{pokemonDetails.ability_hidden}</h2>
                            </h1>

                            <h1 className="effectiveness">
                                <h2>Type Effectiveness and Weakness</h2>
                                <h2>{pokemonDetails.against_normal}</h2>
                                <h2>{pokemonDetails.against_fire}</h2>
                                <h2>{pokemonDetails.against_water}</h2>
                                <h2>{pokemonDetails.against_electric}</h2>
                                <h2>{pokemonDetails.against_grass}</h2>
                                <h2>{pokemonDetails.against_ice}</h2>
                                <h2>{pokemonDetails.against_fight}</h2>
                                <h2>{pokemonDetails.against_poison}</h2>
                                <h2>{pokemonDetails.against_ground}</h2>
                                <h2>{pokemonDetails.against_flying}</h2>
                                <h2>{pokemonDetails.against_psychic}</h2>
                                <h2>{pokemonDetails.against_bug}</h2>
                                <h2>{pokemonDetails.against_rock}</h2>
                                <h2>{pokemonDetails.against_ghost}</h2>
                                <h2>{pokemonDetails.against_dragon}</h2>
                                <h2>{pokemonDetails.against_dark}</h2>
                                <h2>{pokemonDetails.against_steel}</h2>
                                <h2>{pokemonDetails.against_fairy}</h2>
                            </h1>

                            
                        <h1 className="close-button" onClick={() => setButtonPopup(false)}>Close</h1>
                    </Popup>

                    <InfiniteScroll
                        dataLength={pokemonData.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}>

                        <table className="table is-striped is-bordered mt-2">
                        <tbody>
                            {pokemonData.map((pokemon, index) => (
                            <tr key={index}>
                                <td onClick={() => GetPokemonData(pokemon.name)} style={{ cursor: 'pointer' }}>
                                {pokemon.name}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default PokemonTable;
