const PROJECTS = [
    {
        title: "Home Lab",
        description: "Self-hosted server with comprehensive DevOps automation, security, and monitoring.",
        image: "projects/selfhost.webp",
        skills: ["Self-hosting", "DevOps", "Automation", "Cybersecurity", "Networking", "Monitoring"],
        link: null
    },
    {
        title: "Posturo",
        description: "Professional optometric calculation tools with advanced posturological prism computations.",
        image: "projects/posturo.webp",
        skills: ["Optometry", "Posturology", "HTML", "CSS", "JavaScript"],
        link: null
    },
    {
        title: "Image Captioning",
        description: "Deep learning system generating natural language descriptions for images using CNN-RNN architecture.",
        image: "projects/data_science.webp",
        skills: ["Python", "CNN", "RNN", "Deep Learning", "Computer Vision", "NLP"],
        link: "https://github.com/gachitazied/Image-Captioning/tree/presentation"
    },
    {
        title: "Image Distortion Correction",
        description: "AI-powered image processing for distortion correction and automated glue line detection.",
        image: "projects/image_distortion_correction.webp",
        skills: ["Python", "AI", "Computer Vision", "Image Processing", "Automation"],
        link: "https://github.com/Arrrlinks/image-distortion-correction"
    },
    {
        title: "Berni",
        description: "Autonomous beach-cleaning robot for cigarette butt collection, IBM contest entry.",
        image: "projects/berni.webp",
        skills: ["Arduino", "Embedded Systems", "Robotics", "Automation", "Environmental Tech"],
        link: "https://github.com/Arrrlinks/Berni"
    },
    {
        title: "Weather Station",
        description: "IoT weather monitoring system with ESP32, multiple sensors, and real-time data visualization.",
        image: "projects/weather_station.webp",
        skills: ["ESP32", "IoT", "Arduino", "Sensors", "Web Dashboard", "Embedded Systems"],
        link: "https://github.com/julien-wff/weather-station"
    },
    {
        title: "civitai_comfy_nodes",
        description: "Modified ComfyUI nodes with CivitAI API integration for enhanced Stable Diffusion workflows.",
        image: "projects/civitai_comfy_nodes.webp",
        skills: ["JavaScript", "ComfyUI", "Stable Diffusion", "AI", "API Integration"],
        link: "https://github.com/Arrrlinks/civitai_comfy_nodes"
    },
    {
        title: "VRP Project",
        description: "Comprehensive implementation of advanced algorithmic concepts including graph theory and dynamic programming.",
        image: "projects/vrp.webp",
        skills: ["Operations Research", "Algorithms", "Graph Theory", "Dynamic Programming", "Complexity Analysis", "Python"],
        link: "https://github.com/Shulkogu/Algo_avance_grpB"
    },
    {
        title: "Salinity Sensor Simulator",
        description: "Arduino-based sensor simulation with custom 3D housing and embedded programming.",
        image: "projects/salinity_sensor_simulator.gif",
        skills: ["Arduino", "Embedded Systems", "3D Modeling", "Hardware Design"],
        link: "https://github.com/mines-nancy/projet_arduino_antoinef_leoj"
    },
    {
        title: "Portfolio",
        description: "Personal website presenting Antoine's profile with modern web design and AI-powered automation.",
        image: "projects/portfolio.webp",
        skills: ["HTML", "CSS", "JavaScript", "Web Design", "AI", "Automation"],
        link: "https://github.com/Arrrlinks/PortFolio"
    },
    {
        title: "Scale",
        description: "AI-powered call for tender prioritization system using agentic AI workflows.",
        image: "projects/scale.webp",
        skills: ["Svelte", "ShadCN", "n8n", "AI", "Agentic AI", "Web Design"],
        link: "https://github.com/julien-wff/scale"
    },
    {
        title: "RBot",
        description: "Feature-rich Discord bot with chess system and multiple interactive commands.",
        image: "projects/rbot.webp",
        skills: ["Node.js", "Discord API", "Game Logic", "APIs"],
        link: "https://github.com/Arrrlinks/RBot"
    },
    {
        title: "HubertManges",
        description: "UberEats clone with authentication, API integration, and collaborative development.",
        image: "projects/hubert_manges.webp",
        skills: ["HTML", "CSS", "JavaScript", "API", "DevOps", "Team Collaboration"],
        link: "https://github.com/Arrrlinks/HubertManges/tree/authentication"
    },
    {
        title: "Monitoring",
        description: "Grafana-based infrastructure monitoring system with custom metrics and dashboards.",
        image: "projects/monitoring.webp",
        skills: ["Grafana", "Metrics", "Monitoring", "DevOps", "Data Visualization"],
        link: "https://github.com/Arrrlinks/monitoring"
    },
    {
        title: "GCode Drawing App",
        description: "Python tool for converting drawings into GCode for 3D printer artistic applications.",
        image: "projects/gcode_drawer.webp",
        skills: ["Python", "GCode", "3D Printing", "Automation", "Graphics"],
        link: "https://github.com/Arrrlinks/GCode-Drawing-App"
    },
    {
        title: "Statify.fm",
        description: "Spotify statistics dashboard with API integration and data visualization.",
        image: "projects/statify.webp",
        skills: ["HTML", "CSS", "JavaScript", "Spotify API", "OAuth", "Data Viz"],
        link: "https://github.com/Arrrlinks/Statify.fm"
    },
    {
        title: "EasySave",
        description: "Robust backup software with scheduling, versioning, and team collaboration.",
        image: "projects/easysave.webp",
        skills: ["C#", "Software Design", "Multithreading", "Team Development"],
        link: "https://github.com/Arrrlinks/SysProg"
    },
    {
        title: "Abstergo",
        description: "Enterprise Windows Server infrastructure with firewall, security, and service management.",
        image: "projects/abstergo.webp",
        skills: ["Windows Server", "Linux", "Docker", "pfSense", "Networking", "SysAdmin"],
        link: null
    },
    {
        title: "to-do-list-flutter",
        description: "Cross-platform task management app with Firebase backend integration.",
        image: "projects/flutter.webp",
        skills: ["Flutter", "Firebase", "Mobile Dev", "Cloud Backend"],
        link: "https://github.com/Arrrlinks/to-do-list-flutter"
    },
    {
        title: "Airview",
        description: "Bluetooth LE pollution measurement device with improved connectivity for exam rooms.",
        image: "projects/airview.webp",
        skills: ["Flutter", "Bluetooth LE", "IoT", "Mobile Dev"],
        link: null
    },
    {
        title: "Home Lab Backup Server",
        description: "Automated daily backup system for password databases with encryption and secure storage",
        image: "projects/backup.webp",
        skills: ["Security", "DevOps", "Backup Strategies", "Encryption", "Self-hosting"],
        link: null
    },
    {
        title: "TasK",
        description: "PHP-based task management web application with database integration.",
        image: "projects/task.webp",
        skills: ["PHP", "MySQL", "Web Development", "Backend"],
        link: "https://github.com/Arrrlinks/TasK"
    },
    {
        title: "Notion Widgets",
        description: "Custom HTML/CSS widgets for Notion workspace enhancement.",
        image: "projects/widgets.webp",
        skills: ["HTML", "CSS", "Web Design", "Notion Integration"],
        link: "https://github.com/Arrrlinks/Widgets"
    },
    {
        title: "chevron",
        description: "Enhanced search interface with integrated code editor functionality.",
        image: "projects/chevron.webp",
        skills: ["HTML", "CSS", "JavaScript", "Code Editor", "UI/UX"],
        link: "https://github.com/Arrrlinks/chevron"
    },
    {
        title: "Authentication Service",
        description: "Flexible authentication system for students and companies with SSO capabilities.",
        image: "projects/auth.webp",
        skills: ["Svelte", "Authentication", "SSO", "Security", "Web Development"],
        link: null
    },
    {
        title: "Documentation Management System",
        description: "Multilingual documentation platform with SSO and granular access controls.",
        image: "projects/docb2c.webp",
        skills: ["HTML", "CSS", "JavaScript", "SSO", "Access Control", "i18n"],
        link: null
    },
    {
        title: "Implementation of Generative AI Services for ENSAD",
        description: "ComfyUI Stable Diffusion infrastructure for educational AI art workshops.",
        image: "projects/comfyui.webp",
        skills: ["Docker", "Stable Diffusion", "ComfyUI", "AI", "Education Tech"],
        link: null
    },
    {
        title: "3D Model AI Generation",
        description: "Exploration of TripoSR AI models for automated 3D asset generation.",
        image: "projects/triposr.gif",
        skills: ["AI", "3D Modeling", "TripoSR", "Research", "Generative AI"],
        link: null
    },
    {
        title: "Practical Work Preparation",
        description: "Educational renewable energy activities for middle-school students.",
        image: "projects/practical_work.webp",
        skills: ["Education", "Renewable Energy", "Curriculum Design", "STEM", "Team Collaboration"],
        link: null
    },
    {
        title: "Delta Storage",
        description: "Educational project demonstrating OOP principles, design patterns, and C++ fundamentals.",
        image: "projects/delta_storage.webp",
        skills: ["C++", "OOP", "Design Patterns", "UML", "Software Engineering"],
        link: "https://github.com/raphaeldenni/oop-cesi-2022"
    }
];

export default PROJECTS;
