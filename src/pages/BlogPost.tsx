import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

type BlogPost = {
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
};

type BlogPosts = {
  [key: string]: BlogPost;
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from public directory
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // Get base URL from import.meta.env or use empty string as fallback
        const baseUrl = import.meta.env.BASE_URL || '';
        const response = await fetch(`${baseUrl}/blogPosts.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data: BlogPosts = await response.json();
        if (slug && data[slug]) {
          setPost(data[slug]);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [slug]);

  // Inject CSS rules for blog content when component mounts
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
        color: #e0f2fe !important; /* blue-100 */
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        font-weight: bold;
      }
      .blog-content p {
        color: #bae6fd !important; /* blue-200 */
        margin-bottom: 1.25em;
        line-height: 1.7;
      }
      .blog-content ul, .blog-content ol {
        color: #bae6fd !important; /* blue-200 */
        padding-left: 1.5em;
        margin-bottom: 1.25em;
      }
      .blog-content li {
        color: #bae6fd !important; /* blue-200 */
        margin-bottom: 0.5em;
      }
      .blog-content strong, .blog-content b {
        color: #22d3ee !important; /* cyan-400 */
        font-weight: bold;
      }
      .blog-content a {
        color: #38bdf8 !important; /* blue-400 */
        text-decoration: underline;
      }
      .blog-content a:hover {
        color: #0ea5e9 !important; /* blue-500 */
      }
    `;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

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
