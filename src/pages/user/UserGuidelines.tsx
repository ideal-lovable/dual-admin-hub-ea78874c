import { AdminLayout } from "@/layouts/AdminLayout";
import { BookOpen, AlertTriangle, CheckCircle2, Shield, Video, ShoppingBag, Radio, Users, FileText } from "lucide-react";

const guidelines = [
  {
    icon: Video,
    title: "Content Standards",
    items: [
      "All uploaded videos must be original or properly licensed content",
      "Videos are reviewed by FVRD TV admins before going live",
      "Content must not contain hate speech, violence, or explicit material",
      "Minimum video quality: 720p resolution recommended",
      "Include clear titles, descriptions, and relevant tags",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Product Promotion Rules",
    items: [
      "You can only promote products you've been approved to represent",
      "Admin assigns creator → product access based on business contracts",
      "Always disclose sponsored/promotional content clearly",
      "Do not make false or misleading claims about products",
      "Product links must direct to verified FVRD TV storefronts only",
    ],
  },
  {
    icon: Radio,
    title: "Livestream Guidelines",
    items: [
      "Schedule livestreams in advance for admin review",
      "Only feature products you have been approved to promote",
      "Maintain professional and respectful behavior at all times",
      "Engage with viewers authentically — no bots or fake engagement",
      "Technical requirements: stable internet, good lighting, clear audio",
    ],
  },
  {
    icon: Users,
    title: "Community Standards",
    items: [
      "Treat all viewers, businesses, and fellow creators with respect",
      "Do not engage in harassment, spam, or deceptive practices",
      "Report any violations or concerns to FVRD TV support",
      "Collaborate ethically with businesses and other creators",
      "Maintain transparency with your audience at all times",
    ],
  },
  {
    icon: FileText,
    title: "Creator Picks Policy",
    items: [
      "Recommend shows, movies, products, and content you genuinely enjoy",
      "Creator Picks appear in the Discover tab for your audience",
      "Picks must comply with all FVRD TV content standards",
      "You may update your picks at any time from your dashboard",
      "Sponsored picks must be clearly labeled as such",
    ],
  },
  {
    icon: Shield,
    title: "Account & Compliance",
    items: [
      "Keep your profile information accurate and up to date",
      "Do not share account credentials with others",
      "Comply with all applicable laws and regulations",
      "FVRD TV reserves the right to suspend accounts violating policies",
      "Review updated guidelines regularly — changes are communicated via email",
    ],
  },
];

export default function UserGuidelines() {
  return (
    <AdminLayout type="user" title="Guidelines" subtitle="Creator rules, platform policies, and best practices">
      <div className="space-y-6 animate-slide-up">
        {/* Important Notice */}
        <div className="glass-card rounded-xl p-6 border-l-4 border-warning">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0" />
            <div>
              <h3 className="font-display font-semibold text-foreground mb-2">Important Notice</h3>
              <p className="text-sm text-muted-foreground">
                All creators must follow these guidelines to maintain their account in good standing. 
                Violations may result in content removal, temporary suspension, or permanent account termination. 
                If you have questions, contact FVRD TV support.
              </p>
            </div>
          </div>
        </div>

        {/* Guidelines Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {guidelines.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="glass-card rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 p-5 border-b border-border">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">{section.title}</h3>
                </div>
                <ul className="p-5 space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Acknowledgement */}
        <div className="glass-card rounded-xl p-6 text-center">
          <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="font-display font-semibold text-foreground mb-2">Stay Updated</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Guidelines are updated periodically. You'll be notified of any changes via email. 
            Last updated: February 2026.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
