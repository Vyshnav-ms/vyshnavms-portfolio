export interface Skill {
  name: string;
  logo: string;
  category: string;
}

export const skills: Skill[] = [
  // Frontend
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Frontend",
  },
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "Frontend",
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    category: "Frontend",
  },
  // Backend
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Backend",
  },
  {
    name: "Django",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    category: "Backend",
  },
  {
    name: "REST API",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    category: "Backend",
  },
  {
    name: "SQLite",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    category: "Backend",
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Backend",
  },
  // AI & Prompt Engineering
  {
    name: "ChatGPT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo_white.svg",
    category: "AI",
  },
  {
    name: "OpenAI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/OpenAI_Logo_white.svg",
    category: "AI",
  },
  {
    name: "API Integration",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "AI",
  },
  // Cybersecurity
  {
    name: "Nmap",
    logo: "https://nmap.org/images/sitelogo.png",
    category: "Cybersecurity",
  },
  {
    name: "Wireshark",
    logo: "https://www.wireshark.org/assets/icons/wireshark-fin.png",
    category: "Cybersecurity",
  },
  {
    name: "Burp Suite",
    logo: "https://portswigger.net/burp/communitydownload",
    category: "Cybersecurity",
  },
  {
    name: "Metasploit",
    logo: "https://www.kali.org/tools/metasploit-framework/images/metasploit-framework-logo.svg",
    category: "Cybersecurity",
  },
];
