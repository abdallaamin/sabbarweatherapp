import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(...registerables);

interface FormComponentProps {
    index: number;
}




const WeatherForm = ({ index, }: FormComponentProps) => {
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [city, setCity] = useState<string>('');
    const [temperature, setTemperature] = useState<boolean>(false);
    const [humidity, setHumidity] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [data, setData] = useState({  labels: [] , datasets: [] });


    

    const onChangeDate = (dates:any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLatitude(event.target.value);
    };

    const handleLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLongitude(event.target.value);
    };

    const handlecityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };
    const handleTemperatureChange = () => {
        setTemperature(!temperature);
    };

    const handleHumidity2Change = () => {
        setHumidity(!humidity);
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&city=${city}&hourly=${temperature ? 'temperature_2m' : ''}${humidity ? ',relativehumidity_2m' : ''}&start_date=${startDate.toISOString().slice(0, 10)}&end_date=${endDate.toISOString().slice(0, 10)}`
                console.log(url)
                const response = await axios.get(url);
                const labels = response.data.hourly.time.map(date => new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' }) + ' ' + new Date(date).toLocaleString('en-US', { weekday: 'short' }));
                console.log(labels)
                const temperatureData = response.data.hourly.temperature_2m;
                const humidityData = response.data.hourly.relativehumidity_2m;

                const datasets = [];

                if (temperature) {
                    datasets.push({
                        label: 'Temperature',
                        data: temperatureData,
                        fill: true,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,

                    });
                }

                if (humidity) {
                    datasets.push({
                        label: 'Humidity',
                        data: humidityData,
                        fill: true,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1,
                    });
                }

                setData( {  labels ,datasets} );
            } catch (error) {
                console.error(error);
            }
        };
        fetchWeatherData();

    }, [latitude, longitude, temperature, humidity, city, startDate, endDate]);



    return (
        <>
        <div className="flex flex-col justify-center pt-5">
            <div className="flex flex-row w-full  max-w-full" key={index}>
                <div className="w-1/2 pr-4" >
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="input1">
                        Latitude
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="input1"
                        type="number"
                        placeholder="Enter Latitude"
                        value={latitude}
                        onChange={handleLatitudeChange}
                    />
                </div>

                <div className="w-1/2 pr-4">
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="input2">
                        Longitude
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="input2"
                        type="number"
                        placeholder="Enter Longitude"
                        value={longitude}
                        onChange={handleLongitudeChange}
                    />
                </div>

                <div className="w-1/2 pr-4">
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="input3">
                        City
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="input3"
                        type="text"
                        placeholder="Enter/search city"
                        value={city}
                        onChange={handlecityChange}
                    />
                </div>

                <div className="w-1/2">
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="input4">
                        Date Range
                    </label>
                    <div>
                    <DatePicker
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        selected={startDate}
                        onChange={onChangeDate}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        //isClearable
                    />
                    </div>
                </div>
            </div>
            <div className="flex flex-row w-1/2 mb-4 mt-3">
                <div className="w-1/2">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-black"
                            checked={temperature}
                            onChange={handleTemperatureChange}
                        />
                        <span className="ml-2 text-gray-700">Temperature </span>
                    </label>
                </div>
                <div className="w-1/2">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600"
                            checked={humidity}
                            onChange={handleHumidity2Change}
                        />
                        <span className="ml-2 text-gray-700">Relative Humidity</span>
                    </label>
                </div>
                <div className='flex justify-end pt-4'>
                    <button className="w-full rounded-lg bg-gray-600 hover:bg-black text-white" onClick={() => console.log("saved to repoprt")}>Save</button>
                </div>
            </div>
        </div>
            <div className="flex justify-center">
                <div className="w-3/4 h-1/2">
                    <Line data={data} />
                </div>
            </div>
        </>
    );
};

export default WeatherForm;
