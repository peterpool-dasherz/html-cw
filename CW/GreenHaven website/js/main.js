/* ============================================================
   GreenHaven Community Garden - Shared JavaScript
   Author: Peter Pham
   Description: Handles all interactive functionality including
   mobile menu, dark mode, scroll animations, gallery lightbox,
   form validation, and smooth scrolling.
   ============================================================ */

// Wait for the DOM to be fully loaded before running any code
document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1. Mobile Hamburger Menu Toggle
     Opens and closes the mobile navigation overlay
  ---------------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      // Toggle the active class on hamburger (animates the icon)
      hamburger.classList.toggle('active');
      // Toggle the open class on nav links (slides in the menu)
      navLinks.classList.toggle('open');
      // Prevent scrolling when menu is open
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close the mobile menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------------------------
     2. Dark Mode Toggle
     Saves the user's preference to localStorage so it persists
     across page visits.
  ---------------------------------------------------------- */
  const themeToggle = document.querySelector('.theme-toggle');

  // Check for saved theme preference on page load
  function loadTheme() {
    var savedTheme = localStorage.getItem('greenhaven-theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeIcon('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      updateThemeIcon('light');
    }
  }

  // Update the toggle button icon based on theme
  function updateThemeIcon(theme) {
    if (themeToggle) {
      // Sun icon for dark mode (click to go light), moon for light mode
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var currentTheme = document.documentElement.getAttribute('data-theme');
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('greenhaven-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  // Load saved theme on page load
  loadTheme();

  /* ----------------------------------------------------------
     3. Scroll-Triggered Fade-In Animations
     Uses IntersectionObserver to animate elements when they
     scroll into the viewport.
  ---------------------------------------------------------- */
  var fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Add the 'visible' class to trigger the CSS transition
          entry.target.classList.add('visible');
          // Stop observing once animated (only animate once)
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15, // Trigger when 15% of element is visible
      rootMargin: '0px 0px -50px 0px' // Slight offset from bottom
    });

    // Observe each fade element
    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: make all fade elements visible if IntersectionObserver not supported
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------
     4. Gallery Lightbox
     Opens a full-screen overlay when a gallery image is clicked.
     Supports closing via button, overlay click, or Escape key.
  ---------------------------------------------------------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.querySelector('.lightbox-close');
  var galleryItems = document.querySelectorAll('.gallery-item');

  // Open lightbox when a gallery item is clicked
  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      var caption = item.getAttribute('data-caption') || img.alt || '';

      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = caption;
        if (lightboxCaption) {
          lightboxCaption.textContent = caption;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox function
  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Close via button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Close via clicking the overlay background
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Close via Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  /* ----------------------------------------------------------
     5. Gallery Filter Buttons
     Filters gallery items by category using data attributes.
  ---------------------------------------------------------- */
  var filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button styles
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        var itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = '';
          // Add a slight fade-in animation
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ----------------------------------------------------------
     6. Contact Form Validation
     Validates form fields on the contact page before submission.
     Shows error messages for invalid inputs.
  ---------------------------------------------------------- */
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission

      var isValid = true;

      // Get form fields
      var nameField = document.getElementById('contact-name');
      var emailField = document.getElementById('contact-email');
      var subjectField = document.getElementById('contact-subject');
      var messageField = document.getElementById('contact-message');

      // Clear previous errors
      clearErrors();

      // Validate name - must not be empty
      if (nameField && nameField.value.trim() === '') {
        showError(nameField, 'Please enter your name.');
        isValid = false;
      }

      // Validate email - must match email pattern
      if (emailField) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value.trim() === '') {
          showError(emailField, 'Please enter your email address.');
          isValid = false;
        } else if (!emailPattern.test(emailField.value.trim())) {
          showError(emailField, 'Please enter a valid email address.');
          isValid = false;
        }
      }

      // Validate subject - must not be empty
      if (subjectField && subjectField.value.trim() === '') {
        showError(subjectField, 'Please enter a subject.');
        isValid = false;
      }

      // Validate message - must be at least 10 characters
      if (messageField) {
        if (messageField.value.trim() === '') {
          showError(messageField, 'Please enter a message.');
          isValid = false;
        } else if (messageField.value.trim().length < 10) {
          showError(messageField, 'Your message must be at least 10 characters.');
          isValid = false;
        }
      }

      // If all fields are valid, show success message
      if (isValid) {
        var successMsg = document.querySelector('.form-success');
        if (successMsg) {
          successMsg.classList.add('show');
          contactForm.reset();
          // Hide success message after 5 seconds
          setTimeout(function () {
            successMsg.classList.remove('show');
          }, 5000);
        }
      }
    });

    // Helper: show error on a specific field
    function showError(field, message) {
      field.classList.add('error');
      var errorEl = field.nextElementSibling;
      if (errorEl && errorEl.classList.contains('error-message')) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
      }
    }

    // Helper: clear all errors
    function clearErrors() {
      var errorFields = contactForm.querySelectorAll('.error');
      errorFields.forEach(function (field) {
        field.classList.remove('error');
      });
      var errorMessages = contactForm.querySelectorAll('.error-message');
      errorMessages.forEach(function (msg) {
        msg.style.display = 'none';
      });
    }

    // Remove error styling when user starts typing in a field
    var formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(function (input) {
      input.addEventListener('input', function () {
        input.classList.remove('error');
        var errorEl = input.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
          errorEl.style.display = 'none';
        }
      });
    });
  }

  /* ----------------------------------------------------------
     7. Animated Counter for Stats Section
     Counts up from 0 to the target number when the stats
     section scrolls into the viewport.
  ---------------------------------------------------------- */
  var statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Animate each stat number within the section
          var numbers = entry.target.querySelectorAll('.stat-number');
          numbers.forEach(function (numEl) {
            animateCounter(numEl);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    // Observe the stats section
    var statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  // Counter animation function
  function animateCounter(element) {
    var target = parseInt(element.getAttribute('data-target'), 10);
    var suffix = element.getAttribute('data-suffix') || '';
    var duration = 2000; // 2 seconds
    var startTime = null;

    function updateCount(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Use an easing function for a natural feel
      var easedProgress = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(easedProgress * target);
      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target + suffix;
      }
    }
    requestAnimationFrame(updateCount);
  }

  /* ----------------------------------------------------------
     8. Smooth Scroll for Anchor Links
     Adds smooth scrolling behaviour for any anchor link that
     points to an element on the same page.
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId && targetId.length > 1) {
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ----------------------------------------------------------
     9. Active Navigation Link Highlight
     Highlights the current page link in the navigation bar
     based on the current filename.
  ---------------------------------------------------------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navAnchors = document.querySelectorAll('.nav-links a');

  navAnchors.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
