import React, { useState, useEffect } from "react";
import Axios from "axios";
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, LineElement, PointElement
}from "chart.js"
import { Bar, Pie, Line } from 'react-chartjs-2'
import "./visualizeStyle.css"

ChartJS.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, LineElement, PointElement
)

function Visualize() {
    const [generationArray, setGenerationArray] = useState([])
    const [generationCountArray, setGenerationCountArray] = useState([]);

    const [typeArray, setTypeArray] = useState([])
    const [typeCountArray, setTypeCountArray] = useState([]);

    const [highscoreArray, setHighscoreArray] = useState([])
    const [highscoreCountArray, setHighscoreCountArray] = useState([]);

    const [typenameArray, setTypenameArray] = useState([])
    const [typenameCountArray, setTypenameCountArray] = useState([]);

    const getGeneration = async () => {
        try {
        const generation_response = await Axios.get(`https://api.keysclap.com/generation`);
        const generation_newData = generation_response.data;
        console.log(generation_newData)
        const generations = generation_newData.map(item => item.generation);
        const counts = generation_newData.map(item => item['COUNT(generation)']);
        
        setGenerationArray(generations);
        setGenerationCountArray(counts);

        } catch (error) {
        console.error('Error fetching Pokémon:', error);
        }
    };

    const getType = async () => {
        try {
            const type_response = await Axios.get(`https://api.keysclap.com/type`);
            const type_newData = type_response.data;
            console.log(type_newData)
            const types = type_newData.map(item => item.type_number);
            const types_counts = type_newData.map(item => item['COUNT(type_number)']);

            setTypeArray(types);
            setTypeCountArray(types_counts);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            }
    };

    const getHighscore = async () => {
        try {
            const highscore_response = await Axios.get(`https://api.keysclap.com/highscore`);
            const highscore_newData = highscore_response.data;
            const highscores = highscore_newData.map(item => item.name);
            const highscore_counts = highscore_newData.map(item => Number(item.total_points));

            setHighscoreArray(highscores);
            setHighscoreCountArray(highscore_counts);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            }
    };

    const getTypeName = async () => {
        try {
            const typename_response = await Axios.get(`https://api.keysclap.com/type_name`);
            const typename_newData = typename_response.data;
            const typenames = typename_newData.map(item => item.type);
            const typename_counts = typename_newData.map(item => Number(item.count));

            setTypenameArray(typenames);
            setTypenameCountArray(typename_counts);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            }
    };

    useEffect(() => {
        getGeneration();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getType();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getHighscore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getTypeName();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generation_data = {
        labels: generationArray,
        datasets: [
            {
                label: 'Data Count by Generation',
                data: generationCountArray,
                backgroundColor: 'aqua',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    }
    const generation_options = {
    }


    const type_data = {
        labels: typeArray,
        datasets: [
            {
                label: 'Data Count by Type',
                data: typeCountArray,
                backgroundColor: ['orange', 'green'],
            }
        ]
    }
    const type_options = {
    }

    const highscore_data = {
        labels: highscoreArray,
        datasets: [
            {
                label: 'TOP 5 Pokemon with Highest Score',
                data: highscoreCountArray,
                backgroundColor: 'brown',
            }
        ]
    }
    const highscore_options = {
    }

    const typename_data = {
        labels: typenameArray,
        datasets: [
            {
                label: 'Data Count by Type Names',
                data: typenameCountArray,
                backgroundColor: 'brown',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    }
    const typename_options = {
    }


  return (
    <div>
        <div style={{ textAlign: 'center' }}>
            <p>Data Visualization</p>
        </div>
        <a className="back_button" href="/">Back</a>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="outside">
            <Bar className="generation_bar" data={generation_data} options={generation_options}/>
            </div>
            <div className="outside-1">
                <Pie className="type_pie" data={type_data} options={type_options}/>
            </div>
            
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="outside-2">
                    <Line className="highscore_doughnut" data={highscore_data} options={highscore_options}/>
                </div>
                <div className="outside-3">
                    <Bar className="typename_bar" data={typename_data} options={typename_options}/>
                </div>
            </div>
        </div>
        
        
    </div>

    
  )
}

export default Visualize