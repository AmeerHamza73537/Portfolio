// src/data/projects.js
export const projectData = [
  {
    id: "job-nest",
    name: "JobNest",
    github: "https://github.com/AmeerHamza73537/JOB-NEST",
    demo: "",
    path: "/projects/job-nest",
    description:
      "Job Nest is a modern job portal web application where users can both post jobs and apply for jobs using a single account. It is designed to remove platform fragmentation, and streamline employer-candidate communication. The platform streamlines hiring workflows by combining job discovery, application submission, and communication into one seamless system.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", 'JWT', 'Redux', 'Firebase', 'TailwindCSS', 'GSAP', 'Locomotive',],
    detailDescription: 
    'Job-Nest is a full-stack job marketplace web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform is designed to solve a common limitation found in traditional freelance and job platforms, where users are required to create separate accounts (or use different emails) to act as both a client and a freelancer. Job-Nest eliminates this friction by allowing a single user account to seamlessly function as both a job provider and a job seeker at the same time. The application enables users to post job listings, browse available opportunities, and apply for jobs — all from one unified dashboard without switching accounts. It features secure JWT-based authentication, protected routes, and a RESTful API architecture to ensure scalability and data security. The frontend is developed with React and styled using Tailwind CSS to provide a clean, responsive, and intuitive user experience. The backend is structured for production readiness, with separate frontend and API deployments, simulating a real-world job marketplace environment focused on usability, efficiency, and modern full-stack architecture.',
    screenshots: [
      "https://via.placeholder.com/400x300?text=JobNest+1",
      "https://via.placeholder.com/400x300?text=JobNest+2"
    ]
  }, 
  {
    id: "home-scape",
    name: "HomeScape",
    github: "https://github.com/AmeerHamza73537/Real-Estate-Project",
    demo: "",
    path: "/projects/home-scape",
    description:
      "HomeScape is a modern real estate platform developed using the MERN stack and Tailwind CSS. The application enables users to explore property listings, view detailed property information, apply search and filter options, and securely manage user authentication, all within a responsive and visually appealing UI.Full CRUD application using MERN stack with REST APIs and responsive UI.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", 'Redux', 'Swiper', 'Firebase', 'Google OAuth'],
    detailDescription: 
    'Royal Estate is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform allows users to create, manage, and sell property listings through a clean and responsive interface. Users can securely register and log in using JWT-based authentication, ensuring protected access to their personal dashboards and data. Once authenticated, users can create new property listings, review their posted properties, update listing details, or delete them whenever needed, providing complete ownership and control over their content. The platform also enables potential buyers or tenants to directly contact landlords via email, streamlining communication and simplifying the inquiry process. The backend is built using a RESTful API architecture to ensure scalability and structured data handling, while the frontend is developed with React and styled for a modern, user-friendly experience. The project simulates a real-world property marketplace, focusing on secure authentication, CRUD functionality, and seamless user interaction within a production-ready full-stack environment.',
    screenshots: [
      "https://via.placeholder.com/400x300?text=HomeScape+1",
      "https://via.placeholder.com/400x300?text=HomeScape+2"
    ]
  },
   {
    id: "authify",
    name: "Authify",
    github: "https://github.com/AmeerHamza73537/MERN---Authentication-Server",
    demo: "",
    path: "/projects/authify",
    description:
      "Authify is a full-stack web application built with MongoDB, Express, React, and Node.js that provides secure user authentication. It features JWT-based login, password hashing, and protected routes, demonstrating real-world security best practices. The app highlights skills in full-stack development, authentication flows, and responsive UI design, making it a strong portfolio project for recruiters.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", ],
    detailDescription: 
    'Authify is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), focused on implementing secure and production-level user authentication workflows. The application includes user registration, login, logout, and secure session management using JWT-based authentication. It also features a complete password recovery system, allowing users to request a password reset via email and securely update their credentials through a time-sensitive reset link. The backend handles token generation, email verification logic, and protected routes to ensure data security and proper access control. The frontend provides a clean and responsive user interface for seamless user interaction, including validation and error handling. This project demonstrates a strong understanding of authentication architecture, secure token handling, email integration, and full-stack application security practices in a real-world environment.',
    screenshots: [
      "https://via.placeholder.com/400x300?text=Authify+1",
      "https://via.placeholder.com/400x300?text=Authify+2"
    ]
  },
  {
    id: "swiftmanage",
    name: "SwiftManage",
    github: "https://github.com/AmeerHamza73537/MERN-CRUD-Operations",
    demo: "",
    path: "/projects/swiftmanage",
    description:
      "SwiftManage is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React, Node.js) that provides complete user management functionality, including adding, editing, and deleting users. The project emphasizes clean UI design, efficient API handling, and scalable backend architecture.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", 'JWT', 'Redux', 'Firebase', 'TailwindCSS', 'GSAP', 'Locomotive', ],
    detailDescription: 
    'Manageif is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) that demonstrates complete Create, Read, Update, and Delete (CRUD) functionality for user data management. The application allows administrators or authorized users to add new users, view user records, update existing information, and delete users through a structured and intuitive interface. The backend is designed using RESTful API architecture to handle data operations efficiently, while MongoDB ensures scalable and organized data storage. The frontend is built with React to provide a dynamic and responsive user experience, including form validation and real-time updates. This project highlights strong understanding of full-stack architecture, state management, API integration, and database operations in a production-ready environment.',
    screenshots: [
      "https://via.placeholder.com/400x300?text=SwiftManage+1",
      "https://via.placeholder.com/400x300?text=SwiftManage+2"
    ]
  },
  {
    id: "course-hub",
    name: "CourseHub",
    github: "https://github.com/AmeerHamza73537/University-Courses-Portal",
    demo: "",
    path: "/projects/course-hub",
    description:
      "CourseHub is a frontend-focused course listing website built using React JSX, featuring a clean component-based architecture and responsive design. The platform presents courses in an organized manner with smooth navigation and an engaging user experience, emphasizing modern UI practices and performance.",
    technologies: ["React", "JSX", "CSS"],
    detailDescription: 
    'CourseHub is a frontend web application developed using React.js, designed to simulate a modern university portal system. The platform provides students with an organized and user-friendly interface to explore courses, access academic information, and navigate different sections of the university system efficiently. The application focuses on component-based architecture, reusable UI design, and dynamic rendering using React state and props. The project demonstrates strong understanding of React fundamentals including functional components, hooks, routing, state management, and responsive UI development. CourseHub emphasizes clean code structure, modular design, and smooth navigation to deliver an intuitive user experience similar to real-world academic management portals. This project highlights frontend development skills, UI structuring, and modern React development practices.',
    screenshots: [
      "https://via.placeholder.com/400x300?text=CourseHub+1",
      "https://via.placeholder.com/400x300?text=CourseHub+2"
    ]
  },
  
];
