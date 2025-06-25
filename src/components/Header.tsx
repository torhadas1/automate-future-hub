import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // <-- Added useLocation

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to handle section navigation
  const navigateToSection = useCallback((sectionId) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      // If not on homepage, go to homepage and then to section
      navigate(`/${sectionId}`);
    } else {
      // Already on homepage, just scroll to section
      document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname, navigate]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-xl font-bold text-white">BuildYourFlow</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => navigateToSection('#services')} className="text-slate-300 hover:text-blue-400 font-medium transition-colors">Services</button>
          <Link to="/blog" className="text-slate-300 hover:text-blue-400 font-medium transition-colors">Blog</Link>
          <button onClick={() => navigateToSection('#contact')} className="text-slate-300 hover:text-blue-400 font-medium transition-colors">Contact</button>
        </nav>

        <Button className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-6">
          Get Started
        </Button>

        <button 
          className="md:hidden w-6 h-6 flex flex-col justify-center items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-full h-0.5 bg-slate-300 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`w-full h-0.5 bg-slate-300 mt-1 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-0.5 bg-slate-300 mt-1 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <nav className="px-6 py-4 space-y-4">
            <button onClick={() => navigateToSection('#services')} className="block w-full text-left text-slate-300 hover:text-blue-400 font-medium">Services</button>
            <Link to="/blog" className="block text-slate-300 hover:text-blue-400 font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <button onClick={() => navigateToSection('#contact')} className="block w-full text-left text-slate-300 hover:text-blue-400 font-medium">Contact</button>
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
