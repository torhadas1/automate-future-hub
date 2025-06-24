
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Key, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const APIDocumentation = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Blog
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                API Documentation
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Learn how to automatically post blog articles using our API endpoints.
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Key className="w-6 h-6 text-blue-400" />
                  <CardTitle className="text-white">API Credentials</CardTitle>
                </div>
                <CardDescription className="text-slate-300">
                  To use the Blog API, you'll need to connect to Supabase first.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-slate-300 mb-2">Base URL:</p>
                  <code className="text-blue-400">https://your-project.supabase.co/functions/v1/</code>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-slate-300 mb-2">API Key:</p>
                  <code className="text-blue-400">Your Supabase Anon Key</code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Send className="w-6 h-6 text-green-400" />
                  <CardTitle className="text-white">Create Blog Post</CardTitle>
                </div>
                <CardDescription className="text-slate-300">
                  POST endpoint to create a new blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-slate-300 mb-2">Endpoint:</p>
                  <code className="text-green-400">POST /create-blog-post</code>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-slate-300 mb-2">Headers:</p>
                  <pre className="text-blue-400 text-sm">
{`{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_API_KEY"
}`}
                  </pre>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-slate-300 mb-2">Request Body:</p>
                  <pre className="text-blue-400 text-sm">
{`{
  "title": "Your Blog Post Title",
  "content": "Your blog post content in HTML format",
  "description": "Short description of the post",
  "category": "Business Automation",
  "readTime": "5 min read",
  "slug": "your-blog-post-slug"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Code className="w-6 h-6 text-purple-400" />
                  <CardTitle className="text-white">n8n Integration Example</CardTitle>
                </div>
                <CardDescription className="text-slate-300">
                  Example n8n workflow to automatically post blog articles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-slate-300 mb-2">Workflow Structure:</p>
                  <div className="text-sm text-slate-400 space-y-1">
                    <p>1. Trigger (Webhook/Schedule)</p>
                    <p>2. Content Processing Node</p>
                    <p>3. HTTP Request Node (POST to API)</p>
                    <p>4. Response Handler</p>
                  </div>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-slate-300 mb-2">HTTP Request Configuration:</p>
                  <pre className="text-blue-400 text-sm">
{`URL: https://your-project.supabase.co/functions/v1/create-blog-post
Method: POST
Headers: {
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_API_KEY"
}
Body: {
  "title": "{{ $json.title }}",
  "content": "{{ $json.content }}",
  "description": "{{ $json.description }}",
  "category": "{{ $json.category }}",
  "readTime": "{{ $json.readTime }}",
  "slug": "{{ $json.slug }}"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
              <h3 className="text-blue-400 font-semibold mb-2">⚠️ Setup Required</h3>
              <p className="text-slate-300">
                To use this API, you need to connect your project to Supabase first. Click the green Supabase button 
                in the top right corner to set up the backend functionality for storing and managing blog posts.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default APIDocumentation;
