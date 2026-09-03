const socket = io();
let allMatches = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchMatches();
});

async function fetchMatches() {
    try {
        const response = await fetch('/api/matches');
        allMatches = await response.json();
        renderMatches();
    } catch (error) {
        console.error('Error fetching matches:', error);
    }
}

function renderMatches() {
    const liveMatches = allMatches.filter(m => m.status === 'Live');
    const upcomingMatches = allMatches.filter(m => m.status === 'Upcoming');
    const completedMatches = allMatches.filter(m => m.status === 'Completed');

    document.getElementById('liveMatches').innerHTML = renderMatchCards(liveMatches, 'live');
    document.getElementById('upcomingMatches').innerHTML = renderMatchCards(upcomingMatches, 'upcoming');
    document.getElementById('completedMatches').innerHTML = renderMatchCards(completedMatches, 'completed');
}

function renderMatchCards(matches, type) {
    if (matches.length === 0) {
        return '<p style="color: #999; text-align: center; padding: 20px;">No matches available</p>';
    }

    return matches.map(match => `
        <div class="match-card ${type}" onclick="showMatchDetail(${match.id})">
            <div class="match-header">
                <span class="match-status status-${type}">${match.status}</span>
                <span class="match-format">${match.format}</span>
            </div>
            
            <div class="teams">
                <div class="team-row">
                    <span class="team-name">${match.team1}</span>
                    ${match.team1Score !== undefined ? `<span class="team-score">${match.team1Score}/${match.team1Wickets} (${match.team1Overs})</span>` : ''}
                </div>
                <div class="team-row">
                    <span class="team-name">${match.team2}</span>
                    ${match.team2Score !== undefined ? `<span class="team-score">${match.team2Score}/${match.team2Wickets} (${match.team2Overs})</span>` : ''}
                </div>
            </div>
            
            <div class="venue">📍 ${match.venue}</div>
            <div class="date">📅 ${new Date(match.date).toLocaleString('en-IN')}</div>
        </div>
    `).join('');
}

function showMatchDetail(matchId) {
    const match = allMatches.find(m => m.id === matchId);
    if (!match) return;

    const modal = document.getElementById('matchModal');
    const detail = document.getElementById('matchDetail');

    let detailHTML = `
        <h2>${match.team1} vs ${match.team2}</h2>
        <div class="detail-section">
            <h3>Match Information</h3>
            <p><strong>Format:</strong> ${match.format}</p>
            <p><strong>Venue:</strong> ${match.venue}</p>
            <p><strong>Date:</strong> ${new Date(match.date).toLocaleString('en-IN')}</p>
            <p><strong>Status:</strong> <span class="match-status status-${match.status.toLowerCase()}">${match.status}</span></p>
        </div>
    `;

    if (match.team1Score !== undefined) {
        detailHTML += `
            <div class="detail-section">
                <h3>Score Details</h3>
                <div class="detail-team">
                    <div>
                        <strong>${match.team1}</strong>
                        <p>${match.team1Score}/${match.team1Wickets}</p>
                    </div>
                    <div style="text-align: right;">
                        <strong>Overs</strong>
                        <p>${match.team1Overs}</p>
                    </div>
                </div>
                <div class="detail-team">
                    <div>
                        <strong>${match.team2}</strong>
                        <p>${match.team2Score}/${match.team2Wickets}</p>
                    </div>
                    <div style="text-align: right;">
                        <strong>Overs</strong>
                        <p>${match.team2Overs}</p>
                    </div>
                </div>
            </div>
        `;
    }

    detail.innerHTML = detailHTML;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('matchModal').style.display = 'none';
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
}

socket.on('scoreUpdate', (matches) => {
    allMatches = matches;
    renderMatches();
});

window.onclick = function(event) {
    const modal = document.getElementById('matchModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
