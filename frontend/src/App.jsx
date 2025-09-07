import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RippleGrid from "./components/RippleGrid";
import { Particles } from "react-tsparticles";
import Loader from "./components/Loader";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";
import short from "./assets/short.png";
// import quoteImage from "./assets/quote-generator.webp";
// import currency from "./assets/currency-converter-project.webp";
// import portfolioImage from "./assets/github-profile-finder-app.webp";
// import profilePic from "./assets/hassan-khan-fullstack-developer.webp";
import certificate from "./assets/sololearn-web-dev-certificate.webp";
// import college from "./assets/unnamed.webp";
// import test from "./assets/speed-type-test-app.webp";
// import task from "./assets/task-manager-app.webp";
// import quiz from "./assets/quiz-app.webp";
// import color from "./assets/color-palette-app-HassanKhan.webp";
// import expense from "./assets/expense-app.webp";

import {
  FaComments,
  FaPaperPlane,
  FaUser,
  FaTag,
  FaComment,
  FaGithub,
  FaEnvelope,
  FaInstagram,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNode,
  FaLinkedin,
  FaGitAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaMoon,
  FaSun,
  FaWhatsapp,
  FaServer,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiPostman,
  SiRedux,
  SiTypescript,
  SiNextdotjs,
  SiFramer,
  SiSocketdotio,
  SiJsonwebtokens,
} from "react-icons/si";
// Initialize EmailJS once (must be outside the component)
emailjs.init("Rfc7bLUWc-ETdhlWK");

