import { HoverEffect } from "../ui/card-hover-effect";

export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8 pt-[72px]">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Taarak Gaada",
    role: "Frontend Developer at Stripe",
    description:
      "Master HTML, CSS, and JavaScript for building web interfaces. \nSpecialize in a frontend framework like React.js, Angular, or Vue.js. \nDevelop responsive design skills for cross-device compatibility. \nBuild a portfolio of projects, stay updated with industry trends, and foster strong communication skills for success.",
    link: "https://stripe.com",
  },
  {
    title: "Srinath Reddy",
    role: "Backend Developer at Netflix",
    description:
      "Master backend programming languages like Python, JavaScript (Node.js), or Java. Learn popular frameworks such as Django, Express.js, or Spring Boot for building scalable applications. Gain proficiency in working with databases like SQL (MySQL, PostgreSQL) or NoSQL (MongoDB). Develop skills in API design, security, and deployment to become a well-rounded backend developer.",
    link: "https://netflix.com",
  },
  {
    title: "Surabhi Waingankar",
    role: "Data Scientist at Google",
    description:
      "Learn Python and libraries like NumPy, Pandas, and Scikit-learn for data manipulation and machine learning. Dive into deep learning frameworks such as TensorFlow or PyTorch for neural network modeling. Understand algorithms and statistical techniques for feature engineering and model evaluation. Continuously explore advanced topics like natural language processing (NLP), computer vision, and reinforcement learning to expand expertise.",
    link: "https://google.com",
  },
  {
    title: "Tanisha Kanal",
    role: "UI/UX Designer at Meta",
    description:
      "Study principles of user interface (UI) design, including layout, typography, and color theory. Master tools like Adobe XD, Figma, or Sketch for wireframing and prototyping. Learn front-end technologies such as HTML, CSS, and JavaScript for implementing designs. Gain experience in user research, usability testing, and iterative design processes to create intuitive user experiences.",
    link: "https://meta.com",
  },
  {
    title: "Vivek Jain",
    role: "Cloud Solutions Architect at AWS",
    description:
      "Start with understanding the fundamentals of blockchain technology, including decentralized ledgers and consensus mechanisms. Learn programming languages such as Solidity for smart contract development on platforms like Ethereum. Familiarize yourself with blockchain development frameworks like Truffle and tools like Ganache for testing. Dive into decentralized application (DApp) development, exploring concepts like tokenization and decentralized finance (DeFi) to build practical blockchain solutions.",
    link: "https://amazon.com",
  },
  {
    title: "Shreyas Mahendra",
    role: "Quantum Computing Researcher at Microsoft",
    description:
      "Begin with a strong foundation in classical computer science and mathematics, including linear algebra and probability theory. Familiarize yourself with quantum mechanics principles and quantum computing concepts, such as qubits and quantum gates. Learn quantum programming languages like Q# or Qiskit for writing quantum algorithms and simulations. Dive into quantum algorithm design, quantum error correction, and quantum cryptography to explore the potential of quantum computing in various fields.",
    link: "https://microsoft.com",
  },
];
