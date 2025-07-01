import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    // Scroll to the contact section
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToBlog = () => {
    // Navigate to the blog page
    navigate('/blog');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Automate Your
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Business Workflows
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            We create intelligent automation solutions using n8n and AI integration for 
            business processes, finance operations, and marketing campaigns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Get Started Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={navigateToBlog}
              className="border-slate-400 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              View Our Work
            </Button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
