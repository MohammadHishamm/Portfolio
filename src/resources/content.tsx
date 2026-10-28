import { About, Home, Newsletter, Person, Social, Work } from "@/types";
import { publicAsset } from "@/utils/publicAsset";

const person: Person = {
  firstName: "Mohammad",
  lastName: "Hisham",
  name: `Mohammad Hisham`,
  role: "Software Engineer",
  /** Prefixed for `next/image` + unoptimized + basePath (see `publicAsset` doc). */
  avatar: publicAsset("/images/avatar.jpeg"),
  email: "mohammadhesham65@gmail.com",
  languages: ["English", "Arabic"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/MohammadHishamm",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mohammad-hisham-24963b2ab/",
    essential: true,
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    link: "https://wa.link/tfjovw",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building reliable, scalable software solutions</>,
  featured: {
    display: false,
    title: <></>,
    href: "/work",
  },
  subline: (
    <>
      I'm Mohammad Hisham, a full-stack software engineer. I turn complex
      problems into clean, production-ready products — from front-end interfaces
      to backend systems and cloud integrations.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Full-stack Software Engineer with hands-on experience building production
        features across front-end interfaces, backend APIs, payment integrations,
        search, and cloud infrastructure on AWS. I care deeply about clean architecture, developer experience, and
        shipping things that actually work. Currently based in Cairo, Egypt — open
        to hybrid and remote roles.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Hotdesk",
        timeframe: "2025 – Present",
        role: "Software Engineer — Front-end & Back-end (Hybrid)",
        achievements: [
          <>
            Built the backend of <strong>QR door access control</strong> integrated with the Dahua
            DSS system — host and guest APIs, the QR in the app and the booking confirmation email,
            automatic grant/revoke on a dedicated Celery queue, and a scheduled reconcile job on AWS.
          </>,
          <>
            Built a <strong>Typesense search index</strong> for listings and workspaces with
            booking-derived seat availability per day, kept in sync automatically as bookings and
            listings change.
          </>,
          <>
            Integrated <strong>third-party provider APIs and SDKs</strong> (IWG/Regus, Dahua DSS) —
            studied their docs, tested every endpoint in Postman, and organised them in a shared
            Postman workspace for the team.
          </>,
          <>
            Worked on <strong>AWS</strong>: Celery task queues on SQS, scheduled jobs on EventBridge,
            one-off ECS Fargate tasks from CloudShell for migrations and backfills, and investigating
            ECS cluster memory issues with CloudWatch. Developed and tested everything in Docker.
          </>,
          <>
            Built a <strong>Product Analytics Funnels</strong> system using PostHog and Firebase
            to track page visits, navigation sources, and user actions across the web app —
            giving the data team full visibility into user behaviour.
          </>,
          <>
            Led research and implementation of a <strong>new project architecture</strong> (SCR
            structure) using Next.js, TypeScript, and Shadcn/Tailwind CSS, replacing legacy MUI/Bootstrap.
            Presented the proposal to the CTO and senior engineers; approved and shipped.
          </>,
          <>
            Integrated <strong>Apple Pay and Google Play</strong> into the booking and subscription
            flow — both wired through Stripe.js, using Firebase Remote Config for feature-flag gating
            and the Apple/Google SDKs for their respective payment sheets.
          </>,
          <>
            Implemented <strong>Invoice</strong> and <strong>Promo-code</strong> management features
            end-to-end in the Hotdesk Host Portal (Angular), integrated via the internal Hotdesk SDK
            and toggled with Unleash feature flags.
          </>,
          <>
            Led <strong>SEO enhancements</strong> across the Hotdesk web application — improving
            metadata, structured data, page titles, and crawlability to increase organic search
            visibility.
          </>,
        ],
        images: [
          {
            src: publicAsset("/images/projects/project-01/analytics.jpg"),
            alt: "Product Analytics Funnels",
            width: 16,
            height: 9,
          },
          {
            src: publicAsset("/images/projects/project-01/googlePay1.png"),
            alt: "Google Pay Integration",
            width: 16,
            height: 9,
          },
          {
            src: publicAsset("/images/projects/project-01/invoice1.jpg"),
            alt: "Invoice Feature",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Almajdouie Foundation",
        timeframe: "2026",
        role: "Full-stack Developer (Freelance, Remote)",
        achievements: [
          <>
            Developed the whole project <strong>end to end on my own</strong> — from the Figma design
            to the database, admin dashboard, deployment, and launch — for a Saudi charitable foundation.
          </>,
          <>
            Built a bilingual, <strong>Arabic-first RTL</strong> website with 25+ pages, light/dark
            themes, and an interactive mosque map, plus an admin CMS for 20+ content types with three
            staff roles secured by Supabase Row Level Security.
          </>,
          <>
            Handled <strong>SEO</strong>: metadata and canonical tags, sitemap.xml, robots.txt,
            JSON-LD structured data, link previews, and 301/410 redirects from the old site's URLs.
          </>,
          <>
            Deployed on <strong>Vercel</strong> and <strong>Cloudflare Workers</strong> with GitHub
            Actions, using Next.js, TypeScript, Tailwind CSS, and Supabase.
          </>,
        ],
        images: [
          {
            src: publicAsset("/images/projects/project-02/almajdouie-home.png"),
            alt: "Almajdouie Foundation website",
            width: 16,
            height: 9,
          },
          {
            src: publicAsset("/images/projects/project-02/almajdouie-cms.png"),
            alt: "Almajdouie CMS dashboard",
            width: 16,
            height: 9,
          },
          {
            src: publicAsset("/images/projects/project-02/almajdouie-google.png"),
            alt: "Almajdouie Foundation on Google search",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Ariatoon",
        timeframe: "2025",
        role: "Full-stack Developer & UI/UX (Freelance, Remote)",
        achievements: [
          <>
            Redesigned the admin dashboard using Shadcn components for a cleaner,
            more maintainable UI.
          </>,
          <>
            Integrated <strong>PayPal and Stripe</strong> for in-app purchases and
            implemented Cloudinary for scalable novel and image uploads.
          </>,
          <>
            Built the frontend with <strong>React Vite</strong> and the backend
            with <strong>Go</strong>, containerised with Docker.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Misr International University (MIU), Cairo",
        description: <>B.Sc. Computer Science — focus: Full-stack Software Engineering. Graduated July 2025.</>,
      },
      {
        name: "Manarat Alfarouk School, Cairo",
        description: <>IGCSE Certificate. Graduated August 2021.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Frontend",
        description: (
          <>
            Building responsive, accessible interfaces with React, Next.js, Angular,
            TypeScript, Tailwind CSS, and Shadcn. Experienced with feature flags
            (Unleash, Firebase Remote Config) and design-to-code workflows in Figma.
          </>
        ),
        tags: [
          { name: "TypeScript", icon: "typescript" },
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Angular", icon: "angular" },
          { name: "Tailwind CSS", icon: "tailwind" },
        ],
        images: [],
      },
      {
        title: "Backend & Databases",
        description: (
          <>
            Server-side development with Python, Django REST Framework, and Celery, plus
            Node.js, Go, .NET/C#, Java, and Spring Boot. Comfortable with PostgreSQL/PostGIS,
            Redis, Typesense, NoSQL databases, Firebase, Supabase, and Posthog for event tracking.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "Django", icon: "django" },
          { name: "Celery", icon: "celery" },
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "Go", icon: "go" },
          { name: "Firebase", icon: "firebase" },
          { name: "Supabase", icon: "supabase" },
          { name: "Docker", icon: "docker" },
          { name: "Stripe", icon: "stripe" },
        ],
        images: [],
      },
      {
        title: "Cloud & DevOps",
        description: (
          <>
            AWS (ECS, Fargate, SQS, EventBridge, CloudWatch, CloudShell, RDS), Docker and
            Docker Compose, GitLab CI/CD and GitHub Actions, Vercel, and Cloudflare Workers.
            API testing and documentation with Postman workspaces and Swagger (OpenAPI).
          </>
        ),
        tags: [
          { name: "AWS", icon: "aws" },
          { name: "Docker", icon: "docker" },
          { name: "Postman", icon: "postman" },
        ],
        images: [],
      },
    ],
  },
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Add project pages as .mdx files in src/app/work/projects
};

export { person, social, newsletter, home, about, work };
