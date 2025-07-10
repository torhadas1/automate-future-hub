import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, useMemo } from "react";
import { trackEvent } from "@/utils/analytics";

type Template = {
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  link: string;
};

const TemplatePost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTemplates = async () => {
      if (!slug) {
        setTemplate(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/templatesPost.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch templates: ${response.status}`);
        }
        
        const dataArray = await response.json();
        
        // Extract the data from the wrapped structure
        const data = dataArray[0]?.data || {};
        
        if (isMounted) {
          if (data[slug]) {
            setTemplate(data[slug]);
            trackEvent('template_view', { 
              template_slug: slug,
              template_title: data[slug].title,
              template_category: data[slug].category
            });
          } else {
            setTemplate(null);
            setError('Template not found');
            trackEvent('template_not_found', { template_slug: slug });
          }
        }
      } catch (error) {
        console.error('Error loading templates:', error);
        if (isMounted) {
          setError('Failed to load template');
          setTemplate(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTemplates();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Inject CSS rules for template content
  const templateContentCSS = useMemo(() => `
    .template-content h1, .template-content h2, .template-content h3, .template-content h4 {
      color: #e0f2fe !important;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: bold;
    }
    .template-content p {
      color: #bae6fd !important;
      margin-bottom: 1.25em;
      line-height: 1.7;
    }
    .template-content ul, .template-content ol {
      color: #bae6fd !important;
      padding-left: 1.5em;
      margin-bottom: 1.25em;
    }
    .template-content li {
      color: #bae6fd !important;
      margin-bottom: 0.5em;
    }
    .template-content strong, .template-content b {
      color: #22d3ee !important;
      font-weight: bold;
    }
    .template-content a {
      color: #38bdf8 !important;
      text-decoration: underline;
    }
    .template-content a:hover {
      color: #0ea5e9 !important;
    }
  `, []);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = templateContentCSS;
    document.head.appendChild(styleEl);
    
    return () => {
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    };
  }, [templateContentCSS]);

  const handleViewTemplate = () => {
    if (template?.link) {
      trackEvent('template_link_click', { 
        template_slug: slug,
        template_title: template.title,
        template_link: template.link
      });
      window.open(template.link, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {error || 'Template Not Found'}
          </h1>
          <Button onClick={() => navigate('/templates')} variant="outline">
            Back to Templates
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
            onClick={() => {
              trackEvent('back_to_templates_click', {
                from_template: slug
              });
              navigate('/templates');
            }} 
            variant="outline" 
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>

          <article className="bg-slate-700 rounded-lg overflow-hidden border border-slate-600">
            {template.image && (
              <div className="bg-slate-800 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="text-sm font-medium text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                  {template.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {template.title}
              </h1>
              
              <div className="flex items-center gap-6 text-slate-300 mb-8">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {template.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {template.readTime}
                </div>
              </div>

              <div className="mb-8">
                <Button 
                  onClick={handleViewTemplate}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Template
                </Button>
              </div>

              <div 
                className="prose prose-lg prose-invert max-w-none template-content"
                dangerouslySetInnerHTML={{ __html: template.content }}
              />
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TemplatePost;