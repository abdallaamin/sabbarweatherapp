import { useState, useLayoutEffect } from 'react'
import type { NextPage } from 'next'
import FormInput from '../components/FormInput'

interface ComponentData {
  id: number;
}
export interface City {

  id: number,
  name: string,
  state: string,
  country: string,
  coord: {
    lon: number,
    lat: number

  }
}
const Home: NextPage = () => {
  const [save, setSave] = useState<boolean>(false);
  const [components, setComponents] = useState<ComponentData[]>([]);

  const addComponent = () => {
    const newId = components.length + 1;
    const newComponent: ComponentData = {
      id: newId,
    };
    setComponents([...components, newComponent]);
  };

  const handelSave = () => {
    setSave(!save)
  }
  return (
    <div className="flex justify-center h-screen">
      <div className='pt-6'>
        <h1 className="font-bold text-lg">Select coordinates or city </h1>
        <FormInput  index={0} onSave={save} />
        <div className="flex justify-center "></div>
        {components.map((component) => (
          <div className="mx-auto " key={component.id}>
            <FormInput key={component.id} index={component.id} onSave={save} />
          </div>
        ))}

        <div className='flex justify-end '>
          <button className="w-1/12 rounded-lg bg-orange-200" onClick={addComponent}>+</button>
          <button className="w-1/6 rounded-lg bg-gray-600 hover:bg-black text-white" onClick={handelSave}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Home
