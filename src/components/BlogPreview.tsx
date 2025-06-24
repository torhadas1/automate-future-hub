
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowUp } from "lucide-react";

const BlogPreview = () => {
  const blogPosts = [
    {
      title: "Building Advanced CRM Automation with n8n and AI",
      description: "Learn how to create intelligent customer relationship workflows that automatically qualify leads, send personalized messages, and update your CRM in real-time.",
      date: "December 20, 2024",
      readTime: "8 min read",
      category: "Business Automation"
    },
    {
      title: "Financial Data Processing: From Chaos to Clarity",
      description: "Discover how to automate invoice processing, expense categorization, and financial reporting using n8n workflows with OCR and AI integration.",
      date: "December 18, 2024",
      readTime: "12 min read",
      category: "Finance"
    },
    {
      title: "Multi-Channel Marketing Automation Made Simple",
      description: "Create sophisticated marketing campaigns that span email, social media, and SMS with personalized content generation and automated scheduling.",
      date: "December 15, 2024",
      readTime: "10 min read",
      category: "Marketing"
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Latest from Our
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Automation Blog
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our collection of n8n templates, tutorials, and automation insights 
            to help you build more efficient business processes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card key={index} className="group bg-white border-slate-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:-translate-y-1 transition-all duration-300 rotate-45" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed">
                  {post.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center text-sm text-slate-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.date} • {post.readTime}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
