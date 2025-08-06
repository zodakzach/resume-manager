"use client";

import { useState } from "react";
import {
  FileText,
  Brain,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Target,
  Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock analysis results
const mockAnalysisResults = {
  overallScore: 78,
  matchPercentage: 82,
  suggestions: [
    {
      type: "missing_keyword",
      priority: "high",
      title: "Add Missing Keywords",
      description:
        "The job description mentions 'Project Management' 5 times, but your resume doesn't include this phrase.",
      suggestion:
        "Consider adding 'Project Management' to your skills or experience descriptions.",
      impact: "High"
    },
    {
      type: "skill_match",
      priority: "medium",
      title: "Highlight Matching Skills",
      description:
        "Your resume mentions Python and React, which are key requirements for this role.",
      suggestion:
        "Consider moving these skills higher in your resume or adding specific examples.",
      impact: "Medium"
    },
    {
      type: "experience_gap",
      priority: "high",
      title: "Address Experience Gap",
      description:
        "The job requires 5+ years of experience, but your resume shows 3 years.",
      suggestion:
        "Highlight relevant internships, freelance work, or personal projects to bridge this gap.",
      impact: "High"
    },
    {
      type: "format_improvement",
      priority: "low",
      title: "Improve Formatting",
      description:
        "Consider using bullet points for better readability in your experience section.",
      suggestion: "Use action verbs and quantify achievements where possible.",
      impact: "Low"
    }
  ],
  keywordAnalysis: {
    matched: ["JavaScript", "React", "Node.js", "Git", "Agile"],
    missing: ["Project Management", "Leadership", "Scrum", "Docker", "AWS"],
    overused: ["Developed", "Worked on"]
  },
  sectionAnalysis: {
    summary: {
      score: 85,
      feedback: "Strong professional summary with clear value proposition"
    },
    experience: {
      score: 75,
      feedback:
        "Good experience section, but could use more quantified achievements"
    },
    skills: {
      score: 90,
      feedback: "Comprehensive skills section with relevant technologies"
    },
    education: {
      score: 70,
      feedback:
        "Education section is adequate but could include relevant coursework"
    }
  }
};

export default function AnalyzerPage() {
  const [selectedResume, setSelectedResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleAnalyze = async () => {
    if (!selectedResume || !jobDescription) return;

    setIsAnalyzing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
    setHasResults(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "medium":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            AI Resume Analyzer
          </h1>
          <p className="text-muted-foreground">
            Get AI-powered insights to optimize your resume for specific jobs
          </p>
        </div>
        {hasResults && (
          <Button variant="outline" className="bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        )}
      </div>

      {!hasResults ? (
        /* Analysis Input Form */
        <div className="mx-auto max-w-4xl space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <Brain className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Analyze Your Resume</CardTitle>
              <CardDescription>
                Upload your resume and job description to get personalized
                optimization suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resume Selection */}
              <div className="space-y-2">
                <Label htmlFor="resume">Select Resume</Label>
                <Select
                  value={selectedResume}
                  onValueChange={setSelectedResume}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a resume to analyze" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software-engineer">
                      Software Engineer Resume
                    </SelectItem>
                    <SelectItem value="product-manager">
                      Product Manager Resume
                    </SelectItem>
                    <SelectItem value="data-scientist">
                      Data Scientist Resume
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Job Description Input */}
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px]"
                />
                <p className="text-muted-foreground text-sm">
                  Copy and paste the complete job posting for the most accurate
                  analysis
                </p>
              </div>

              {/* Analyze Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedResume || !jobDescription || isAnalyzing}
                  className="bg-orange-500 px-8 hover:bg-orange-600"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* How it Works */}
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2 font-medium">1. Upload Resume</h3>
                  <p className="text-muted-foreground text-sm">
                    Select one of your existing resumes to analyze
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-2 font-medium">2. Add Job Description</h3>
                  <p className="text-muted-foreground text-sm">
                    Paste the job posting you're applying for
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="mb-2 font-medium">3. Get AI Insights</h3>
                  <p className="text-muted-foreground text-sm">
                    Receive personalized optimization suggestions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Analysis Results */
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall Score
                </CardTitle>
                <TrendingUp className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {mockAnalysisResults.overallScore}/100
                </div>
                <Progress
                  value={mockAnalysisResults.overallScore}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Job Match</CardTitle>
                <Target className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {mockAnalysisResults.matchPercentage}%
                </div>
                <Progress
                  value={mockAnalysisResults.matchPercentage}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Suggestions
                </CardTitle>
                <Brain className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockAnalysisResults.suggestions.length}
                </div>
                <p className="text-muted-foreground text-xs">
                  Optimization tips
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Analysis Complete!</AlertTitle>
                <AlertDescription>
                  Your resume has been analyzed against the job description.
                  Review the suggestions below to improve your match score.
                </AlertDescription>
              </Alert>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Priority Actions</CardTitle>
                    <CardDescription>
                      Focus on these high-impact improvements first
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockAnalysisResults.suggestions
                      .filter((s) => s.priority === "high")
                      .map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 rounded-lg border p-3"
                        >
                          {getPriorityIcon(suggestion.priority)}
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">
                              {suggestion.title}
                            </h4>
                            <p className="text-muted-foreground mt-1 text-xs">
                              {suggestion.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Section Scores</CardTitle>
                    <CardDescription>
                      How each section of your resume performs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(mockAnalysisResults.sectionAnalysis).map(
                      ([section, data]) => (
                        <div key={section} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium capitalize">
                              {section}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              {data.score}/100
                            </span>
                          </div>
                          <Progress value={data.score} className="h-2" />
                          <p className="text-muted-foreground text-xs">
                            {data.feedback}
                          </p>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Suggestions Tab */}
            <TabsContent value="suggestions" className="space-y-4">
              {mockAnalysisResults.suggestions.map((suggestion, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getPriorityIcon(suggestion.priority)}
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center space-x-2">
                          <h3 className="font-medium">{suggestion.title}</h3>
                          <Badge
                            className={getPriorityColor(suggestion.priority)}
                          >
                            {suggestion.priority} priority
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3 text-sm">
                          {suggestion.description}
                        </p>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-sm">
                            <strong>Suggestion:</strong> {suggestion.suggestion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Keywords Tab */}
            <TabsContent value="keywords" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">
                      Matched Keywords
                    </CardTitle>
                    <CardDescription>
                      Keywords found in both your resume and job description
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {mockAnalysisResults.keywordAnalysis.matched.map(
                        (keyword) => (
                          <Badge
                            key={keyword}
                            className="bg-green-100 text-green-800"
                          >
                            {keyword}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">
                      Missing Keywords
                    </CardTitle>
                    <CardDescription>
                      Important keywords from the job description not in your
                      resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {mockAnalysisResults.keywordAnalysis.missing.map(
                        (keyword) => (
                          <Badge
                            key={keyword}
                            className="bg-red-100 text-red-800"
                          >
                            {keyword}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-yellow-600">
                      Overused Words
                    </CardTitle>
                    <CardDescription>
                      Words that appear too frequently in your resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {mockAnalysisResults.keywordAnalysis.overused.map(
                        (keyword) => (
                          <Badge
                            key={keyword}
                            className="bg-yellow-100 text-yellow-800"
                          >
                            {keyword}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sections Tab */}
            <TabsContent value="sections" className="space-y-4">
              {Object.entries(mockAnalysisResults.sectionAnalysis).map(
                ([section, data]) => (
                  <Card key={section}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="capitalize">{section}</CardTitle>
                        <Badge variant="outline">{data.score}/100</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={data.score} className="mb-3" />
                      <p className="text-muted-foreground text-sm">
                        {data.feedback}
                      </p>
                    </CardContent>
                  </Card>
                )
              )}
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                setHasResults(false);
                setJobDescription("");
                setSelectedResume("");
              }}
              className="bg-transparent"
            >
              Analyze Another Resume
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Apply Suggestions to Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
