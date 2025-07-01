import { useEffect, useState } from "react";

const FeatureShowcase = () => {
  return (
    <section className="pt-0 pb-20 bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        {/* Image container with overflow hidden to contain the zoom effect */}
        <div className="overflow-hidden rounded-lg shadow-xl border border-slate-700 transition-all duration-300 hover:shadow-blue-500/30">
          {/* Image wrapper with zoom effect */}
          <div className="relative overflow-hidden">
            <img 
              src="/mainImage.webp" 
              alt="Automation Dashboard" 
              className="w-full object-cover transition-transform duration-700 ease-in-out hover:scale-110 hover:brightness-110"
            />
            {/* Optional overlay that fades on hover */}
            <div className="absolute inset-0 bg-blue-900/20 hover:bg-transparent transition-colors duration-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;