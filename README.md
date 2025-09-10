### Getting Started

```bash
npm i
npm run dev
```

### Next Auth Config

<img width="837" height="589" alt="diagram-export-9-10-2025-6_38_12-PM" src="https://github.com/user-attachments/assets/6bd1b150-b8c5-4973-b2d9-6716104590db" />

### Next Auth Flow diagram
```
+-------------------+       1. User clicks "Sign In"
|    Browser        | --------------------------------------+
+-------------------+                                       |
        |                                                   |
        | 2. Request to /api/auth/signin                    |
        |-------------------------------------------------->|
        |                                                   |
        |        +----------------------------+             |
        |        | Next.js API Route          |             |
        |        | /api/auth/[...nextauth]    |             |
        |        +----------------------------+             |
        |                       |                           |
        |                       | 3. Redirect to provider   |
        |<------------------------------------------------- |
        |                       |                           |
        |         +-------------v-------------+             |
        |         |  OAuth / Credentials /    |             |
        |         |  Email Provider, etc.     |             |
        |         +-------------+-------------+             |
        |                       |                           |
        |          4. OAuth Callback to      |              |
        |             /api/auth/callback     |              |
        |<-----------------------------------|              |
        |                       |                           |
        |     5. JWT/session creation        |              |
        |                       |                           |
        |          6. Response with Cookie   |              |
        |<--------------------------------------------------|
        |                       |                           |
        |     7. Authenticated browser       |              |
        +------------------------------------+              |
```