function App() {
  const formRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Picture = "https://iili.io/FmtK5qx.md.webp"; // Updated image URL
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Loader timeout
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   console.log("i will run on every render");
  //  }); // use this to slow your website 😁

  // Typewriter effect
  // Typewriter effect (no re-render on each letter)
  const lines = [
    "Building Scalable Web Applications",
    "Creating Pixel-Perfect UI Designs",
    "Optimizing Performance & SEO",
    "Turning Ideas Into Digital Products",
  ];

  const [typedText, setTypedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + currentLine[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    } else {
      // Wait before going to next line
      const timeout = setTimeout(() => {
        setTypedText("");
        setCharIndex(0);
        setLineIndex((prev) => (prev + 1) % lines.length); // loop lines
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex, lines]);
  // Dark mode on load
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  // email
  // email sender
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("📤 Sending message...");

    const formData = new FormData(formRef.current);
    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    try {
      const response = await fetch(
        "https://portfolio-backend-1-production-f1f5.up.railway.app/api/send-message", // ⬅️ Live backend URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert(`✅ Message sent successfully! Wait for my reply, ${name}.`);
        formRef.current.reset();
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Failed to send message. Please try again later.");
    }
  };
  // Animate on scroll
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => {
      el.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-700"
      );
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Smooth scroll
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const targetId = e.currentTarget.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
        setIsMobileMenuOpen(false);
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleSmoothScroll);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  // Dark mode toggle
  // const handleThemeToggle = () => {
  //   const newDarkMode = !darkMode;
  //   setDarkMode(newDarkMode);
  //   document.documentElement.classList.toggle("dark", newDarkMode);
  //   localStorage.setItem("darkMode", newDarkMode ? "enabled" : "disabled");

  //   try {
  //     new Audio("/click.mp3").play().catch(() => {});
  //     if ('vibrate' in navigator) navigator.vibrate(250);
  //   } catch (e) {
  //     console.log("Toggle error:", e);
  //   }
  // };

  // Loader
  if (isLoading) {
    return <Loader theme={darkMode ? "dark" : "light"} />;
  }
  return (
    <div className="font-sans transition-colors duration-300 bg-section1 text-dark dark:bg-dark dark:text-white">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Hassan Khan : Portfolio – Full Stack Developer | JavaScript, MERN &
          React
        </title>
        <meta
          name="description"
          content="Hassan Khan – Creative Full Stack Developer specializing in JavaScript, React, Node.js, Express, and MongoDB. Explore modern web apps and UI/UX skills."
        />
        <meta
          name="keywords"
          content="Hassan Khan, Full Stack Developer, JavaScript Developer, MERN Stack, React Portfolio, Web Developer, Node.js, Express, MongoDB"
        />
        <meta name="author" content="Hassan Khan" />
        <link
          rel="canonical"
          href="https://hassan-khan-portfolio.netlify.app/"
        />
        <meta
          property="og:title"
          content="Hassan Khan Portfolio – Full Stack Developer"
        />
        <meta
          property="og:description"
          content="Explore Hassan Khan's full stack projects, JavaScript & MERN stack skills, and modern web app designs."
        />
        <meta property="og:image" content="https://iili.io/FmQU9ea.jpg" />
        <meta
          property="og:url"
          content="https://hassan-khan-portfolio.netlify.app/"
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Hassan Khan",
        "jobTitle": "Full Stack Developer",
        "url": "https://hassan-khan-portfolio.netlify.app",
        "sameAs": [
          "https://github.com/hassankhan931",
          "https://www.linkedin.com/in/hassan-khan-4a3b67374"
        ]
      }
    `}
        </script>
      </Helmet>
      {/* HEADER */}
      <header className="fixed top-0 left-0 z-50 w-full transition-all shadow-sm dark:bg-slate-900/95">
        <div className="container flex items-center justify-between px-5 py-4 mx-auto">
          {/* LOGO */}
          <div className="text-xl font-bold dark:text-white">
            <a href="#home" className="text-dark dark:text-light">
              Hassan<span className="text-primary">Khan</span>
            </a>
          </div>

          {/* NAVIGATION */}
          <ul
            className={`${
              isMobileMenuOpen ? "flex" : "hidden"
            } fixed top-0 left-0 z-40 flex-col items-center justify-center w-full h-screen gap-8 font-medium text-xl bg-white text-dark dark:bg-dark dark:text-white md:static md:h-auto md:w-auto md:flex md:flex-row md:bg-transparent md:dark:bg-transparent`}
          >
            <li>
              <a
                href="#about"
                className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full hover:after:shadow-[0_0_10px] hover:after:shadow-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full hover:after:shadow-[0_0_10px] hover:after:shadow-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#full-stack-projects"
                className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full hover:after:shadow-[0_0_10px] hover:after:shadow-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full hover:after:shadow-[0_0_10px] hover:after:shadow-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* THEME TOGGLE + HAMBURGER */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const newDarkMode = !darkMode;
                setDarkMode(newDarkMode);
                document.documentElement.classList.toggle("dark", newDarkMode);
                localStorage.setItem(
                  "darkMode",
                  newDarkMode ? "enabled" : "disabled"
                );

                // Play sound
                try {
                  new Audio("/click.mp3").play();
                  if ("vibrate" in navigator) navigator.vibrate(250);
                } catch (err) {
                  console.log("Error:", err);
                }
              }}
              className="relative w-10 h-10"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <FaMoon className="block dark:hidden" />
              <FaSun className="hidden text-yellow-400 dark:block" />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="hamburger md:hidden flex flex-col justify-between w-8 h-5 cursor-pointer z-[1001]"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`line w-full h-0.5 bg-dark transition-all dark:bg-light ${
                  isMobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`line w-full h-0.5 bg-dark transition-all dark:bg-light ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`line w-full h-0.5 bg-dark transition-all dark:bg-light ${
                  isMobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>
      {/* main */}
      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative flex items-center min-h-[110vh] pt-5 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-950"
          aria-label="Hassan Khan - Professional Portfolio"
        >
          {/* Background Layers */}
          <div
            className="absolute inset-0 z-0 w-full h-full"
            aria-hidden="true"
          >
            {/* RippleGrid Background */}
            <RippleGrid
              enableRainbow={false}
              gridColor={darkMode ? "rgba(147, 197, 253, 0.85)" : "#2563eb"}
              rippleIntensity={darkMode ? 0.1 : 0.05}
              gridSize={10}
              gridThickness={darkMode ? 18 : 15}
              mouseInteraction={true}
              mouseInteractionRadius={1.2}
              opacity={darkMode ? 0.2 : 0.05}
              glowIntensity={darkMode ? 0.25 : 0}
              fadeDistance={darkMode ? 1.3 : 1.5}
            />

            {/* Particle Background */}
            <div
              className="absolute inset-0 opacity-30 dark:opacity-20"
              aria-hidden="true"
            >
              <Particles
                id="tsparticles"
                options={
                  {
                    /* ... (keep existing particle options) ... */
                  }
                }
              />
            </div>
          </div>

          <div className="container relative z-10 flex flex-col items-center px-5 py-16 mx-auto md:flex-row">
            {/* Main Content */}
            <article className="mb-12 text-center hero-content md:w-3/5 md:mb-0 md:pr-12 md:text-left">
              <header>
                <motion.div
                  className="inline-flex items-center px-4 py-2 mb-4 space-x-2 text-sm font-medium rounded-full bg-primary/10 text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary/80"></span>
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-primary"></span>
                  </span>
                  <span>Available for work</span>
                </motion.div>

                <motion.h1
                  className="mb-4 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <motion.span
                    className="block mb-2 text-lg font-medium tracking-wider text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    Hi, I'm
                  </motion.span>
                  Hassan Khan
                  <motion.span
                    className="relative inline-block ml-2"
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, delay: 0.8, type: "spring" }}
                  >
                    <span className="relative z-10">Full Stack</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 -skew-x-6 bg-primary/30 -rotate-1"></span>
                  </motion.span>
                  <motion.span
                    className="block md:inline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    {" "}
                    MERN Developer
                  </motion.span>
                </motion.h1>

                <motion.h2
                  id="typewriter-text"
                  className="mb-8 text-xl font-medium tracking-wide text-gray-600 md:text-2xl lg:text-3xl dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  aria-live="polite"
                >
                  {typedText}
                  <span className="inline-block w-[2px] h-8 bg-primary dark:bg-primary-light animate-pulse ml-1 align-middle">
                    <span className="sr-only">Cursor</span>
                  </span>
                </motion.h2>
              </header>

              <section>
                <motion.p
                  className="mb-10 text-lg leading-relaxed text-gray-700 dark:text-gray-400 max-w-[600px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.4 }}
                >
                  Crafting beautiful, responsive, and SEO-optimized web
                  experiences using{" "}
                  <strong className="relative px-1 font-medium text-primary dark:text-primary-light before:absolute before:inset-0 before:bg-primary/10 before:-z-10 before:-skew-x-6 before:-rotate-1">
                    React.js, Node.js, Express.js, MongoDB, and Tailwind CSS
                  </strong>
                  . Let's turn your ideas into high-performing digital
                  solutions.
                </motion.p>

                {/* CTA Buttons */}
                <motion.nav
                  className="flex flex-wrap justify-center gap-4 md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.6 }}
                >
                  <motion.a
                    href="#contact"
                    className="relative px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg group bg-gradient-to-r from-primary to-primary-dark hover:shadow-xl hover:scale-105"
                    aria-label="Contact Hassan Khan"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Contact Me</span>
                    <span className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary-dark to-primary"></span>
                  </motion.a>
                  <motion.a
                    href="#full-stack-projects"
                    className="relative px-8 py-3 font-semibold transition-all duration-300 bg-transparent border-2 rounded-full shadow-sm group text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md hover:scale-105"
                    aria-label="View Hassan Khan's Projects"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">View Projects</span>
                    <span className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-primary group-hover:opacity-100"></span>
                  </motion.a>
                </motion.nav>
              </section>

              {/* Social Links */}
              <motion.nav
                className="flex justify-center gap-4 mt-12 md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.8 }}
                aria-label="Social Media Links"
              >
                {[
                  {
                    icon: <FaEnvelope aria-hidden="true" />,
                    href: "mailto:khandaulathassankhan@gmail.com",
                    label: "Email",
                  },
                  {
                    icon: <FaGithub aria-hidden="true" />,
                    href: "https://github.com/hassankhan931",
                    label: "GitHub Profile",
                  },
                  {
                    icon: <FaLinkedin aria-hidden="true" />,
                    href: "https://www.linkedin.com/in/hassan-khan-4a3b67374",
                    label: "LinkedIn Profile",
                  },
                  {
                    icon: <FaInstagram aria-hidden="true" />,
                    href: "https://www.instagram.com/calm_boy_c_b?igsh=aTAzbG9uajAxanps",
                    label: "Instagram Profile",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative flex items-center justify-center w-12 h-12 transition-all duration-300 group rounded-full ${
                      darkMode
                        ? "bg-gray-800 text-primary-light hover:bg-primary/90"
                        : "bg-white text-primary hover:bg-primary/90"
                    } shadow-md hover:shadow-lg hover:scale-110`}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 5,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`${
                        darkMode
                          ? "text-primary-light group-hover:text-white"
                          : "text-primary group-hover:text-white"
                      }`}
                    >
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </motion.nav>
            </article>

            {/* Profile Image */}
            <motion.figure
              className="flex justify-center mb-24 hero-image md:w-2/5"
              initial={{ opacity: 0, x: 100, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, type: "spring" }}
            >
              <div className="relative w-64 h-64 overflow-hidden transition-all duration-500 md:w-80 md:h-80">
                <div
                  className="absolute inset-0 z-0 rounded-full bg-gradient-to-br from-primary to-primary-dark opacity-20 blur-xl animate-pulse"
                  aria-hidden="true"
                ></div>
                <div className="relative z-10 w-full h-full overflow-hidden border-4 border-white rounded-full shadow-2xl dark:border-gray-800">
                  <img
                    src="https://iili.io/FmQU9ea.jpg"
                    alt="Hassan Khan, a professional MERN Stack Developer"
                    className="object-cover rounded-full w-2/2 h-2/2"
                    width="320"
                    height="320"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.figure>
          </div>

          {/* Scroll Button */}
          <motion.nav
            className="absolute bottom-0 z-10 mt-5 transform -translate-x-1/2 left-1/2 animate-bounce"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 2.5, duration: 0.8 },
            }}
          >
            <a
              href="#about"
              className={`
        flex flex-col items-center
        px-4 py-2 rounded-lg
        text-sm font-medium
        transition-all duration-300
        ${
          darkMode
            ? "bg-gray-800/80 text-primary-light backdrop-blur-2xl"
            : "bg-white/80 text-primary backdrop-blur-2xl"
        }
        shadow-lg hover:shadow-xl
      `}
              aria-label="Scroll to About Section"
            >
              <span className="text-xs md:text-sm">Scroll Down</span>
              <svg
                className={`w-4 h-4 mt-1 ${
                  darkMode ? "text-primary-light" : "text-primary"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </motion.nav>
        </section>
        <section
          id="about"
          className="py-20 bg-section2 dark:bg-slate-900"
          aria-labelledby="about-heading"
        >
          <div className="container px-5 mx-auto">
            <header className="text-center">
              <h2
                id="about-heading"
                className="relative mb-12 text-3xl font-bold md:text-4xl"
              >
                About Me
                <span className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"></span>
              </h2>
            </header>

            <article className="flex flex-col gap-12">
              <section className="max-w-4xl mx-auto text-center md:text-left">
                <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  Hello! I'm{" "}
                  <strong className="font-semibold text-primary">
                    Hassan Khan
                  </strong>
                  , a passionate Full-Stack Developer with expertise in creating
                  modern, high-performance web applications. With a strong
                  foundation in both frontend and backend technologies, I
                  specialize in turning complex ideas into elegant,
                  user-friendly digital experiences.
                </p>

                <div className="grid gap-6 mb-8 md:grid-cols-2">
                  <article className="p-6 transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-1">
                    <h3 className="flex items-center mb-3 text-xl font-semibold">
                      <svg
                        className="w-5 h-5 mr-2 text-accent-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                      My Approach
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      I believe in{" "}
                      <strong className="font-medium">
                        clean, maintainable code
                      </strong>{" "}
                      and thoughtful architecture. Every project is an
                      opportunity to solve problems creatively while balancing
                      performance, scalability, and user experience.
                    </p>
                  </article>

                  <article className="p-6 transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-1">
                    <h3 className="flex items-center mb-3 text-xl font-semibold">
                      <svg
                        className="w-5 h-5 mr-2 text-accent-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      Continuous Learning
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      In this rapidly evolving field, I dedicate time weekly to{" "}
                      <strong className="font-medium">
                        learning new technologies
                      </strong>{" "}
                      and best practices. Currently exploring advanced React
                      patterns and cloud architecture.
                    </p>
                  </article>
                </div>
              </section>

              {/* Education Section */}
              <section
                aria-labelledby="education-heading"
                className="space-y-8"
              >
                <h3
                  id="education-heading"
                  className="mb-8 text-2xl font-bold text-center md:text-left"
                >
                  <span className="relative inline-block">
                    Web Development Certification
                    <span className="absolute bottom-0 left-0 w-full h-0.5 -mb-1 bg-gradient-to-r from-primary to-accent-1 rounded-full"></span>
                  </span>
                </h3>

                <article className="overflow-hidden transition-all duration-300 bg-white shadow-lg dark:bg-slate-800 rounded-xl hover:shadow-xl">
                  <div className="flex flex-col md:flex-row">
                    {/* Text Content */}
                    <div className="w-full p-6 md:w-1/2 md:p-8">
                      <header className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg bg-primary/10"
                            aria-hidden="true"
                          >
                            <svg
                              className="w-6 h-6 text-primary"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold md:text-2xl">
                            SoloLearn Web Developer
                          </h4>
                        </div>
                        <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                          2025
                        </span>
                      </header>

                      <p className="mb-6 text-gray-600 dark:text-gray-300">
                        Earned through comprehensive coursework covering modern
                        web development fundamentals and best practices.
                      </p>

                      {/* Key Skills */}
                      <section className="mb-6">
                        <h5 className="mb-3 font-medium text-gray-700 dark:text-gray-200">
                          Key Skills Validated:
                        </h5>
                        <div className="flex flex-wrap gap-2" role="list">
                          {[
                            "HTML5",
                            "CSS3",
                            "JavaScript",
                            "Responsive Design",
                            "DOM Manipulation",
                            "Web Accessibility",
                          ].map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-slate-700 dark:text-gray-200"
                              role="listitem"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>

                      {/* View Certificate Link */}
                      <a
                        href={Picture}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
                        aria-label="View SoloLearn certificate"
                      >
                        View Certificate
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>

                    {/* Certificate Image with Download Functionality */}
                    <figure className="w-full border-t border-gray-200 md:border-t-0 md:border-l dark:border-slate-700 md:w-1/2">
                      <div className="relative flex items-center justify-center h-full p-4 bg-gray-50 dark:bg-slate-900/50">
                        <img
                          src={Picture}
                          alt="SoloLearn Web Development Certificate showing Hassan Khan's achievement"
                          className="w-full max-w-md rounded-lg shadow-sm"
                          loading="lazy"
                          width="600"
                          height="400"
                        />

                        <button
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = certificate; // ✅ Use the correct URL
                            link.target = "_blank";
                            link.download =
                              "Hassan-Khan-SoloLearn-Certificate.webp"; // ✅ Match extension
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="absolute p-2 text-white transition-all bg-black rounded-full bottom-6 right-6 bg-opacity-80 hover:bg-opacity-100"
                          aria-label="Download certificate"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </figure>
                  </div>
                </article>
              </section>

              {/* Government Science College Section */}
              {/* Government Science College Section */}
              <section aria-labelledby="college-heading" className="space-y-8">
                <h3
                  id="college-heading"
                  className="mb-8 text-2xl font-bold text-center md:text-left"
                >
                  <span className="relative inline-block">
                    Academic Education
                    <span className="absolute bottom-0 left-0 w-full h-0.5 -mb-1 bg-gradient-to-r from-primary to-accent-1 rounded-full"></span>
                  </span>
                </h3>

                <article className="overflow-hidden transition-all duration-300 bg-white shadow-lg dark:bg-slate-800 rounded-xl hover:shadow-xl">
                  <div className="flex flex-col md:flex-row">
                    {/* Text Content */}
                    <div className="w-full p-6 md:w-1/2 md:p-8">
                      <header className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg bg-primary/10"
                            aria-hidden="true"
                          >
                            <svg
                              className="w-6 h-6 text-primary"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold md:text-2xl">
                            Government Science College
                          </h4>
                        </div>
                        <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                          2023 - 2025
                        </span>
                      </header>

                      <div className="mb-6 space-y-4 text-gray-600 dark:text-gray-300">
                        <p>
                          <strong className="font-medium">Degree:</strong> FSC
                          Pre-Medical
                        </p>
                        <p>
                          <strong className="font-medium">Location:</strong>{" "}
                          Lahore, Pakistan
                        </p>
                        <p>
                          Completed my FSC Pre-Medical studies, building a
                          strong foundation in biology, chemistry, and physics
                          before transitioning into full stack development.
                          Gained analytical and problem-solving skills useful
                          for programming.
                        </p>
                      </div>

                      {/* Key Subjects */}
                      <section className="mb-6">
                        <h5 className="mb-3 font-medium text-gray-700 dark:text-gray-200">
                          Key Subjects Studied:
                        </h5>
                        <div className="flex flex-wrap gap-2" role="list">
                          {[
                            "Biology",
                            "Chemistry",
                            "Physics",
                            "English",
                            "Urdu",
                          ].map((subject) => (
                            <span
                              key={subject}
                              className="px-3 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-slate-700 dark:text-gray-200"
                              role="listitem"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </section>

                      {/* Academic Achievements */}
                      <section className="mb-6">
                        <h5 className="mb-3 font-medium text-gray-700 dark:text-gray-200">
                          Academic Highlights:
                        </h5>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                          <li className="flex items-start">
                            <svg
                              className="flex-shrink-0 w-4 h-4 mt-1 mr-2 text-accent-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              Focused on understanding core science concepts
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="flex-shrink-0 w-4 h-4 mt-1 mr-2 text-accent-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Developed good self-learning habits</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="flex-shrink-0 w-4 h-4 mt-1 mr-2 text-accent-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              Gained teamwork and time management experience
                            </span>
                          </li>
                        </ul>
                      </section>

                      {/* Skills Gained */}
                      <section className="mb-6">
                        <h5 className="mb-3 font-medium text-gray-700 dark:text-gray-200">
                          Transferable Skills:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Analytical Thinking",
                            "Problem Solving",
                            "Self-Learning",
                            "Time Management",
                            "Teamwork",
                          ].map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-accent-1/10 text-accent-1"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>

                      {/* Location Link */}
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                          href="https://www.google.com/maps/place/Government+Graduate+College+of+Science/@31.5076092,74.2938725,17z/data=!3m1!4b1!4m6!3m5!1s0x3919039c2e7120f3:0xf99aee2a0b057d81!8m2!3d31.5076092!4d74.2964474!16s%2Fm%2F0gj8f8w?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
                          aria-label="View college location on Google Maps"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          View Location
                        </a>
                        {/* real website 👑*/}
                        <a
                          href="https://sites.google.com/gcslahore.edu.pk/ggcs/home"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-800 transition-colors bg-gray-100 rounded-lg dark:bg-slate-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
                          aria-label="Visit college website"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          College Website
                        </a>
                      </div>
                    </div>

                    {/* College Image */}
                    <figure className="w-full border-t border-gray-200 md:border-t-0 md:border-l dark:border-slate-700 md:w-1/2">
                      <div className="relative flex items-center justify-center h-full p-4 bg-gray-50 dark:bg-slate-900/50">
                        <div className="flex flex-col items-center justify-center w-full h-full text-center">
                          <img
                            src="https://iili.io/FmpBLj2.md.webp"
                            alt="Government Graduate College Of Science"
                            className="object-cover w-full max-w-md shadow-lg rounded-xl"
                          />
                          <figcaption className="mt-3 text-sm text-gray-400 dark:text-gray-500">
                            Government Graduate College Of Science
                          </figcaption>
                          {/* <div className="w-full max-w-md p-4 mt-4 bg-white rounded-lg shadow-sm dark:bg-slate-700">
                            <h6 className="mb-2 font-medium text-gray-700 dark:text-gray-200">
                              Notable Features:
                            </h6>
                            <ul className="space-y-1 text-sm text-left text-gray-600 dark:text-gray-300">
                              <li className="flex items-start">
                                <span className="mr-2 text-accent-1">•</span>
                                Premier science institution in Lahore
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-accent-1">•</span>
                                Established in 1886 (Rich history)
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-accent-1">•</span>
                                Modern labs and research facilities
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-accent-1">•</span>
                                Produced notable alumni in STEM fields
                              </li>
                            </ul>
                          </div> */}
                        </div>
                      </div>
                    </figure>
                  </div>
                </article>
              </section>
            </article>

            {/* Download CV Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  alert("It will be available soon");
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center transition-colors rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
                aria-label="Download CV (coming soon)"
              >
                Download CV
                <svg
                  className="w-4 h-4 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
        {/* SKILLS SECTION */}
        <motion.section
          id="skills"
          className="py-20 bg-section3 dark:bg-slate-950"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: false, amount: 0.2 }}
          aria-labelledby="skills-heading"
        >
          <div className="container px-5 mx-auto">
            <header className="text-center">
              <motion.h2
                id="skills-heading"
                className="relative mb-12 text-3xl font-bold tracking-tight md:text-4xl font-poppins"
                initial={{ y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <span className="relative z-10">
                  Skills & Technologies
                  <motion.span
                    className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{
                      delay: 0.1,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    aria-hidden="true"
                  />
                </span>
              </motion.h2>
            </header>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {/* Frontend Skills Section */}
              <motion.article
                aria-labelledby="frontend-skills"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <header className="relative group">
                  <motion.h3
                    id="frontend-skills"
                    className="inline-block mb-8 text-2xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text font-poppins"
                    initial={{ backgroundSize: "0% 100%" }}
                    whileInView={{
                      backgroundSize: "100% 100%",
                      transition: { duration: 0.6, ease: "easeOut" },
                    }}
                  >
                    Frontend Development
                  </motion.h3>
                </header>

                <motion.ul
                  className="grid grid-cols-2 gap-6 sm:grid-cols-3"
                  role="list"
                  aria-label="Frontend development skills"
                >
                  {[
                    {
                      icon: <FaHtml5 className="text-2xl" aria-hidden="true" />,
                      label: "HTML5",
                      id: "html",
                      color: "#E34F26",
                    },
                    {
                      icon: (
                        <FaCss3Alt className="text-2xl" aria-hidden="true" />
                      ),
                      label: "CSS3",
                      id: "css",
                      color: "#1572B6",
                    },
                    {
                      icon: (
                        <FaJsSquare className="text-2xl" aria-hidden="true" />
                      ),
                      label: "JavaScript",
                      id: "js",
                      color: "#F7DF1E",
                    },
                    {
                      icon: <FaReact className="text-2xl" aria-hidden="true" />,
                      label: "React",
                      id: "react",
                      color: "#61DAFB",
                    },
                    {
                      icon: (
                        <SiTailwindcss
                          className="text-2xl"
                          aria-hidden="true"
                        />
                      ),
                      label: "Tailwind CSS",
                      id: "tailwind",
                      color: "#06B6D4",
                    },
                    {
                      icon: (
                        <SiTypescript className="text-2xl" aria-hidden="true" />
                      ),
                      label: "TypeScript",
                      id: "typescript",
                      color: "#3178C6",
                    },
                    {
                      icon: (
                        <SiNextdotjs className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Next.js",
                      id: "next",
                      color: "#000000",
                    },
                    {
                      icon: (
                        <SiFramer className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Framer Motion",
                      id: "framer",
                      color: "#0055FF",
                    },
                    {
                      icon: (
                        <SiJsonwebtokens
                          className="text-2xl"
                          aria-hidden="true"
                        />
                      ),
                      label: "JSON Web Tokens",
                      id: "jwt",
                      color: "#000000",
                    },
                  ].map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.05 + i * 0.03, duration: 0.3 }}
                      viewport={{ once: false, amount: 0.1 }}
                      className="relative"
                      role="listitem"
                    >
                      <div
                        className="relative z-10 h-full p-1 transition-all duration-300 rounded-xl bg-gradient-to-br from-primary/20 to-accent-1/20 hover:from-primary/25 hover:to-accent-1/25 group"
                        tabIndex="0"
                        aria-label={`${item.label} skill`}
                      >
                        <div className="relative z-20 flex flex-col items-center gap-3 p-5 transition-all duration-300 rounded-lg cursor-pointer bg-white/90 backdrop-blur-md hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 h-full focus:outline-none hover:shadow-[0_0_6px_black]">
                          <div
                            className="flex items-center justify-center w-12 h-12 p-2 transition-all duration-300 bg-white rounded-full shadow-sm group-hover:shadow-md dark:bg-slate-700"
                            style={{ color: item.color }}
                            aria-hidden="true"
                          >
                            {item.icon}
                          </div>
                          <span className="text-lg font-medium transition-all duration-300 group-hover:text-primary dark:group-hover:text-accent-1">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>

              {/* Development Tools Section */}
              <motion.article
                aria-labelledby="tools-skills"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <header className="relative group">
                  <motion.h3
                    id="tools-skills"
                    className="inline-block mb-8 text-2xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text font-poppins"
                    initial={{ backgroundSize: "0% 100%" }}
                    whileInView={{
                      backgroundSize: "100% 100%",
                      transition: {
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.1,
                      },
                    }}
                  >
                    Development Tools
                  </motion.h3>
                </header>

                <motion.ul
                  className="grid grid-cols-2 gap-6 sm:grid-cols-3"
                  role="list"
                  aria-label="Development tools and technologies"
                >
                  {[
                    {
                      icon: (
                        <FaGitAlt className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Git",
                      id: "git",
                      color: "#F05032",
                    },
                    {
                      icon: (
                        <FaGithub className="text-2xl" aria-hidden="true" />
                      ),
                      label: "GitHub",
                      id: "github",
                      color: "#181717",
                    },
                    {
                      icon: (
                        <SiExpress className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Express.js",
                      id: "express",
                      color: "#000000",
                    },
                    {
                      icon: <FaNode className="text-2xl" aria-hidden="true" />,
                      label: "Node.js",
                      id: "node",
                      color: "#339933",
                    },
                    {
                      icon: (
                        <SiMongodb className="text-2xl" aria-hidden="true" />
                      ),
                      label: "MongoDB",
                      id: "mongodb",
                      color: "#47A248",
                    },
                    {
                      icon: (
                        <SiPostman className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Postman",
                      id: "postman",
                      color: "#FF6C37",
                    },
                    {
                      icon: <SiRedux className="text-2xl" aria-hidden="true" />,
                      label: "Redux",
                      id: "redux",
                      color: "#764ABC",
                    },
                    {
                      icon: (
                        <FaServer className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Server",
                      id: "server",
                      color: "#3b82f6",
                    },
                    {
                      icon: (
                        <SiSocketdotio
                          className="text-2xl"
                          aria-hidden="true"
                        />
                      ),
                      label: "Socket.io",
                      id: "socket",
                      color: "#010101",
                    },
                  ].map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.05 + i * 0.03, duration: 0.3 }}
                      viewport={{ once: false, amount: 0.1 }}
                      className="relative"
                      role="listitem"
                    >
                      <div
                        className="relative z-10 h-full p-1 transition-all duration-300 rounded-xl bg-gradient-to-br from-primary/20 to-accent-1/20 hover:from-primary/25 hover:to-accent-1/25 group"
                        tabIndex="0"
                        aria-label={`${item.label} tool`}
                      >
                        <div className="relative z-20 flex flex-col items-center gap-3 p-5 transition-all duration-300 rounded-lg cursor-pointer bg-white/90 backdrop-blur-md hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 h-full focus:outline-none hover:shadow-[0_0_6px_black]">
                          <div
                            className="flex items-center justify-center w-12 h-12 p-2 transition-all duration-300 bg-white rounded-full shadow-sm group-hover:shadow-md dark:bg-slate-700"
                            style={{ color: item.color }}
                            aria-hidden="true"
                          >
                            {item.icon}
                          </div>
                          <span className="text-lg font-medium transition-all duration-300 group-hover:text-primary dark:group-hover:text-accent-1">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>
            </div>
          </div>
        </motion.section>
        {/* full stack  */}
        <section
          id="full-stack-projects"
          className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-25 via-violet-50 to-fuchsia-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
          aria-labelledby="projects-heading"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute bg-purple-300 rounded-full top-20 left-10 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div
              className="absolute rounded-full top-10 right-10 w-80 h-80 bg-amber-300 mix-blend-multiply filter blur-xl opacity-20 animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bg-pink-300 rounded-full bottom-20 left-20 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-float"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="absolute rounded-full bottom-10 right-20 w-80 h-80 bg-cyan-300 mix-blend-multiply filter blur-xl opacity-20 animate-float"
              style={{ animationDelay: "6s" }}
            ></div>
          </div>

          {/* Glowing orbs */}
          <div className="absolute rounded-full -top-20 -left-20 w-96 h-96 bg-purple-500/10 blur-3xl"></div>
          <div className="absolute rounded-full -bottom-20 -right-20 w-96 h-96 bg-cyan-500/10 blur-3xl"></div>

          <div className="container relative z-10 px-4 mx-auto">
            <header className="mb-16 text-center">
              <div className="inline-flex mb-4 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/30 shadow-sm">
                <span className="text-sm font-medium text-primary dark:text-accent">
                  Full-Stack
                </span>
              </div>
              <h2
                id="projects-heading"
                className="relative mb-5 text-4xl font-bold text-center md:text-5xl text-slate-800 dark:text-white"
              >
                Featured{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Projects
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                Explore my latest full-stack applications built with modern
                technologies and best practices
              </p>
              <div className="relative inline-flex justify-center mt-8">
                <div className="absolute rounded-lg -inset-1 bg-gradient-to-r from-primary to-accent blur opacity-30"></div>
                <div className="relative w-24 h-1 mt-2 rounded-full bg-gradient-to-r from-primary to-accent"></div>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-12">
              {/* Project 1 - Expense Tracker */}
              <article className="relative overflow-hidden transition-all duration-500 group rounded-2xl hover:-translate-y-1">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition duration-700"></div>

                <div className="relative h-full overflow-hidden border shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border-white/30 dark:border-slate-700/30">
                  {/* Project Image */}
                  <figure className="relative overflow-hidden h-72 bg-slate-100 dark:bg-slate-700">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-4 left-4 z-20 flex space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                    </div>
                    <img
                      src="https://iili.io/FmZCiss.md.webp"
                      alt="Expense Tracker SaaS application dashboard showing financial analytics and charts"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                    />
                    <div className="absolute z-20 bottom-4 left-4">
                      <span className="px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-primary to-accent rounded-full shadow-lg backdrop-blur-sm">
                        Live Project
                      </span>
                    </div>
                  </figure>

                  {/* Project Content */}
                  <div className="p-6 md:p-8">
                    <header className="mb-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                          Expense Tracker App
                        </h3>
                        <div className="flex items-center">
                          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse mr-2"></div>
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            Live
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        MERN Stack SaaS Application
                      </p>
                    </header>

                    <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
                      A sleek MERN stack SaaS application featuring an
                      interactive dashboard, personalized user profiles, and
                      real-time data fetching from MongoDB. Designed for
                      seamless financial tracking with JWT-based authentication
                      and secure data handling.
                    </p>

                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                      <section aria-label="Key features">
                        <h4 className="flex items-center mb-3 font-semibold text-slate-800 dark:text-white">
                          <svg
                            className="w-5 h-5 mr-2 text-accent"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Key Features
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                          <li className="flex items-start">
                            <svg
                              className="w-4 h-4 mt-0.5 mr-3 text-accent flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              Interactive financial dashboard with charts
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-4 h-4 mt-0.5 mr-3 text-accent flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Secure JWT authentication system</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-4 h-4 mt-0.5 mr-3 text-accent flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              Responsive design with Framer Motion animations
                            </span>
                          </li>
                        </ul>
                      </section>

                      <section aria-label="Technologies used">
                        <h4 className="flex items-center mb-3 font-semibold text-slate-800 dark:text-white">
                          <svg
                            className="w-5 h-5 mr-2 text-accent"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2" role="list">
                          {[
                            "React.Js",
                            "FramerMotion",
                            "JWT",
                            "MongoDB",
                            "Node.js",
                            "Express",
                          ].map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 text-xs font-medium bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-600/30 shadow-sm"
                              role="listitem"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </section>
                    </div>

                    <nav aria-label="Project links" className="space-y-3">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                          href="https://expensetracker-pro.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                          aria-label="View Expense Tracker live demo"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                          </svg>
                          Live Demo
                        </a>

                        <a
                          href="https://github.com/hassankhan931/Expense-App-MERN"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm font-semibold text-center transition-all duration-300 rounded-xl bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/30 text-slate-700 dark:text-slate-200 hover:shadow-lg hover:-translate-y-0.5"
                          aria-label="View Expense Tracker source code"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            ></path>
                          </svg>
                          Source Code
                        </a>
                      </div>

                      <a
                        href="https://streamable.com/wn1flr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all duration-300 rounded-xl bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/30 hover:shadow-lg hover:-translate-y-0.5"
                        aria-label="View Expense Tracker video preview"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Video Preview
                      </a>
                    </nav>
                  </div>
                </div>
              </article>

              {/* Project 2 - Chat App */}
              <article className="relative overflow-hidden transition-all duration-500 group rounded-2xl hover:-translate-y-1">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition duration-700"></div>

                <div className="relative h-full overflow-hidden border shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border-white/30 dark:border-slate-700/30">
                  {/* Project Image */}
                  <figure className="relative overflow-hidden h-72 bg-slate-100 dark:bg-slate-700">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-4 left-4 z-20 flex space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                    </div>
                    <img
                      src="https://iili.io/Fy1wv1I.md.png"
                      alt="Real-time chat application interface showing conversation threads"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                    />
                    <div className="absolute z-20 bottom-4 left-4">
                      <span className="px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-primary to-accent rounded-full shadow-lg backdrop-blur-sm">
                        Live Project
                      </span>
                    </div>
                  </figure>

                  {/* Project Content */}
                  <div className="p-6 md:p-8">
                    <header className="mb-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                          SocketChat Pro
                        </h3>
                        <div className="flex items-center">
                          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse mr-2"></div>
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            Live
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Real-Time Chat Application
                      </p>
                    </header>

                    <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
                      A full-featured real-time chat application with secure JWT
                      authentication, bcrypt password hashing, and WebSocket
                      communication via Socket.io. Features include persistent
                      messaging history, user presence indicators, and
                      responsive design.
                    </p>

                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                      <section aria-label="Key features">
                        <h4 className="flex items-center mb-3 font-semibold text-slate-800 dark:text-white">
                          <svg
                            className="w-5 h-5 mr-2 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Key Features
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                          <li className="flex items-start">
                            <svg
                              className="w-4 h-4 mt-0.5 mr-3 text-blue-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Real-time messaging with Socket.io</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-4 h-4 mt-0.5 mr-3 text-blue-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              Secure JWT authentication with bcrypt hashing
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-4 h-4 mt-0.5 mr-3 text-blue-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              Message history and user presence indicators
                            </span>
                          </li>
                        </ul>
                      </section>

                      <section aria-label="Technologies used">
                        <h4 className="flex items-center mb-3 font-semibold text-slate-800 dark:text-white">
                          <svg
                            className="w-5 h-5 mr-2 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2" role="list">
                          {[
                            "React.Js",
                            "Socket.io",
                            "JWT Auth",
                            "Bcrypt",
                            "MongoDB",
                            "Node.js",
                            "Express",
                          ].map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 text-xs font-medium bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-600/30 shadow-sm"
                              role="listitem"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </section>
                    </div>

                    <nav aria-label="Project links" className="space-y-3">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                          href="https://starlit-babka-4dee79.netlify.app/"
                          target="_blank"
                          className="flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-blue-400/30 hover:-translate-y-0.5"
                          aria-label="View SocketChat live demo (coming soon)"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                          </svg>
                          Live Demo
                        </a>

                        <a
                          href="https://github.com/hassankhan931/MERN-CHAT-APP"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm font-semibold text-center transition-all duration-300 rounded-xl bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/30 text-slate-700 dark:text-slate-200 hover:shadow-lg hover:-translate-y-0.5"
                          aria-label="View SocketChat source code"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            ></path>
                          </svg>
                          Source Code
                        </a>
                      </div>

                      <a
                        href="https://streamable.com/sisr2x"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all duration-300 rounded-xl bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/30 hover:shadow-lg hover:-translate-y-0.5"
                        aria-label="View SocketChat video preview"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Video Preview
                      </a>
                    </nav>
                  </div>
                </div>
              </article>
              {/* Project 3 - URL Shortener */}
              <article className="relative overflow-hidden transition-all duration-500 group rounded-2xl hover:-translate-y-1">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition duration-700"></div>

                <div className="relative h-full overflow-hidden border shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border-white/30 dark:border-slate-700/30">
                  {/* Project Image */}
                  <figure className="relative overflow-hidden h-72 bg-slate-100 dark:bg-slate-700">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-4 left-4 z-20 flex space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                    </div>
                    <img
                      src={short} // Replace with your actual image URL
                      alt="Simple URL Shortener interface showing shortened links"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                    />
                    <div className="absolute z-20 bottom-4 left-4">
                      <span className="px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg backdrop-blur-sm">
                        Live Project
                      </span>
                    </div>
                  </figure>

                  {/* Project Content */}
                  <div className="p-6 md:p-8">
                    <header className="mb-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                          Simple URL Shortener
                        </h3>
                        <div className="flex items-center">
                          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse mr-2"></div>
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            Live
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Next.js Full-Stack Project with Tailwind CSS
                      </p>
                    </header>

                    <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
                      A minimal full-stack URL shortener built with Next.js,
                      MongoDB, and styled using Tailwind CSS. It allows users to
                      generate shortened links instantly with a clean and
                      responsive interface.
                    </p>

                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                      <section aria-label="Key features">
                        <h4 className="flex items-center mb-3 font-semibold text-slate-800 dark:text-white">
                          <svg
                            className="w-5 h-5 mr-2 text-emerald-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Key Features
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                          <li className="flex items-start">
                            <svg
                              className="w-4 h-4 mt-0.5 mr-3 text-emerald-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Instantly create short URLs</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-4 h-4 mt-0.5 mr-3 text-emerald-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Simple and responsive UI</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-4 h-4 mt-0.5 mr-3 text-emerald-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              Full-stack implementation with Next.js & MongoDB
                            </span>
                          </li>
                        </ul>
                      </section>

                      <section aria-label="Technologies used">
                        <h4 className="flex items-center mb-3 font-semibold text-slate-800 dark:text-white">
                          <svg
                            className="w-5 h-5 mr-2 text-emerald-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2" role="list">
                          {[
                            "Next.js",
                            "Tailwind CSS",
                            "API Routes",
                            "MongoDB",
                          ].map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 text-xs font-medium bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-600/30 shadow-sm"
                              role="listitem"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </section>
                    </div>

                    <nav aria-label="Project links" className="space-y-3">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                          href="https://short-url-ochre-nine.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-400/30 hover:-translate-y-0.5"
                          aria-label="View URL Shortener live demo"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                          </svg>
                          Live Demo
                        </a>

                        <a
                          href="https://github.com/hassankhan931/Short-Url"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm font-semibold text-center transition-all duration-300 rounded-xl bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/30 text-slate-700 dark:text-slate-200 hover:shadow-lg hover:-translate-y-0.5"
                          aria-label="View URL Shortener source code"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            ></path>
                          </svg>
                          Source Code
                        </a>
                      </div>

                      <a
                        href="https://streamable.com/5ke0c5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all duration-300 rounded-xl bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/30 hover:shadow-lg hover:-translate-y-0.5"
                        aria-label="View URL Shortener video preview"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Video Preview
                      </a>
                    </nav>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
          `}</style>
        </section>
        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="py-20 transition-colors duration-300 bg-slate-200 dark:bg-black"
          aria-labelledby="contact-heading"
        >
          <div className="container max-w-6xl px-5 mx-auto">
            {/* Section Heading */}
            <motion.header
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h2
                id="contact-heading"
                className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
              >
                Get In Touch
              </h2>
              <div className="w-20 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                Have a project in mind or just want to say hello? I'd love to
                hear from you.
              </p>
            </motion.header>

            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Left Info Card */}
              <motion.article
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="p-8 bg-white shadow-md dark:bg-gray-800 rounded-xl lg:w-1/2"
                aria-labelledby="connect-heading"
              >
                <header className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 bg-blue-100 rounded-lg dark:bg-blue-900">
                    <FaComments className="text-xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3
                    id="connect-heading"
                    className="text-2xl font-semibold text-gray-900 dark:text-black"
                  >
                    Let's Connect!
                  </h3>
                </header>

                <p className="mb-8 leading-relaxed text-gray-600 dark:text-black">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision.
                </p>

                {/* Contact Info */}
                <address className="mb-10 not-italic">
                  <ul className="space-y-6">
                    {[
                      {
                        icon: <FaEnvelope className="text-lg" />,
                        content: (
                          <a
                            href="mailto:khandaulathassankhan@gmail.com"
                            className="text-gray-700 transition-colors duration-200 dark:text-black hover:text-blue-600 dark:hover:text-red-400 hover:font-semibold"
                            aria-label="Send email to Hassan Khan"
                          >
                            Email
                          </a>
                        ),
                      },
                      {
                        icon: <FaMapMarkerAlt className="text-lg" />,
                        content: (
                          <a
                            href="https://www.google.com/maps/place/Sabzazar+Housing+Scheme,+Lahore,+Punjab"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 transition-colors duration-200 dark:text-black hover:text-blue-600 dark:hover:text-red-400 hover:font-semibold"
                            aria-label="View Hassan Khan's location on Google Maps"
                          >
                            Location
                          </a>
                        ),
                      },
                      {
                        icon: <FaWhatsapp className="text-lg" />,
                        content: (
                          <a
                            href="https://wa.me/923354232380"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 transition-colors duration-200 dark:text-black hover:text-blue-600 dark:hover:text-red-400 hover:font-semibold"
                            aria-label="Contact Hassan Khan on WhatsApp"
                          >
                            Whatsapp
                          </a>
                        ),
                      },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center p-3 transition-colors duration-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg dark:bg-blue-900">
                          {item.icon}
                        </div>
                        <div className="text-left">{item.content}</div>
                      </motion.li>
                    ))}
                  </ul>
                </address>

                {/* Social Links */}
                <section aria-labelledby="social-heading">
                  <h4
                    id="social-heading"
                    className="mb-4 text-lg font-medium text-black dark:text-black"
                  >
                    Follow me on
                  </h4>
                  <div className="flex gap-4">
                    {[
                      {
                        icon: <FaGithub className="text-lg" />,
                        link: "https://github.com/hassankhan931",
                        label: "GitHub profile",
                      },
                      {
                        icon: <FaLinkedin className="text-lg" />,
                        link: "https://www.linkedin.com/in/hassan-khan-4a3b67374",
                        label: "LinkedIn profile",
                      },
                      {
                        icon: <FaFacebook className="text-lg" />,
                        link: "https://www.facebook.com/share/16ppMivx7T/",
                        label: "Facebook profile",
                      },
                      {
                        icon: <FaInstagram className="text-lg" />,
                        link: "https://www.instagram.com/calm_boy_c_b?igsh=aTAzbG9uajAxanps",
                        label: "Instagram profile",
                      },
                    ].map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 text-black transition-all duration-100 rounded-lg bg-grey-100 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                        aria-label={item.label}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.icon}
                      </motion.a>
                    ))}
                  </div>
                </section>
              </motion.article>

              {/* Right Contact Form */}
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-8 bg-purple-500 shadow-md dark:bg-gray-800 rounded-xl lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                aria-labelledby="form-heading"
              >
                <header className="flex items-center mb-8">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 bg-blue-100 rounded-lg dark:bg-blue-900">
                    <FaPaperPlane className="text-xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3
                    id="form-heading"
                    className="text-2xl font-semibold text-black dark:text-black"
                  >
                    Send a Message
                  </h3>
                </header>

                <fieldset>
                  <legend className="sr-only">Contact form fields</legend>
                  {[
                    {
                      id: "name",
                      label: "Your Name",
                      type: "text",
                      name: "user_name",
                      autoComplete: "name",
                      "aria-required": "true",
                      icon: <FaUser className="text-black dark:text-white" />,
                    },
                    {
                      id: "email",
                      label: "Email Address",
                      type: "email",
                      name: "user_email",
                      autoComplete: "email",
                      "aria-required": "true",
                      icon: (
                        <FaEnvelope className="text-black dark:text-white" />
                      ),
                    },
                    {
                      id: "subject",
                      label: "Subject",
                      type: "text",
                      name: "subject",
                      autoComplete: "off",
                      "aria-required": "true",
                      icon: <FaTag className="text-black dark:text-white" />,
                    },
                  ].map((field, i) => (
                    <motion.div
                      className="mb-6"
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      viewport={{ once: true, amount: 0.5 }}
                    >
                      <label
                        htmlFor={field.id}
                        className="block mb-2 font-medium text-gray-700 dark:text-black"
                      >
                        {field.label}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          {field.icon}
                        </div>
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.name}
                          autoComplete={field.autoComplete}
                          required
                          aria-required={field["aria-required"]}
                          className="w-full py-3 pl-10 pr-4 transition-colors duration-200 bg-white border border-gray-200 rounded-lg dark:bg-black dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </fieldset>

                <fieldset className="mb-8">
                  <legend className="sr-only">Message textarea</legend>
                  <label
                    htmlFor="message"
                    className="block mb-2 font-medium text-gray-700 dark:text-black"
                  >
                    Your Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3">
                      <FaComment className="text-black dark:text-white" />
                    </div>
                    <textarea
                      id="message"
                      rows="5"
                      name="message"
                      autoComplete="off"
                      required
                      aria-required="true"
                      className="w-full py-3 pl-10 pr-4 transition-colors duration-200 bg-white border border-gray-200 rounded-lg dark:bg-black dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell me about your project or just say hello..."
                    ></textarea>
                  </div>
                </fieldset>

                <motion.button
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-colors duration-100 bg-blue-600 rounded-lg hover:bg-blue-550"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                  <FaPaperPlane className="ml-2 text-sm" />
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      {/* FOOTER */}
      <footer
        className="py-8 text-white bg-section7 dark:bg-slate-900"
        aria-label="Website footer"
      >
        <div className="container px-5 mx-auto text-center">
          <div className="mb-4">
            <a
              href="#"
              className="text-2xl font-bold"
              aria-label="Return to top of page"
            >
              Hassan<span className="text-primary">Khan</span>
            </a>
          </div>

          <p className="mb-4">
            Web Engineer | Web Developer | UI/UX Enthusiast
          </p>

          <nav aria-label="Footer navigation">
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {[
                { href: "#home", text: "Home" },
                { href: "#about", text: "About" },
                { href: "#skills", text: "Skills" },
                { href: "#full-stack-projects", text: "Projects" },
                { href: "#contact", text: "Contact" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="transition-colors hover:text-primary-light hover:underline"
                  aria-label={`Go to ${link.text} section`}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </nav>

          <div className="copyright">
            <p>
              &copy; {new Date().getFullYear()} Hassan Khan. All rights
              reserved.
            </p>
            <p>
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
