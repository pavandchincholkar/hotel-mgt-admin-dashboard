export const siteConfig = {
  name: "HotelPro",
  company: "Systems",
  description: "Elite Property Management Suite",
  author: "PC",
  version: "1.0.0",
  auth: {
    adminEmail: "admin@hotelpro.com",
    adminPassword: "admin@123#456",
  },
  user: {
    name: "Alex Morgan",
    role: "General Manager",
    initials: "AM",
    avatarColor: "from-indigo-500 to-purple-600"
  },
  theme: {
    primary: "indigo-600",
    radius: "2.5rem"
  }
};

export type SiteConfig = typeof siteConfig;