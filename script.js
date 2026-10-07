/**
 * Main Portfolio Script
 * Handles:
 * 1. Vertical Sidebar Navigation & Active Link Scroll Spy
 * 2. Dark/Night Mode Theme Switching with OS detection and button triggers
 * 3. Interactive DevBot Chat Terminal with instant responsive replies
 * 4. Lucide icons rendering
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* -------------------------------------------------------------------------
     1. Night / Dark Mode Theme Detection & Toggle
     ------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const htmlElement = document.documentElement;

  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const savedTheme = localStorage.getItem('portfolio-theme');
  const initialTheme = savedTheme || getSystemTheme();
  htmlElement.setAttribute('data-theme', initialTheme);

  const toggleTheme = () => {
    const currentTheme = htmlElement.getAttribute('data-theme') || getSystemTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // Listen for OS theme changes dynamically
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newTheme);
      if (window.lucide) window.lucide.createIcons();
    }
  });

  /* -------------------------------------------------------------------------
     2. Vertical Navigation Bar Active State on Scroll
     ------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const vnavLinks = document.querySelectorAll('.vnav-link');

  function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        vnavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation();

  /* -------------------------------------------------------------------------
     3. Interactive DevBot Chat System
     ------------------------------------------------------------------------- */
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const quickPromptBtns = document.querySelectorAll('.quick-prompt-btn');

  // Pre-configured knowledge base for Monika
  const botAnswers = {
    stack: "Monika's core stack includes **Java, JavaScript (ES6+), TypeScript, React.js, Node.js, Express, PostgreSQL, MongoDB, and Git**. She has solved 300+ DSA problems!",
    availability: "Monika is a 2026 graduate actively open for **Full-time SDE-1 / SWE roles, graduate engineer traineeships, and early internships**.",
    education: "Monika is completing her **B.Tech in Information Science & Engineering** from Adichunchanagiri Institute of Technology (2022-2026) with an impressive **8.8+ CGPA**.",
    interview: "You can reach Monika directly at **monika@example.com** or connect with her on **LinkedIn** to schedule an interview or review her resume!",
    default: "Thanks for asking! Monika is an Information Science graduate passionate about scalable software architecture, clean REST APIs, and modern frontend interfaces. Feel free to contact her at monika@example.com."
  };

  function addChatMessage(sender, text, isUser = false) {
    if (!chatMessages) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`;

    const senderHeader = document.createElement('div');
    senderHeader.className = 'bubble-sender';
    senderHeader.textContent = isUser ? '👤 You' : '🤖 Monika Assistant';

    const content = document.createElement('p');
    content.innerHTML = text;

    bubble.appendChild(senderHeader);
    bubble.appendChild(content);
    chatMessages.appendChild(bubble);

    // Auto-scroll to bottom of chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserQuery(query) {
    if (!query.trim()) return;

    addChatMessage('You', query, true);

    // Determine simulated intelligent response
    setTimeout(() => {
      const q = query.toLowerCase();
      let response = botAnswers.default;

      if (q.includes('stack') || q.includes('skill') || q.includes('tech') || q.includes('language')) {
        response = botAnswers.stack;
      } else if (q.includes('availab') || q.includes('hire') || q.includes('joining') || q.includes('open') || q.includes('job')) {
        response = botAnswers.availability;
      } else if (q.includes('cgpa') || q.includes('college') || q.includes('degree') || q.includes('educat') || q.includes('academic')) {
        response = botAnswers.education;
      } else if (q.includes('interview') || q.includes('schedule') || q.includes('contact') || q.includes('email') || q.includes('meet')) {
        response = botAnswers.interview;
      }

      addChatMessage('DevBot', response, false);
    }, 450);
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value;
      chatInput.value = '';
      handleUserQuery(text);
    });
  }

  if (quickPromptBtns) {
    quickPromptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        handleUserQuery(query);
      });
    });
  }
});
