import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cities from "../lib/citylist.json";
import { City } from '../pages';
import { useRouter } from 'next/router';

ChartJS.register(...registerables);

interface FormComponentProps {
    index: number;
    onSave: boolean;
}

const WeatherForm = ({ index, onSave }: FormComponentProps) => {
    const router = useRouter();

    const { long, lat, city: paramsCity, start_date, end_date, included_data
    } = router.query;

    const [latitude, setLatitude] = useState<number>(lat ? parseFloat(lat as string) : 0);
    const [longitude, setLongitude] = useState<number>(long ? parseFloat(long as string) : 0);
    const [city, setCity] = useState<string>(paramsCity as string || '');
    const [selectedCity, setSelectedCity] = useState<City>({
        name: paramsCity as string || "", coord: { lat: lat ? parseFloat(lat as string) : 0, lon: long ? parseFloat(long as string) : 0 }, id: -1,
        state: "",
        country: "",
    });
    const [temperature, setTemperature] = useState<boolean>(included_data?.includes("Tempreature") || false);
    const [humidity, setHumidity] = useState<boolean>(included_data?.includes("humidity") || false);
    const [startDate, setStartDate] = useState<Date>(start_date ? new Date(start_date as string) : new Date());
    const [endDate, setEndDate] = useState<Date>(end_date ? new Date(end_date as string) : new Date());
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [cityresults, setCityResults] = useState<City[]>([]);


    const onChangeDate = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleLatitudeChange = (event: React.ChangeEvent<any>) => {
        setLatitude(event.target.value);
    };

    const handleLongitudeChange = (event: React.ChangeEvent<any>) => {
        setLongitude(event.target.value);
    };

    const handlecityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCity(value)
        let matchingCities: City[] = [];
        if (value.length > 3) {
            for (let city of cities as City[]) {
                if (matchingCities.length >= 5) {
                    break;
                }
                const match = city.name.toLowerCase().startsWith(value.toLowerCase());
                if (match) {
                    const cityData = {
                        ...city,
                        coord: city.coord
                    }
                    matchingCities.push(cityData);
                }
            }
        }
        setCityResults(matchingCities);
    };

    const handleSelectedCityChange = (selectedSingleCity: City) => {
        setCity(selectedSingleCity.name)
        setSelectedCity(selectedSingleCity)
        setCityResults([])
        setLatitude(selectedSingleCity.coord.lat)
        setLongitude(selectedSingleCity.coord.lon)
    }

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
                const response = await axios.get(url);
                const labels = response.data.hourly.time.map((date: string | number | Date) => new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' }) + ' ' + new Date(date).toLocaleString('en-US', { weekday: 'short' }));
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
                setData({ labels, datasets }  as any);
            } catch (error) {
                console.error(error);
            }
        };
        fetchWeatherData();
    }, [latitude, longitude, temperature, humidity, city, startDate, endDate]);


    useEffect(() => {
        if (onSave) {
            const ScreenShot = localStorage.getItem("screenshot") ? JSON.parse(localStorage.getItem("screenshot") as string) : []
            ScreenShot.push({
                city: selectedCity,
                IncludedData: temperature && humidity ? 'Tempreature, humidity' : (temperature ? "Tempreature" : 'humidity'),
                location: longitude + ',' + latitude,
                DateRange: startDate.toLocaleDateString('en-US', { year: 'numeric', day: 'numeric', month: 'numeric' }) + "-" + endDate.toLocaleDateString('en-US', { year: 'numeric', day: 'numeric', month: 'numeric' }),
                startDate: startDate,
                endDate: endDate,
                CreationDate: new Date().toLocaleDateString('en-US', { year: 'numeric', day: 'numeric', month: 'numeric' }),
            })
            localStorage.setItem("screenshot", JSON.stringify(ScreenShot));
        }
    }, [onSave])

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
                            placeholder="Enter/search city"
                            value={city}
                            onChange={handlecityChange}
                        />
                        <ul className='absolute z-10 w-1/10 mt-1 bg-white rounded-md shadow-sm '>
                            {city.length > 3 && cityresults.length > 0 ? (
                                cityresults.map((singleCity) => (
                                    <li key={singleCity.id} onClick={() => handleSelectedCityChange(singleCity)} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900" >
                                        <span>{singleCity.name}
                                            {singleCity.state ? `, ${singleCity.state}` : ""}{" "}
                                            ({singleCity.country})
                                            ({singleCity.coord.lat + ',' + singleCity.coord.lon})
                                        </span>
                                    </li>
                                ))
                            ) : (city.length > 0 && selectedCity.name !== city &&
                                <li className="search__no-results">NO results</li>
                            )}
                        </ul>

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
                                isClearable
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
