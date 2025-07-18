import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { trackEvent } from "@/utils/analytics";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/blogPosts.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }
        
        const dataArray = await response.json();
        
        // Extract the data from the wrapped structure
        const data = dataArray[0]?.data || {};
        
        // Convert object to array with slug as a property
        const postsArray = Object.entries(data).map(([slug, post]: [string, any]) => ({
          ...post,
          slug,
          description: post.description || post.content?.substring(0, 150).replace(/<\/?[^>]+(>|$)/g, "") + "..."
        }));
        
        // Sort by date (newest first)
        const sortedPosts = postsArray.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
        
        if (isMounted) {
          setBlogPosts(sortedPosts);
          trackEvent('blog_posts_loaded', { count: sortedPosts.length });
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        if (isMounted) {
          setError('Failed to load blog posts');
          setBlogPosts([]);
          trackEvent('blog_posts_error', { error: (error as Error).message });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleBlogClick = (slug: string) => {
    trackEvent('blog_post_click', { 
      post_slug: slug,
      post_title: blogPosts.find(post => post.slug === slug)?.title
    });
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

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Error loading blog posts</h1>
            <p className="text-slate-300">{error}</p>
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
            {blogPosts.map((post) => (
              <Card 
                key={post.slug}
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
