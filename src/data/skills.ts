export interface Skill {
  name: string;
  logo: string;
  category: string;
}

const devicon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export const skills: Skill[] = [
  // Languages
  { name: "Python",      logo: devicon("python/python-original.svg"),                  category: "Languages" },
  { name: "JavaScript",  logo: devicon("javascript/javascript-original.svg"),           category: "Languages" },
  { name: "PHP",         logo: devicon("php/php-original.svg"),                         category: "Languages" },
  { name: "HTML5",       logo: devicon("html5/html5-original.svg"),                     category: "Languages" },
  { name: "CSS3",        logo: devicon("css3/css3-original.svg"),                       category: "Languages" },

  // Frameworks
  { name: "Django",      logo: devicon("django/django-plain.svg"),                      category: "Frameworks" },
  { name: "React.js",    logo: devicon("react/react-original.svg"),                     category: "Frameworks" },
  { name: "Flutter",     logo: devicon("flutter/flutter-original.svg"),                 category: "Frameworks" },
  { name: "WordPress",   logo: devicon("wordpress/wordpress-plain.svg"),                category: "Frameworks" },

  // Databases
  { name: "MySQL",       logo: devicon("mysql/mysql-original.svg"),                     category: "Databases" },
  { name: "SQLite3",     logo: devicon("sqlite/sqlite-original.svg"),                   category: "Databases" },
  { name: "Firebase",    logo: devicon("firebase/firebase-plain.svg"),                  category: "Databases" },

  // Cybersecurity
  { name: "Burp Suite",  logo: "https://cdn.jsdelivr.net/gh/Vyshnav-ms/Vyshnav-ms.github.io@main/assets/burpsuite.svg",  category: "Cybersecurity" },
  { name: "Metasploit",  logo: "https://www.kali.org/tools/metasploit-framework/images/metasploit-framework-logo.svg",   category: "Cybersecurity" },
  { name: "Nmap",        logo: "https://nmap.org/images/sitelogo.png",                 category: "Cybersecurity" },
  { name: "Wireshark",   logo: "https://www.wireshark.org/assets/icons/wireshark-fin.png", category: "Cybersecurity" },
  { name: "Splunk",      logo: "https://cdn.simpleicons.org/splunk/000000",             category: "Cybersecurity" },

  // Developer Tools
  { name: "Git",         logo: devicon("git/git-original.svg"),                         category: "Dev Tools" },
  { name: "Vercel",      logo: "https://cdn.simpleicons.org/vercel/000000",             category: "Dev Tools" },
  { name: "REST API",    logo: devicon("fastapi/fastapi-original.svg"),                 category: "Dev Tools" },
  { name: "cPanel",      logo: "https://cdn.simpleicons.org/cpanel/FF6C2C",             category: "Dev Tools" },
  { name: "GoDaddy",     logo: "https://cdn.simpleicons.org/godaddy/1BDBDB",            category: "Dev Tools" },
  { name: "Pandas",      logo: devicon("pandas/pandas-original.svg"),                   category: "Dev Tools" },
  { name: "NumPy",       logo: devicon("numpy/numpy-original.svg"),                     category: "Dev Tools" },

  // AI Tools
  { name: "Claude AI",   logo: "https://cdn.simpleicons.org/anthropic/000000",          category: "AI Tools" },
  { name: "ChatGPT",     logo: "https://cdn.simpleicons.org/openai/000000",             category: "AI Tools" },
  { name: "Gemini",      logo: "https://cdn.simpleicons.org/googlegemini/8E75B2",       category: "AI Tools" },
  { name: "Copilot",     logo: "https://cdn.simpleicons.org/githubcopilot/000000",      category: "AI Tools" },
  { name: "Cursor AI",   logo: "https://cdn.simpleicons.org/cursor/000000",             category: "AI Tools" },

  // OS / Platforms
  { name: "Windows",     logo: devicon("windows8/windows8-original.svg"),               category: "Platforms" },
  { name: "Linux",       logo: devicon("linux/linux-original.svg"),                     category: "Platforms" },
];

export const skillCategories = [
  "All",
  "Languages",
  "Frameworks",
  "Databases",
  "Cybersecurity",
  "Dev Tools",
  "AI Tools",
  "Platforms",
];
