import { useEffect, useRef, useState } from 'react';
import Loader from './components/Loader';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';
import quoteImage from './assets/quote-generator.webp';
import currency from './assets/currency-converter-project.webp';
import portfolioImage from './assets/github-profile-finder-app.webp';
import profilePic from './assets/hassan-khan-frontend-developer.webp';
import certificate from './assets/sololearn-web-dev-certificate.webp';
import test from './assets/speed-type-test-app.webp';
import task from './assets/task-manager-app.webp';
import quiz from './assets/quiz-app.webp';

import {
  FaGithub, FaEnvelope, FaInstagram, FaHtml5, FaCss3Alt,
  FaJsSquare, FaReact, FaNode, FaLinkedin,
  FaGitAlt, FaMapMarkerAlt, FaFacebook,
  FaMoon, FaSun
} from 'react-icons/fa';

import {
  SiTailwindcss, SiMongodb, SiExpress
} from 'react-icons/si';
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
    setIsMobileMenuOpen(prev => !prev);
  };

  // Loader timeout
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let isActive = true;
    const phrases = [
      "Frontend Engineer",
      "UI/UX Enthusiast",
      "Web Developer",
      "JavaScript Lover"
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

  // ✅ EmailJS form submission via onSubmit in JSX
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Sending message...");

    emailjs.sendForm(
      "service_oyaxm85",
      "template_zte99qz",
      formRef.current
    )
      .then(() => {
        alert("Message sent successfully!");
        formRef.current.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message.");
      });
  };

  // Animate on scroll
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
      el.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-700");
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
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
          behavior: "smooth"
        });
        setIsMobileMenuOpen(false);
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener("click", handleSmoothScroll);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  // Dark mode toggle
  const handleThemeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode ? "enabled" : "disabled");

    try {
      new Audio("/click.mp3").play().catch(() => {});
      if ('vibrate' in navigator) navigator.vibrate(250);
    } catch (e) {
      console.log("Toggle error:", e);
    }
  };

  // Loader
  if (isLoading) {
    return <Loader theme={darkMode ? 'dark' : 'light'} />;
  }
  return (
 <div className="font-sans transition-colors duration-300 bg-section1 text-dark dark:bg-dark dark:text-white">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="jaJYt8CEkFwNMQoA4wkYqzXS8LJ5DIKWPFjsjLvqQ6I" />
        <title>Hassan Khan Portfolio – Frontend Developer | JavaScript & React</title>
        <meta name="description" content="Hassan Khan – Creative Frontend Developer specializing in JavaScript, React, and Tailwind CSS. Explore modern web projects and UI/UX skills." />
        <meta name="keywords" content="Hassan Khan, Frontend Developer, JavaScript Developer, React Portfolio, Web Developer, Tailwind CSS, Portfolio Website" />
        <meta name="author" content="Hassan Khan" />
        <link rel="canonical" href="https://hassan-khan-portfolio.netlify.app/" />
        <meta property="og:title" content="Hassan Khan Portfolio – Frontend Developer" />
        <meta property="og:description" content="Explore Hassan Khan's frontend projects, JavaScript skills, and modern web UI designs." />
        <meta property="og:image" content="https://hassan-khan-portfolio.netlify.app/hassan-khan-frontend-developer.webp" />
        <meta property="og:url" content="https://hassan-khan-portfolio.netlify.app/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Hassan Khan",
              "jobTitle": "Frontend Developer",
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
    localStorage.setItem("darkMode", newDarkMode ? "enabled" : "disabled");

    // Play sound
    try {
      new Audio("/click.mp3").play();
      if ("vibrate" in navigator) navigator.vibrate(250);
    } catch (err) {
      console.log("Error:", err);
    }
  }}
  className="relative w-10 h-10"
  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
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
              <span className={`line w-full h-0.5 bg-dark transition-all dark:bg-light ${isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
              <span className={`line w-full h-0.5 bg-dark transition-all dark:bg-light ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`line w-full h-0.5 bg-dark transition-all dark:bg-light ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>
      {/* main */}
      <main>
<section id="home" className="flex items-center min-h-screen pt-20 bg-section1 dark:bg-slate-950">
          <div className="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row">
            <div className="mb-12 text-center hero-content md:w-3/5 md:mb-0 md:pr-8 md:text-left">
              <h4 className="mb-2 text-xl text-primary animate-fadeInDown">Hi, I'm</h4>
              <h1 className="mb-2 text-4xl font-bold md:text-5xl lg:text-6xl animate-fadeInDown animate-delay-200">
                Hassan Khan
              </h1>

              {/* 👇 Typewriter will target this line via useRef */}
              <h1 className="mb-6 text-2xl text-gray-600 md:text-3xl dark:text-gray-300 animate-fadeInDown animate-delay-400">
                {/* initial empty, typewriter will fill this */}
    {typedText}
    <span className="animate-pulse">|</span>
              </h1>

              <p className="mb-8 text-lg leading-relaxed animate-fadeIn animate-delay-600">
                Crafting beautiful, responsive and user-friendly web experiences with clean code and modern technologies.
              </p>

              <div className="flex flex-wrap justify-center gap-4 md:justify-start animate-fadeIn animate-delay-800">
                <a
                  href="#contact"
                  className="px-6 py-3 font-semibold text-white transition-all rounded-full shadow-sm btn-primary bg-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:-translate-y-1 hover:shadow-md"
                >
                  Get In Touch
                </a>
                <a
                  href="#projects"
                  className="px-6 py-3 font-semibold transition-all border-2 rounded-full shadow-sm btn-secondary text-primary border-primary hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-sm"
                >
                  View Projects
                </a>
              </div>

              <div className="flex justify-center gap-4 mt-8 md:justify-start animate-fadeIn animate-delay-1000">
                <a
                  href="mailto:khandaulathassankhan@gmail.com"
                  className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white hover:-translate-y-1"
                >
                  <FaEnvelope />
                </a>
                <a
                  href="https://github.com/hassankhan931"
                  className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white hover:-translate-y-1"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/hassan-khan-4a3b67374"
                  className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white hover:-translate-y-1"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.instagram.com/calm_boy_c_b?igsh=aTAzbG9uajAxanps"
                  className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white hover:-translate-y-1"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            <div className="flex justify-center hero-image md:w-2/5">
              <div className="w-64 h-64 overflow-hidden transition-transform border-4 rounded-full shadow-xl md:w-80 md:h-80 border-primary hover:scale-105">
                <img
                  src={profilePic}
                  alt="Hassan Khan – Frontend Developer Profile Picture"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
<section id="about" className="py-20 bg-section2 dark:bg-slate-900">
          <div className="container px-5 mx-auto">
            <h2 className="relative mb-12 text-3xl font-bold text-center md:text-4xl">
              About Me
              <span className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"></span>
            </h2>
            
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="md:w-3/5">
                <p className="mb-4">
                  I'm a dedicated Frontend Engineer with a refined focus on building elegant, responsive, and intuitive web interfaces. With deep proficiency in modern JavaScript frameworks and a sharp aesthetic sensibility, I seamlessly integrate visual appeal with high-performance functionality.
                </p>
                <p className="mb-8">
                  My methodology blends advanced technical expertise with innovative problem-solving to craft standout digital experiences. I remain relentlessly curious, continuously exploring emerging technologies and evolving best practices to stay ahead in the fast-moving world of web development.
                </p>
                
                <div className="mb-6">
                  <h3 className="mb-4 text-2xl font-bold">Education & Certifications</h3>
                  <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md md:flex-row dark:bg-slate-700">
                    <img 
                      src={certificate} 
                      alt="SoloLearn Web Development Certificate – HTML CSS JavaScript" 
                      className="object-cover w-full h-auto md:w-48"
                      loading="lazy" decoding='async'
                    />
                    <div className="p-4">
                      <h4 className="mb-2 text-xl font-bold">SoloLearn Web Development Certificate</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Completed comprehensive web development training covering HTML, CSS, JavaScript, and modern frameworks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 md:w-2/5">
                <div className="p-6 text-center transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-2 text-3xl font-bold text-primary stat-number" data-count="50">50</div>
                  <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
                </div>
                <div className="p-6 text-center transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-2 text-3xl font-bold text-primary stat-number" data-count="2">2</div>
                  <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
                </div>
                <div className="p-6 text-center transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-2 text-3xl font-bold text-primary stat-number" data-count="100">100</div>
                  <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
<section id="skills" className="py-20 bg-section3 dark:bg-slate-950">
          <div className="container px-5 mx-auto">
            <h2 className="relative mb-12 text-3xl font-bold text-center md:text-4xl">
              Skills & Technologies
              <span className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"></span>
            </h2>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="skill-category">
                <h3 className="mb-6 text-2xl font-bold text-primary">Frontend Development</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 p-4 transition-all bg-white rounded-lg shadow-md cursor-pointer select-none dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center justify-center w-8 h-8 text-primary">
                      <FaHtml5 className="text-2xl" />
                    </div>
                    <span>HTML5</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 transition-all bg-white rounded-lg shadow-md cursor-pointer select-none dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center justify-center w-8 h-8 text-primary">
                      <FaCss3Alt className="text-2xl" />
                    </div>
                    <span>CSS3</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 transition-all bg-white rounded-lg shadow-md cursor-pointer select-none dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center justify-center w-8 h-8 text-primary">
                      <FaJsSquare className="text-2xl" />
                    </div>
                    <span>JavaScript</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 transition-all bg-white rounded-lg shadow-md cursor-pointer select-none dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center justify-center w-8 h-8 text-primary">
                      <FaReact className="text-2xl" />
                    </div>
                    <span>React</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 transition-all bg-white rounded-lg shadow-md cursor-pointer select-none dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center justify-center w-8 h-8 text-primary">
                      <SiTailwindcss className="text-2xl" />
                    </div>
                    <span>Tailwind CSS</span>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3 className="mb-6 text-2xl font-bold text-primary">Tools & Libraries</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 p-4 transition-all bg-white rounded-lg shadow-md cursor-pointer select-none dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center justify-center w-8 h-8 text-primary">
                      <FaGitAlt className="text-2xl" />
                    </div>
                    <span>Git</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 transition-all bg-white rounded-lg shadow-md cursor-pointer select-none dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center justify-center w-8 h-8 text-primary">
                      <FaGithub className="text-2xl" />
                    </div>
                    <span>GitHub</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 transition-all bg-white rounded-lg shadow-md cursor-pointer select-none dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center justify-center w-8 h-8 text-primary">
                      <SiExpress className="text-2xl" />
                    </div>
                    <span>Express.Js</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 transition-all bg-white rounded-lg shadow-md cursor-pointer select-none dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center justify-center w-8 h-8 text-primary">
                      <FaNode className="text-2xl" />
                    </div>
                    <span>Node.js</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 transition-all bg-white rounded-lg shadow-md cursor-pointer select-none dark:bg-slate-700 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center justify-center w-8 h-8 text-primary">
                      <SiMongodb className="text-2xl" />
                    </div>
                    <span>MongoDB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    loading="lazy" decoding='async'
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">Currency-Converter-App</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A modern currency converter with real-time exchange rates, flag icons, sound toggle, dark mode, and Chart.js visualization.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">Html</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">Css</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">JavaScript</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://currency-converter-hassankhan.netlify.app/" className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md">Live Demo</a>
                    <a href="https://github.com/hassankhan931/Currency-Converter-App" className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md">Code</a>
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
                    loading="lazy" decoding='async'
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">Speed-Type-App</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A fast typing test app with WPM & accuracy tracking, customizable settings, and sound effects.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">DOM API</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">Web Audio API</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">LocalStorage</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://speed-type-app.netlify.app/" className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md">Live Demo</a>
                    <a href="https://github.com/hassankhan931/Speed-Type-App" className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md">Code</a>
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
                    loading="lazy" decoding='async'
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">GitHub Profile-Finder-App</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A responsive app to search GitHub profiles with real-time data from the GitHub API.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">JavaScript</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">API</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">CSS3</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://github-profile-finder09.netlify.app/" className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md">Live Demo</a>
                    <a href="https://github.com/hassankhan931/Profile-Finder-App" className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md">Code</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REACT PROJECTS SECTION */}
<section id="react-projects" className="py-20 bg-section5 dark:bg-slate-950">
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
                    loading="lazy" decoding='async'
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">Task-Manager-App</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A minimalist To-Do List app built with React and styled using Tailwind CSS. Smooth UI with live updates.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">React</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">Tailwind CSS</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">Hooks</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://mellifluous-sherbet-139386.netlify.app/" className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md">Live Demo</a>
                    <a href="https://github.com/hassankhan931/TO-DO-APP" className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md">Code</a>
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
                    loading="lazy" decoding='async'
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">Quotes Generator App</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A quote generator app using React, Tailwind CSS, and Framer Motion. Features animations and API integration.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">React</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">Tailwind CSS</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">Framer Motion</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://peppy-semifreddo-d09b40.netlify.app/" className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md">Live Demo</a>
                    <a href='https://github.com/hassankhan931/Quote-Generator-App'  className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md">
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
                    loading="lazy" decoding='async'
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">Quiz App</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
           A Fast and Responsive Quiz app built with React and Tailwind CSS, designed to test and improve your web development knowledge with interactive questions on HTML, CSS, JavaScript, and React.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">React</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">Tailwind CSS</span>
                    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full dark:bg-slate-600">React-Router-DOM</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://astounding-gaufre-f94745.netlify.app/" className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md">Live Demo</a>
                    <a href="https://github.com/hassankhan931/Quiz-App" className="px-4 py-2 text-sm font-semibold transition-all border-2 rounded-full shadow-sm text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md">Code</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CONTACT SECTION */}
<section id="contact" className="py-20 text-dark bg-section6 dark:bg-slate-400">
          <div className="container px-5 mx-auto">
            <h2 className="relative mb-12 text-3xl font-bold text-center md:text-4xl">
              Get In Touch
              <span className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"></span>
            </h2>
            
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="text-center md:w-1/2 md:text-left">
                <h3 className="mb-4 text-2xl font-bold">Let's Connect!</h3>
                <p className="mb-6">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 mr-4 text-white rounded-full bg-primary">
                      <FaEnvelope />
                    </div>
                    <span>khandaulathassankhan@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 mr-4 text-white rounded-full bg-primary">
                      <FaMapMarkerAlt />
                    </div>
                    <span>Punjab,Lahore</span>
                  </div>
                </div>
                <div className="flex justify-center gap-4 md:justify-start">
                  <a href="https://github.com/hassankhan931" className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white">
                    <FaGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/hassan-khan-4a3b67374" className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white">
                    <FaLinkedin />
                  </a>
                  <a href="https://www.facebook.com/share/16ppMivx7T/" className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white">
                    <FaFacebook />
                  </a>
                  <a href="https://www.instagram.com/calm_boy_c_b?igsh=aTAzbG9uajAxanps" className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-primary hover:text-white">
                    <FaInstagram />
                  </a>
                </div>
              </div>
              
              <form ref={formRef} onSubmit={handleSubmit} id="contact-form" className="md:w-1/2">
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="user_name" 
                    autoComplete="name" 
                    required 
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="user_email" 
                    autoComplete="email" 
                    required 
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block mb-2 font-semibold">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    autoComplete="off" 
                    required 
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    name="message" 
                    autoComplete="off" 
                    required 
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full px-6 py-3 font-semibold text-white transition-all rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-md"
                >
                  Send Message
                </button>
              </form>
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
          <p className="mb-4">Web Engineer | Web Developer | UI/UX Enthusiast</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a href="#home" className="transition-colors hover:text-primary-light hover:underline">Home</a>
            <a href="#about" className="transition-colors hover:text-primary-light hover:underline">About</a>
            <a href="#skills" className="transition-colors hover:text-primary-light hover:underline">Skills</a>
            <a href="#projects" className="transition-colors hover:text-primary-light hover:underline">Projects</a>
            <a href="#contact" className="transition-colors hover:text-primary-light hover:underline">Contact</a>
          </div>
          <div className="copyright">
            <p> &copy; Hassan Khan. All rights reserved.</p>
            <p>Last Updated : 27-7-2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;