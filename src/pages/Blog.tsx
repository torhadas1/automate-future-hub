
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "Building Advanced CRM Automation with n8n and AI",
      description: "Learn how to create intelligent customer relationship workflows that automatically qualify leads, send personalized messages, and update your CRM in real-time.",
      date: "December 20, 2024",
      readTime: "8 min read",
      category: "Business Automation",
      slug: "building-advanced-crm-automation"
    },
    {
      id: 2,
      title: "Financial Data Processing: From Chaos to Clarity",
      description: "Discover how to automate invoice processing, expense categorization, and financial reporting using n8n workflows with OCR and AI integration.",
      date: "December 18, 2024",
      readTime: "12 min read",
      category: "Finance",
      slug: "financial-data-processing"
    },
    {
      id: 3,
      title: "Multi-Channel Marketing Automation Made Simple",
      description: "Create sophisticated marketing campaigns that span email, social media, and SMS with personalized content generation and automated scheduling.",
      date: "December 15, 2024",
      readTime: "10 min read",
      category: "Marketing",
      slug: "multi-channel-marketing-automation"
    }
  ];

  const handleBlogClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Automation Blog
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover n8n templates, automation insights, and detailed tutorials 
              to help you transform your business processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card 
                key={index} 
                className="group bg-slate-800 border-slate-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                onClick={() => handleBlogClick(post.slug)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:-translate-y-1 transition-all duration-300 rotate-45" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center text-sm text-slate-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.date} • {post.readTime}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
