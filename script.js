// Subscribe button alert
function alertSubscribe() {
  alert("Thanks for subscribing to Cricket World!");
}

// Countdown timers for upcoming matches
function initializeMatchCountdowns() {
  const matches = document.querySelectorAll('.match');
  matches.forEach((match) => {
    const dateEl = match.querySelector('p');
    if (!dateEl) return;
  countdownEl.style.opacity = '0';
  setTimeout(() => {
  countdownEl.textContent = `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  countdownEl.style.opacity = '1';
}, 200);


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

const players = {
  kohli: {
    name: "Virat Kohli",
    matches: 275,
    runs: 12898,
    average: 57.32,
    strikeRate: 93.25,
  },
  root: {
    name: "Joe Root",
    matches: 158,
    runs: 11225,
    average: 50.12,
    strikeRate: 86.45,
  },
  smith: {
    name: "Steve Smith",
    matches: 150,
    runs: 10488,
    average: 51.35,
    strikeRate: 88.20,
  }
};

function updateCard(playerId, cardId) {
  const player = players[playerId];
  if (!player) return;

  document.getElementById(cardId).innerHTML = `
    <h3>${player.name}</h3>
    <p><strong>Matches:</strong> ${player.matches}</p>
    <p><strong>Runs:</strong> ${player.runs}</p>
    <p><strong>Average:</strong> ${player.average}</p>
    <p><strong>Strike Rate:</strong> ${player.strikeRate}</p>
  `;
}

document.getElementById("player1-select").addEventListener("change", function () {
  updateCard(this.value, "player1-card");
});

document.getElementById("player2-select").addEventListener("change", function () {
  updateCard(this.value, "player2-card");
});


// Set match date here (Format: YYYY-MM-DDTHH:MM:SS)
const matchDate = new Date("2025-06-15T18:30:00").getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const timeLeft = matchDate - now;

  if (timeLeft <= 0) {
    document.getElementById("timer").innerHTML = "Match Started!";
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, '0');
  document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
};

setInterval(updateCountdown, 1000);
updateCountdown();


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

// Dynamically generate player cards and matches, then initialize functionality
document.addEventListener('DOMContentLoaded', () => {
  const playerWrapper = document.querySelector('.players-wrapper');
  if (playerWrapper) {
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
  }
  
  const matchWrapper = document.querySelector('.matches-wrapper');
  if (matchWrapper) {
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
  }
function initializeDarkMode() {
  const toggleBtn = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Load saved preference
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'enabled') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = "☀️ Light Mode";
  }
  input.addEventListener('input', debouncedPlayerSearch);

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      toggleBtn.textContent = "☀️ Light Mode";
      localStorage.setItem('darkMode', 'enabled');
    } else {
      toggleBtn.textContent = "🌙 Dark Mode";
      localStorage.setItem('darkMode', 'disabled');
    }
  });
  
}

  initializeMatchCountdowns();
  initializePlayerSearch();
  initializeSmoothScroll();
});
