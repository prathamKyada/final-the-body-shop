import React from "react";
import categoryImage from "../assets/img/cat.jpeg"; // Right-side image
import bodyLotion from "../assets/img/lotion.png"; // Category icons
import lipBalm from "../assets/img/face/Himalayan Charcoal Mask.png";
import makeup from "../assets/img/mak.png";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Body Lotion",
    description: "Hydrate and nourish your skin with our premium body lotions.",
    image: bodyLotion,
  },
  {
    id: 2,
    name: "Faces",
    description: "Keep your lips soft and moisturized with natural ingredients.",
    image: lipBalm,
  },
  {
    id: 3,
    name: "Makeup",
    description: "Enhance your beauty with our safe and high-quality makeup.",
    image: makeup,
  },
];

const CategoriesSection = () => {
  return (
    <div className="relative w-full pb-24 bg-[#FFFDF5] overflow-hidden">
             <div className="container mx-auto max-w-[1320px]">

      <div className=" flex flex-col md:flex-row items-center">
        
        {/* Left Side */}
        <div className="w-full lg:w-1/2 ">
          <div className="text-center lg:text-left">
          <h2 className="md:text-4xl text-3xl text-prime font-serif font-semibold text-brand-600 pt-10 relative inline-block">
              Explore Our Categories
            </h2>
            <p className="text-[16px] md:text-lg text-prime lg:max-w-lg">
              Discover a range of premium self-care products designed for your beauty and wellness needs.
            </p>
            <div className="w-24 h-1 bg-brand-400 rounded mt-4"></div>
          </div>

          {/* Category List */}
          <div className="space-y-6">
  {categories.map((category) => (
   <a href="/shop"
   key={category.id}
   className="group flex items-center p-4 bg-[#ECFADC] rounded-lg shadow-md border border-gray-100 
              hover:bg-[#216F41] hover:text-white hover:shadow-lg transition-all duration-300"
 >
   {/* Category Icon */} 
   <div className="flex items-center justify-center rounded-full overflow-hidden">
     <img src={category.image} alt={category.name} className="w-20 h-20 object-contain" />
   </div>
 
   {/* Category Info */}
   <div className="flex-1  mx-2 md:mx-4">
     <h3 className="text-lg font-medium text-brand-600 group-hover:text-white">{category.name}</h3>
     <p className="text-sm text-gray-600 group-hover:text-white">{category.description}</p>
   </div>
 
   {/* Arrow Icon */}
   <div className="w-8 h-8 bg-[#216F41] rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white">
     <ChevronRight className="w-6 h-6 text-white transition-all duration-300 group-hover:text-[#216F41]" />
   </div>
 </a>
 
  ))}
</div>

        </div>

        {/* Right Side*/}
        <div className="  lg:w-1/2 flex justify-end mt-12 lg:mt-0">
          <img src={categoryImage} alt="Category" className="max-w- p-10 h-2/5 rounded-t-full  object-contain" />
        </div>

      </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
