### Getting Started

```bash
npm i
npm run dev
```

### Config
<img width="650" height="450" alt="diagram-export-9-10-2025-6_43_33-PM" src="https://github.com/user-attachments/assets/08048c15-5fbd-4f99-ad8f-da5e2781e1a3" />


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
