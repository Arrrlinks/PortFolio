const PROJECTS = [
    {
        title: "Home Lab",
        description: "Self-hosted server with comprehensive DevOps automation, security, and monitoring.",
        longDescription: `A personal server demonstrating advanced DevOps and systems administration capabilities. The home lab includes self-hosted services, comprehensive infrastructure management, CI/CD pipelines, security hardening, and extensive automation. Features include containerized service orchestration, network segmentation, automated backup strategies, and real-time monitoring via Grafana. The setup showcases expertise in cybersecurity best practices, networking fundamentals, server maintenance, and infrastructure-as-code principles. Regular security audits, automated updates, and disaster recovery procedures ensure robust and reliable operation.`,
        image: "projects/selfhost.png",
        skills: ["Self-hosting", "DevOps", "Automation", "Cybersecurity", "Networking", "Monitoring"],
        link: null
    },
    {
        title: "Posturo",
        description: "Professional optometric calculation tools with advanced posturological prism computations.",
        longDescription: `Posturo is a specialized web application designed for optometry professionals, providing precise calculation tools for optometric and posturological assessments. The application includes sophisticated algorithms for computing posturological prisms, essential for correcting postural imbalances through visual adjustments. Built with HTML, CSS, and JavaScript, the tool offers an intuitive interface for practitioners to input patient measurements and receive accurate prescription recommendations. The application streamlines clinical workflows and ensures calculation accuracy for complex optometric scenarios, demonstrating the intersection of healthcare technology and web development.`,
        image: "projects/posturo.png",
        skills: ["Optometry", "Posturology", "HTML", "CSS", "JavaScript"],
        link: null
    },
    {
        title: "Image Captioning",
        description: "Deep learning system generating natural language descriptions for images using CNN-RNN architecture.",
        longDescription: `Image Captioning is an advanced machine learning project that automatically generates textual descriptions for images by combining computer vision and natural language processing. The system uses a Convolutional Neural Network (CNN) as an encoder to extract visual features from images, paired with a Recurrent Neural Network (RNN) decoder that generates coherent captions. Built using deep learning frameworks, the model is trained on the COCO dataset and implements attention mechanisms to focus on relevant image regions while generating descriptions. The architecture demonstrates the intersection of vision and language AI, producing human-readable sentences that accurately describe image contents, objects, and their relationships.`,
        image: "projects/data_science.png",
        skills: ["Python", "CNN", "RNN", "Deep Learning", "Computer Vision", "NLP"],
        link: "https://github.com/gachitazied/Image-Captioning/tree/presentation"
    },
    {
        title: "Image Distortion Correction",
        description: "AI-powered image processing for distortion correction and automated glue line detection.",
        longDescription: `An advanced image processing system utilizing AI and computer vision techniques to correct optical distortions using chessboard calibration patterns. The application automatically detects distortion parameters, applies mathematical corrections, and outputs calibrated images. Additionally, it features an AI-powered glue line detection system that identifies adhesive seams in images and computes precise metrics for quality control applications. This project demonstrates expertise in computer vision algorithms, machine learning integration, automated systems design, and practical applications of AI in manufacturing and quality assurance contexts.`,
        image: "projects/image_distortion_correction.png",
        skills: ["Python", "AI", "Computer Vision", "Image Processing", "Automation"],
        link: "https://github.com/Arrrlinks/image-distortion-correction"
    },
    {
        title: "Berni",
        description: "Autonomous beach-cleaning robot for cigarette butt collection, IBM contest entry.",
        longDescription: `Berni is an innovative environmental robotics project developed for an IBM contest, designed to autonomously collect cigarette butts from beaches. The robot utilizes Arduino-based embedded systems, custom sensors for butt detection, and automated navigation to traverse sandy terrain efficiently. Features include obstacle avoidance, collection mechanism automation, and battery management for extended operation. This collaborative project (team of 3) addresses real environmental challenges through engineering, combining mechanical design, embedded programming, and automation to create a practical solution for beach pollution. Demonstrates interdisciplinary problem-solving and commitment to sustainability.`,
        image: "projects/berni.jpg",
        skills: ["Arduino", "Embedded Systems", "Robotics", "Automation", "Environmental Tech"],
        link: "https://github.com/Arrrlinks/Berni"
    },
    {
        title: "Weather Station",
        description: "IoT weather monitoring system with ESP32, multiple sensors, and real-time data visualization.",
        longDescription: `Weather Station is a comprehensive IoT project built with ESP32 microcontroller that collects and displays environmental data in real-time. The system integrates multiple sensors including BME280 for temperature, humidity, and pressure measurements, creating a complete meteorological monitoring solution. The ESP32's built-in Wi-Fi capabilities enable cloud connectivity for remote data access and historical tracking. Features include real-time sensor readings, web-based dashboard for visualization, data logging, and potential integration with weather APIs. The project demonstrates embedded systems programming, sensor integration via I2C/SPI protocols, wireless communication, and IoT best practices. Ideal for environmental monitoring, smart home applications, or educational purposes in understanding climate patterns and sensor networks.`,
        image: "projects/weather_station.png",
        skills: ["ESP32", "IoT", "Arduino", "Sensors", "Web Dashboard", "Embedded Systems"],
        link: "https://github.com/julien-wff/weather-station"
    },
    {
        title: "civitai_comfy_nodes",
        description: "Modified ComfyUI nodes with CivitAI API integration for enhanced Stable Diffusion workflows.",
        longDescription: `A specialized modification of ComfyUI nodes developed during an internship to integrate CivitAI's model repository directly into Stable Diffusion workflows. The custom nodes allow users to authenticate with CivitAI API keys and access premium models, checkpoints, and resources without manual downloads. This enhancement streamlines the AI image generation pipeline by enabling seamless model switching and access to the latest community-created resources. The project demonstrates understanding of node-based UI systems, API integration in AI workflows, and practical improvements to existing open-source tools for enhanced productivity.`,
        image: "projects/civitai_comfy_nodes.png",
        skills: ["JavaScript", "ComfyUI", "Stable Diffusion", "AI", "API Integration"],
        link: "https://github.com/Arrrlinks/civitai_comfy_nodes"
    },
    {
        title: "VRP Project",
        description: "Comprehensive implementation of advanced algorithmic concepts including graph theory and dynamic programming.",
        longDescription: `VRP Project is a collaborative school project exploring complex algorithmic techniques and computational problem-solving strategies. The project covers graph algorithms including shortest path algorithms (Dijkstra, Bellman-Ford, Floyd-Warshall), graph traversal methods (DFS, BFS), strongly connected components, and topological sorting. Additionally, it implements dynamic programming solutions for optimization problems, exploring concepts of memoization, state transitions, and optimal substructure. The project demonstrates deep understanding of algorithm complexity analysis, data structure selection, and efficient problem-solving approaches for computationally intensive tasks. Developed as part of CESI's computer science curriculum, emphasizing theoretical foundations and practical implementations.`,
        image: "projects/vrp.png",
        skills: ["Operations Research", "Algorithms", "Graph Theory", "Dynamic Programming", "Complexity Analysis", "Python"],
        link: "https://github.com/Shulkogu/Algo_avance_grpB"
    },
    {
        title: "Salinity Sensor Simulator",
        description: "Arduino-based sensor simulation with custom 3D housing and embedded programming.",
        longDescription: `An embedded systems project simulating salinity sensor behavior using Arduino microcontrollers and an 8×8 LED matrix display. The system provides real-time visualization of simulated salinity readings through patterns on the matrix, with custom algorithms for data representation. Antoine designed and 3D-modeled the physical enclosure for the electronics, ensuring proper component mounting and cable management. The device was tested for 48-hour continuous operation to validate stability and reliability. This collaborative project (team of 2) demonstrates skills in embedded programming, electronics integration, 3D modeling, and hardware testing methodologies.`,
        image: "projects/salinity_sensor_simulator.gif",
        skills: ["Arduino", "Embedded Systems", "3D Modeling", "Hardware Design"],
        link: "https://github.com/mines-nancy/projet_arduino_antoinef_leoj"
    },
    {
        title: "Portfolio",
        description: "Personal website presenting Antoine's profile with modern web design and AI-powered automation.",
        longDescription: `A comprehensive personal portfolio website showcasing Antoine's technical expertise and projects. Built with vanilla HTML, CSS, and JavaScript, the site features modern web design principles, AI integration, and automation workflows. The portfolio serves as a central hub for professional presentation, demonstrating proficiency in front-end development and contemporary web technologies. Emphasis on clean aesthetics, responsive design, and optimized performance for showcasing technical capabilities to potential employers and collaborators.`,
        image: "projects/portfolio.png",
        skills: ["HTML", "CSS", "JavaScript", "Web Design", "AI", "Automation"],
        link: "https://github.com/Arrrlinks/PortFolio"
    },
    {
        title: "Scale",
        description: "AI-powered call for tender prioritization system using agentic AI workflows.",
        longDescription: `Scale is an innovative solution developed during a DevoTeam-organized hackathon that leverages agentic AI to automatically determine priority levels in calls for tenders. Built with Svelte and ShadCN for a modern, responsive interface, the system integrates n8n workflow automation to process tender documents intelligently. The AI agent analyzes tender requirements, deadlines, and business value to assign priority scores, helping organizations make data-driven decisions about which opportunities to pursue. Features include real-time analysis, customizable prioritization criteria, and an intuitive dashboard for reviewing AI recommendations.`,
        image: "projects/scale.png",
        skills: ["Svelte", "ShadCN", "n8n", "AI", "Agentic AI", "Web Design"],
        link: "https://github.com/julien-wff/scale"
    },
    {
        title: "RBot",
        description: "Feature-rich Discord bot with chess system and multiple interactive commands.",
        longDescription: `RBot is a comprehensive Discord bot built with Node.js that enhances server functionality through diverse commands and interactive features. The bot's standout feature is a complete chess system allowing users to play games directly within Discord, including move validation, game state tracking, and visual board representation. Beyond chess, RBot integrates multiple APIs to provide utility commands, entertainment features, and server management tools. The modular architecture allows for easy feature expansion and demonstrates proficiency in asynchronous programming, API integration, and real-time interaction handling.`,
        image: "projects/rbot.png",
        skills: ["Node.js", "Discord API", "Game Logic", "APIs"],
        link: "https://github.com/Arrrlinks/RBot"
    },
    {
        title: "HubertManges",
        description: "UberEats clone with authentication, API integration, and collaborative development.",
        longDescription: `HubertManges is a team-developed web application that replicates core functionalities of UberEats, created as a comprehensive school project. The platform features user authentication, restaurant browsing, order management, and real-time updates. Built collaboratively by a team of four, the project demonstrates full-stack development skills including front-end design with HTML/CSS/JS, API integration for data management, and DevOps practices for deployment. The authentication branch showcases secure user management, session handling, and protected routes. This project highlights teamwork, version control proficiency, and the ability to architect complex web applications with multiple interconnected systems.`,
        image: "projects/hubert_manges.png",
        skills: ["HTML", "CSS", "JavaScript", "API", "DevOps", "Team Collaboration"],
        link: "https://github.com/Arrrlinks/HubertManges/tree/authentication"
    },
    {
        title: "Monitoring",
        description: "Grafana-based infrastructure monitoring system with custom metrics and dashboards.",
        longDescription: `A comprehensive monitoring solution implementing Grafana dashboards and metric collectors to provide real-time visibility into server infrastructure health and performance. The system collects metrics from multiple sources including system resources, application performance, network traffic, and custom application telemetry. Features include alerting for critical thresholds, historical trend analysis, and customizable dashboards for different stakeholder needs. This monitoring infrastructure enables proactive issue detection, capacity planning, and performance optimization across the home lab environment, demonstrating DevOps best practices for observability and site reliability engineering.`,
        image: "projects/monitoring.png",
        skills: ["Grafana", "Metrics", "Monitoring", "DevOps", "Data Visualization"],
        link: "https://github.com/Arrrlinks/monitoring"
    },
    {
        title: "GCode Drawing App",
        description: "Python tool for converting drawings into GCode for 3D printer artistic applications.",
        longDescription: `An innovative application that bridges digital art and 3D printing technology by converting hand-drawn shapes into GCode instructions. Users can draw custom designs through an intuitive interface, and the application generates single-layer GCode files compatible with standard 3D printers. This enables artistic applications of 3D printing technology, such as creating custom decals, templates, or artistic prints. The project demonstrates understanding of GCode syntax, coordinate transformation algorithms, and the intersection of creative tools with automated manufacturing systems. Built with Python for robust processing and cross-platform compatibility.`,
        image: "projects/gcode_drawer.png",
        skills: ["Python", "GCode", "3D Printing", "Automation", "Graphics"],
        link: "https://github.com/Arrrlinks/GCode-Drawing-App"
    },
    {
        title: "Statify.fm",
        description: "Spotify statistics dashboard with API integration and data visualization.",
        longDescription: `Statify.fm is a web application that retrieves and displays comprehensive Spotify listening statistics through the Spotify Web API. The application provides users with insights into their top artists, tracks, genres, and listening habits over customizable time periods. Features include OAuth authentication, real-time data fetching, and interactive visualizations of music preferences. Built as a learning project to master API integration, OAuth flows, and asynchronous JavaScript, Statify.fm demonstrates the ability to work with third-party APIs, handle authentication securely, and present data in engaging, user-friendly formats.`,
        image: "projects/statify.png",
        skills: ["HTML", "CSS", "JavaScript", "Spotify API", "OAuth", "Data Viz"],
        link: "https://github.com/Arrrlinks/Statify.fm"
    },
    {
        title: "EasySave",
        description: "Robust backup software with scheduling, versioning, and team collaboration.",
        longDescription: `EasySave is a comprehensive backup software solution developed collaboratively by a team of four as a school project. Built in C#, the application provides automated file and directory backup with features including scheduled backups, incremental and differential backup strategies, version control, and restoration capabilities. The software demonstrates solid software design principles including separation of concerns, modular architecture, and clean code practices. Features include a user-friendly interface for backup configuration, progress monitoring, log management, and multi-threaded operations for efficient backup performance without blocking user interaction.`,
        image: "projects/easysave.png",
        skills: ["C#", "Software Design", "Multithreading", "Team Development"],
        link: "https://github.com/Arrrlinks/SysProg"
    },
    {
        title: "Abstergo",
        description: "Enterprise Windows Server infrastructure with firewall, security, and service management.",
        longDescription: `Abstergo is a comprehensive systems administration project involving the design and deployment of a complete Windows Server infrastructure. The project includes Active Directory configuration, DNS and DHCP services, file sharing with permissions management, and security hardening. Network security is implemented through pfSense firewall configuration with segmented VLANs, traffic filtering, and VPN access. The infrastructure demonstrates enterprise-level IT practices including backup strategies, monitoring, user management, and documentation. This team project (3 people) showcases proficiency in Windows Server administration, Linux integration, Docker containerization, and network security fundamentals.`,
        image: "projects/abstergo.png",
        skills: ["Windows Server", "Linux", "Docker", "pfSense", "Networking", "SysAdmin"],
        link: null
    },
    {
        title: "to-do-list-flutter",
        description: "Cross-platform task management app with Firebase backend integration.",
        longDescription: `A mobile task management application built with Flutter to learn cross-platform mobile development and Firebase backend services. The app features user authentication, real-time database synchronization, task creation and editing, category organization, and cloud backup. Tasks sync across devices automatically through Firebase, providing seamless multi-device experience. The project demonstrates proficiency in Flutter widget composition, state management, asynchronous operations, and NoSQL database integration. Developed during an internship as a learning initiative to master modern mobile development frameworks and backend-as-a-service platforms.`,
        image: "projects/flutter.png",
        skills: ["Flutter", "Firebase", "Mobile Dev", "Cloud Backend"],
        link: "https://github.com/Arrrlinks/to-do-list-flutter"
    },
    {
        title: "Airview",
        description: "Bluetooth LE pollution measurement device with improved connectivity for exam rooms.",
        longDescription: `Airview is a pollution-measurement IoT device designed for monitoring air quality in examination rooms. The Flutter-based mobile application connects to hardware sensors via Bluetooth Low Energy (BLE) to collect real-time data on air pollutants, particulate matter, and environmental conditions. Antoine's contribution focused on improving BLE connectivity reliability, implementing robust connection handling, automatic reconnection logic, and optimizing data transmission protocols. The project demonstrates expertise in mobile development, wireless communication protocols, and IoT integration, with practical applications in health and safety monitoring for educational environments.`,
        image: "projects/airview.png",
        skills: ["Flutter", "Bluetooth LE", "IoT", "Mobile Dev"],
        link: null
    },
    {
        title: "Home Lab Backup Server",
        description: "Automated daily backup system for password databases with encryption and secure storage",
        longDescription: `Dedicated backup infrastructure for daily automated password database backups with encryption, access controls, and automated scheduling to ensure credential data protection and recovery.`,
        image: "projects/backup.png",
        skills: ["Security", "DevOps", "Backup Strategies", "Encryption", "Self-hosting"],
        link: null
    },
    {
        title: "TasK",
        description: "PHP-based task management web application with database integration.",
        longDescription: `TasK is a web-based task management application built with PHP to demonstrate full-stack development capabilities. The application provides task creation, editing, categorization, and status tracking through a clean web interface. Features include user sessions, database persistence using MySQL, priority assignment, and deadline management. The project showcases understanding of server-side programming, SQL database design, session management, and the MVC architectural pattern. Built as a personal learning project to solidify PHP development skills and web application architecture fundamentals.`,
        image: "projects/task.png",
        skills: ["PHP", "MySQL", "Web Development", "Backend"],
        link: "https://github.com/Arrrlinks/TasK"
    },
    {
        title: "Notion Widgets",
        description: "Custom HTML/CSS widgets for Notion workspace enhancement.",
        longDescription: `A collection of custom-designed widgets created for embedding in Notion workspaces, demonstrating creative web design and CSS styling capabilities. The widgets include clocks, progress trackers, habit counters, and decorative elements that enhance Notion pages with dynamic, visually appealing components. Built purely with HTML and CSS (and minimal JavaScript where needed), these widgets are lightweight, easily embeddable, and customizable. Created for fun and productivity enhancement, this project showcases front-end development skills, attention to design details, and the ability to create practical tools for personal productivity systems.`,
        image: "projects/widgets.png",
        skills: ["HTML", "CSS", "Web Design", "Notion Integration"],
        link: "https://github.com/Arrrlinks/Widgets"
    },
    {
        title: "chevron",
        description: "Enhanced search interface with integrated code editor functionality.",
        longDescription: `A modified search bar project that extends basic search functionality with an integrated code editor directly on the search page. This unique combination allows users to search for code snippets or documentation and immediately test or edit code within the same interface. Built with HTML, CSS, and JavaScript, the project demonstrates UI/UX innovation by reducing context switching between searching and coding. The code editor includes syntax highlighting, basic autocomplete, and execution capabilities, making it a practical tool for developers who want quick experimentation alongside their research workflow.`,
        image: "projects/chevron.png",
        skills: ["HTML", "CSS", "JavaScript", "Code Editor", "UI/UX"],
        link: "https://github.com/Arrrlinks/chevron"
    },
    {
        title: "Authentication Service",
        description: "Flexible authentication system for students and companies with SSO capabilities.",
        longDescription: `A versatile authentication service built with Svelte that provides adjustable authentication and authorization for both educational institutions and corporate environments. The system supports multiple authentication methods including traditional username/password, OAuth providers, and Single Sign-On (SSO) integration. Features include role-based access control, session management, password policies, and user profile management. The modular architecture allows easy customization for different organizational needs while maintaining security best practices. Developed during an internship to create reusable infrastructure components for various client projects.`,
        image: "projects/auth.png",
        skills: ["Svelte", "Authentication", "SSO", "Security", "Web Development"],
        link: null
    },
    {
        title: "Documentation Management System",
        description: "Multilingual documentation platform with SSO and granular access controls.",
        longDescription: `A comprehensive documentation management system designed to store, organize, and serve multilingual technical documentation with sophisticated access controls. The platform integrates SSO authentication, allowing seamless integration with existing organizational identity providers. Features include version control for documentation, search across multiple languages, granular permission management for different document sections, and collaborative editing capabilities. The system ensures that sensitive documentation is protected while remaining accessible to authorized users. Built with HTML, CSS, and JavaScript, demonstrating full-stack development and information architecture skills.`,
        image: "projects/docb2c.png",
        skills: ["HTML", "CSS", "JavaScript", "SSO", "Access Control", "i18n"],
        link: null
    },
    {
        title: "Implementation of Generative AI Services for ENSAD",
        description: "ComfyUI Stable Diffusion infrastructure for educational AI art workshops.",
        longDescription: `A collaborative project assisting ENSAD (École Nationale Supérieure d'Art et de Design de Nancy) in deploying generative AI infrastructure for creative workshops. The implementation involved preparing and configuring Comfy-based Stable Diffusion machines with Docker containerization for reliable, reproducible deployments. Responsibilities included selecting appropriate AI models, configuring node workflows for various artistic use cases, and ensuring stable operation during workshop sessions. The project demonstrates expertise in AI deployment, educational technology, and the practical application of generative AI in creative education contexts.`,
        image: "projects/comfyui.webp",
        skills: ["Docker", "Stable Diffusion", "ComfyUI", "AI", "Education Tech"],
        link: null
    },
    {
        title: "3D Model AI Generation",
        description: "Exploration of TripoSR AI models for automated 3D asset generation.",
        longDescription: `An experimental project exploring TripoSR AI models for generating 3D assets from text prompts or 2D images. The research involved testing various model configurations, evaluating output quality, and assessing practical applications for game development, product visualization, and rapid prototyping. The project demonstrates understanding of emerging AI technologies in 3D modeling, critical evaluation of AI-generated content quality, and the potential applications of generative AI beyond 2D image creation. Conducted during an internship to evaluate cutting-edge AI tools for potential integration into production workflows.`,
        image: "projects/triposr.gif",
        skills: ["AI", "3D Modeling", "TripoSR", "Research", "Generative AI"],
        link: null
    },
    {
        title: "Practical Work Preparation",
        description: "Educational renewable energy activities for middle-school students.",
        longDescription: `A collaborative educational initiative developing and delivering hands-on practical activities focused on renewable energy concepts for middle-school students. Responsibilities included curriculum design, activity planning, material preparation, and workshop facilitation. The activities covered solar energy, wind power, and energy storage through interactive experiments and demonstrations. The project showcases communication skills, pedagogical design, teamwork in educational contexts, and the ability to make complex technical concepts accessible to younger audiences. Demonstrates commitment to STEM education and environmental awareness.`,
        image: "projects/practical_work.webp",
        skills: ["Education", "Renewable Energy", "Curriculum Design", "STEM", "Team Collaboration"],
        link: null
    },
    {
        title: "Delta Storage",
        description: "Educational project demonstrating OOP principles, design patterns, and C++ fundamentals.",
        longDescription: `Object-Oriented Programming is a comprehensive educational project developed as part of CESI's 2022 computer science curriculum, focusing on fundamental and advanced OOP concepts. The project implements core object-oriented principles including encapsulation, inheritance, polymorphism, and abstraction through practical Java applications. It explores design patterns such as Singleton, Factory, Observer, and Strategy patterns, demonstrating their real-world applications. The codebase showcases proper class design, interface implementation, exception handling, and UML modeling. Students work through exercises covering class hierarchies, method overriding, composition vs inheritance trade-offs, and SOLID principles. This collaborative project emphasizes writing clean, maintainable, and extensible code while understanding the theoretical foundations that make object-oriented programming a powerful paradigm for software development.`,
        image: "projects/delta_storage.png",
        skills: ["C++", "OOP", "Design Patterns", "UML", "Software Engineering"],
        link: "https://github.com/raphaeldenni/oop-cesi-2022"
    }
];

export default PROJECTS;
