
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Workflow, Bot, DollarSign, Megaphone } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Workflow className="w-8 h-8 text-blue-400" />,
      title: "Business Process Automation",
      description: "Transform manual workflows into intelligent, automated systems using n8n. We design custom solutions that handle everything from data entry to complex decision-making processes.",
      features: ["Custom n8n workflows", "Process optimization", "Integration setup", "Performance monitoring"]
    },
    {
      icon: <DollarSign className="w-8 h-8 text-purple-400" />,
      title: "Finance & Accounting Automation",
      description: "Streamline your financial operations with automated invoice processing, expense tracking, and reporting. Our AI-powered solutions ensure accuracy and compliance.",
      features: ["Invoice automation", "Expense categorization", "Financial reporting", "Compliance monitoring"]
    },
    {
      icon: <Megaphone className="w-8 h-8 text-green-400" />,
      title: "Marketing Campaign Automation",
      description: "Create sophisticated multi-channel marketing campaigns that adapt to customer behavior. From lead generation to conversion tracking, we automate it all.",
      features: ["Lead generation", "Email sequences", "Social media automation", "Analytics integration"]
    },
    {
      icon: <Bot className="w-8 h-8 text-orange-400" />,
      title: "AI Integration & Enhancement",
      description: "Enhance your workflows with cutting-edge AI capabilities. We integrate machine learning models and AI services to make your automations truly intelligent.",
      features: ["AI-powered decisions", "Natural language processing", "Predictive analytics", "Smart notifications"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Automation
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We specialize in creating intelligent automation solutions that transform how businesses operate. 
            Our expertise spans across multiple domains, ensuring comprehensive digital transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group bg-slate-800 border-slate-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-300 leading-relaxed text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
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
