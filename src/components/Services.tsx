
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Calendar, Send } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Business Process Automation",
      description: "Streamline your operations with intelligent workflows that handle repetitive tasks, data processing, and cross-platform integrations.",
      features: ["CRM Integration", "Data Synchronization", "Task Management", "Reporting Automation"]
    },
    {
      icon: Calendar,
      title: "Finance & Accounting Automation",
      description: "Automate invoice processing, expense tracking, financial reporting, and payment workflows with precision and compliance.",
      features: ["Invoice Processing", "Expense Management", "Financial Reports", "Payment Workflows"]
    },
    {
      icon: Send,
      title: "Marketing Automation",
      description: "Create sophisticated marketing campaigns with AI-powered personalization, lead nurturing, and multi-channel communication.",
      features: ["Email Campaigns", "Lead Scoring", "Social Media", "Analytics Integration"]
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our Automation
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We specialize in creating custom n8n workflows that transform how businesses operate, 
            with AI integration that makes your processes smarter and more efficient.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group relative bg-white/80 backdrop-blur-sm border-slate-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
