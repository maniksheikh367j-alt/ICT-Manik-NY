# Security Specification for 𝙄𝘾𝙏 𝙈𝘼𝙉𝙄𝙆 𝙉𝙔

## Data Invariants
1. A Trading Log must have a valid status and performance string.
2. A Product must have a status of 'available' or 'coming_soon'.
3. Only the verified owner (maniksheikh2006@gmail.com) can modify any data.
4. Public users have read-only access to logs, stories, products, and posts.
5. Site configuration is read-only for public, write-only for admin.

## The Dirty Dozen Payloads
1. Create a log as an anonymous user. (Expected: Denied)
2. Update a log's performance to '1000%' as a non-admin. (Expected: Denied)
3. Delete Manik's story as a random authenticated user. (Expected: Denied)
4. Update SiteConfig to change the PayPal email to an attacker's email. (Expected: Denied)
5. Create a Product with an extremely large description (1MB+). (Expected: Denied by size limit)
6. Inject a script in a Story title. (Expected: Sanitized/Denied by pattern)
7. Update a log using a non-verified email. (Expected: Denied)
8. Spoof admin by setting custom claims (Expected: Denied as we check email_verified and specific email).
9. Change a BlogPost's date to a future date as a user. (Expected: Denied)
10. Delete the entire 'logs' collection via batch request. (Expected: Denied)
11. Read private PII if any was added (none in blueprint yet, but protected by default).
12. Create a log with a missing 'pair' field. (Expected: Denied)

## Test Runner
(Tests would be implemented in firestore.rules.test.ts)
