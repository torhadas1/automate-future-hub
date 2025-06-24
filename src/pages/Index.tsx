
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BlogPreview from "@/components/BlogPreview";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div id="services">
        <Services />
      </div>
      <div id="blog">
        <BlogPreview />
      </div>
      <div id="contact">
        <ContactCTA />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
