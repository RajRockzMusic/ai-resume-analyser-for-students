import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ResumeUpload } from '@/components/ResumeUpload';
import { AnalysisResults, AnalysisResult } from '@/components/AnalysisResults';
import { analyzeResume } from '@/utils/resumeAnalyzer';
import { FileText, BarChart3, Users, Award } from 'lucide-react';

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (file: File, content: string) => {
    setIsAnalyzing(true);
    setFileName(file.name);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const result = analyzeResume(content);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setFileName('');
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              AI Resume Analyzer
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get instant feedback on your resume with our AI-powered analysis. 
              Improve your chances of landing your dream job.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>ATS-Friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Instant Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Student-Focused</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Professional Feedback</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {!analysisResult ? (
          <div className="max-w-2xl mx-auto">
            <ResumeUpload 
              onFileUpload={handleFileUpload} 
              isAnalyzing={isAnalyzing}
            />
            
            {!isAnalyzing && (
              <div className="mt-12 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Why Use Our Resume Analyzer?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Instant Feedback</h3>
                    <p className="text-muted-foreground text-sm">
                      Get detailed analysis in seconds, not days
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">ATS Optimization</h3>
                    <p className="text-muted-foreground text-sm">
                      Ensure your resume passes automated screening
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Student-Focused</h3>
                    <p className="text-muted-foreground text-sm">
                      Tailored specifically for students and new graduates
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Analysis Results</h2>
              <Button onClick={resetAnalysis} variant="outline">
                Analyze Another Resume
              </Button>
            </div>
            <AnalysisResults results={analysisResult} fileName={fileName} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-accent text-accent-foreground py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Built for students by students. Helping you land your dream job with AI-powered resume analysis.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
