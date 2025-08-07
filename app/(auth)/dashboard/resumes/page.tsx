"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  FileText,
  Edit,
  Download,
  Copy,
  Trash2,
  Eye,
  Calendar,
  LayoutTemplateIcon as Template
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const mockResumes = [
  {
    id: 1,
    name: "Software Engineer Resume",
    description: "Tailored for full-stack development positions",
    lastModified: "2024-01-15T10:30:00Z",
    created: "2024-01-10T14:20:00Z",
    template: "Modern",
    status: "Complete",
    downloads: 5,
    pages: 1
  },
  {
    id: 2,
    name: "Product Manager Resume",
    description: "Focused on product strategy and team leadership",
    lastModified: "2024-01-14T16:45:00Z",
    created: "2024-01-12T09:15:00Z",
    template: "Professional",
    status: "Draft",
    downloads: 2,
    pages: 1
  },
  {
    id: 3,
    name: "Data Scientist Resume",
    description: "Emphasizing machine learning and analytics experience",
    lastModified: "2024-01-12T11:20:00Z",
    created: "2024-01-08T13:30:00Z",
    template: "Clean",
    status: "Complete",
    downloads: 8,
    pages: 2
  },
  {
    id: 4,
    name: "Frontend Developer Resume",
    description: "React and TypeScript focused",
    lastModified: "2024-01-10T14:15:00Z",
    created: "2024-01-05T10:45:00Z",
    template: "Creative",
    status: "Complete",
    downloads: 3,
    pages: 1
  },
  {
    id: 5,
    name: "DevOps Engineer Resume",
    description: "Cloud infrastructure and automation",
    lastModified: "2024-01-08T09:30:00Z",
    created: "2024-01-03T16:20:00Z",
    template: "Technical",
    status: "Draft",
    downloads: 1,
    pages: 1
  }
];

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional business format"
  },
  { id: "clean", name: "Clean", description: "Minimalist and elegant" },
  { id: "creative", name: "Creative", description: "Unique and eye-catching" },
  { id: "technical", name: "Technical", description: "Perfect for tech roles" }
];

export default function ResumesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newResumeName, setNewResumeName] = useState("");
  const [newResumeDescription, setNewResumeDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const filteredResumes = mockResumes.filter((resume) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      resume.name.toLowerCase().includes(q) ||
      resume.description.toLowerCase().includes(q);
    const matchesFilter =
      filterStatus === "all" || resume.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateResume = () => {
    console.log("Creating resume:", {
      newResumeName,
      newResumeDescription,
      selectedTemplate
    });
    setIsCreateDialogOpen(false);
    setNewResumeName("");
    setNewResumeDescription("");
    setSelectedTemplate("");
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Resumes
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage and organize all your resume versions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create New Resume
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Resume</DialogTitle>
              <DialogDescription>
                Give your resume a name and choose a template to get started.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Resume Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Software Engineer Resume"
                  value={newResumeName}
                  onChange={(e) => setNewResumeName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="Brief description of this resume's focus"
                  value={newResumeDescription}
                  onChange={(e) => setNewResumeDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="template">Template</Label>
                <Select
                  value={selectedTemplate}
                  onValueChange={setSelectedTemplate}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className="flex flex-col">
                          <span>{template.name}</span>
                          <span className="text-muted-foreground text-xs">
                            {template.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateResume}
                disabled={!newResumeName || !selectedTemplate}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Create Resume
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            placeholder="Search resumes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
            aria-label="Search resumes"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="All Resumes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Resumes</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockResumes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complete</CardTitle>
            <Badge className="bg-green-100 text-xs text-green-800">Ready</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockResumes.filter((r) => r.status === "Complete").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Badge variant="secondary" className="text-xs">
              In Progress
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockResumes.filter((r) => r.status === "Draft").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Downloads
            </CardTitle>
            <Download className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockResumes.reduce((sum, r) => sum + r.downloads, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResumes.map((resume) => (
          <Card key={resume.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded border bg-orange-100">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="truncate text-base sm:text-lg">
                      {resume.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {resume.description}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label="Open resume menu"
                    >
                      <span className="sr-only">Open menu</span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your resume &quot;{resume.name}&quot; and
                            remove it from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-muted-foreground mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Template className="h-3 w-3" />
                    <span>{resume.template}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>
                      {resume.pages} page{resume.pages > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <Badge
                  variant={
                    resume.status === "Complete" ? "default" : "secondary"
                  }
                  className={
                    resume.status === "Complete"
                      ? "bg-green-100 text-green-800"
                      : ""
                  }
                >
                  {resume.status}
                </Badge>
              </div>

              <div className="text-muted-foreground mb-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Modified {formatDate(resume.lastModified)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>{resume.downloads} downloads</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent sm:flex-initial"
                >
                  <Eye className="mr-1 h-3 w-3" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResumes.length === 0 && (
        <div className="py-12 text-center">
          <FileText className="text-muted-foreground mx-auto h-12 w-12" />
          <h3 className="mt-4 text-lg font-semibold">No resumes found</h3>
          <p className="text-muted-foreground mt-2">
            {searchQuery || filterStatus !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by creating your first resume."}
          </p>
          {!searchQuery && filterStatus === "all" && (
            <Button
              className="mt-4 bg-orange-500 hover:bg-orange-600"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Resume
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
