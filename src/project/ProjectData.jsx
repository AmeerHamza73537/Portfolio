// src/data/projects.js
export const projectData = [
  {
    id: "kindred",
    category: "full-stack",
    projectId: "kindred",
    name: "Kindred",
    title: "Kindred",
    tagline: "Neighbors sharing kind nearby.",
    github: "https://github.com/AmeerHamza73537/Kindred",
    demo: "https://kindred-theta-sage.vercel.app",
    liveDemo: "https://kindred-theta-sage.vercel.app",
    path: "/projects/kindred",
    description:
      "Kindred is a full-stack community platform for lending, gifting, and sharing skills locally. It combines map-based listings, request workflows, secure handoff verification, reviews, and gratitude to help neighbors build trust and connect.",
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "Socket.IO",
      "Cloudinary",
      "Leaflet",
      "Axios",
      "React Hook Form",
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT"],
    features: [
      "JWT auth with access and refresh tokens stored in httpOnly cookies",
      "Create lend, gift, or skill listings with images and location data",
      "Browse nearby items on an interactive map with filters",
      "Request borrowing dates and manage approvals or cancellations",
      "Secure pickup handoff with a 4-digit verification code",
      "Post reviews and gratitude notes after completed exchanges",
      "Profile trust rings, badges, and community reputation metrics",
    ],
    longDescription:
      "Kindred is built to help neighbors share items and skills safely and transparently. The platform makes it easy to list items for lending, gifting, or skill exchange, then coordinate nearby pick-up through a guided request flow. Handoffs are verified with a short code, and completed transactions prompt reviews and thank-you notes to strengthen community trust.",
    challenges:
      "The most challenging part was designing a seamless handoff flow that supports both gift and lend scenarios while keeping verification and review processes simple for users.",
    outcome:
      "This project strengthened my full-stack product design skills by blending location-based listing workflows with secure auth, real-time events, and community-focused trust mechanics.",
    year: "2024",
    type: "Full Stack Web App",
    role: "Solo Developer — Design & Engineering",
    timelineMonths: 4,
    detailDescription:
      'Kindred is a full-stack web application for nearby skill and item sharing. It uses React and Vite on the frontend with Node.js, Express, and MongoDB on the backend. Users authenticate securely with JWT stored in httpOnly cookies, create listings for lending, gifting, or skills, and explore nearby offers on a map. Requests are managed through a calendar-driven workflow, and successful handoffs use a 4-digit verification code. Completed transactions encourage reviews and gratitude messages, reinforcing trust through user profiles, badges, and ratings. The app was designed to support real neighborhood exchanges while maintaining clear, reliable flows across authentication, listings, requests, and confirmations.',
    screenshots: [
      "https://via.placeholder.com/400x300?text=Kindred+1",
      "https://via.placeholder.com/400x300?text=Kindred+2"
    ]
  },
  {
    id: "job-nest",
    category: "full-stack",
    projectId: "jobnest",
    name: "JobNest",
    title: "JobNest",
    tagline: "One platform. Post jobs. Find talent.",
    github: "https://github.com/AmeerHamza73537/JOB-NEST",
    demo: "https://job-nest-hela.vercel.app",
    liveDemo: "https://job-nest-hela.vercel.app",
    path: "/projects/job-nest",
    description:
      "Job Nest is a modern job portal web application where users can both post jobs and apply for jobs using a single account. It is designed to remove platform fragmentation, and streamline employer-candidate communication. The platform streamlines hiring workflows by combining job discovery, application submission, and communication into one seamless system.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", 'JWT', 'Redux', 'Firebase', 'TailwindCSS', 'GSAP', 'Locomotive',],
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "Dual-role accounts (employer + candidate)",
      "Real-time job application tracking",
      "JWT-based secure authentication",
      "Responsive dashboard for both user types",
      "Search and filter job listings",
    ],
    longDescription:
      "JobNest tackles a real platform gap: job seekers and recruiters are often split into separate account experiences that add friction and complexity. This project unifies both sides into a single product flow so one user can post opportunities, discover listings, and manage applications from one account. The core goal was to reduce context switching and make hiring interactions feel continuous.\n\nI designed and engineered the application as a MERN-based system with secure JWT authentication, role-aware UI patterns, and modular REST endpoints. The frontend focuses on clarity in high-frequency tasks such as browsing jobs, applying, and tracking submission status. On the backend, I emphasized scalable route structure and predictable data access patterns to keep features maintainable as complexity grows.\n\nThe final result is a production-style full-stack app that demonstrates practical product thinking, not just CRUD implementation. It improved my ability to design account models for multi-role systems and reinforced how thoughtful UX decisions can directly improve core business workflows.",
    challenges:
      "The hardest part was designing account logic so users could switch between employer and candidate actions without creating permission conflicts or a confusing UI state.",
    outcome:
      "This project strengthened my backend architecture skills and taught me how to balance role-based logic with a clean, intuitive user experience.",
    year: "2024",
    type: "Full Stack Web App",
    role: "Solo Developer — Design & Engineering",
    timelineMonths: 3,
    detailDescription: 
    'Job-Nest is a full-stack job marketplace web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform is designed to solve a common limitation found in traditional freelance and job platforms, where users are required to create separate accounts (or use different emails) to act as both a client and a freelancer. Job-Nest eliminates this friction by allowing a single user account to seamlessly function as both a job provider and a job seeker at the same time. The application enables users to post job listings, browse available opportunities, and apply for jobs — all from one unified dashboard without switching accounts. It features secure JWT-based authentication, protected routes, and a RESTful API architecture to ensure scalability and data security. The frontend is developed with React and styled using Tailwind CSS to provide a clean, responsive, and intuitive user experience. The backend is structured for production readiness, with separate frontend and API deployments, simulating a real-world job marketplace environment focused on usability, efficiency, and modern full-stack architecture.',
    screenshots: [
      "https://via.placeholder.com/400x300?text=JobNest+1",
      "https://via.placeholder.com/400x300?text=JobNest+2"
    ]
  }, 
  {
    id: "home-scape",
    category: "full-stack",
    projectId: "homescape",
    name: "HomeScape",
    title: "Royal Estate",
    tagline: "Discover homes with confidence and speed.",
    github: "https://github.com/AmeerHamza73537/Real-Estate-Project",
    demo: "https://real-estate-project-orpin-rho.vercel.app",
    liveDemo: "https://real-estate-project-orpin-rho.vercel.app",
    path: "/projects/home-scape",
    description:
      "HomeScape is a modern real estate platform developed using the MERN stack and Tailwind CSS. The application enables users to explore property listings, view detailed property information, apply search and filter options, and securely manage user authentication, all within a responsive and visually appealing UI.Full CRUD application using MERN stack with REST APIs and responsive UI.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", 'Redux', 'Swiper', 'Firebase', 'Google OAuth'],
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "Property listing creation and management",
      "Search, filter, and property detail exploration",
      "JWT-based secure account workflows",
      "Landlord inquiry flow via email",
      "Responsive marketplace-style interface",
    ],
    longDescription:
      "HomeScape focuses on simplifying real-estate discovery and listing management in one coherent platform. Many property apps overload users with fragmented flows, so this project emphasizes straightforward browsing, clear listing details, and direct landlord communication from the same interface.\n\nI built HomeScape with a MERN architecture and a responsive React frontend that supports key marketplace behaviors: create listings, update or remove properties, and browse inventory with practical filtering. Authentication and protected routes ensure user ownership over listing operations, while backend APIs keep data handling structured and scalable.\n\nThis project demonstrates how to translate a familiar business domain into a robust full-stack product. It improved my ability to model CRUD-heavy systems with real user journeys and reinforced the importance of balancing visual polish with operational reliability.",
    challenges:
      "The biggest challenge was keeping listing CRUD interactions fast and reliable while maintaining clear access control for each user’s data.",
    outcome:
      "I gained stronger confidence in building marketplace-style products with secure ownership rules and user-centric information architecture.",
    year: "2024",
    type: "Full Stack Web App",
    role: "Solo Developer — Design & Engineering",
    timelineMonths: 3,
    detailDescription: 
    'Royal Estate is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform allows users to create, manage, and sell property listings through a clean and responsive interface. Users can securely register and log in using JWT-based authentication, ensuring protected access to their personal dashboards and data. Once authenticated, users can create new property listings, review their posted properties, update listing details, or delete them whenever needed, providing complete ownership and control over their content. The platform also enables potential buyers or tenants to directly contact landlords via email, streamlining communication and simplifying the inquiry process. The backend is built using a RESTful API architecture to ensure scalability and structured data handling, while the frontend is developed with React and styled for a modern, user-friendly experience. The project simulates a real-world property marketplace, focusing on secure authentication, CRUD functionality, and seamless user interaction within a production-ready full-stack environment.',
    screenshots: [
      "https://via.placeholder.com/400x300?text=HomeScape+1",
      "https://via.placeholder.com/400x300?text=HomeScape+2"
    ]
  },
   {
    id: "authify",
    category: "full-stack",
    projectId: "authify",
    name: "Authify",
    title: "Authify",
    tagline: "Secure auth flows, built for production.",
    github: "https://github.com/AmeerHamza73537/MERN---Authentication-Server",
    demo: "https://authify-kqgz.vercel.app",
    liveDemo: "https://authify-kqgz.vercel.app",
    path: "/projects/authify",
    description:
      "Authify is a full-stack web application built with MongoDB, Express, React, and Node.js that provides secure user authentication. It features JWT-based login, password hashing, and protected routes, demonstrating real-world security best practices. The app highlights skills in full-stack development, authentication flows, and responsive UI design, making it a strong portfolio project for recruiters.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "JWT-based login and protected route system",
      "Password hashing and secure credential handling",
      "Password reset flow with time-sensitive token links",
      "Session-aware auth state in the frontend",
      "Validation and error-first UX feedback",
    ],
    longDescription:
      "Authify is centered around one high-impact problem: implementing authentication the way real products need it, not just as a demo form. The project includes registration, login, logout, and account recovery, with an emphasis on secure token lifecycles and practical user safety.\n\nI implemented the backend auth pipeline with JWT workflows, email-based password reset handling, and access-protected endpoints. The frontend provides clear status messaging and validation to reduce user confusion during sensitive actions like credential updates. Every flow was designed to prioritize trust, clarity, and security consistency.\n\nThe result is a focused full-stack project that highlights production-ready authentication architecture. It helped me deepen my understanding of secure identity flows and strengthened my ability to design backend contracts that map cleanly to frontend UX behavior.",
    challenges:
      "The hardest part was building reset-token and session flows that remain secure while still feeling straightforward for end users.",
    outcome:
      "I improved my understanding of auth architecture, token safety, and how to build security-sensitive UX with confidence.",
    year: "2024",
    type: "Full Stack Web App",
    role: "Solo Developer — Design & Engineering",
    timelineMonths: 2,
    detailDescription: 
    'Authify is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), focused on implementing secure and production-level user authentication workflows. The application includes user registration, login, logout, and secure session management using JWT-based authentication. It also features a complete password recovery system, allowing users to request a password reset via email and securely update their credentials through a time-sensitive reset link. The backend handles token generation, email verification logic, and protected routes to ensure data security and proper access control. The frontend provides a clean and responsive user interface for seamless user interaction, including validation and error handling. This project demonstrates a strong understanding of authentication architecture, secure token handling, email integration, and full-stack application security practices in a real-world environment.',
    screenshots: [
      "https://via.placeholder.com/400x300?text=Authify+1",
      "https://via.placeholder.com/400x300?text=Authify+2"
    ]
  },
  {
    id: "swiftmanage",
    category: "full-stack",
    projectId: "swiftmanage",
    name: "SwiftManage",
    title: "SwiftManage",
    tagline: "Streamlined user management at scale.",
    github: "https://github.com/AmeerHamza73537/MERN-CRUD-Operations",
    demo: "https://swift-manage.vercel.app/",
    liveDemo: "https://swift-manage.vercel.app/",
    path: "/projects/swiftmanage",
    description:
      "SwiftManage is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React, Node.js) that provides complete user management functionality, including adding, editing, and deleting users. The project emphasizes clean UI design, efficient API handling, and scalable backend architecture.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", 'JWT', 'Redux', 'Firebase', 'TailwindCSS', 'GSAP', 'Locomotive', ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "Create, read, update, delete user records",
      "Structured forms with validation and feedback",
      "REST API-first backend architecture",
      "Real-time style UI state updates",
      "Scalable data model for user operations",
    ],
    longDescription:
      "SwiftManage addresses a common operational need: managing user records efficiently through a clean, scalable interface. Rather than building isolated CRUD screens, this project focuses on creating a cohesive management workflow where create, edit, and delete actions feel fast and predictable.\n\nThe application combines a React frontend with a RESTful Node/Express backend and MongoDB persistence. I structured state and UI interactions to keep updates responsive, while API contracts were designed for clarity and extensibility. Form handling, validation, and feedback loops were prioritized to reduce friction in repetitive admin tasks.\n\nThis project showcases practical full-stack engineering around data lifecycle management. It strengthened my ability to design maintainable CRUD systems and improved how I think about UI responsiveness in operation-heavy products.",
    challenges:
      "The toughest part was coordinating frontend state updates with backend persistence so edits and deletions always reflected immediately and reliably.",
    outcome:
      "I improved my command of CRUD architecture and learned how to engineer admin workflows that remain robust as datasets grow.",
    year: "2024",
    type: "Full Stack Web App",
    role: "Solo Developer — Design & Engineering",
    timelineMonths: 2,
    detailDescription: 
    'Manageif is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) that demonstrates complete Create, Read, Update, and Delete (CRUD) functionality for user data management. The application allows administrators or authorized users to add new users, view user records, update existing information, and delete users through a structured and intuitive interface. The backend is designed using RESTful API architecture to handle data operations efficiently, while MongoDB ensures scalable and organized data storage. The frontend is built with React to provide a dynamic and responsive user experience, including form validation and real-time updates. This project highlights strong understanding of full-stack architecture, state management, API integration, and database operations in a production-ready environment.',
    screenshots: [
      "https://via.placeholder.com/400x300?text=SwiftManage+1",
      "https://via.placeholder.com/400x300?text=SwiftManage+2"
    ]
  },
  {
    id: "course-hub",
    category: "full-stack",
    projectId: "coursehub",
    name: "CourseHub",
    title: "CourseHub",
    tagline: "Academic content, organized for clarity.",
    github: "https://github.com/AmeerHamza73537/University-Courses-Portal",
    demo: "",
    liveDemo: "",
    path: "/projects/course-hub",
    description:
      "CourseHub is a frontend-focused course listing website built using React JSX, featuring a clean component-based architecture and responsive design. The platform presents courses in an organized manner with smooth navigation and an engaging user experience, emphasizing modern UI practices and performance.",
    technologies: ["React", "JSX", "CSS"],
    techStack: ["React", "JSX", "CSS", "Routing", "Component Design", "Responsive UI"],
    features: [
      "Structured course listing and content sections",
      "Component-driven UI architecture",
      "Responsive layouts for mobile and desktop",
      "Smooth navigation across course views",
      "Clear visual hierarchy for academic information",
    ],
    longDescription:
      "CourseHub was built to simulate a university-style academic portal with a focus on frontend architecture and usability. The problem it solves is discoverability: course information often feels scattered, so the interface organizes learning content into clear, easy-to-scan sections.\n\nI implemented the application with reusable React components, state-driven rendering, and responsive layout behavior to ensure consistent experience across devices. Navigation and content grouping were designed to reduce cognitive load and keep users oriented while exploring multiple sections.\n\nThe project highlights frontend execution quality: structure, consistency, and readability at scale. It helped me sharpen component composition patterns and reinforced the importance of UX hierarchy in information-dense interfaces.",
    challenges:
      "The key challenge was designing a component structure that stayed modular while still delivering a seamless, unified navigation experience.",
    outcome:
      "I strengthened my frontend architecture skills and improved how I design scalable, reusable UI systems for content-heavy products.",
    year: "2024",
    type: "Frontend Web App",
    role: "Solo Developer — Design & Engineering",
    timelineMonths: 2,
    detailDescription: 
    'CourseHub is a frontend web application developed using React.js, designed to simulate a modern university portal system. The platform provides students with an organized and user-friendly interface to explore courses, access academic information, and navigate different sections of the university system efficiently. The application focuses on component-based architecture, reusable UI design, and dynamic rendering using React state and props. The project demonstrates strong understanding of React fundamentals including functional components, hooks, routing, state management, and responsive UI development. CourseHub emphasizes clean code structure, modular design, and smooth navigation to deliver an intuitive user experience similar to real-world academic management portals. This project highlights frontend development skills, UI structuring, and modern React development practices.',
    screenshots: [
      "https://via.placeholder.com/400x300?text=CourseHub+1",
      "https://via.placeholder.com/400x300?text=CourseHub+2"
    ]
  },
  {
    id: "drive-price",
    category: "ai",
    projectId: "driveprice",
    name: "DrivePrice",
    title: "DrivePrice",
    tagline: "Used-car valuation, learned from real listing data.",
    github: "https://github.com/AmeerHamza73537/Drive-Price",
    demo: "",
    liveDemo: "",
    path: "/projects/drive-price",
    description:
      "An end-to-end machine-learning app that cleans vehicle listing data, compares multiple regression models, and serves instant used-car price estimates through a lightweight Flask interface.",
    technologies: [
      "Python",
      "Flask",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Joblib",
    ],
    techStack: ["Python", "scikit-learn", "Flask", "Pandas", "Joblib"],
    features: [
      "Reusable preprocessing pipeline with numeric imputation and scaling",
      "High-cardinality category reduction and one-hot encoding",
      "Side-by-side training of four regression model families",
      "Log-target transformation for stable price predictions",
      "Persisted model artifacts for fast local inference",
      "Flask form for single-vehicle price estimates",
    ],
    longDescription:
      "DrivePrice turns raw used-vehicle listings into a practical prediction experience. The project covers the complete machine-learning lifecycle: cleaning mixed numeric and categorical data, building a reusable preprocessing pipeline, training and comparing several regression approaches, persisting the strongest artifacts, and exposing predictions through a small Flask web application.\n\nThe modeling workflow uses median imputation and scaling for numeric features, while categorical data is reduced and one-hot encoded to keep the feature matrix stable. Linear Regression, Random Forest, Gradient Boosting, and AdaBoost models are trained with a transformed target to reduce the effect of price skew.\n\nThe result is more than a notebook experiment—it is a reproducible ML product with a clear path from dataset to user-facing inference.",
    challenges:
      "The hardest part was keeping preprocessing identical between training and inference while handling sparse, high-cardinality vehicle attributes without an unstable feature matrix.",
    outcome:
      "This project strengthened my understanding of production-minded ML pipelines, regression evaluation, artifact persistence, and serving trained models through a web interface.",
    year: "2026",
    type: "AI / Machine Learning App",
    role: "Solo Developer — ML & Engineering",
    roleShort: "Solo Dev",
    timelineMonths: 2,
    stackLabel: "Python + ML",
    status: "Repository",
    detailDescription:
      "DrivePrice is an end-to-end car price prediction system built with Python, scikit-learn, Pandas, and Flask. It turns raw listing data into repeatable model training and fast single-row predictions through persisted preprocessing and regression artifacts.",
    screenshots: [],
  },
  {
    id: "meridian",
    category: "ai",
    projectId: "meridian",
    name: "Meridian",
    title: "Meridian",
    tagline: "A multi-agent research team inside one intelligent system.",
    github: "https://github.com/AmeerHamza73537/Meridian",
    demo: "",
    liveDemo: "",
    path: "/projects/meridian",
    description:
      "An autonomous LangChain research system where specialized search, reader, writer, and critic agents collaborate to produce current, structured, quality-reviewed reports.",
    technologies: [
      "Python",
      "LangChain",
      "Google Gemini",
      "Tavily API",
      "BeautifulSoup",
      "Streamlit",
      "LCEL",
    ],
    techStack: ["LangChain", "Gemini", "Tavily", "Streamlit", "Python"],
    features: [
      "Four-agent search, reading, writing, and critique pipeline",
      "Live web research through Tavily search",
      "Deep page extraction with BeautifulSoup and Requests",
      "Structured reports with findings, conclusions, and sources",
      "Independent quality scoring and improvement feedback",
      "Streamlit pipeline tracker and Markdown report downloads",
    ],
    longDescription:
      "Meridian is an autonomous multi-agent research assistant designed to move beyond a single model response. A Search Agent discovers current sources, a Reader Agent extracts the most useful material, a Writer Agent turns that evidence into a structured report, and a Critic Agent reviews the result for quality and completeness.\n\nThe system is orchestrated with LangChain and LCEL, powered by Google Gemini, and connected to live search through Tavily. Shared pipeline state allows each specialist to build on the previous agent's work while the Streamlit interface shows progress and makes the final Markdown report downloadable.\n\nMeridian demonstrates agentic architecture as a practical product: tool use, staged reasoning, shared context, structured output, and a built-in quality loop working together in one research workflow.",
    challenges:
      "The central challenge was coordinating several independent LLM stages so context remained useful, outputs stayed structured, and failures in search or extraction did not derail the complete research flow.",
    outcome:
      "Building Meridian deepened my experience with agent orchestration, tool-connected LLMs, structured prompting, shared pipeline state, and quality-control patterns for AI products.",
    year: "2026",
    type: "Agentic AI System",
    role: "Solo Developer — AI Architecture & Engineering",
    roleShort: "Solo Dev",
    timelineMonths: 2,
    stackLabel: "Agents + LLM",
    status: "Repository",
    detailDescription:
      "Meridian is a LangChain-powered multi-agent research system that coordinates search, reading, writing, and critique agents to create current, source-backed reports through a Streamlit interface.",
    screenshots: [],
  },
  {
    id: "campus-ai",
    category: "ai",
    projectId: "campusai",
    name: "CampusAI",
    title: "CampusAI",
    tagline: "University answers, available the moment students need them.",
    github: "https://github.com/AmeerHamza73537/CampusAI",
    demo: "https://campus-ai-green.vercel.app",
    liveDemo: "https://campus-ai-green.vercel.app",
    path: "/projects/campus-ai",
    description:
      "A trained university assistant that classifies student questions and returns useful answers about admissions, programs, fees, exams, facilities, and campus services.",
    technologies: [
      "Python",
      "Flask",
      "scikit-learn",
      "HTML",
      "CSS",
      "JavaScript",
      "NLP",
    ],
    techStack: ["Python", "Flask", "scikit-learn", "NLP", "JavaScript"],
    features: [
      "Intent-based answers for common university questions",
      "Included trained model for immediate local use",
      "Responsive conversational web interface",
      "Prediction endpoint with empty-input validation",
      "Health endpoint and automated API checks",
      "Optional preprocessing, retraining, and evaluation workflow",
    ],
    longDescription:
      "CampusAI is a Flask-based university assistant built to make routine campus information easier to access. Students can ask about admissions, academic programs, fees, examinations, facilities, and student services in a conversational interface instead of searching through scattered pages.\n\nThe application ships with a trained scikit-learn model, vectorizer, and label encoder, so it can run immediately without repeating the training workflow. A separate development path supports preprocessing, model retraining, result plotting, and an optional neural-network experiment. The API includes input validation and health checks, with an automated verification script covering the main prediction flow.\n\nCampusAI combines a focused NLP use case with the practical engineering needed to make the model approachable through a responsive web product.",
    challenges:
      "The most demanding part was designing intent data that separated similar university questions reliably while still returning concise, useful answers for varied student phrasing.",
    outcome:
      "This project improved my understanding of text classification, model packaging, API validation, and translating an NLP model into a clear user-facing assistant.",
    year: "2026",
    type: "AI / NLP Web App",
    role: "Solo Developer — ML & Full-Stack Engineering",
    roleShort: "Solo Dev",
    timelineMonths: 2,
    stackLabel: "NLP + Flask",
    status: "Live",
    detailDescription:
      "CampusAI is a trained NLP-powered university assistant built with Python, scikit-learn, and Flask. It classifies student questions and responds through a responsive chat experience, with validation and API health checks included.",
    screenshots: [],
  },
];

export function getProjectByRouteId(projectId) {
  return projectData.find(
    (project) =>
      project.id === projectId ||
      project.projectId === projectId ||
      project.id.replace(/-/g, "") === projectId
  );
}
