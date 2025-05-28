// Subscribe button alert
function alertSubscribe() {
  alert("Thanks for subscribing to Cricket World!");
}

// Countdown timers for upcoming matches
function initializeMatchCountdowns() {
  const matches = document.querySelectorAll('.match');
  matches.forEach((match) => {
    const countdownEl = document.createElement('p');
    countdownEl.classList.add('countdown');
    match.appendChild(countdownEl);

    const dateText = match.querySelector('p').textContent;
    const matchDateStr = dateText.replace('Date: ', '');
    const matchDate = new Date(matchDateStr + 'T00:00:00');

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
  const searchDiv = document.createElement('div');
  searchDiv.classList.add('search-container');
  searchDiv.innerHTML = '<input type="text" id="playerSearch" placeholder="Search players by name..." />';
  container.insertBefore(searchDiv, container.querySelector('.players-wrapper'));

  const input = document.getElementById('playerSearch');
  const players = container.querySelectorAll('.player');

  input.addEventListener('input', () => {
    const filter = input.value.toLowerCase();
    players.forEach(player => {
      const name = player.querySelector('h3').textContent.toLowerCase();
      player.style.display = name.includes(filter) ? '' : 'none';
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

// Dynamically generate player cards and matches
document.addEventListener('DOMContentLoaded', () => {
  const playerWrapper = document.querySelector('.players-wrapper');
  for (let i = 1; i <= 50; i++) {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player';
    playerDiv.innerHTML = `
      <img src="assets/player${(i % 3) + 1}.jpg" alt="Player ${i}" />
      <h3>Player Name ${i}</h3>
      <p>Bio for player ${i} with a notable history in international cricket and domestic leagues.</p>
    `;
    playerWrapper.appendChild(playerDiv);
  }

  const matchWrapper = document.querySelector('.matches-wrapper');
  for (let i = 1; i <= 50; i++) {
    const matchDiv = document.createElement('div');
    matchDiv.className = 'match';
    const day = ((i % 30) + 1).toString().padStart(2, '0');
    matchDiv.innerHTML = `
      <h4>Match ${i}: Team A vs Team B</h4>
      <p>Date: 2025-06-${day}</p>
      <p>Venue: Cricket Stadium ${i}</p>
    `;
    matchWrapper.appendChild(matchDiv);
  }

  initializeMatchCountdowns();
  initializePlayerSearch();
  initializeSmoothScroll();
});
