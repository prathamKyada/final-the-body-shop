import React from 'react'
import hero_img from "../assets/img/about.jpg"; // Adjust the path based on your project structure

function about() {
    return (
      <div className="relative w-full  ">

      <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 text-[#004236]">
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F3E8] to-[#F8FBFF]" />
  
        <div className="relative z-10 w-full flex flex-col justify-between md:flex-row items-center gap-8 text-left px-6 md:px-16 lg:px-24">
                  {/* Right Side*/}
                  <div className="hidden md:flex justify-end w-1/2 ">
            <img
              src={hero_img}
              alt="Girl using soap"
              className="rounded-l-full w-full  h-full object-cover  "
            />
          </div>
          {/* Left Side  */}
          <div className="max-w-xl animate-fade-in md:w-1/2">
          <p className="text-[#05a88d] text-lg md:text-2xl font-serif font-semibold leading-tight mb-5 uppercase">OUR STORY</p>
            <h1 className="text-xl md:text-3xl font-serif font-semibold leading-tight mb-6">
            WELCOME TO THE BODY SHOP.
            </h1>
            <p className="text-lg  mb-6">
            Our story started in Brighton, England in 1976. It began with our founder, Dame Anita Roddick, and her belief in something revolutionary: that business could be a force for good. Following her vision, we’ve been rule breaking, never faking and change making for over 40 years.
            </p>

          </div>
  

        </div>
        
      </section>
    
    </div>
      );
}

export default about
