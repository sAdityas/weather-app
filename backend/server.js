const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;


app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    if(!city) return    res.status(400).send({ message: 'City is required' });

    
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
        
    console.log('City received:', city);
    console.log('Request URL:', url);

    try{
        const response = await axios.get(url);
        res.json(response.data);
    }catch(error){
        res.status(400).json({ message: 'City not found' });
    }
});



app.listen(port, () =>  console.log(`Server running on port ${port}`));
