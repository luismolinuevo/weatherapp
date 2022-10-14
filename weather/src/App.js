import React, {useState} from "react";
import axios from 'axios'


function App() {
    const[data, setData] = useState({});
    const[location, setLocation] = useState('');
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=1249a618d3f551c62a78b65a42248314`

    const getLocation = (event) => {
        if(event.key === "Enter") {    //if enter is clicked
            axios.get(url).then((res) => {   //gets the res from the api
                setData(res.data)   //sets data state to the data that was fetched
                console.log(res.data)
            })
            
            

            setLocation(''); //this clears it out
        }
    }


    return (
        <div className = "main">
            <div className = "search">
                <input 
                    value = {location}
                    onChange = {event => setLocation(event.target.value)}
                    onKeyPress = {getLocation}
                    placeholder = "Enter Location"
                    type= "text"
                />
            </div>
        <div className = "container">
            <div className = "above">
                <div className = "location">
                    <p>{data.name}</p>
                </div>
                <div className="temp">
                 {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
             </div>
                <div className="description">
                    {data.weather ? <p>{data.weather[0].description}</p> : null}
                </div>
            </div>
            
            

            {data.name !== undefined &&
                <div className="bottom">
                    <div className="feels">
                        {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                        <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                        {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                        <p>Wind Speed</p>
                    </div>
                </div>
            }
            
        </div>
    </div>
    )
}

export default App;