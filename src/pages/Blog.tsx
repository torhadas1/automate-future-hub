import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

type BlogPost = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
};

const Blog = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || '';
        const response = await fetch(`${baseUrl}/blogPosts.json`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await response.json();
        
        // Convert object to array with slug as a property
        const postsArray = Object.entries(data).map(([slug, post]: [string, any]) => ({
          ...post,
          slug,
          description: post.description || post.content.substring(0, 150).replace(/<\/?[^>]+(>|$)/g, "") + "..."
        }));
        
        setBlogPosts(postsArray);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleBlogClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Loading blog posts...</h1>
          </div>
        </div>
      </div>
    );
  }

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
