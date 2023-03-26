import React from 'react';
import ReactGoogleSlides from "react-google-slides";

interface ReactGoogleSlidesProps {
  slidesLink: string;
  loop?: boolean;
  slideDuration?: number;
  showControls?: boolean;
  position?: number;
  height?: string | number;
  width?: string | number;
  containerStyle?: object;
  slideStyle?: object;
};

const SlideShow = (ReactGoogleSlidesProps: ReactGoogleSlidesProps) => {
  return (
    <>
      <div className='flex w-full justify-center align-center pt-5'>
      <h1 style={{fontSize:25 , fontWeight:'bold'}}>Hello There good people of Sabbar  
          <h2>please have a look at this presentation as I put all the explanantion , Architecture , thoughts and the process into it </h2></h1>

      
    </div>
    <div className='flex  w-full justify-center item-center align-center pt-15'>
    <ReactGoogleSlides
      width={1140}
      height={680}
      slidesLink="https://docs.google.com/presentation/d/1OlB-iclkzQjHiRCqf1SQCIva8nvpg69EUVrxSO5tHG8/edit?usp=sharing"
      slideDuration={5}
      position={1}
      showControls
      loop
    />
    </div>
    </>
  );
}
export default SlideShow;