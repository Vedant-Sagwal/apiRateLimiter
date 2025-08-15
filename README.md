# API Rate Limiter Service

The API Rate Limiter Service is a backend system designed to control how many requests a user or IP can make to an API within a specific time window.
<br>
It protects services from abuse, DDoS attacks, and excessive load by enforcing configurable request limits. Built using Node.js, Redis, and Docker, it supports multiple rate limiting algorithms such as Sliding Window, Token Bucket.
<br>
Redis acts as a distributed in-memory store, enabling the service to scale across multiple instances while keeping request counters synchronized. 
<br>
The service can be integrated as middleware into any API, allowing developers to configure limits per IP or per authenticated user. 

## Examples: 
<h2> Hit the public endpoint</h2>
<img src="./images/Screenshot 2025-08-15 at 6.04.13 PM.png" alt="Image">
<br>
<h2> Tune limits at runtime</h2>
<img src="./images/Screenshot 2025-08-15 at 6.05.43 PM.png">
<br>
<h2> Switch identity mode to header </h2>
<img src="./images/Screenshot 2025-08-15 at 6.12.07 PM.png">
<br>
<h2> Each distinct x-api-key gets its own bucket </h2>
<img src="./images/Screenshot 2025-08-15 at 6.07.59 PM.png">

## Quick Start
```bash
docker-compose up --build

