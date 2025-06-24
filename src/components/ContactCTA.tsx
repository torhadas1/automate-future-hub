
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactCTA = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours to discuss your automation needs.",
    });
    
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Automate
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Business?
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Let's discuss how we can transform your workflows with intelligent automation. 
            Get a free consultation and custom automation strategy.
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Get Your Free Automation Consultation</CardTitle>
            <CardDescription className="text-slate-300">
              Tell us about your business processes and we'll show you how automation can save time and increase efficiency.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="bg-white/10 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="bg-white/10 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-300">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company name"
                  className="bg-white/10 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-300">Tell us about your automation needs</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your current processes and what you'd like to automate..."
                  rows={4}
                  className="bg-white/10 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Start My Automation Journey
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactCTA;
