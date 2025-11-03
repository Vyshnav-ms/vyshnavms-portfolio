export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  highlights: string[];
}

export const educationData: Education[] = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Your University Name",
    location: "City, State",
    period: "2020 - 2024",
    highlights: [
      "Specialized in Web Development and AI",
      "Relevant Coursework: Data Structures, Algorithms, Machine Learning",
      "Academic Projects in Full Stack Development",
    ],
  },
  {
    degree: "Higher Secondary Education",
    institution: "Your School Name",
    location: "City, State",
    period: "2018 - 2020",
    highlights: [
      "Computer Science Stream",
      "Excellence in Mathematics and Computer Applications",
    ],
  },
];
