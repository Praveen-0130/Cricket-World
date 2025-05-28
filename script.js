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
  matches.forEach((match, index) => {
    // Create countdown element
    const countdownEl = document.createElement('p');
    countdownEl.classList.add('countdown');
    match.appendChild(countdownEl);

    // Calculate target date (from match date in DOM)
    const dateText = match.querySelector('p').textContent; // e.g., "Date: 2025-06-05"
    const matchDateStr = dateText.replace('Date: ', '');
    const matchDate = new Date(matchDateStr + 'T00:00:00');

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
  // Create search input and add it to the featured players section
  const container = document.querySelector('.featured-players .container');
  const searchDiv = document.createElement('div');
  searchDiv.classList.add('search-container');
  searchDiv.innerHTML = `
    <input type="text" id="playerSearch" placeholder="Search players by name..." />
  `;
  container.insertBefore(searchDiv, container.querySelector('.players-wrapper'));

  const input = document.getElementById('playerSearch');
  const players = container.querySelectorAll('.player');

  input.addEventListener('input', () => {
    const filter = input.value.toLowerCase();
    players.forEach(player => {
      const name = player.querySelector('h3').textContent.toLowerCase();
      if (name.includes(filter)) {
        player.style.display = '';
      } else {
        player.style.display = 'none';
      }
    });
  });
}

// Smooth scroll for nav links
function initializeSmoothScroll() {
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Initialize all functions when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeMatchCountdowns();
  initializePlayerSearch();
  initializeSmoothScroll();
});
