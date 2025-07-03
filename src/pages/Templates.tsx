import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowUp, Clock, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

type Template = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  image: string;
};

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTemplates = async () => {
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
        
        // Convert object to array with slug as a property
        const templatesArray = Object.entries(data).map(([slug, template]: [string, any]) => ({
          ...template,
          slug,
          description: template.description || template.content?.substring(0, 150).replace(/<\/?[^>]+(>|$)/g, "") + "..."
        }));
        
        // Sort by date (newest first)
        const sortedTemplates = templatesArray.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
        
        if (isMounted) {
          setTemplates(sortedTemplates);
        }
      } catch (error) {
        console.error('Error loading templates:', error);
        if (isMounted) {
          setError('Failed to load templates');
          setTemplates([]);
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
  }, []);

  const handleTemplateClick = (slug: string) => {
    navigate(`/templates/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Loading templates...</h1>
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
            <h1 className="text-2xl font-bold text-white mb-4">Error loading templates</h1>
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
              n8n
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Templates Library
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ready-to-use n8n workflow templates to supercharge your automation projects. 
              Copy, customize, and deploy these proven templates in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card 
                key={template.slug}
                className="group bg-slate-800 border-slate-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden"
                onClick={() => handleTemplateClick(template.slug)}
              >
                <div className="relative h-48 bg-slate-700 overflow-hidden">
                  {template.image ? (
                    <img 
                      src={template.image} 
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-slate-700">
                    <ImageIcon className="w-16 h-16 text-slate-500" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:-translate-y-1 transition-all duration-300 rotate-45" />
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {template.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {template.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {template.readTime}
                    </div>
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

export default Templates;