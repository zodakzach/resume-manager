"use client";

import { useState, useEffect } from "react";
import { Save, Key, Trash2, Eye, EyeOff } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");

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
    await authClient.updateUser({ name });
    alert("Settings saved");
  };

  const handleTestConnection = async () => {
    try {
      const res = await fetch("/api/openai/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey })
      });
      if (!res.ok) throw new Error("Connection failed");
      alert("API Key is valid");
    } catch (e) {
      alert(e instanceof Error ? e.message : String(e));
    }
  };

  const handleDeleteAccount = async () => {
    await authClient.deleteUser();
  };

  if (currentUser === undefined) return null;
  if (currentUser === null) {
    return <p>You must be signed in to view settings.</p>;
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, API keys, and security settings
          </p>
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={handleSave}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="integrations">API Keys</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                View and edit your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Key className="h-4 w-4" />
                <AlertTitle>OpenAI API Key</AlertTitle>
                <AlertDescription>
                  Configure your OpenAI API key to enable AI-powered features.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="apiKey">OpenAI API Key</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-full px-3"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  <Button variant="outline" onClick={handleTestConnection}>
                    Test Connection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security & Privacy</CardTitle>
              <CardDescription>Delete your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />

              <div className="space-y-4 rounded-lg border border-red-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-red-600">Delete Account</Label>
                    <p className="text-muted-foreground text-sm">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove all your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
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
