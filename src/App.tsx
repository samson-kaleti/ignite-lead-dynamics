import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LeadsPage from "./pages/LeadsPage";
import TasksPage from "./pages/TasksPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CampaignsPage from "./pages/CampaignsPage";
import LeadProfilePage from "./pages/LeadProfilePage";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./components/layout/MainLayout";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            } 
          />
          <Route 
            path="/leads" 
            element={
              <MainLayout>
                <LeadsPage />
              </MainLayout>
            } 
          />
          <Route 
            path="/leads/:id" 
            element={
              <MainLayout>
                <LeadProfilePage />
              </MainLayout>
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <MainLayout>
                <TasksPage />
              </MainLayout>
            } 
          />
          <Route 
            path="/campaigns" 
            element={
              <MainLayout>
                <CampaignsPage />
              </MainLayout>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <MainLayout>
                <AnalyticsPage />
              </MainLayout>
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <MainLayout>
                <CalendarPage />
              </MainLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <MainLayout>
                <SettingsPage />
              </MainLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
