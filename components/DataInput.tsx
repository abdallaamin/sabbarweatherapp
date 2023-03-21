import { useState } from 'react';

const MyPage = () => {
    const [Latitude, setLatitude] = useState('');
    const [Longitude, setLongitude] = useState('');
    const [city, setCity] = useState('');
    const [DateRange, setDateRange] = useState('');
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);

    const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLatitude(event.target.value);
    };

    const handleLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLongitude(event.target.value);
    };

    const handlecityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const handleDateRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange(event.target.value);
    };
    const handleCheckbox1Change = () => {
        setCheckbox1(!checkbox1);
    };

    const handleCheckbox2Change = () => {
        setCheckbox2(!checkbox2);
    };

    return (
        <div className="flex flex-col justify-center pt-5">
            <div className="flex flex-row w-full  max-w-full">
                <div className="w-1/2 pr-4">
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="input1">
                        Latitude
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="input1"
                        type="number"
                        placeholder="Enter Latitude"
                        value={Latitude}
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
                        value={Longitude}
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
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="input4"
                        type="date"
                        placeholder="Enter Date range"
                        value={DateRange}
                        onChange={handleDateRangeChange}
                    />
                </div>
            </div>
            <div className="flex flex-row w-1/2 mb-4 mt-3">
                <div className="w-1/2">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-black"
                            checked={checkbox1}
                            onChange={handleCheckbox1Change}
                        />
                        <span className="ml-2 text-gray-700">Temperature </span>
                    </label>
                </div>
                <div className="w-1/2">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600"
                            checked={checkbox2}
                            onChange={handleCheckbox2Change}
                        />
                        <span className="ml-2 text-gray-700">Relative Humidity</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
