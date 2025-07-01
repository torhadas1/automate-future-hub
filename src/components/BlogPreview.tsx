import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type BlogPost = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
};

const BlogPreview = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // For custom domain, use absolute path without BASE_URL
        const response = await fetch('/blogPosts.json');
        
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
        
        // Only show the first 3 blog posts in the preview
        setBlogPosts(postsArray.slice(0, 3));
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

  const handleViewAll = () => {
    navigate('/blog');
  };

  if (loading) {
    return (
      <section className="py-20 bg-slate-800 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Latest from Our
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Automation Blog
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Loading blog posts...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Latest from Our
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Automation Blog
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore our collection of n8n templates, tutorials, and automation insights 
            to help you build more efficient business processes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="group bg-slate-700 border-slate-600 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
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

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleViewAll}
            className="px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
