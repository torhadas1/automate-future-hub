
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-xl font-bold text-slate-900">AutoFlow</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Services</a>
          <a href="#blog" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Blog</a>
          <a href="#about" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">About</a>
          <a href="#contact" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
        </nav>

        <Button className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-6">
          Get Started
        </Button>

        <button 
          className="md:hidden w-6 h-6 flex flex-col justify-center items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-full h-0.5 bg-slate-700 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`w-full h-0.5 bg-slate-700 mt-1 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-0.5 bg-slate-700 mt-1 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <nav className="px-6 py-4 space-y-4">
            <a href="#services" className="block text-slate-700 hover:text-blue-600 font-medium">Services</a>
            <a href="#blog" className="block text-slate-700 hover:text-blue-600 font-medium">Blog</a>
            <a href="#about" className="block text-slate-700 hover:text-blue-600 font-medium">About</a>
            <a href="#contact" className="block text-slate-700 hover:text-blue-600 font-medium">Contact</a>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
