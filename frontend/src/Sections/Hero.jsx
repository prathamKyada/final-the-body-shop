import { Leaf, Sparkles, Shield, Recycle } from "lucide-react";
import hero_img from "../assets/img/hero_img.png"; // Adjust the path based on your project structure
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full  ">

    <section className="relative min-h-screen flex items-center overflow-hidden py-32 ">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="Nature background"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#044236]/90 to-[#044236]/70" />
 
      <div className="relative z-10 w-full flex flex-col gap-6 justify-between lg:flex-row items-center md:items-start text-left px-6 md:px-16 lg:px-24">
        {/* Left Side  */}
        <div className="max-w-xl pt-16 animate-fade-in text-white lg:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-snug mb-6">
            Experience the <span className="text-[#05a88d]">Purity</span> of Nature in Every Lather
          </h1>
          <p className="text-[16px] md:text-lg text-white/90 mb-6">
            Handcrafted with natural ingredients for soft, nourished skin.  
            Free from harsh chemicals, full of goodness.
          </p>

          {/* Call to Action */}
          <Link to="/shop" className="px-6 py-4 text-[16px] md:text-lg font-medium text-white bg-[#05a88d] rounded-md transition-all duration-300 hover:bg-[#037f66] shadow-lg">
            Explore Our Collection
          </Link>

          {/* Trust Badges */}
          <div className="mt-12 grid sm:grid-cols-2  gap-4 text-white">
            {[
              { icon: Leaf, label: "100% Organic" },
              { icon: Sparkles, label: "Cruelty-Free" },
              { icon: Shield, label: "Chemical-Free" },
              { icon: Recycle, label: "Eco-Friendly" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 p-3 bg-white/10 rounded-md transition-all duration-300 hover:bg-white/20"
              >
                <item.icon className="w-8 h-8 text-[#05a88d]" />
                <span className="text-[16px] md:text-lg">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side*/}
        <div className=" md:flex pb-10 justify-end w-1/2">
          <img
            src={hero_img}
            alt="Girl using soap"
            className="rounded-l-full h-full w-full object-cover "
          />
        </div>
      </div>
      
    </section>
    <div className="-bottom-1 justify-center flex w-full absolute z-20 "><svg
  xmlns="http://www.w3.org/2000/svg"
  width="1390"
  height="50"
  viewBox="0 0 1390 50"
  fill="none"
  className="z-50 h-auto w-[90%]"
>
  <path d="M0 50H1390L1350 0H40L0 50Z" fill="#E3F0FF" />
</svg>
</div>
  </div>
  );
};

export default Hero;
