### Getting Started

```bash
npm i
npm run dev
```

### Config
<img width="700" height="500" alt="diagram-export-9-10-2025-6_46_58-PM" src="https://github.com/user-attachments/assets/f2b40b5f-84b8-4c31-9bba-cada25c030ea" />


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
