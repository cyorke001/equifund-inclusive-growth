// Shared mock data for institution dashboard demo

export interface Applicant {
  id: number;
  name: string;
  founder: string;
  industry: string;
  score: number;
  opportunityScore: number;
  risk: "low" | "medium" | "high";
  status: "new" | "in_review" | "needs_info" | "shortlisted" | "approved" | "rejected" | "deferred";
  location: string;
  revenue: string;
  revenueNum: number;
  funding: string;
  fundingNum: number;
  communityImpact: number;
  yearsInOperation: number;
  teamSize: number;
  docCompletion: number;
  stage: string;
  description: string;
  lenderFit: number;
  flags: string[];
  notes: NoteEntry[];
  recommendedFunding: string;
  recommendedAction: string;
  improvementSteps: string[];
  submittedDate: string;
}

export interface NoteEntry {
  id: number;
  author: string;
  text: string;
  date: string;
}

export interface Alert {
  id: number;
  applicantId: number;
  applicantName: string;
  type: "missing_docs" | "high_risk" | "stale" | "inconsistent" | "policy_violation" | "incomplete";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  date: string;
  resolved: boolean;
}

export interface InstitutionCriteria {
  preferredIndustries: string[];
  targetGeography: string[];
  riskRange: [number, number]; // min, max (1=low, 3=high)
  fundingMin: number;
  fundingMax: number;
  stagePreference: string[];
  revenueMin: number;
  impactPriority: boolean;
  equityFocus: boolean;
}

export const defaultCriteria: InstitutionCriteria = {
  preferredIndustries: ["Technology", "Healthcare", "Food & Beverage"],
  targetGeography: ["Ontario", "British Columbia", "Quebec"],
  riskRange: [1, 2],
  fundingMin: 10000,
  fundingMax: 500000,
  stagePreference: ["Growth", "Established"],
  revenueMin: 25000,
  impactPriority: true,
  equityFocus: true,
};

