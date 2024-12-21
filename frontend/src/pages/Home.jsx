import React from 'react';
import Hero from "../components/Hero";
import Events from "./Events";

function Home() {
  return (
    < >
      <Hero />
      <section className='flex flex-col wrapper my-8 gap-8 md:gap-12'>
        <h2 className='font-bold text-4xl'>Trusted By <br />Thousands of Evnets.</h2>
      </section>
      <Events />
    </>
  )
}

export default Home