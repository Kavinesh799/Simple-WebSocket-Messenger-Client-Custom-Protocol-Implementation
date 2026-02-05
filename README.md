# Simple WebSocket Messenger Client – Custom Protocol Implementation

A browser-based messenger client that communicates with a server using **WebSockets** and a **custom binary packet protocol**.  
This project implements session management and message exchange operations including ASSOCIATE, PUSH, and GET.

Developed as part of the **EE5150 – Communication Networks** coursework(IIT Madras).

---

## 📌 Project Overview

This client application connects to a WebSocket server and exchanges messages using a structured binary packet format. The protocol defines management, control, and data packet types for session establishment and message delivery.

The client runs entirely in the browser and provides a simple UI for:

- Establishing server association
- Sending messages to another client ID
- Retrieving stored messages
- Viewing protocol responses and logs

All packet encoding and decoding is implemented in JavaScript using binary arrays.

---

## ✨ Features

- WebSocket client implemented in browser
- Custom binary packet protocol support
- Session association with server
- Push messages to other clients
- Retrieve messages from server buffer
- Handles acknowledgements and buffer states
- UTF-8 payload encoding/decoding
- Payload length validation (≤ 254 bytes)
- Simple interactive UI
- No external libraries required

---

## 🧠 Protocol Summary

The protocol uses **1-byte header fields** and structured packet formats.

### Management Packets (Type = 0)

Used for session control.

| Message | Meaning |
|---------|----------|
ASSOCIATE | Request session |
ASSOCIATIONSUCCESS | Session established |
ASSOCIATIONFAILED | Session rejected |
UNKNOWNERROR | Unexpected error |

---

### Control Packets (Type = 1)

Used for server buffer control and acknowledgements.

| Message | Meaning |
|----------|------------|
GET | Retrieve next message |
BUFFEREMPTY | No messages available |
POSITIVEACK | Message stored successfully |
BUFFERFULL | Receiver buffer full |

---

### Data Packets (Type = 2)

Used for message transfer.

Header format:

```
[type, message, id, id2, length]
```

- **id** = sender client ID
- **id2** = receiver client ID (PUSH) or sender ID (GETRESPONSE)
- **length** = payload size (max 254 bytes)
- **payload** = UTF-8 encoded message

---

## 🖥️ Technologies Used

- HTML5
- JavaScript (ES6)
- Browser WebSocket API
- Uint8Array for binary packets
- TextEncoder / TextDecoder

---

## 🚀 How to Run

### 1️⃣ Start the WebSocket Server

Run the provided Python test server:

```bash
python websocket-server.py
```

Default server address expected by the client:

```
ws://localhost:1234
```

---

### 2️⃣ Run the Client

Open the file in any modern browser:

```
client.html
```

No build or installation required.

---

### 3️⃣ Using the Client

1. Click **Associate** to establish a session
2. Wait for session success message
3. Enter:
   - Receiver ID
   - Message text
4. Click **Push Message** to send
5. Click **Get Message** to retrieve messages
6. Check log panel for protocol responses

---

## 📦 Packet Construction Example

Example PUSH packet creation used in the client:

```javascript
let packet = new Uint8Array(5 + length);
packet.set([2, 1, clientId, receiverId, length]);
packet.set(payload, 5);
ws.send(packet);
```

---

## 🧪 Tested Scenarios

- Successful association
- Association failure handling
- Buffer empty response
- Buffer full response
- Positive acknowledgement handling
- Binary packet parsing
- UTF-8 message decoding
- Length validation

---

## 📚 Academic Context

This project implements the client-side requirements of a simple messenger system defined in the EE5150 Communication Networks assignment specification.

Focus areas:

- Application layer protocol design
- Binary packet framing
- Client-server interaction
- WebSocket transport usage

---

## ⚠️ Notes

- Client ID is randomly generated (1 byte)
- Payload limited to 254 bytes
- Designed for protocol learning and experimentation
- Not intended for production use

---

## 📜 License

This repository contains academic coursework implementation.  
Shared for educational reference only.
