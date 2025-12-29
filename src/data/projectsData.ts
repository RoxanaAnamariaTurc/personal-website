export type ProjectProps = {
  id: number;
  title: string;
  imgLink: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
};

export const projects: ProjectProps[] = [
  {
    id: 1,
    title: "Quiz Game",
    imgLink: "src/assets/images/quiz.png",
    description:
      "A full-stack trivia game where players race against the clock to answer questions across multiple categories. Features user authentication, real-time scoring with star ratings, and a competitive leaderboard.",
    technologies: ["Javascript", "HMTL", "CSS", "PHP", "MySQL"],
    githubLink: "https://github.com/RoxanaAnamariaTurc/QuizGame#",
    liveLink: "",
  },
  {
    id: 2,
    title: "Monsters Rolodex",
    imgLink: "src/assets/images/monsters.png",
    description:
      "Monsters Rolodex is a React.js practice project that displays a searchable list of fun monster cards, helping you learn component design, props, hooks, and state management while transitioning from class to functional components. It showcases real-time search filtering and dynamic rendering of data using React’s useState and useEffect hooks. This project helped solidify key React concepts like component decomposition, API integration patterns, and modern React workflows.",
    technologies: ["React", "HTML", "CSS", "JavaScript"],
    githubLink:
      "https://github.com/RoxanaAnamariaTurc/Monsters_Rolodex_Challenge",
    liveLink: "",
  },
  {
    id: 3,
    title: "RUNNER",
    imgLink: "src/assets/images/runner.png",
    description:
      "RUNNER is a modern, high-performance cross-platform application designed for running events and communities that lets organizers manage events and participants while providing rich features like photo galleries and sponsor showcases. It runs as both a mobile app (iOS/Android) and a Progressive Web App, supporting multilingual experiences and offline capabilities. The project demonstrates modern React Native development practices and scalable architecture suitable for events of any size.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Expo Router",
      "i18next + React i18next",
    ],
    githubLink: "https://github.com/RoxanaAnamariaTurc/runner-app",
    liveLink: "https://runner-app-rox.netlify.app/",
  },
  {
    id: 4,
    title: "Little Lemon Restaurant",
    imgLink: "src/assets/images/lemon.png",
    description:
      "Little Lemon Restaurant is a responsive React web application built for a fictional Mediterranean restaurant in Chicago. The app features an interactive table reservation system with dynamic time slot availability, user authentication with form validation, online ordering with cart functionality, and a fully responsive design. Developed as the capstone project for the Meta Front-End Developer Professional Certificate on Coursera.",
    technologies: [
      "React",
      "React Router",
      "Formik",
      "Yup",
      "Emotion CSS",
      "Jest & React Testing Library",
      "JavaScript",
    ],
    githubLink: "https://github.com/RoxanaAnamariaTurc/little-lemon",
    liveLink: "https://littlelemonresta.netlify.app/",
  },
  {
    id: 4,
    title: "Portfolio Builder",
    imgLink: "src/assets/images/portfolio.png",
    description:
      "PortfolioBuilder is a full-stack web application that enables users to create and manage their professional portfolios with customizable projects, skills, and personal information. Users can register, upload profile images, add their work experience, and generate shareable portfolio pages. The application features a modern dark theme with pastel purple accents and responsive design for seamless use across devices.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Vite",
      "Emotion (CSS-in-JS)",
      "React Query",
      "React Router",
      "Axios",
      "Jest",
      "React Testing Library",
      "Storybook",
      "Multer",
      "Bcrypt",
      "CORS",
    ],
    githubLink: "https://github.com/RoxanaAnamariaTurc/PortfolioBuilder",
    liveLink: "https://jovial-hamster-06ef6e.netlify.app/",
  },
];
