import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RippleGrid from "./components/RippleGrid";
import Loader from "./components/Loader";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";
import quoteImage from "./assets/quote-generator.webp";
import currency from "./assets/currency-converter-project.webp";
import portfolioImage from "./assets/github-profile-finder-app.webp";
import profilePic from "./assets/hassan-khan-fullstack-developer.webp";
import certificate from "./assets/sololearn-web-dev-certificate.webp";
import test from "./assets/speed-type-test-app.webp";
import task from "./assets/task-manager-app.webp";
import quiz from "./assets/quiz-app.webp";
import color from "./assets/color-palette-app-HassanKhan.webp";
import expense from "./assets/expense-app.webp";

import {
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
} from "react-icons/fa";

import { SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";
// Initialize EmailJS once (must be outside the component)
emailjs.init("Rfc7bLUWc-ETdhlWK");

function App() {
  const formRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Loader timeout
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let isActive = true;
    const phrases = [
      "Building Scalable Web Applications",
      "Creating Pixel-Perfect UI Designs",
      "Optimizing Performance & SEO",
      "Turning Ideas Into Digital Products",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentTimeout;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      const updatedText = isDeleting
        ? currentPhrase.substring(0, charIndex--)
        : currentPhrase.substring(0, charIndex++);

      if (!isActive) return;
      setTypedText(updatedText);

      if (!isDeleting && charIndex === currentPhrase.length + 1) {
        currentTimeout = setTimeout(() => {
          isDeleting = true;
          type();
        }, 800);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        currentTimeout = setTimeout(type, 300);
      } else {
        currentTimeout = setTimeout(type, isDeleting ? 40 : 75);
      }
    };

    type();

    return () => {
      isActive = false;
      clearTimeout(currentTimeout);
    };
  }, []);

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
        <meta
          name="google-site-verification"
          content="jaJYt8CEkFwNMQoA4wkYqzXS8LJ5DIKWPFjsjLvqQ6I"
        />
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
        <meta
          property="og:image"
          content="https://hassan-khan-portfolio.netlify.app/hassan-khan-fullstack-developer.webp"
        />
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
                href="#projects"
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
        <section
          id="home"
          className="relative flex items-center min-h-screen pt-20 overflow-hidden bg-section1 dark:bg-slate-950"
        >
          {/* RippleGrid Background */}
          <div className="absolute inset-0 z-0 w-full h-full">
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
          </div>

          {/* Content */}
          <div className="container relative z-10 flex flex-col items-center px-5 py-16 mx-auto md:flex-row">
            {/* Left Text */}
            <div className="mb-12 text-center hero-content md:w-3/5 md:mb-0 md:pr-8 md:text-left">
              <h4 className="mb-2 text-lg text-primary animate-fadeInDown">
                Hi, I'm
              </h4>

              {/* SEO-optimized but balanced */}
              <h1 className="mb-2 text-2xl font-bold leading-snug text-gray-900 md:text-4xl lg:text-5xl dark:text-white animate-fadeInDown">
                Hassan Khan — Full Stack MERN Developer
              </h1>

              {/* Typed text */}
              <h2 className="mb-6 text-xl font-medium text-gray-600 md:text-2xl lg:text-3xl dark:text-gray-300 animate-fadeInDown animate-delay-200">
                {typedText}
                <span className="animate-pulse">|</span>
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-400 animate-fadeIn animate-delay-400">
                Crafting beautiful, responsive, and SEO-optimized web
                experiences using{" "}
                <strong>
                  React.js, Node.js, Express.js, MongoDB, and Tailwind CSS
                </strong>
                . Let’s turn your ideas into high-performing digital solutions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 md:justify-start animate-fadeIn animate-delay-600">
                <a
                  href="#contact"
                  className="px-6 py-3 font-semibold text-white transition-all rounded-full shadow-sm btn-primary bg-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:-translate-y-1 hover:shadow-md"
                >
                  Contact Me
                </a>
                <a
                  href="#projects"
                  className="px-6 py-3 font-semibold transition-all border-2 rounded-full shadow-sm btn-secondary text-primary border-primary hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-sm"
                >
                  View Projects
                </a>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 mt-8 md:justify-start animate-fadeIn animate-delay-800">
                <a
                  href="mailto:khandaulathassankhan@gmail.com"
                  className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white hover:-translate-y-1"
                  aria-label="Email Hassan Khan"
                >
                  <FaEnvelope />
                </a>
                <a
                  href="https://github.com/hassankhan931"
                  className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white hover:-translate-y-1"
                  aria-label="GitHub Profile"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/hassan-khan-4a3b67374"
                  className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white hover:-translate-y-1"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.instagram.com/calm_boy_c_b?igsh=aTAzbG9uajAxanps"
                  className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white hover:-translate-y-1"
                  aria-label="Instagram Profile"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center hero-image md:w-2/5">
              <div className="relative w-64 h-64 overflow-hidden transition-transform border-4 rounded-full shadow-xl md:w-80 md:h-80 border-primary hover:scale-105">
                <img
                  src={profilePic}
                  alt="Hassan Khan — MERN Stack Developer and Web Designer"
                  className="relative z-10 object-cover w-full h-full"
                />
                <div className="absolute inset-0 z-0 rounded-full bg-primary/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>
        {/* ABOUT SECTION */}
        <motion.section
          id="about"
          className="py-20 bg-section2 dark:bg-slate-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
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

            <article className="flex flex-col gap-8">
              <div>
                <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  As a passionate Full-Stack Developer, I specialize in creating
                  robust, scalable digital solutions. My expertise spans both
                  frontend and backend technologies, allowing me to bridge
                  aesthetic design with efficient system architecture for
                  optimal web application performance.
                </p>
                <p className="mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  I combine technical mastery with strategic problem-solving to
                  deliver impactful digital experiences. Continuously exploring
                  emerging technologies, I maintain cutting-edge skills in
                  modern software development.
                </p>
              </div>

              <section aria-labelledby="education-heading">
                <h3
                  id="education-heading"
                  className="mb-6 text-2xl font-bold text-center md:text-left"
                >
                  Education & Certifications
                </h3>
                <article className="flex flex-col items-center overflow-hidden transition-all bg-white shadow-lg rounded-xl dark:bg-slate-700 md:flex-row hover:shadow-xl hover:-translate-y-1">
                  <figure className="relative w-full md:w-1/3">
                    <img
                      src={certificate}
                      alt="SoloLearn Web Development Certificate showing completion of HTML, CSS, and JavaScript courses"
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="300"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 via-transparent to-transparent hover:opacity-100" />
                  </figure>
                  <div className="w-full p-6 md:w-2/3 md:p-8">
                    <h4 className="mb-3 text-xl font-bold md:text-2xl">
                      SoloLearn Web Development Certificate
                    </h4>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      Comprehensive training in core web technologies:
                    </p>
                    <ul className="grid grid-cols-1 gap-2 mb-4 sm:grid-cols-2">
                      {[
                        "HTML5",
                        "CSS3",
                        "JavaScript",
                        "Responsive Design",
                        "Modern Frameworks",
                        "Web Fundamentals",
                      ].map((skill) => (
                        <li key={skill} className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-primary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-sm text-primary dark:text-primary-300">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Verified Certification</span>
                    </div>
                  </div>
                </article>
              </section>
            </article>
          </div>
        </motion.section>
        {/* SKILLS SECTION */}
        <motion.section
          id="skills"
          className="py-20 bg-section3 dark:bg-slate-950"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          aria-labelledby="skills-heading"
        >
          <div className="container px-5 mx-auto">
            <header className="text-center">
              <h2
                id="skills-heading"
                className="relative mb-12 text-3xl font-bold md:text-4xl"
              >
                Skills & Technologies
                <span className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"></span>
              </h2>
            </header>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <section aria-labelledby="frontend-skills">
                <h3
                  id="frontend-skills"
                  className="mb-6 text-2xl font-bold text-primary"
                >
                  Frontend Development
                </h3>
                <ul className="flex flex-wrap gap-4">
                  {[
                    {
                      icon: <FaHtml5 className="text-2xl" aria-hidden="true" />,
                      label: "HTML5",
                      id: "html",
                    },
                    {
                      icon: (
                        <FaCss3Alt className="text-2xl" aria-hidden="true" />
                      ),
                      label: "CSS3",
                      id: "css",
                    },
                    {
                      icon: (
                        <FaJsSquare className="text-2xl" aria-hidden="true" />
                      ),
                      label: "JavaScript",
                      id: "js",
                    },
                    {
                      icon: <FaReact className="text-2xl" aria-hidden="true" />,
                      label: "React",
                      id: "react",
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
                    },
                  ].map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                      viewport={{ once: false, amount: 0.2 }}
                      className="flex items-center gap-3 p-4 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-md cursor-pointer select-none hover:shadow-lg hover:-translate-y-1 dark:bg-slate-700 dark:border-slate-600"
                    >
                      <div
                        className="flex items-center justify-center w-8 h-8 text-primary"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="tools-skills">
                <h3
                  id="tools-skills"
                  className="mb-6 text-2xl font-bold text-primary"
                >
                  Development Tools
                </h3>
                <ul className="flex flex-wrap gap-4">
                  {[
                    {
                      icon: (
                        <FaGitAlt className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Git",
                      id: "git",
                    },
                    {
                      icon: (
                        <FaGithub className="text-2xl" aria-hidden="true" />
                      ),
                      label: "GitHub",
                      id: "github",
                    },
                    {
                      icon: (
                        <SiExpress className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Express.js",
                      id: "express",
                    },
                    {
                      icon: <FaNode className="text-2xl" aria-hidden="true" />,
                      label: "Node.js",
                      id: "node",
                    },
                    {
                      icon: (
                        <SiMongodb className="text-2xl" aria-hidden="true" />
                      ),
                      label: "MongoDB",
                      id: "mongodb",
                    },
                  ].map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                      viewport={{ once: false, amount: 0.2 }}
                      className="flex items-center gap-3 p-4 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-md cursor-pointer select-none hover:shadow-lg hover:-translate-y-1 dark:bg-slate-700 dark:border-slate-600"
                    >
                      <div
                        className="flex items-center justify-center w-8 h-8 text-primary"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </motion.section>
        {/* JAVASCRIPT PROJECTS SECTION */}
        <section id="projects" className="py-20 bg-section4 dark:bg-slate-900">
          <div className="container px-1.5 mx-auto">
            <h2 className="relative mb-12 text-3xl font-bold text-center md:text-4xl">
              JavaScript Projects
              <span className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"></span>
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Project 1 */}
              <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-2">
                <div className="h-64 overflow-hidden">
                  <img
                    src={currency}
                    alt="Currency Converter Web App – Hassan Khan"
                    className="object-cover w-full h-full transition-transform hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">
                    Currency-Converter-App
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A modern currency converter with real-time exchange rates,
                    flag icons, sound toggle, dark mode, and Chart.js
                    visualization.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Html", "Css", "JavaScript"].map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://currency-converter-hassankhan.netlify.app/"
                      className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md"
                    >
                      Live Demo
                    </a>
                    <a
                      href="https://github.com/hassankhan931/Currency-Converter-App"
                      className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-2">
                <div className="h-64 overflow-hidden">
                  <img
                    src={test}
                    alt="Speed Typing Test App – Hassan Khan"
                    className="object-cover w-full h-full transition-transform hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">Speed-Type-App</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A fast typing test app with WPM & accuracy tracking,
                    customizable settings, and sound effects.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["DOM API", "Web Audio API", "LocalStorage"].map(
                      (tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://speed-type-app.netlify.app/"
                      className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md"
                    >
                      Live Demo
                    </a>
                    <a
                      href="https://github.com/hassankhan931/Speed-Type-App"
                      className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-2">
                <div className="h-64 overflow-hidden">
                  <img
                    src={portfolioImage}
                    alt="GitHub Profile Finder – Hassan Khan"
                    className="object-cover w-full h-full transition-transform hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">
                    GitHub Profile-Finder-App
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A responsive app to search GitHub profiles with real-time
                    data from the GitHub API.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["JavaScript", "API", "CSS3"].map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://github-profile-finder09.netlify.app/"
                      className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md"
                    >
                      Live Demo
                    </a>
                    <a
                      href="https://github.com/hassankhan931/Profile-Finder-App"
                      className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 4 */}
              <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-2">
                <div className="h-64 overflow-hidden">
                  <img
                    src={color}
                    alt="Color Palette App – Hassan Khan"
                    className="object-cover w-full h-full transition-transform hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">Color-Palette-App</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A simple color palette generator with random color
                    generation, copy to clipboard, and dark mode toggle.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["JavaScript", "Local Storage", "CSS3"].map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://peppy-wisp-4254c6.netlify.app/"
                      className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md"
                    >
                      Live Demo
                    </a>
                    <a
                      href="https://github.com/hassankhan931/color-Palette-App"
                      className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* REACT PROJECTS SECTION */}
        <section
          id="react-projects"
          className="py-20 bg-section5 dark:bg-slate-800"
        >
          <div className="container px-5 mx-auto">
            <h2 className="relative mb-12 text-3xl font-bold text-center md:text-4xl">
              React + Tailwind Projects
              <span className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"></span>
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* React Project 1 */}
              <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-2">
                <div className="h-64 overflow-hidden">
                  <img
                    src={task}
                    alt="Task Manager React App – Hassan Khan"
                    className="object-cover w-full h-full transition-transform hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">Task-Manager-App</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A minimalist To-Do List app built with React and styled
                    using Tailwind CSS. Smooth UI with live updates.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["React", "Tailwind CSS", "Hooks"].map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://mellifluous-sherbet-139386.netlify.app/"
                      className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md"
                    >
                      Live Demo
                    </a>
                    <a
                      href="https://github.com/hassankhan931/TO-DO-APP"
                      className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>

              {/* React Project 2 */}
              <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-2">
                <div className="h-64 overflow-hidden">
                  <img
                    src={quoteImage}
                    alt="Quotes Generator App – Hassan Khan"
                    className="object-cover w-full h-full transition-transform hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">
                    Quotes Generator App
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A quote generator app using React, Tailwind CSS, and Framer
                    Motion. Features animations and API integration.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["React", "Tailwind CSS", "Framer Motion"].map(
                      (tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://peppy-semifreddo-d09b40.netlify.app/"
                      className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md"
                    >
                      Live Demo
                    </a>
                    <a
                      href="https://github.com/hassankhan931/Quote-Generator-App"
                      className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>

              {/* React Project 3 */}
              <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-2">
                <div className="h-64 overflow-hidden">
                  <img
                    src={quiz}
                    alt="Quiz App -Webdev – Hassan Khan"
                    className="object-cover w-full h-full transition-transform hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">Quiz App</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A Fast and Responsive Quiz app built with React and Tailwind
                    CSS, designed to test and improve your web development
                    knowledge with interactive questions on HTML, CSS,
                    JavaScript, and React.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["React", "Tailwind CSS", "React-Router-DOM"].map(
                      (tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://astounding-gaufre-f94745.netlify.app/"
                      className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md"
                    >
                      Live Demo
                    </a>
                    <a
                      href="https://github.com/hassankhan931/Quiz-App"
                      className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* fullstack */}
        <section
          id="full-stack-projects"
          className="py-20 bg-[#f4e8ff] dark:bg-slate-900"
        >
          <div className="container px-4 mx-auto">
            <h2 className="relative mb-12 text-3xl font-bold text-center md:text-4xl text-slate-900 dark:text-white">
              Full-Stack Projects
              <span className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"></span>
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Project 1 */}
              <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-2">
                <div className="h-64 overflow-hidden">
                  <img
                    src={expense}
                    alt="Expense Tracker SaaS App Dashboard – Hassan Khan"
                    className="object-cover w-full h-full transition-transform hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">
                    Expense-Tracker-App
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A sleek MERN stack SaaS application featuring an interactive
                    dashboard, personalized user profiles, and real-time data
                    fetching from MongoDB. Designed for seamless financial
                    tracking, it ensures top-tier performance with JWT-based
                    authentication, optimized API routes, and secure data
                    handling — empowering users to manage expenses with
                    confidence and clarity.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      "React.Js",
                      "FramerMotion",
                      "JWT",
                      "MongoDB",
                      "Node.js",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600 dark:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://expensetracker-pro.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md"
                    >
                      Live Demo
                    </a>
                    <a
                      href="https://github.com/hassankhan931/Expense-App-MERN"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="py-20 transition-colors duration-300 text-dark bg-[#f4d4f8] dark:bg-white"
        >
          <div className="container px-5 mx-auto">
            {/* Section Heading */}
            <h2 className="relative mb-12 text-3xl font-bold text-center md:text-4xl dark:text-black">
              Get In Touch
              <span className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"></span>
            </h2>

            <div className="flex flex-col gap-10 md:flex-row">
              {/* Left Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="p-8 text-center shadow-lg rounded-2xl bg-white/80 dark:bg-white backdrop-blur-sm md:w-1/2 md:text-left"
              >
                <h3 className="mb-4 text-2xl font-bold text-primary">
                  Let’s Connect!
                </h3>
                <p className="mb-8 text-gray-600 dark:text-gray-800">
                  I’m always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision.
                </p>

                {/* Contact Info */}
                <div className="space-y-5">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 text-white rounded-full shadow-md bg-primary">
                      <FaEnvelope />
                    </div>
                    <a
                      href="mailto:khandaulathassankhan@gmail.com"
                      className="text-lg font-medium text-black transition-colors duration-200 hover:text-primary"
                    >
                   E-Mail
                    </a>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 text-white rounded-full shadow-md bg-primary">
                      <FaMapMarkerAlt />
                    </div>
                    <a
                      href="https://www.google.com/maps/place/Sabzazar+Housing+Scheme,+Lahore,+Punjab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-black transition-colors duration-200 hover:text-primary"
                    >
                      Sabzazar, Lahore
                    </a>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 text-white rounded-full shadow-md bg-primary">
                      <FaWhatsapp />
                    </div>
                    <a
                      href="https://wa.me/923354232380"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-black transition-colors duration-200 hover:text-primary"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-8 md:justify-start">
                  {[
                    {
                      icon: <FaGithub />,
                      link: "https://github.com/hassankhan931",
                    },
                    {
                      icon: <FaLinkedin />,
                      link: "https://www.linkedin.com/in/hassan-khan-4a3b67374",
                    },
                    {
                      icon: <FaFacebook />,
                      link: "https://www.facebook.com/share/16ppMivx7T/",
                    },
                    {
                      icon: <FaInstagram />,
                      link: "https://www.instagram.com/calm_boy_c_b?igsh=aTAzbG9uajAxanps",
                    },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.link}
                      className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full hover:bg-primary hover:text-white hover:-translate-y-1"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Right Contact Form */}
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                id="contact-form"
                className="p-8 transition-colors duration-300 bg-white shadow-lg rounded-2xl dark:bg-white backdrop-blur-sm md:w-1/2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                {[
                  {
                    id: "name",
                    label: "Name",
                    type: "text",
                    name: "user_name",
                    autoComplete: "name",
                  },
                  {
                    id: "email",
                    label: "Email",
                    type: "email",
                    name: "user_email",
                    autoComplete: "email",
                  },
                  {
                    id: "subject",
                    label: "Subject",
                    type: "text",
                    name: "subject",
                    autoComplete: "off",
                  },
                ].map((field, i) => (
                  <div className="mb-6" key={i}>
                    <label
                      htmlFor={field.id}
                      className="block mb-2 font-semibold"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      autoComplete={field.autoComplete}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                ))}

                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    name="message"
                    autoComplete="off"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 font-semibold text-white transition-all duration-300 transform rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"
                >
                  Send Message
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      {/* FOOTER */}
      <footer className="py-8 text-white bg-section7 dark:bg-slate-900">
        <div className="container px-5 mx-auto text-center">
          <div className="mb-4">
            <a href="#" className="text-2xl font-bold">
              Hassan<span className="text-primary">Khan</span>
            </a>
          </div>
          <p className="mb-4">
            Web Engineer | Web Developer | UI/UX Enthusiast
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="#home"
              className="transition-colors hover:text-primary-light hover:underline"
            >
              Home
            </a>
            <a
              href="#about"
              className="transition-colors hover:text-primary-light hover:underline"
            >
              About
            </a>
            <a
              href="#skills"
              className="transition-colors hover:text-primary-light hover:underline"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="transition-colors hover:text-primary-light hover:underline"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-primary-light hover:underline"
            >
              Contact
            </a>
          </div>
          <div className="copyright">
            <p> &copy; Hassan Khan. All rights reserved.</p>
            <p>Last Updated : 8-8-2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
