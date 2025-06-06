"use client"; // This directive ensures the component renders on the client side, enabling Framer Motion.

import React, { useState, useEffect } from "react";
import Image from "next/image"; // Import the Image component for optimized image handling
import { Mail, Linkedin, Sun, Moon, Github, Code, Cloud, Server, Users, Award, Zap, HardDrive, Database, GitBranch, ShieldCheck, Clock, Lightbulb, TrendingUp, BarChart2, Briefcase, Calendar, MessageSquare, User, Send } from "lucide-react"; // Importing a wider range of icons for richer visual representation
import { motion } from "framer-motion"; // For smooth and engaging animations

export default function Home() {
  // State to manage dark mode. Initializes to true to make dark mode the default.
  const [darkMode, setDarkMode] = useState(() => {
    // Attempt to read from localStorage, default to true if not found
    if (typeof window !== 'undefined') { // Ensure localStorage is only accessed on the client side
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || savedTheme === null; // Default to dark if no preference or 'dark' saved
    }
    return true; // Default to dark during server-side rendering
  });

  // State for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(''); // 'success', 'error', 'sending', or ''

  // Effect to apply or remove the 'dark' class on the document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Persist theme preference
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Persist theme preference
    }
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending'); // Indicate sending state

    // IMPORTANT: For a real Vercel deployment and email sending, you MUST
    // implement a backend API route (e.g., in `pages/api/contact.ts` or `app/api/contact/route.ts`).
    // This frontend code alone cannot send emails securely or reliably.

    // Example of how you would call a Vercel serverless function (API route):
    try {
      const response = await fetch('/api/contact', { // Assuming you create pages/api/contact.ts
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        const errorData = await response.json();
        console.error('Form submission error:', errorData.message || 'Unknown error');
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Network or API error:', error);
      setFormStatus('error');
    }

    // Original simulation (removed for actual API call, but kept for understanding):
    // await new Promise(resolve => setTimeout(resolve, 1500));
    // setFormStatus('success');
    // setFormData({ name: '', email: '', message: '' }); // Clear form

    // Optionally clear status after a few seconds
    setTimeout(() => setFormStatus(''), 5000);
  };


  // Animation variants for section entrances
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for individual items within sections (e.g., skill cards, project cards)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-700 font-inter`}>
      {/* Dark Mode Toggle Button: Fixed position for easy access */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:scale-110 transition-transform duration-300 z-50 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-purple-600 cursor-pointer"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <main className="p-6 md:p-10 lg:p-16 max-w-7xl mx-auto space-y-24"> {/* Increased max-width and spacing */}

        {/* Hero Section: Clear professional branding and call-to-action. */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center space-y-10 py-20 md:py-32 bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white rounded-3xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background pattern/overlay for visual interest */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zm0 20v-4H4v4H0v2h4v4h2v-4h4v-2H6zM36 4v-4h-2v4h-4v2h4v4h2v-4h4V6h-4zM6 4v-4H4v4H0v2h4v4h2v-4h4V6H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

          {/* Profile Photo with enhanced animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="w-36 h-36 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-6 border-white dark:border-gray-700 shadow-2xl transform hover:scale-105 transition-transform duration-300 relative z-10"
          >
            <Image
              src="/profile pic.jpg" // Path to your uploaded profile picture
              alt="Sanjay Kumar's professional profile picture" // Improved alt text
              width={192} // Set intrinsic width for Image component (md:w-48 = 192px)
              height={192} // Set intrinsic height for Image component
              className="object-cover w-full h-full" // Tailwind classes for styling
              priority // Prioritize loading of this image
            />
          </motion.div>

          {/* Name + Title */}
          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight tracking-tighter drop-shadow-lg relative z-10">
            Sanjay Kumar
          </h1>
          {/* Tagline */}
          <p className="text-2xl md:text-3xl font-light opacity-90 max-w-3xl mx-auto relative z-10">
            I build scalable backend systems powering 100K+ users with cloud-native architectures.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-12 relative z-10">
            {/* CTA Buttons with more pronounced hover effects */}
            <motion.a
              href="/Sanjay_Kumar_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-700 hover:bg-gray-100 font-extrabold py-4 px-10 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Briefcase size={24} /> View Resume
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/sanjay-kumar-4738b91b1"
              target="_blank"
              rel="noopener noreferrer" // Added rel="noopener noreferrer" for security
              className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-extrabold py-4 px-10 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={24} /> LinkedIn
            </motion.a>
            <motion.a
              href="https://github.com/sanjaykrmallick"
              target="_blank"
              rel="noopener noreferrer" // Added rel="noopener noreferrer" for security
              className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-extrabold py-4 px-10 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={24} /> GitHub
            </motion.a>
          </div>
        </motion.section>

        {/* About Me Section: Humanizes your brand and highlights your journey. */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="space-y-8 p-8 md:p-16 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 text-center mb-10">About Me</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                I’m a Senior Backend Developer with over 5 years of hands-on experience in architecting and building highly scalable, cloud-native systems. My professional journey, from a Software Intern at Mediakind to a Senior Software Developer at Logic Square Technologies, has provided me with a robust foundation and a deep understanding of complex system design, optimization, and leadership in agile environments.
              </p>
              <p>
                My expertise lies in crafting resilient backend solutions using Node.js, REST APIs, and distributed architectures across AWS and GCP. I thrive on leading engineering teams, driving significant performance improvements—like optimizing API performance by 35% using Redis caching and MongoDB indexing—and achieving tangible cost reductions, such as a 15% decrease in AWS expenses through strategic Auto Scaling, EC2 optimization, and CI/CD pipeline implementations. I am passionate about creating efficient, maintainable, and impactful solutions that empower businesses and support large-scale user bases.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
              <motion.div variants={itemVariants} className="flex items-center gap-4 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <Users size={28} className="text-blue-600 dark:text-blue-400" />
                <span>100K+ User Systems Supported</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-4 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <TrendingUp size={28} className="text-green-600 dark:text-green-400" />
                <span>35% API Performance Boost</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-4 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <BarChart2 size={28} className="text-red-600 dark:text-red-400" />
                <span>15% AWS Cost Reduction</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-4 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <Briefcase size={28} className="text-purple-600 dark:text-purple-400" />
                <span>5+ Years Experience</span>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Experience Section: Complements your resume with deeper storytelling. */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="space-y-10 p-8 md:p-16 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 text-center mb-10">Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Experience Card: Logic Square Technologies */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">Senior Software Developer, Logic Square Technologies</h3>
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                <Calendar size={20} /> Sep 2020 – Apr 2025
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                <li>Promoted from SDE-1 to Senior Backend Developer for consistent delivery, technical leadership, and ownership of complex systems.</li>
                <li>Designed and scaled microservices for 100K+ users, improving API performance by 35% with Redis caching and MongoDB indexing.</li>
                <li>Reduced AWS costs by 15% and deployment time by 66% by implementing Auto Scaling, EC2 optimization, and CI/CD pipelines.</li>
                <li>Led a team of 3 developers; delivered real-time features, secure payments (Stripe/Square/Humbolt), calendar sync, and SEO-ready white-label platforms.</li>
              </ul>
            </motion.div>
            {/* Experience Card: Mediakind */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">Software Intern, Mediakind</h3>
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                <Calendar size={20} /> Jun 2019 – Jan 2020
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                <li>Improved Chromecast stability through 25+ test cases and BVTs for 3 product lines.</li>
                <li>Resolved 15+ production issues alongside senior developers, increasing feature release rate by 20%.</li>
                <li>Documented internal tools, improving the onboarding experience for new developers.</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section: Showcases your technical stack with clarity. */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="space-y-10 p-8 md:p-16 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 text-center mb-10">Skills</h2>
          <div className="space-y-12">
            {/* Languages & Tools */}
            <div>
              <h3 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-gray-800 dark:text-gray-100">
                <Code size={30} className="text-purple-600 dark:text-purple-400" /> Languages & Tools
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {['Node.js', 'TypeScript', 'JavaScript (ES6+)', 'Python', 'Ruby', 'React.js'].map((skill, index) => (
                  <motion.div key={index} variants={itemVariants} className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center font-medium text-lg text-gray-800 dark:text-gray-200 transform hover:scale-105">
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Frameworks & APIs */}
            <div>
              <h3 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-gray-800 dark:text-gray-100">
                <Server size={30} className="text-green-600 dark:text-green-400" /> Frameworks & APIs
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {['Express.js', 'NestJS', 'GraphQL', 'REST API', 'API Gateway'].map((skill, index) => (
                  <motion.div key={index} variants={itemVariants} className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center font-medium text-lg text-gray-800 dark:text-gray-200 transform hover:scale-105">
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cloud Platforms & DevOps */}
            <div>
              <h3 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-gray-800 dark:text-gray-100">
                <Cloud size={30} className="text-blue-600 dark:text-blue-400" /> Cloud Platforms & DevOps
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {['AWS (EC2, Lambda, S3, RDS)', 'GCP', 'Terraform', 'Docker', 'Kubernetes (basic)', 'CloudFront', 'Route 53', 'Amplify', 'SNS, SQS'].map((skill, index) => (
                  <motion.div key={index} variants={itemVariants} className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center font-medium text-lg text-gray-800 dark:text-gray-200 transform hover:scale-105">
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Databases & Tools */}
            <div>
              <h3 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-gray-800 dark:text-gray-100">
                <Database size={30} className="text-orange-600 dark:text-orange-400" /> Databases & Tools
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {['MongoDB', 'PostgreSQL', 'Redis', 'Stripe', 'Square', 'Humbolt', 'Twilio'].map((skill, index) => (
                  <motion.div key={index} variants={itemVariants} className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center font-medium text-lg text-gray-800 dark:text-gray-200 transform hover:scale-105">
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-gray-800 dark:text-gray-100">
                <Lightbulb size={30} className="text-yellow-600 dark:text-yellow-400" /> Soft Skills
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {['Leadership', 'Communication', 'Critical Thinking', 'Time Management', 'Problem Solving', 'Adaptability', 'Mentoring', 'Team Collaboration'].map((skill, index) => (
                  <motion.div key={index} variants={itemVariants} className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center font-medium text-lg text-gray-800 dark:text-gray-200 transform hover:scale-105">
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section: Shows tangible business impact. */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="space-y-10 p-8 md:p-16 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 text-center mb-10">Key Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Project Card: Closewise */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">Closewise - Notary Signing Workflow Automation</h3>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                <Code size={18} /> Tech Stack: Node.js, MongoDB, AWS, Stripe
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                Led backend development and maintained systems for Closewise, a platform revolutionizing notary signing workflows. Focused on scalable architecture, secure authentication, and payment integration. Implemented robust API endpoints, ensuring high availability and data integrity for critical financial transactions.
              </p>
              {/* Optional: Add links to live demo or repo here if available */}
            </motion.div>
            {/* Project Card: TrueFanz */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">TrueFanz - Creator Monetization Platform</h3>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                <Code size={18} /> Tech Stack: Node.js, PostgreSQL, Redis, Stripe
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                Contributed to the backend development of TrueFanz, an invite-only creator monetization platform, with a strong focus on real-time communication and payment processing. Designed and deployed microservices for content delivery and user engagement, handling high concurrent loads.
              </p>
              {/* Optional: Add links to live demo or repo here if available */}
            </motion.div>
            {/* Project Card: Vayco+ */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">Vayco+ - Digital Concierge Platform</h3>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                <Code size={18} /> Tech Stack: Node.js, Express.js, MongoDB, Twilio
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                Developed the backend for Vayco+, a digital concierge platform for the hospitality industry. Focused on implementing features like live chat, robust notification systems, and seamless third-party integrations, significantly enhancing the user experience.
              </p>
              {/* Optional: Add links to live demo or repo here if available */}
            </motion.div>
            {/* Project Card: BookSteet */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">BookSteet - Online Book Store (Frontend)</h3>
              <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                <Code size={18} /> Tech Stack: React.js, JavaScript, HTML, CSS
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                Worked on the frontend development of BookSteet, an online book store. My focus was on creating a fully responsive and intuitive user interface across various devices, demonstrating versatility in both backend and frontend development.
              </p>
              {/* Optional: Add links to live demo or repo here if available */}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section: Makes it easy to reach you, now with a form. */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="space-y-8 p-8 md:p-16 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 text-center"
        >
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-10">Get in Touch</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">Have an opportunity or idea to discuss? Let’s talk.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Contact Information */}
            <div className="space-y-6 text-left">
              <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-3 mb-4">
                <Mail size={30} className="text-blue-600 dark:text-blue-400" /> Direct Contact
              </h3>
              <motion.a
                href="mailto:sanjay.kr.mallick94@gmail.com"
                className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-xl transform hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-gray-700 py-4 px-6 rounded-full shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={28} /> sanjay.kr.mallick94@gmail.com
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/sanjay-kumar-4738b91b1"
                target="_blank"
                rel="noopener noreferrer" // Added rel="noopener noreferrer" for security
                className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-xl transform hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-gray-700 py-4 px-6 rounded-full shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={28} /> LinkedIn Profile
              </motion.a>
            </div>

            {/* Contact Form */}
            <div className="space-y-6 text-left">
              <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-3 mb-4">
                <MessageSquare size={30} className="text-purple-600 dark:text-purple-400" /> Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5} // Corrected: Passed as a number, not a string
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={24} /> Send Message
                    </>
                  )}
                </motion.button>
                {formStatus === 'success' && (
                  <p className="text-green-600 dark:text-green-400 mt-4 text-center text-lg font-semibold">Message sent successfully! I'll get back to you soon.</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-600 dark:text-red-400 mt-4 text-center text-lg font-semibold">Failed to send message. Please try again later.</p>
                )}
              </form>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="text-center text-gray-600 dark:text-gray-400 text-base py-12 border-t border-gray-200 dark:border-gray-700 mt-24">
          <p>&copy; {new Date().getFullYear()} Sanjay Kumar. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}