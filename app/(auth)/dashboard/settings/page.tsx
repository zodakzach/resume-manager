"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Key,
  Trash2,
  Eye,
  EyeOff,
  User,
  Shield,
  AlertCircle
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  // Load current user
  const currentUser = useQuery(api.auth.getCurrentUser);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setApiKey(currentUser.openAiApiKey || "");
    }
  }, [currentUser]);

  // Handlers
  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await authClient.updateUser({ name });
      setSaveStatus("saved");
      toast.success("Settings saved successfully");
    } catch (error) {
      setSaveStatus("error");
      toast.error("Failed to save settings. Please try again.");
    }
  };

  const handleTestConnection = async () => {
    try {
      const res = await fetch("/api/openai/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey })
      });
      if (!res.ok) throw new Error("Connection failed");
      toast.success("API Key is valid");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e));
    }
  };

  const handleDeleteAccount = async () => {
    await authClient.deleteUser();
    toast.success("Account deleted");
  };

  if (currentUser === undefined) return null;
  if (currentUser === null) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl flex-1 space-y-4 p-4 sm:space-y-6 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Settings
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your account, API keys, and security settings
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
          onClick={handleSave}
          disabled={saveStatus === "saving"}
        >
          <Save className="mr-2 h-4 w-4" />
          {saveStatus === "saving" ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="account" className="space-y-4 sm:space-y-6">
        <TabsList className="grid h-auto w-full grid-cols-3 p-1">
          <TabsTrigger
            value="account"
            className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm"
          >
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">API Keys</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm"
          >
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Profile Information
              </CardTitle>
              <CardDescription className="text-sm">
                View and edit your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <Input
                  value={currentUser.email || ""}
                  disabled
                  className="bg-muted w-full"
                />
                <p className="text-muted-foreground text-xs">
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="integrations" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">API Keys</CardTitle>
              <CardDescription className="text-sm">
                Manage your API integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-3">
                <Label htmlFor="apiKey" className="text-sm font-medium">
                  OpenAI API Key
                </Label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <Input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleTestConnection}
                    className="w-full sm:w-auto"
                    disabled={!apiKey.trim()}
                  >
                    Test Connection
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  Your API key is encrypted and stored securely.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Security & Privacy
              </CardTitle>
              <CardDescription className="text-sm">
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <Separator />
              <div className="border-destructive/20 bg-destructive/5 space-y-4 rounded-lg border p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <Label className="text-destructive font-medium">
                      Delete Account
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-destructive border-destructive/20 hover:bg-destructive/10 w-full sm:w-auto"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="mx-4 max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg">
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm">
                          This action cannot be undone. This will permanently
                          delete your account and remove all your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
                        <AlertDialogCancel className="w-full sm:w-auto">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground w-full sm:w-auto"
                          onClick={handleDeleteAccount}
                        >
                          Yes, delete my account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
