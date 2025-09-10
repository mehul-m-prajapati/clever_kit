### Getting Started

```bash
npm i
npm run dev
```

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
