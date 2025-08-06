"use client";

import { useState } from "react";
import {
  Save,
  Upload,
  Plus,
  Edit,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Globe
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

// Mock data - in real app this would come from Convex
const mockProfile = {
  basicInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    summary:
      "Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies."
  },
  experience: [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "Present",
      current: true,
      description:
        "• Led development of microservices architecture serving 1M+ users\n• Mentored junior developers and conducted code reviews\n• Implemented CI/CD pipelines reducing deployment time by 60%"
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "StartupXYZ",
      location: "Remote",
      startDate: "2020-03",
      endDate: "2021-12",
      current: false,
      description:
        "• Built responsive web applications using React and TypeScript\n• Collaborated with design team to implement pixel-perfect UIs\n• Optimized application performance resulting in 40% faster load times"
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      location: "Boston, MA",
      graduationDate: "2020-05",
      gpa: "3.8"
    }
  ],
  skills: [
    {
      id: 1,
      name: "JavaScript",
      category: "Programming Languages",
      level: "Expert"
    },
    {
      id: 2,
      name: "TypeScript",
      category: "Programming Languages",
      level: "Expert"
    },
    { id: 3, name: "React", category: "Frameworks", level: "Expert" },
    { id: 4, name: "Node.js", category: "Frameworks", level: "Advanced" },
    { id: 5, name: "AWS", category: "Cloud", level: "Intermediate" }
  ],
  projects: [
    {
      id: 1,
      name: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with React frontend and Node.js backend",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      url: "https://github.com/johndoe/ecommerce",
      startDate: "2023-01",
      endDate: "2023-06"
    }
  ]
};

