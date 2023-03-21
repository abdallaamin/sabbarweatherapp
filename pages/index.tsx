import type { NextPage } from 'next'
import DataInput from '../components/DataInput'


const Home: NextPage = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className='pt-6'>
        <h1 className="font-bold text-lg">Select coordinates or city </h1>
        <DataInput />
        <div className='flex justify-end pt-4'>
          <button className="w-1/12 rounded-lg bg-orange-200" onClick={()=> console.log("its clicked add another city ")}>+</button>
        </div>
        <div className='flex justify-end pt-4'>
          <button className="w-1/6 rounded-lg bg-gray-600" onClick={() => console.log("saved to repoprt")}>Save</button>
        </div>
      </div>
      
    </div>
  )
}

export default Home
