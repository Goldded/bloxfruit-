// Function to generate a random number of players (0-12)
function randomPlayers() {
    return Math.floor(Math.random() * 13);
}

// Function to update player counts
function updatePlayerCounts() {
    document.getElementById("server1-count").innerText = `Players: ${randomPlayers()}/12`;
    document.getElementById("server2-count").innerText = `Players: ${randomPlayers()}/12`;
}

// Run when the page loads and every hour (3600000 ms)
document.addEventListener("DOMContentLoaded", function() {
    updatePlayerCounts();
    setInterval(updatePlayerCounts, 3600000); // Updates every hour
});

// Feedback system (sends to Discord Webhook)
document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("roblox-user").value;
    let message = document.getElementById("feedback-message").value;

    let webhookURL = "https://discord.com/api/webhooks/1306937739702308915/-kxWY0Xk3Ci95HR7DjHZyw2BcMSc3CvkwMwllTDEOve0LmozUU3QgGT8k51FtCCylQiI";

    let payload = {
        content: `📢 **New Feedback**\n👤 **User:** ${username}\n💬 **Message:** ${message}`
    };

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(() => {
        alert("Feedback sent! Thank you.");
        document.getElementById("feedback-form").reset();
    }).catch(error => console.error("Error sending feedback:", error));
});
