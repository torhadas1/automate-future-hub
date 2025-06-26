import { useEffect, useState } from "react";

const FeatureShowcase = () => {
  const [basePath, setBasePath] = useState("");
  
  useEffect(() => {
    // Get the BASE_URL from Vite's environment variables
    setBasePath(import.meta.env.BASE_URL || "");
  }, []);

  return (
    <section className="pt-0 pb-20 bg-slate-900"> {/* Changed py-10 to pt-2 pb-10 to reduce top margin */}
      <div className="max-w-5xl mx-auto px-6">
        {/* Image container with overflow hidden to contain the zoom effect */}
        <div className="overflow-hidden rounded-lg shadow-xl border border-slate-700 transition-all duration-300 hover:shadow-blue-500/30 transition-transform duration-700 ease-in-out hover:scale-105 hover:brightness-105">
          {/* Image wrapper with zoom effect */}
          <div className="relative overflow-hidden">
            <img 
              src={`${basePath}/mainImage.webp`} 
              alt="Automation Dashboard" 
              className="w-full object-cover "
            />
            {/* Optional overlay that fades on hover */}
            {/* <div className="absolute inset-0 bg-blue-900/20 hover:bg-transparent transition-colors duration-700"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;