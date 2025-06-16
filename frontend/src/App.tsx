import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button"; // Example Shadcn component
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Initialize TanStack Query client
const queryClient = new QueryClient();

// Mock Pages (you'll replace these with actual content)
const HomePage = () => (
  <div className="p-8 space-y-4">
    <h1 className="text-3xl font-bold">Welcome to Rock 🧗‍♀️ Climbing Gym!</h1>
    <p className="text-lg text-muted-foreground">
      Your Web3-powered climbing gym experience.
    </p>
    <Button asChild>
      <Link to="/members">Go to Members</Link>
    </Button>
    <Button variant="secondary" asChild className="ml-4">
      <Link to="/settings">Settings (Admin)</Link>
    </Button>

    <Card className="mt-8 max-w-md">
      <CardHeader>
        <CardTitle>Member Check-in</CardTitle>
        <CardDescription>Enter member ID or scan code.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder="Member ID or Wallet Address" />
      </CardContent>
      <CardFooter>
        <Button>Check In</Button>
      </CardFooter>
    </Card>
  </div>
);

const MembersPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Members Dashboard (Mocked)</h1>
    <p>
      This page will list all members and their blockchain-verified statuses.
    </p>
    <Button asChild className="mt-4">
      <Link to="/">Back to Home</Link>
    </Button>
  </div>
);

const SettingsPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Admin Settings (Mocked)</h1>
    <p>This page will be for gym owners to configure settings.</p>
    <Button asChild className="mt-4">
      <Link to="/">Back to Home</Link>
    </Button>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background text-foreground font-sans antialiased">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Add more routes for POS, classes, etc. */}
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
