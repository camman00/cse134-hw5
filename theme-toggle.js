document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById("theme-toggle");
    
    // Function to apply the light theme by setting CSS variables to their default values
    function applyLightTheme() {
      const root = document.documentElement;
      root.style.setProperty('--audi-red', '#C40233');
      root.style.setProperty('--audi-black', '#0e0e0e');
      root.style.setProperty('--audi-white', '#F7F7F7');
      root.style.setProperty('--audi-charcoal', '#444444');
      toggleBtn.textContent = '🌞'; // Sun icon for light theme
      localStorage.setItem('theme', 'light');
    }
    
    // Function to apply the dark theme by overriding the default CSS variables with dark mode values
    function applyDarkTheme() {
      const root = document.documentElement;
      // Overriding the variables with dark-themed values:
      root.style.setProperty('--audi-red', '#FF6B6B');      // Brighter red for dark mode
      root.style.setProperty('--audi-black', '#F7F7F7');      // Use white for text (swapping the typical black)
      root.style.setProperty('--audi-white', '#0e0e0e');      // Dark background
      root.style.setProperty('--audi-charcoal', '#888888');   // Lighter charcoal for contrast
      toggleBtn.textContent = '🌜'; // Moon icon for dark theme
      localStorage.setItem('theme', 'dark');
    }
    
    // Toggle between themes based on the stored theme value
    function toggleTheme() {
      if (localStorage.getItem('theme') === 'dark') {
        applyLightTheme();
      } else {
        applyDarkTheme();
      }
    }
    
    // Check stored theme preference on load and apply it
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
    
    // Ensure the toggle button is visible (it may be hidden via inline style when JS is off)
    if (toggleBtn) {
      toggleBtn.style.display = 'inline-block';
      toggleBtn.addEventListener('click', toggleTheme);
    }
  });
  