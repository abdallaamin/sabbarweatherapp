import React  from 'react'
// import cities from "../lib/citylist.json";

type Props = {}

const citylist = (props: Props) => {
    // const [cities, setCities] = useState<City[]>([])

    // let cityList = cities.map((city) => {
  return (
      <table className=" align-center w-full border-collapse border border-gray-200 m-15 p-10">
          <thead>
              <tr className="bg-gray-50">
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cities</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longtitude</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
              </tr>
          </thead>
           <tbody className="bg-white divide-y divide-gray-200">
              {/* {cities.map((city )=> (
                  <tr key={city.id}>
                      {/* <td className="border px-4 py-2">{indx + 1}</td>}
                      <td className="border px-4 py-2">{city.name}</td>
                      <td className="border px-4 py-2">{city.coord.long}</td>
                      <td className="border px-4 py-2">{city.coord.lat}</td>
                      <td>
              </td> 
          </tr>
          ))}*/}
              
          </tbody> 
      </table>
  )
}

export default citylist