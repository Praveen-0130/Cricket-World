//Aditthya Debugged whole JS Code Now its working good
//Changed whole code
// Subscribe button alert
function alertSubscribe() {
  alert("Thanks for subscribing to Cricket World!");
}

// Log info about players loaded
for (let i = 1; i <= 100; i++) {
  console.log(`Loaded player ${i} info`);
}

// Countdown timers for upcoming matches
function initializeMatchCountdowns() {
  const matches = document.querySelectorAll('.match');
  matches.forEach((match) => {
    const dateEl = match.querySelector('p');
    if (!dateEl) return;

    // Extract and parse date
    const dateText = dateEl.textContent.trim(); // e.g., "Date: 2025-06-05"
    const matchDateStr = dateText.replace('Date: ', '');
    const matchDate = new Date(matchDateStr + 'T00:00:00');

    if (isNaN(matchDate.getTime())) return; // Skip invalid dates

    // Create and append countdown element
    const countdownEl = document.createElement('p');
    countdownEl.className = 'countdown';
    match.appendChild(countdownEl);

    // Update countdown every second
    const intervalId = setInterval(() => {
      const now = new Date();
      const diff = matchDate - now;

      if (diff <= 0) {
        countdownEl.textContent = 'Match started!';
        clearInterval(intervalId);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      countdownEl.textContent = `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  });
}

// Player search filter
function initializePlayerSearch() {
  const container = document.querySelector('.featured-players .container');
  if (!container) return;

  const playersWrapper = container.querySelector('.players-wrapper');
  if (!playersWrapper) return;

  // Create and insert search box
  const searchDiv = document.createElement('div');
  searchDiv.className = 'search-container';
  searchDiv.innerHTML = `<input type="text" id="playerSearch" placeholder="Search players by name..." />`;
  container.insertBefore(searchDiv, playersWrapper);

  const input = document.getElementById('playerSearch');
  const players = container.querySelectorAll('.player');

  input.addEventListener('input', () => {
    const filter = input.value.toLowerCase();
    players.forEach(player => {
      const nameEl = player.querySelector('h3');
      const name = nameEl ? nameEl.textContent.toLowerCase() : '';
      player.style.display = name.includes(filter) ? '' : 'none';
    });
  });
}

// Smooth scroll for nav links
function initializeSmoothScroll() {
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Initialize functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeMatchCountdowns();
  initializePlayerSearch();
  initializeSmoothScroll();
});
