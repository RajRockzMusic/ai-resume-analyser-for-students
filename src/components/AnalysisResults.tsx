import React from 'react';
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export interface AnalysisResult {
  overallScore: number;
  wordCount: number;
  keywordAnalysis: {
    found: string[];
    missing: string[];
    score: number;
  };
  skillsAnalysis: {
    technical: string[];
    soft: string[];
    score: number;
  };
  formatAnalysis: {
    hasContact: boolean;
    hasSummary: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
    score: number;
  };
  recommendations: string[];
}

interface AnalysisResultsProps {
  results: AnalysisResult;
  fileName: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results, fileName }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-success" />;
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-warning" />;
    return <XCircle className="h-5 w-5 text-destructive" />;
  };

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {getScoreIcon(results.overallScore)}
            <CardTitle className="text-2xl">Resume Analysis Complete</CardTitle>
          </div>
          <p className="text-muted-foreground">Analysis for: {fileName}</p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-4">
            <div className={`text-6xl font-bold ${getScoreColor(results.overallScore)} mb-2`}>
              {results.overallScore}
            </div>
            <p className="text-muted-foreground">Overall Score</p>
          </div>
          <Progress value={results.overallScore} className="w-full max-w-md mx-auto" />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Keyword Analysis */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Keywords</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className={`text-2xl font-bold ${getScoreColor(results.keywordAnalysis.score)}`}>
                {results.keywordAnalysis.score}%
              </div>
              <Progress value={results.keywordAnalysis.score} className="mt-2" />
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm text-success mb-2">Found Keywords</h4>
                <div className="flex flex-wrap gap-1">
                  {results.keywordAnalysis.found.map((keyword, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-success/10 text-success">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {results.keywordAnalysis.missing.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-warning mb-2">Suggested Keywords</h4>
                  <div className="flex flex-wrap gap-1">
                    {results.keywordAnalysis.missing.map((keyword, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-warning text-warning">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills Analysis */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Skills</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className={`text-2xl font-bold ${getScoreColor(results.skillsAnalysis.score)}`}>
                {results.skillsAnalysis.score}%
              </div>
              <Progress value={results.skillsAnalysis.score} className="mt-2" />
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm text-foreground mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {results.skillsAnalysis.technical.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-foreground mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {results.skillsAnalysis.soft.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Format Analysis */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Format</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className={`text-2xl font-bold ${getScoreColor(results.formatAnalysis.score)}`}>
                {results.formatAnalysis.score}%
              </div>
              <Progress value={results.formatAnalysis.score} className="mt-2" />
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Contact Info</span>
                {results.formatAnalysis.hasContact ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Summary/Objective</span>
                {results.formatAnalysis.hasSummary ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Experience Section</span>
                {results.formatAnalysis.hasExperience ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Education Section</span>
                {results.formatAnalysis.hasEducation ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Word Count & Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Resume Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {results.wordCount}
              </div>
              <p className="text-muted-foreground mb-4">Words</p>
              <div className="text-sm">
                {results.wordCount < 200 && (
                  <p className="text-warning">Consider adding more detail to reach 200-400 words</p>
                )}
                {results.wordCount >= 200 && results.wordCount <= 400 && (
                  <p className="text-success">Perfect length for a one-page resume</p>
                )}
                {results.wordCount > 400 && results.wordCount <= 600 && (
                  <p className="text-warning">Good length, but consider condensing for impact</p>
                )}
                {results.wordCount > 600 && (
                  <p className="text-destructive">Too long - aim for 200-400 words</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};