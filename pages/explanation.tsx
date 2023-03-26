import React from 'react';



const SlideShow = () => {
  return (
    <>
      <div className='flex flex-col justify-center m-5 pt-5'>
        <h1 style={{ fontSize: 25, fontWeight: 'bold' }}>Hello There good people of Sabbar
          <h2>please have a look at this presentation as I put all the explanantion , Architecture , thoughts and the process into it </h2></h1>
      <iframe className='flex justify-center pt-5' src="https://docs.google.com/presentation/d/e/2PACX-1vQm8wc_4ZsDUhhi8ZGtKL4ybKsU9Ot8p6ngWyRkSCgy1hz6zHZRatF6WWaw1Mzz5PnmP5vK2dFoYD7R/embed?start=true&loop=true&delayms=3000"  width="960" height="569" ></iframe>
      </div>
      </>
  );
}
export default SlideShow;