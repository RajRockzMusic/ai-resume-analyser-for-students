import { AnalysisResult } from '@/components/AnalysisResults';

// Common keywords that ATS systems look for
const COMMON_KEYWORDS = [
  'leadership', 'management', 'communication', 'teamwork', 'problem-solving',
  'project management', 'strategic planning', 'data analysis', 'customer service',
  'sales', 'marketing', 'collaboration', 'innovation', 'research', 'development'
];

// Technical skills to look for
const TECHNICAL_SKILLS = [
  'javascript', 'python', 'react', 'node.js', 'sql', 'html', 'css', 'java',
  'c++', 'git', 'aws', 'docker', 'kubernetes', 'typescript', 'vue', 'angular',
  'mongodb', 'postgresql', 'redux', 'express', 'django', 'flask', 'spring',
  'tensorflow', 'pytorch', 'machine learning', 'data science', 'api', 'rest'
];

// Soft skills to identify
const SOFT_SKILLS = [
  'leadership', 'communication', 'teamwork', 'problem-solving', 'creativity',
  'adaptability', 'time management', 'critical thinking', 'collaboration',
  'organizational', 'analytical', 'interpersonal', 'presentation', 'negotiation'
];

export const analyzeResume = (content: string): AnalysisResult => {
  const lowercaseContent = content.toLowerCase();
  const words = content.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Keyword Analysis
  const foundKeywords = COMMON_KEYWORDS.filter(keyword => 
    lowercaseContent.includes(keyword.toLowerCase())
  );
  const missingKeywords = COMMON_KEYWORDS.filter(keyword => 
    !lowercaseContent.includes(keyword.toLowerCase())
  ).slice(0, 5); // Show top 5 missing keywords

  const keywordScore = Math.round((foundKeywords.length / COMMON_KEYWORDS.length) * 100);

  // Skills Analysis
  const foundTechnicalSkills = TECHNICAL_SKILLS.filter(skill => 
    lowercaseContent.includes(skill.toLowerCase())
  );
  const foundSoftSkills = SOFT_SKILLS.filter(skill => 
    lowercaseContent.includes(skill.toLowerCase())
  );

  const skillsScore = Math.round(
    ((foundTechnicalSkills.length + foundSoftSkills.length) / 
    (TECHNICAL_SKILLS.length + SOFT_SKILLS.length)) * 100
  );

  // Format Analysis
  const hasContact = /(@|email|phone|\+\d|\(\d{3}\)|\d{3}-\d{3}-\d{4})/i.test(content);
  const hasSummary = /(summary|objective|profile|about)/i.test(content);
  const hasExperience = /(experience|work|employment|job|position)/i.test(content);
  const hasEducation = /(education|degree|university|college|school)/i.test(content);

  const formatChecks = [hasContact, hasSummary, hasExperience, hasEducation];
  const formatScore = Math.round((formatChecks.filter(Boolean).length / formatChecks.length) * 100);

  // Overall Score (weighted average)
  const overallScore = Math.round(
    (keywordScore * 0.4 + skillsScore * 0.35 + formatScore * 0.25)
  );

  // Generate Recommendations
  const recommendations: string[] = [];
  
  if (wordCount < 200) {
    recommendations.push("Add more detail to your experience and achievements to reach optimal length");
  }
  if (wordCount > 600) {
    recommendations.push("Consider condensing your resume to focus on most relevant information");
  }
  if (!hasContact) {
    recommendations.push("Include complete contact information (email, phone, location)");
  }
  if (!hasSummary) {
    recommendations.push("Add a professional summary to highlight your key qualifications");
  }
  if (foundKeywords.length < 5) {
    recommendations.push("Include more industry-relevant keywords to improve ATS compatibility");
  }
  if (foundTechnicalSkills.length < 3) {
    recommendations.push("Highlight more technical skills relevant to your field");
  }
  if (keywordScore < 60) {
    recommendations.push("Use action verbs and quantify your achievements with specific metrics");
  }

  return {
    overallScore,
    wordCount,
    keywordAnalysis: {
      found: foundKeywords,
      missing: missingKeywords,
      score: keywordScore
    },
    skillsAnalysis: {
      technical: foundTechnicalSkills,
      soft: foundSoftSkills,
      score: skillsScore
    },
    formatAnalysis: {
      hasContact,
      hasSummary,
      hasExperience,
      hasEducation,
      score: formatScore
    },
    recommendations
  };
};