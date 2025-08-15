# API Rate Limiter Service

A Redis-backed API rate limiter with sliding-window and token-bucket strategies based on IP/user identity, with endpoint for both : public, admin.
<br> 
A Separate http 429 error on reaching the limit and it also tells after how much seconds user can  reconnect

## Quick Start
```bash
docker-compose up --build

Examples: 
<br>
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
