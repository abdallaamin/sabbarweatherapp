import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { City } from '.';
import { AiOutlineDelete } from 'react-icons/ai'
import { GrView } from 'react-icons/gr'

type ReportData = {
    city: City,
    DateRange: String,
    startDate: Date,
    endDate: Date,
    CreationDate: Date,
    IncludedData: string,
    location: string
}


const Reports = () => {
    const [data, setData] = useState<ReportData[]>([]);
    const router = useRouter();

    // retrieve data array from local storage on component mount
    useEffect(() => {
        const screenShots = localStorage.getItem('screenshot') ? JSON.parse(localStorage.getItem('screenshot') as string) : [];
        console.log("screentshots: ", screenShots);
        setData(screenShots);
    }, []);

    const handleClick = (screenshot: ReportData) => {
        const city = screenshot.city;
        router.push(`/?long=${city.coord.lon}&lat=${city.coord.lat}&city=${city.name}&start_date=${screenshot.startDate}&end_date=${screenshot.endDate}&included_data=${screenshot.IncludedData}`);

    };

    const handleDelete = (screenshot: ReportData) => {
        const screenShots = localStorage.getItem('screenshot') ? JSON.parse(localStorage.getItem('screenshot') as string) : [];
        const newScreenShots = screenShots.filter((s: ReportData) => s.city.id !== screenshot.city.id);
        localStorage.setItem('screenshot', JSON.stringify(newScreenShots));
        setData(newScreenShots);
    };

    return (
        <table className="w-full border-collapse border border-gray-200 p-10 m-5">
            <thead>
                <tr className="h-1/2 bg-orange-200">
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cities</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Included Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude & Longtitude</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creation Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">options</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((screenshot: ReportData, indx) => (
                    <tr key={indx + 1}>
                        {/* <td className="border px-4 py-2">{indx + 1}</td> */}
                        <td className="border px-3 py-2">{screenshot.city.name}</td>
                        <td className="border px-3 py-2">{screenshot.IncludedData}</td>
                        <td className="border px-3 py-2">{screenshot.location}</td>
                        <td className="border px-3 py-2">{screenshot.DateRange}</td>
                        <td className="border px-3 py-2">{screenshot.CreationDate.toString()}</td>
                        <td>
                            <div className='flex flex-row p-3 m-3'>
                                <button className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(screenshot)}>
                            <AiOutlineDelete/>
                            </button>
                            <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleClick(screenshot)}>
                            <GrView/>
                            </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Reports;
