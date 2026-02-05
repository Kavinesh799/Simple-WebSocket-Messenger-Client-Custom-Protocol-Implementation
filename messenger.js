// Create a WebSocket connection
const ws = new WebSocket("ws://localhost:1234");

function logMessage(message) {
    document.getElementById("log").innerText += message + "\n";
}

function connect() {
    socket = new WebSocket("ws://localhost:1234");

    socket.onopen = () => {
        logMessage("Connected to WebSocket Server.");
        document.getElementById("status").innerText = "Connected";
    };
    socket.onmessage = (event) => {
        logMessage("Received: " + Array.from(new Uint8Array(event.data)));
    };

    socket.onclose = () => {
        logMessage("Connection closed.");
        document.getElementById("status").innerText = "Disconnected";
    };

    socket.onerror = (error) => {
        logMessage("Error: " + error);
    };
}

ws.onopen = () => {
    console.log("Connected to WebSocket server");
    document.getElementById("messages").innerHTML += "<p><b>Connected to server</b></p>";
};

ws.onmessage = (event) => {
    console.log("Received:", event.data);
    document.getElementById("messages").innerHTML += `<p>Server: ${event.data}</p>`;
};

ws.onclose = () => {
    console.log("Disconnected from server");
    document.getElementById("messages").innerHTML += "<p><b>Disconnected from server</b></p>";
};

function sendMessage() {
    let message = document.getElementById("messageInput").value;
    ws.send(message);
    console.log("Sent:", message);
    document.getElementById("messages").innerHTML += `<p>You: ${message}</p>`;
}