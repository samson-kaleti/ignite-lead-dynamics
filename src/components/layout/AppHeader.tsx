
import { BellRing, MessageSquare, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AppHeader() {
  return (
    <header className="border-b bg-white py-3 px-6 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search leads, tasks, etc..."
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <BellRing size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
