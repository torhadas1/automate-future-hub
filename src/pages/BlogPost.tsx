import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Mock blog data - in a real app, this would come from your API
  const blogPosts: Record<string, any> = {
    "building-advanced-crm-automation": {
      title: "Building Advanced CRM Automation with n8n and AI",
      content: `
        <h2>Introduction</h2>
        <p>Customer Relationship Management (CRM) automation has revolutionized how businesses interact with their customers. By leveraging n8n and AI integration, you can create intelligent workflows that not only automate repetitive tasks but also make smart decisions based on customer data.</p>
        
        <h2>Setting Up Your n8n Workflow</h2>
        <p>First, let's establish the foundation of our CRM automation workflow. We'll start by connecting to your CRM system using n8n's extensive library of integrations.</p>
        
        <h3>Required Nodes:</h3>
        <ul>
          <li>CRM Trigger (Webhook or Polling)</li>
          <li>AI Classification Node</li>
          <li>Decision Node</li>
          <li>Email/SMS Notification Nodes</li>
          <li>CRM Update Node</li>
        </ul>
        
        <h2>AI Integration for Lead Qualification</h2>
        <p>The power of this automation lies in its ability to intelligently qualify leads using AI. We'll implement a scoring system that analyzes various data points to determine lead quality.</p>
        
        <h2>Implementation Steps</h2>
        <p>Follow these detailed steps to implement your own CRM automation workflow...</p>
      `,
      date: "December 20, 2024",
      readTime: "8 min read",
      category: "Business Automation"
    },
    "financial-data-processing": {
      title: "Financial Data Processing: From Chaos to Clarity",
      content: `
        <h2>The Challenge of Financial Data</h2>
        <p>Modern businesses deal with massive amounts of financial data from various sources. Without proper automation, this can quickly become overwhelming and error-prone.</p>
        
        <h2>n8n Workflow Architecture</h2>
        <p>Our financial automation workflow is designed to handle multiple data sources and process them through intelligent categorization and validation systems.</p>
        
        <h2>OCR Integration</h2>
        <p>Using OCR technology, we can automatically extract data from invoices, receipts, and other financial documents, eliminating manual data entry.</p>
      `,
      date: "December 18, 2024",
      readTime: "12 min read",
      category: "Finance"
    },
    "multi-channel-marketing-automation": {
      title: "Multi-Channel Marketing Automation Made Simple",
      content: `
        <h2>The Multi-Channel Challenge</h2>
        <p>Managing marketing campaigns across multiple channels can be complex and time-consuming. Our n8n-based solution simplifies this process.</p>
        
        <h2>Channel Integration</h2>
        <p>Learn how to connect email, social media, SMS, and other marketing channels in a single, cohesive workflow.</p>
        
        <h2>Personalization at Scale</h2>
        <p>Discover how AI can help you create personalized content for thousands of customers simultaneously.</p>
      `,
      date: "December 15, 2024",
      readTime: "10 min read",
      category: "Marketing"
    }
  };

  const post = blogPosts[slug || ""];

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Button onClick={() => navigate('/blog')} variant="outline">
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Button 
            onClick={() => navigate('/blog')} 
            variant="outline" 
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          <article className="bg-slate-700 rounded-lg p-8 border border-slate-600">
            <div className="mb-6">
              <span className="text-sm font-medium text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center text-slate-300 mb-8">
              <Calendar className="w-4 h-4 mr-2" />
              {post.date} • {post.readTime}
            </div>

            <div 
              className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-slate-200 prose-li:text-slate-200"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