export const mockApplicants: Applicant[] = [
  {
    id: 1, name: "Maple Leaf Catering", founder: "Amara Osei", industry: "Food & Beverage", score: 78, opportunityScore: 82,
    risk: "low", status: "in_review", location: "Toronto, ON", revenue: "$120K", revenueNum: 120000,
    funding: "$50K", fundingNum: 50000, communityImpact: 85, yearsInOperation: 3, teamSize: 8,
    docCompletion: 90, stage: "Growth", description: "Afro-Caribbean catering company with 3 years of consistent growth, strong community ties, and repeat corporate clients.",
    lenderFit: 88, flags: [], notes: [{ id: 1, author: "J. Williams", text: "Strong local reputation. Revenue trend is positive.", date: "2026-03-08" }],
    recommendedFunding: "Small Business Loan", recommendedAction: "Approve with standard terms",
    improvementSteps: ["Complete tax filing documentation", "Add 6-month cash flow projection"], submittedDate: "2026-02-28",
  },
  {
    id: 2, name: "TechBridge Solutions", founder: "Marcus Chen", industry: "Technology", score: 85, opportunityScore: 91,
    risk: "low", status: "shortlisted", location: "Vancouver, BC", revenue: "$340K", revenueNum: 340000,
    funding: "$150K", fundingNum: 150000, communityImpact: 72, yearsInOperation: 5, teamSize: 14,
    docCompletion: 95, stage: "Established", description: "B2B SaaS platform connecting underserved communities with financial literacy tools. Strong MRR and low churn.",
    lenderFit: 92, flags: [], notes: [{ id: 1, author: "S. Patel", text: "Excellent metrics. Recommend fast-track.", date: "2026-03-05" }],
    recommendedFunding: "Growth Financing", recommendedAction: "Approve with standard terms",
    improvementSteps: [], submittedDate: "2026-02-20",
  },
  {
    id: 3, name: "Heritage Arts Co-op", founder: "Fatima Abdi", industry: "Arts & Culture", score: 52, opportunityScore: 68,
    risk: "medium", status: "needs_info", location: "Montreal, QC", revenue: "$25K", revenueNum: 25000,
    funding: "$20K", fundingNum: 20000, communityImpact: 91, yearsInOperation: 1, teamSize: 4,
    docCompletion: 55, stage: "Early", description: "Cooperative gallery and workshop space supporting immigrant artists. Very high community impact but limited financial history.",
    lenderFit: 58, flags: ["Missing financial statements", "Low documentation completeness"],
    notes: [{ id: 1, author: "J. Williams", text: "Community impact is exceptional. Consider grant pathway.", date: "2026-03-09" }],
    recommendedFunding: "Community Development Grant", recommendedAction: "Request more documentation",
    improvementSteps: ["Upload financial statements", "Provide partnership letters", "Complete business plan"], submittedDate: "2026-03-01",
  },
  {
    id: 4, name: "GreenField Agriculture", founder: "David Mensah", industry: "Agriculture", score: 64, opportunityScore: 71,
    risk: "medium", status: "in_review", location: "Winnipeg, MB", revenue: "$85K", revenueNum: 85000,
    funding: "$75K", fundingNum: 75000, communityImpact: 88, yearsInOperation: 2, teamSize: 6,
    docCompletion: 75, stage: "Growth", description: "Urban farming operation supplying fresh produce to food deserts. Seasonal revenue pattern with strong summer peaks.",
    lenderFit: 72, flags: ["Seasonal revenue variability"],
    notes: [], recommendedFunding: "Small Business Loan + Grant",
    recommendedAction: "Approve with conditions",
    improvementSteps: ["Provide 12-month revenue breakdown", "Add winter revenue strategy"], submittedDate: "2026-02-25",
  },
  {
    id: 5, name: "Urban Wellness Clinic", founder: "Dr. Aisha Kone", industry: "Healthcare", score: 91, opportunityScore: 94,
    risk: "low", status: "approved", location: "Calgary, AB", revenue: "$500K", revenueNum: 500000,
    funding: "$200K", fundingNum: 200000, communityImpact: 79, yearsInOperation: 7, teamSize: 22,
    docCompletion: 100, stage: "Established", description: "Community health clinic serving underserved neighborhoods. Fully documented, strong financials, and expanding to second location.",
    lenderFit: 96, flags: [],
    notes: [{ id: 1, author: "S. Patel", text: "Top-tier applicant. Approved for full amount.", date: "2026-03-02" }],
    recommendedFunding: "Bank Loan", recommendedAction: "Approve with standard terms",
    improvementSteps: [], submittedDate: "2026-02-15",
  },
  {
    id: 6, name: "Nova Construction", founder: "James Okafor", industry: "Construction", score: 38, opportunityScore: 42,
    risk: "high", status: "rejected", location: "Edmonton, AB", revenue: "$10K", revenueNum: 10000,
    funding: "$100K", fundingNum: 100000, communityImpact: 65, yearsInOperation: 0, teamSize: 2,
    docCompletion: 30, stage: "Idea", description: "Pre-revenue construction startup. Founder has industry experience but no business track record or documentation.",
    lenderFit: 25, flags: ["Pre-revenue", "Incomplete documentation", "High funding relative to stage", "No business plan"],
    notes: [{ id: 1, author: "J. Williams", text: "Referred to incubator program. Not loan-ready.", date: "2026-03-07" }],
    recommendedFunding: "Incubator / Readiness Grant", recommendedAction: "Refer to community lender",
    improvementSteps: ["Complete business plan", "Obtain contractor licensing", "Build 6-month revenue history", "Attend financial literacy workshop"], submittedDate: "2026-03-03",
  },
  {
    id: 7, name: "EduConnect Platform", founder: "Leila Hassan", industry: "Education", score: 71, opportunityScore: 78,
    risk: "low", status: "new", location: "Ottawa, ON", revenue: "$60K", revenueNum: 60000,
    funding: "$40K", fundingNum: 40000, communityImpact: 82, yearsInOperation: 2, teamSize: 5,
    docCompletion: 80, stage: "Growth", description: "Ed-tech platform offering culturally responsive tutoring. Growing user base with strong retention metrics.",
    lenderFit: 81, flags: [],
    notes: [], recommendedFunding: "Small Business Loan",
    recommendedAction: "Approve with standard terms",
    improvementSteps: ["Provide updated user growth metrics"], submittedDate: "2026-03-10",
  },
  {
    id: 8, name: "Silk Route Imports", founder: "Yusuf Ali", industry: "Retail", score: 45, opportunityScore: 55,
    risk: "high", status: "new", location: "Halifax, NS", revenue: "Pre-revenue", revenueNum: 0,
    funding: "$15K", fundingNum: 15000, communityImpact: 70, yearsInOperation: 0, teamSize: 1,
    docCompletion: 45, stage: "Idea", description: "Import business connecting African artisan goods with Canadian consumers. Pre-revenue with supplier relationships established.",
    lenderFit: 40, flags: ["Pre-revenue", "Solo founder"],
    notes: [], recommendedFunding: "Microloan",
    recommendedAction: "Recommend microloan or grant",
    improvementSteps: ["Establish e-commerce presence", "Complete market validation", "Secure initial orders"], submittedDate: "2026-03-09",
  },
  {
    id: 9, name: "BrightPath Consulting", founder: "Ngozi Eze", industry: "Professional Services", score: 74, opportunityScore: 76,
    risk: "low", status: "in_review", location: "Toronto, ON", revenue: "$180K", revenueNum: 180000,
    funding: "$60K", fundingNum: 60000, communityImpact: 74, yearsInOperation: 4, teamSize: 7,
    docCompletion: 85, stage: "Established", description: "DEI consulting firm with Fortune 500 clients. Seeking expansion capital for new service lines.",
    lenderFit: 84, flags: [],
    notes: [{ id: 1, author: "S. Patel", text: "Solid revenue, clear growth plan.", date: "2026-03-06" }],
    recommendedFunding: "Revenue-Based Financing", recommendedAction: "Approve with standard terms",
    improvementSteps: ["Provide client pipeline forecast"], submittedDate: "2026-02-22",
  },
  {
    id: 10, name: "Roots & Harvest", founder: "Grace Nyamwasa", industry: "Food & Beverage", score: 59, opportunityScore: 67,
    risk: "medium", status: "deferred", location: "Saskatoon, SK", revenue: "$35K", revenueNum: 35000,
    funding: "$30K", fundingNum: 30000, communityImpact: 86, yearsInOperation: 1, teamSize: 3,
    docCompletion: 65, stage: "Early", description: "Farm-to-table meal prep service focusing on traditional African recipes. Growing demand but needs operational scale.",
    lenderFit: 62, flags: ["Limited financial history"],
    notes: [{ id: 1, author: "J. Williams", text: "Deferred pending 3 more months of revenue data.", date: "2026-03-04" }],
    recommendedFunding: "Microloan + Advisory Support", recommendedAction: "Defer until readiness improves",
    improvementSteps: ["Build 3-month revenue track record", "Formalize supplier agreements", "Complete food safety certification"], submittedDate: "2026-02-18",
  },
];