export default function MyInformationPage() {
  const [profile, setProfile] = useState(mockProfile);
  const [activeTab, setActiveTab] = useState("basic");
  const [isAddingExperience, setIsAddingExperience] = useState(false);

  const completionPercentage = 85; // Calculate based on filled fields

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Information</h1>
          <p className="text-muted-foreground">
            Manage your professional profile and master data for all resumes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="bg-transparent">
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>
                Complete your profile to create better resumes
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">
                {completionPercentage}%
              </div>
              <p className="text-muted-foreground text-sm">Complete</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-orange-500 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="text-muted-foreground mt-2 flex justify-between text-sm">
            <span>Missing: Projects, Certifications</span>
            <span>8 of 10 sections complete</span>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="basic" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Basic Info</span>
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="flex items-center space-x-2"
          >
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Experience</span>
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="flex items-center space-x-2"
          >
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Education</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Skills</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger value="other" className="flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Other</span>
          </TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Your personal and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                  >
                    Change Photo
                  </Button>
                  <p className="text-muted-foreground mt-1 text-sm">
                    JPG, PNG up to 2MB
                  </p>
                </div>
              </div>

              <Separator />

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.basicInfo.firstName}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        basicInfo: {
                          ...prev.basicInfo,
                          firstName: e.target.value
                        }
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.basicInfo.lastName}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        basicInfo: {
                          ...prev.basicInfo,
                          lastName: e.target.value
                        }
                      }))
                    }
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.basicInfo.email}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        basicInfo: {
                          ...prev.basicInfo,
                          email: e.target.value
                        }
                      }))
                    }
                  />
                </div>
                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.basicInfo.phone}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        basicInfo: {
                          ...prev.basicInfo,
                          phone: e.target.value
                        }
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.basicInfo.location}
                  placeholder="City, State/Country"
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      basicInfo: {
                        ...prev.basicInfo,
                        location: e.target.value
                      }
                    }))
                  }
                />
              </div>

              {/* Online Profiles */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Online Profiles</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Personal Website</Label>
                    <Input
                      id="website"
                      value={profile.basicInfo.website}
                      placeholder="https://yourwebsite.com"
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          basicInfo: {
                            ...prev.basicInfo,
                            website: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profile.basicInfo.linkedin}
                      placeholder="https://linkedin.com/in/username"
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          basicInfo: {
                            ...prev.basicInfo,
                            linkedin: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={profile.basicInfo.github}
                      placeholder="https://github.com/username"
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          basicInfo: {
                            ...prev.basicInfo,
                            github: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={profile.basicInfo.summary}
                  placeholder="Write a compelling professional summary..."
                  className="min-h-[120px]"
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      basicInfo: {
                        ...prev.basicInfo,
                        summary: e.target.value
                      }
                    }))
                  }
                />
                <p className="text-muted-foreground text-sm">
                  A brief overview of your professional background and key
                  strengths
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>
                    Your professional work history
                  </CardDescription>
                </div>
                <Dialog
                  open={isAddingExperience}
                  onOpenChange={setIsAddingExperience}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Experience
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add Work Experience</DialogTitle>
                      <DialogDescription>
                        Add a new position to your work history
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input
                            id="jobTitle"
                            placeholder="e.g., Software Engineer"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" placeholder="e.g., Tech Corp" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobLocation">Location</Label>
                        <Input
                          id="jobLocation"
                          placeholder="e.g., San Francisco, CA"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input id="startDate" type="month" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date</Label>
                          <Input id="endDate" type="month" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobDescription">Description</Label>
                        <Textarea
                          id="jobDescription"
                          placeholder="• Describe your key responsibilities and achievements..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingExperience(false)}
                      >
                        Cancel
                      </Button>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        Add Experience
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.experience.map((exp) => (
                <Card key={exp.id} className="border-l-4 border-l-orange-500">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                        <p className="text-muted-foreground">
                          {exp.company} • {exp.location}
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {exp.startDate} -{" "}
                          {exp.current ? "Present" : exp.endDate}
                          {exp.current && (
                            <Badge className="ml-2 bg-green-100 text-green-800">
                              Current
                            </Badge>
                          )}
                        </p>
                        <div className="mt-3 text-sm whitespace-pre-line">
                          {exp.description}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Your academic background</CardDescription>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.education.map((edu) => (
                <Card key={edu.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-muted-foreground">
                          {edu.school} • {edu.location}
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          Graduated {edu.graduationDate} • GPA: {edu.gpa}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Skills & Technologies</CardTitle>
                  <CardDescription>
                    Your technical and professional skills
                  </CardDescription>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Programming Languages", "Frameworks", "Cloud"].map(
                  (category) => (
                    <div key={category}>
                      <h3 className="mb-3 font-medium">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills
                          .filter((skill) => skill.category === category)
                          .map((skill) => (
                            <Badge
                              key={skill.id}
                              variant="secondary"
                              className="flex items-center space-x-2 px-3 py-1 text-sm"
                            >
                              <span>{skill.name}</span>
                              <span className="text-muted-foreground text-xs">
                                ({skill.level})
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-red-100"
                              >
                                <Trash2 className="h-3 w-3 text-red-600" />
                              </Button>
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>
                    Showcase your key projects and portfolio work
                  </CardDescription>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.projects.map((project) => (
                <Card
                  key={project.id}
                  className="border-l-4 border-l-purple-500"
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {project.name}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {project.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-muted-foreground mt-2 text-sm">
                          {project.startDate} - {project.endDate}
                        </p>
                        {project.url && (
                          <a
                            href={project.url}
                            className="mt-1 block text-sm text-orange-600 hover:underline"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Tab */}
        <TabsContent value="other" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>
                  Professional certifications and licenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground py-8 text-center">
                  <Award className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>No certifications added yet</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
                <CardDescription>Languages you speak</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground py-8 text-center">
                  <Globe className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>No languages added yet</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Language
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Awards & Honors</CardTitle>
                <CardDescription>Recognition and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground py-8 text-center">
                  <Award className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>No awards added yet</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Award
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Volunteer Experience</CardTitle>
                <CardDescription>
                  Community service and volunteer work
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground py-8 text-center">
                  <User className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>No volunteer experience added yet</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
