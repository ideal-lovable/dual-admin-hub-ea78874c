import { useState } from "react";
import { BusinessLayout } from "@/layouts/BusinessLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Paperclip, MoreHorizontal, Circle, ArrowLeft } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const initialConversations = [
  { id: 1, name: "Sarah M.", avatar: "SM", lastMessage: "When will my order ship?", time: "2m ago", unread: 2, status: "online" as const },
  { id: 2, name: "James T.", avatar: "JT", lastMessage: "Can I get a size exchange?", time: "15m ago", unread: 1, status: "online" as const },
  { id: 3, name: "Emily R.", avatar: "ER", lastMessage: "Love the new collection!", time: "1h ago", unread: 0, status: "offline" as const },
  { id: 4, name: "David K.", avatar: "DK", lastMessage: "Is the denim jacket back in stock?", time: "3h ago", unread: 0, status: "offline" as const },
  { id: 5, name: "Maria L.", avatar: "ML", lastMessage: "Thanks for the quick response!", time: "1d ago", unread: 0, status: "offline" as const },
];

const initialMessages: Record<number, { id: number; sender: string; text: string; time: string }[]> = {
  1: [
    { id: 1, sender: "customer", text: "Hi! I placed order #12345 two days ago. When will it ship?", time: "2:30 PM" },
    { id: 2, sender: "business", text: "Hi Sarah! Thanks for reaching out. Let me check on that for you.", time: "2:32 PM" },
    { id: 3, sender: "business", text: "Your order is being packed now and should ship by end of day today. You'll receive a tracking number via email.", time: "2:33 PM" },
    { id: 4, sender: "customer", text: "When will my order ship?", time: "2:45 PM" },
  ],
  2: [
    { id: 1, sender: "customer", text: "Hey, I ordered the silk blouse in medium but I need a large. Can I exchange?", time: "1:00 PM" },
    { id: 2, sender: "business", text: "Of course! I'll send you a prepaid return label. Once we receive the medium, we'll ship the large right away.", time: "1:15 PM" },
    { id: 3, sender: "customer", text: "Can I get a size exchange?", time: "1:20 PM" },
  ],
  3: [{ id: 1, sender: "customer", text: "Love the new collection!", time: "11:00 AM" }],
  4: [{ id: 1, sender: "customer", text: "Is the denim jacket back in stock?", time: "9:00 AM" }],
  5: [{ id: 1, sender: "customer", text: "Thanks for the quick response!", time: "Yesterday" }],
};

export default function BusinessMessages() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConv, setActiveConv] = useState<number | null>(1);
  const [allMessages, setAllMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  // On mobile, null activeConv = show list, number = show chat
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const activeConversation = conversations.find(c => c.id === activeConv);
  const messages = activeConv ? allMessages[activeConv] || [] : [];
  const filteredConvs = searchQuery ? conversations.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())) : conversations;

  const handleSelectConv = (id: number) => {
    setActiveConv(id);
    setConversations(conversations.map(c => c.id === id ? { ...c, unread: 0 } : c));
    if (isMobile) setMobileView("chat");
  };

  const handleSend = () => {
    if (!newMessage.trim() || !activeConv) return;
    const msg = { id: Date.now(), sender: "business", text: newMessage, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) };
    setAllMessages({ ...allMessages, [activeConv]: [...(allMessages[activeConv] || []), msg] });
    setConversations(conversations.map(c => c.id === activeConv ? { ...c, lastMessage: newMessage, time: "Just now" } : c));
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const showList = !isMobile || mobileView === "list";
  const showChat = !isMobile || mobileView === "chat";

  return (
    <BusinessLayout title="Messages" subtitle="Customer conversations" breadcrumbs={[{ label: "Business", path: "/business/dashboard" }, { label: "Messages" }]}>
      <div className="animate-slide-up">
        <div className="glass-card rounded-xl overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
          <div className="flex h-full">
            {/* Conversation List */}
            {showList && (
              <div className={`${isMobile ? "w-full" : "w-80"} border-r border-border flex flex-col`}>
                <div className="p-3 md:p-4 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search conversations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-secondary border-border" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {filteredConvs.map((conv) => (
                    <div key={conv.id} className={`flex items-center gap-3 p-3 md:p-4 cursor-pointer transition-colors hover:bg-secondary/50 ${conv.id === activeConv ? "bg-secondary/80" : ""}`}
                      onClick={() => handleSelectConv(conv.id)}>
                      <div className="relative flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">{conv.avatar}</div>
                        {conv.status === "online" && <Circle className="absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-success text-success" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between"><span className="font-medium text-sm text-foreground">{conv.name}</span><span className="text-xs text-muted-foreground">{conv.time}</span></div>
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && <Badge className="bg-primary text-primary-foreground h-5 w-5 flex items-center justify-center p-0 text-xs flex-shrink-0">{conv.unread}</Badge>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Area */}
            {showChat && (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between p-3 md:p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    {isMobile && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setMobileView("list")}>
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">{activeConversation?.avatar}</div>
                    <div><h3 className="font-semibold text-foreground text-sm md:text-base">{activeConversation?.name}</h3><span className={`text-xs ${activeConversation?.status === "online" ? "text-success" : "text-muted-foreground"}`}>{activeConversation?.status === "online" ? "Online" : "Offline"}</span></div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover border-border">
                      <DropdownMenuItem className="cursor-pointer" onClick={() => toast.info(`Viewing ${activeConversation?.name}'s order history`)}>View Order History</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => toast.info("Conversation marked as resolved")}>Mark as Resolved</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => toast.info("Conversation archived")}>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "business" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-3 md:px-4 py-2 md:py-2.5 ${msg.sender === "business" ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === "business" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 md:p-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground flex-shrink-0" onClick={() => toast.info("File attachment dialog would open here")}><Paperclip className="h-5 w-5" /></Button>
                    <Input placeholder="Type a message..." className="flex-1 bg-secondary border-border" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} />
                    <Button size="icon" className="gradient-primary text-primary-foreground flex-shrink-0" onClick={handleSend} disabled={!newMessage.trim()}><Send className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BusinessLayout>
  );
}