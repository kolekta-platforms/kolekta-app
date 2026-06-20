// lib/expense-categories.ts

export interface ExpenseExample {
  label: string;
  typical: number; // annual KES
}

export interface ExpenseCategory {
  id: string;
  icon: string;
  label: string;
  description: string;
  whatQualifies: string[];
  whatDoesNot: string[];
  kenyanExamples: ExpenseExample[];
  tipText: string;
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    id: "equipment",
    icon: "📷",
    label: "Equipment & Gear",
    description: "Physical tools you bought to do your work",
    whatQualifies: [
      "Cameras, lenses, tripods, lighting rigs",
      "Computers, tablets, external drives, microphones",
      "Musical instruments, studio monitors, mixers",
      "Sewing machines, printing equipment, hand tools",
      "Repairs and maintenance of business equipment",
    ],
    whatDoesNot: [
      "Personal phone not used for work",
      "Equipment bought before you started your business",
      "Household items that occasionally get used for work",
    ],
    kenyanExamples: [
      { label: "Sony mirrorless camera", typical: 150000 },
      { label: "MacBook Pro", typical: 200000 },
      { label: "DJI drone", typical: 120000 },
      { label: "Studio microphone", typical: 35000 },
    ],
    tipText:
      "You can claim the full cost of equipment in the year you bought it",
  },
  {
    id: "software",
    icon: "💻",
    label: "Software & Subscriptions",
    description: "Digital tools and platforms you pay for",
    whatQualifies: [
      "Adobe Creative Cloud, Final Cut Pro, Logic Pro",
      "Canva Pro, Figma, Notion, Slack paid plans",
      "Cloud storage — Google Drive, Dropbox",
      "Website hosting and domain names",
      "Accounting or invoicing software",
    ],
    whatDoesNot: [
      "Netflix, Spotify, or other personal entertainment",
      "Gaming apps or non-work software",
    ],
    kenyanExamples: [
      { label: "Adobe Creative Cloud (annual)", typical: 72000 },
      { label: "Canva Pro", typical: 15000 },
      { label: "Hosting + domain", typical: 12000 },
      { label: "Notion / project tools", typical: 8000 },
    ],
    tipText:
      "Monthly subscriptions add up — KES 5,000/month is KES 60,000 a year",
  },
  {
    id: "transport",
    icon: "🚗",
    label: "Transport to Jobs",
    description: "Getting to and from paid work",
    whatQualifies: [
      "Uber, Bolt, Little rides to client locations",
      "Matatu and bus fare to shoot locations or meetings",
      "Fuel if you use your own vehicle for work trips",
      "Parking fees at client locations",
      "Travel to source materials or supplies",
    ],
    whatDoesNot: [
      "Daily commute to a regular fixed workplace",
      "Personal trips that happen to involve some work",
      "Traffic fines or penalties",
    ],
    kenyanExamples: [
      { label: "Weekly Uber to shoots (annual)", typical: 48000 },
      { label: "Matatu for business errands", typical: 18000 },
      { label: "Fuel for client visits", typical: 60000 },
    ],
    tipText:
      "Your Uber and Bolt receipts are automatically emailed to you — easy to track",
  },
  {
    id: "communication",
    icon: "📱",
    label: "Phone & Internet",
    description: "Communication costs used for your work",
    whatQualifies: [
      "Business phone line or work SIM airtime",
      "Fibre or home internet used for work",
      "Work portion of your personal phone bill",
    ],
    whatDoesNot: [
      "Full personal phone bill if mostly personal use",
      "Entertainment data bundles",
    ],
    kenyanExamples: [
      { label: "Safaricom Fibre (annual)", typical: 36000 },
      { label: "Work airtime and bundles", typical: 24000 },
    ],
    tipText: "If you use your phone 60% for work you can claim 60% of the bill",
  },
  {
    id: "homeoffice",
    icon: "🏠",
    label: "Home Office",
    description: "A portion of your home costs if you work from home",
    whatQualifies: [
      "Proportional share of rent for your workspace",
      "Electricity used for work",
      "Furniture bought specifically for your workspace",
    ],
    whatDoesNot: [
      "Your full rent — only the workspace portion",
      "General home repairs unrelated to your workspace",
      "Mortgage capital repayments",
    ],
    kenyanExamples: [
      { label: "1 room of 3BR flat as office", typical: 60000 },
      { label: "Electricity — work portion", typical: 18000 },
    ],
    tipText:
      "Divide your rent by number of rooms — one room as office is a fair claim",
  },
  {
    id: "marketing",
    icon: "📣",
    label: "Marketing & Promotion",
    description: "Getting your work in front of clients",
    whatQualifies: [
      "Instagram, Facebook, TikTok paid promotions",
      "Business cards, flyers, branding materials",
      "Website design and development costs",
      "Portfolio printing or hosting",
    ],
    whatDoesNot: [
      "Personal social media not business focused",
      "Gifts to clients above a reasonable value",
    ],
    kenyanExamples: [
      { label: "Instagram ads (annual)", typical: 36000 },
      { label: "Business cards and branding", typical: 8000 },
      { label: "Website design", typical: 50000 },
    ],
    tipText: "Any money spent getting clients is almost always claimable",
  },
  {
    id: "training",
    icon: "🎓",
    label: "Training & Development",
    description: "Learning that makes you better at your work",
    whatQualifies: [
      "Online courses directly related to your work",
      "Industry conferences and workshops",
      "Books and publications for your field",
      "Professional memberships and associations",
    ],
    whatDoesNot: [
      "General education not related to your current work",
      "Courses for a completely different career",
    ],
    kenyanExamples: [
      { label: "Udemy / Coursera courses", typical: 15000 },
      { label: "Industry workshop", typical: 30000 },
      { label: "Professional membership fees", typical: 12000 },
    ],
    tipText:
      "Investing in your skills is investing in your business — KRA agrees",
  },
  {
    id: "professional",
    icon: "🧾",
    label: "Professional Services",
    description: "Experts you paid to help run your business",
    whatQualifies: [
      "Accountant or tax agent fees",
      "Lawyer fees for business contracts",
      "Freelancer or assistant payments",
      "Business bank charges and fees",
    ],
    whatDoesNot: [
      "Personal legal matters unrelated to business",
      "Fines or penalties of any kind",
    ],
    kenyanExamples: [
      { label: "Annual accountant fee", typical: 30000 },
      { label: "Freelancer payments", typical: 80000 },
      { label: "Bank charges", typical: 6000 },
    ],
    tipText:
      "Even this Kolekta subscription — when we launch — will be claimable",
  },
];
