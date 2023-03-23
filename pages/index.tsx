import { useState, useLayoutEffect } from 'react'
import type { NextPage } from 'next'
import FormInput from '../components/FormInput'
interface ComponentData {
  id: number;
}
const Home: NextPage = () => {
  // const [addNew, setaddNew] = useState<boolean>(false);
  const [components, setComponents] = useState<ComponentData[]>([]);

  const addComponent = () => {
    const newId = components.length + 1;
    const newComponent: ComponentData = {
      id: newId,
    };
    setComponents([...components, newComponent]);
  };


  return (
    <div className="flex justify-center h-screen">
      <div className='pt-6'>
        <h1 className="font-bold text-lg">Select coordinates or city </h1>
        <FormInput  />
        <div className="flex justify-center "></div>
          <button className="w-1/12 rounded-lg bg-orange-200" onClick={addComponent}>+</button>
          {components.map((component) => (
            <div className="mx-auto " key={component.id}>
              <FormInput key={component.id} index={component.id} />
              </div>
          ))}
        <div className='flex justify-end pt-4'>
          <button className="w-1/6 rounded-lg bg-gray-600 hover:bg-black text-white" onClick={() => console.log("saved to repoprt")}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Home
