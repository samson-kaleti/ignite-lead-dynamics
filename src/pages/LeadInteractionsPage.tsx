
import { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Plus, 
  Clock, 
  Calendar,
  PhoneCall,
  Video,
  Mail,
  MessageSquare,
  BarChart2,
  DollarSign,
  ArrowUpRight
} from "lucide-react";
import { LeadInteraction } from "@/components/leads/LeadInteraction";
import { LeadScoring } from "@/components/leads/LeadScoring";
import { LeadCostEstimation } from "@/components/leads/LeadCostEstimation";
import { LeadScoreIndicator } from "@/components/leads/LeadScoreIndicator";

// Mock data for lead interactions
const mockInteractions = [
  {
    id: "1",
    type: "Call",
    title: "Initial Discovery Call",
    description: "Discussed project requirements and timeline. Client is interested in our enterprise solution.",
    date: new Date(2023, 9, 15, 14, 30),
    nextMeetingDate: new Date(2023, 9, 22, 10, 0),
    createdAt: new Date(2023, 9, 15, 15, 45),
    createdBy: "John Doe",
  },
  {
    id: "2",
    type: "Email",
    title: "Sent Requirements Document",
    description: "Emailed the detailed requirements document and pricing information as requested during our call.",
    date: new Date(2023, 9, 16, 9, 15),
    nextMeetingDate: null,
    createdAt: new Date(2023, 9, 16, 9, 20),
    createdBy: "John Doe",
  },
  {
    id: "3",
    type: "Video",
    title: "Product Demo Meeting",
    description: "Conducted a product demonstration via Google Meet. The client had questions about specific features and integration capabilities.",
    date: new Date(2023, 9, 22, 10, 0),
    nextMeetingDate: new Date(2023, 9, 29, 14, 0),
    createdAt: new Date(2023, 9, 22, 11, 15),
    createdBy: "Sarah Johnson",
  },
  {
    id: "4",
    type: "Meeting",
    title: "Contract Discussion",
    description: "Met with the client's legal team to discuss contract terms. They requested some modifications to the SLA.",
    date: new Date(2023, 9, 29, 14, 0),
    nextMeetingDate: new Date(2023, 10, 5, 11, 0),
    createdAt: new Date(2023, 9, 29, 16, 30),
    createdBy: "John Doe",
  },
];

// Mock lead data
const mockLead = {
  id: "123",
  name: "James Cooper",
  company: "Acme Inc",
  title: "CTO",
  email: "james@acme.com",
  phone: "+1 (555) 123-4567",
  status: "Qualified",
  source: "Website",
  score: 78,
  estimatedCost: "45000",
  currency: "USD",
  assignedTo: "John Doe",
  createdAt: new Date(2023, 9, 10),
};

const getInteractionIcon = (type: string) => {
  switch (type) {
    case "Call":
      return <PhoneCall className="h-5 w-5" />;
    case "Video":
      return <Video className="h-5 w-5" />;
    case "Email":
      return <Mail className="h-5 w-5" />;
    case "Meeting":
      return <Calendar className="h-5 w-5" />;
    default:
      return <MessageSquare className="h-5 w-5" />;
  }
};

const getInteractionColor = (type: string) => {
  switch (type) {
    case "Call":
      return "bg-blue-100 text-blue-600";
    case "Video":
      return "bg-purple-100 text-purple-600";
    case "Email":
      return "bg-green-100 text-green-600";
    case "Meeting":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export default function LeadInteractionsPage() {
  const { id } = useParams<{ id: string }>();
  const [interactions, setInteractions] = useState(mockInteractions);
  const [isInteractionDialogOpen, setIsInteractionDialogOpen] = useState(false);
  
  const handleAddInteraction = (newInteraction: any) => {
    setInteractions([newInteraction, ...interactions]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <a href="/leads">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Lead Interactions</h1>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://avatar.vercel.sh/${mockLead.email}`} alt={mockLead.name} />
                  <AvatarFallback>
                    {mockLead.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{mockLead.name}</CardTitle>
                  <CardDescription>{mockLead.title} at {mockLead.company}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Status</div>
                  <Badge>{mockLead.status}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Score</div>
                  <LeadScoreIndicator score={mockLead.score} />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Source</div>
                  <div className="text-sm">{mockLead.source}</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Assigned To</div>
                  <div className="text-sm">{mockLead.assignedTo}</div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="text-sm font-medium mb-2">Contact Info</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${mockLead.email}`} className="text-primary underline">
                        {mockLead.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <PhoneCall className="h-4 w-4 text-gray-500" />
                      <a href={`tel:${mockLead.phone}`} className="text-primary underline">
                        {mockLead.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="text-sm font-medium mb-2">Estimated Cost</div>
                  <div className="text-xl font-bold">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: mockLead.currency,
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(Number(mockLead.estimatedCost))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 pt-4">
                  <Button className="w-full">
                    <PhoneCall className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Video className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Interaction History</CardTitle>
              <Dialog open={isInteractionDialogOpen} onOpenChange={setIsInteractionDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Interaction
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <LeadInteraction 
                    leadId={id || "123"} 
                    onClose={() => setIsInteractionDialogOpen(false)}
                    onInteractionAdded={handleAddInteraction}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {interactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No interactions yet</h3>
                    <p className="text-sm text-gray-500 max-w-sm mt-1">
                      Record your first interaction with this lead to keep track of your conversation history.
                    </p>
                    <Button className="mt-4" onClick={() => setIsInteractionDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Interaction
                    </Button>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-200" />
                    
                    {interactions.map((interaction, index) => (
                      <div key={interaction.id} className="relative mb-8 pl-12">
                        {/* Timeline dot */}
                        <div className={`absolute left-0 top-0 rounded-full p-2 ${getInteractionColor(interaction.type)}`}>
                          {getInteractionIcon(interaction.type)}
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 border">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium text-lg">{interaction.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatDate(interaction.date)}
                                </span>
                                <Badge variant="outline">{interaction.type}</Badge>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <p className="text-gray-700 mb-4">{interaction.description}</p>
                          
                          {interaction.nextMeetingDate && (
                            <div className="flex items-center gap-2 text-sm bg-secondary p-2 rounded">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>Next meeting: {formatDate(interaction.nextMeetingDate)}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 mt-4 pt-3 border-t text-xs text-gray-500">
                            <span>Recorded by {interaction.createdBy}</span>
                            <span>•</span>
                            <span>{formatDate(interaction.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <LeadScoring initialScore={mockLead.score} readOnly />
        <LeadCostEstimation initialCost={mockLead.estimatedCost} readOnly />
      </div>
    </div>
  );
}