export const mockAlerts: Alert[] = [
  { id: 1, applicantId: 3, applicantName: "Heritage Arts Co-op", type: "missing_docs", severity: "medium", message: "Financial statements not uploaded. Application cannot proceed without them.", date: "2026-03-09", resolved: false },
  { id: 2, applicantId: 6, applicantName: "Nova Construction", type: "high_risk", severity: "high", message: "Funding request ($100K) is disproportionate to business stage and revenue ($10K).", date: "2026-03-07", resolved: false },
  { id: 3, applicantId: 6, applicantName: "Nova Construction", type: "incomplete", severity: "critical", message: "Documentation completeness at 30%. Missing business plan, financials, and licensing.", date: "2026-03-07", resolved: false },
  { id: 4, applicantId: 8, applicantName: "Silk Route Imports", type: "incomplete", severity: "medium", message: "Pre-revenue applicant with 45% documentation. Consider microloan pathway.", date: "2026-03-09", resolved: false },
  { id: 5, applicantId: 4, applicantName: "GreenField Agriculture", type: "inconsistent", severity: "low", message: "Revenue shows seasonal variability. Request monthly breakdown for risk assessment.", date: "2026-03-06", resolved: false },
  { id: 6, applicantId: 10, applicantName: "Roots & Harvest", type: "stale", severity: "low", message: "Application deferred 5 days ago. Follow up for additional documentation.", date: "2026-03-09", resolved: false },
];

export const pipelineStages = ["new", "in_review", "needs_info", "shortlisted", "approved", "rejected", "deferred"] as const;

export const stageLabels: Record<string, string> = {
  new: "New",
  in_review: "In Review",
  needs_info: "Needs Info",
  shortlisted: "Shortlisted",
  approved: "Approved",
  rejected: "Rejected",
  deferred: "Deferred",
};

export const stageColors: Record<string, string> = {
  new: "bg-equi-sky/15 text-equi-sky border-equi-sky/30",
  in_review: "bg-primary/10 text-primary border-primary/30",
  needs_info: "bg-accent/10 text-accent border-accent/30",
  shortlisted: "bg-equi-green/10 text-equi-green border-equi-green/30",
  approved: "bg-secondary/10 text-secondary border-secondary/30",
  rejected: "bg-destructive/10 text-destructive border-destructive/30",
  deferred: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30",
};

export const industries = [...new Set(mockApplicants.map(a => a.industry))];
export const locations = [...new Set(mockApplicants.map(a => a.location))];
