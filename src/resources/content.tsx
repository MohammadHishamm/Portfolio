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
        features across front-end interfaces, payment integrations, and analytics
        pipelines. I care deeply about clean architecture, developer experience, and
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
        role: "Front-end Engineer (Hybrid)",
        achievements: [
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
            Server-side development with Node.js, Go, .NET/C#, Java, and Spring Boot.
            Comfortable with SQL and NoSQL databases, Firebase, Supabase, and Posthog
            for event tracking.
          </>
        ),
        tags: [
          { name: "Go", icon: "go" },
          { name: "Firebase", icon: "firebase" },
          { name: "Supabase", icon: "supabase" },
          { name: "Docker", icon: "docker" },
          { name: "Stripe", icon: "stripe" },
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
