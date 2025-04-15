Vita Nova Designs Invoice Application

Tech Stack:
Nextjs
Authjs - Majic links
MailTrap
TypeScript
Tailwind CSS
Shadcn UI
Prisma (Postgres)

Workflow:

1. Create Nextjs Project
2. Implement Auth.js (Open Source)
   a. Send email magic links with mailtrap (nodemailer)
3. Create customer verify route
4. Create an onboarding route -> Name and Address -> later for the invoice
5. Create a dashboard layout
6. Create invoice management route
   a. Create invoice
   i. Send email to client on completion
   ii. Create a nice looking tempalate from scratch
   iii. Create a real custom pdf and attach using a link (REAL PDF, not a screenshot)
   b. Edit Invoice
   i.Send email to client on update
   ii. Create a nice looking template (HTML BUILDER)
   c. Send remainder Email to client
   i. Email empath using the no code email template mailtrap
   d. Download invoice
   e. Delete the invoice
   f. Mark invoice as paid
7. Create dashboard index route (analytics)
   a. Main info + beautiful animated chart
8. Optimization, streaming with a beautiful skeleton
9. Create a nice looking landing page
10. Deploy application to Vercel

# InvoiceVitaNova
