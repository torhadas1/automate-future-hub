import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, useMemo } from "react";

type BlogPost = {
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBlogPosts = async () => {
      if (!slug) {
        setPost(null);
        setLoading(false);
        return;
      }

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
        
        if (isMounted) {
          if (data[slug]) {
            setPost(data[slug]);
          } else {
            setPost(null);
            setError('Blog post not found');
          }
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        if (isMounted) {
          setError('Failed to load blog post');
          setPost(null);
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
  }, [slug]);

  // Inject CSS rules for blog content - memoize the CSS string
  const blogContentCSS = useMemo(() => `
    .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
      color: #e0f2fe !important;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: bold;
    }
    .blog-content p {
      color: #bae6fd !important;
      margin-bottom: 1.25em;
      line-height: 1.7;
    }
    .blog-content ul, .blog-content ol {
      color: #bae6fd !important;
      padding-left: 1.5em;
      margin-bottom: 1.25em;
    }
    .blog-content li {
      color: #bae6fd !important;
      margin-bottom: 0.5em;
    }
    .blog-content strong, .blog-content b {
      color: #22d3ee !important;
      font-weight: bold;
    }
    .blog-content a {
      color: #38bdf8 !important;
      text-decoration: underline;
    }
    .blog-content a:hover {
      color: #0ea5e9 !important;
    }
    .blog-content pre {
      background: #1e293b !important;
      color: #e2e8f0 !important;
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 1.5em 0;
    }
    .blog-content code {
      background: #334155 !important;
      color: #e2e8f0 !important;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.875em;
    }
  `, []);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = blogContentCSS;
    document.head.appendChild(styleEl);
    
    return () => {
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    };
  }, [blogContentCSS]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {error || 'Post Not Found'}
          </h1>
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
              className="prose prose-lg prose-invert max-w-none blog-content"
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
