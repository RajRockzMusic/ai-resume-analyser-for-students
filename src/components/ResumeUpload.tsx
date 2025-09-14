import React, { useState, useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ResumeUploadProps {
  onFileUpload: (file: File, content: string) => void;
  isAnalyzing: boolean;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onFileUpload, isAnalyzing }) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type === 'application/pdf' || file.type.includes('text'))) {
      processFile(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const processFile = async (file: File) => {
    setSelectedFile(file);
    
    // For demo purposes, we'll extract text content from the file
    // In a real app, you'd use a PDF parsing library for PDFs
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(file, content);
    };
    reader.readAsText(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <Card className="p-8 shadow-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Upload Your Resume</h2>
        <p className="text-muted-foreground">
          Get instant feedback on your resume with our AI-powered analysis
        </p>
      </div>

      {!selectedFile ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer",
            dragOver 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Drop your resume here
          </h3>
          <p className="text-muted-foreground mb-4">
            or click to browse files
          </p>
          <p className="text-sm text-muted-foreground/70">
            Supports PDF and text files
          </p>
          
          <input
            id="file-input"
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              disabled={isAnalyzing}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                <span className="text-muted-foreground">Analyzing your resume...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};