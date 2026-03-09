// Import product images
import stylus1Img from '../../assets/stylus1.png';
import stylus2Img from '../../assets/stylus2.png';
import tibotImg from '../../assets/Tibot.png';
import dresscodeHeroImg from '../../assets/dresscode-hero.png';
import dresscodeFeaturesImg from '../../assets/dresscode-features.png';
import dresscodeAiTryOnImg from '../../assets/dresscode-ai-tryon.png';
import workspotHeroDashboardImg from '../../assets/workspot-hero-dashboard.png';
import workspotFeatureCheckinsImg from '../../assets/workspot-feature-checkins.png';
import workspotFeatureOpsImg from '../../assets/workspot-feature-ops.png';

// Export image variables for use in other components
export {
  stylus1Img,
  stylus2Img,
  tibotImg,
  dresscodeHeroImg,
  dresscodeFeaturesImg,
  dresscodeAiTryOnImg,
  workspotHeroDashboardImg,
  workspotFeatureCheckinsImg,
  workspotFeatureOpsImg
};

export interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  techSpecs: {
    platform: string;
    compatibility: string;
    requirements: string;
  };
  appUrl: string;
  demoUrl?: string;
  category: string;
  launchDate: string;
  targetAudience: string;
}

export const products: Product[] = [
  {
    id: 'stylus-ai',
    name: 'Stylus AI',
    targetAudience: 'educators and academic institutions',
    images: [stylus1Img, stylus2Img],
    description: 'Stylus AI is an examination grading software that lets educators snap handwritten exam scripts and receive accurate grading in seconds instead of minutes, with minimal bias and extreme consistency.',
    fullDescription: `Stylus AI is built for one core job: helping educators grade handwritten exam scripts faster without sacrificing accuracy. Teachers or assessment teams simply capture the handwritten script, upload it, and let the system evaluate the work in seconds instead of spending minutes on each paper.

The platform is designed for theory questions, essays, and other handwritten assessments where manual marking is slow and often inconsistent. Stylus AI applies the same grading logic across scripts, reducing human error, limiting grading bias, and producing dependable results at scale.

What makes Stylus AI valuable is the consistency it brings to assessment workflows. Schools and exam teams can process more scripts in less time, return results faster, and maintain a fairer grading standard across large volumes of student work.`,
    features: [
      'Snap-to-grade workflow for handwritten exam scripts',
      'High-accuracy handwriting recognition for theory-based assessments',
      'Consistent grading logic across large script volumes',
      'Customizable grading rubrics and criteria',
      'Fast result generation in seconds',
      'Detailed analytics and progress tracking',
      'Secure cloud-based processing',
      'Mobile-responsive interface for easy script capture'
    ],
    benefits: [
      'Grade handwritten scripts in seconds instead of minutes',
      'Reduce human marking errors',
      'Minimize grading bias across exam batches',
      'Maintain extreme scoring consistency',
      'Scale assessment workflows without extra marking overhead',
      'Return results and feedback faster'
    ],
    techSpecs: {
      platform: 'Web-based application with mobile support',
      compatibility: 'All modern browsers, iOS, Android',
      requirements: 'Internet connection and a phone camera or scanner for script capture'
    },
    appUrl: 'https://stylus.octanode.online',
    demoUrl: 'https://stylus.octanode.co',
    category: 'Education Technology',
    launchDate: '2024'
  },
  {
    id: 'ti-bot',
    name: 'TI-BOT',
    targetAudience: 'schools, administrators, and high-traffic service environments',
    images: [tibotImg],
    description: 'TI-BOT is a smart school bell, time management, and announcement system that automates schedules, bells, and public updates for schools and other structured environments.',
    fullDescription: `TI-BOT is built as a smart school bell, time management, and communication system for environments that depend on clear timing, coordinated movement, and timely public updates. In schools, it replaces traditional bell systems with intelligent scheduling, announcements, and centralized operational control.

The system does more than trigger bells. TI-BOT manages timed events, public notices, and multi-zone communication so administrators can keep people informed and operations running on schedule. It is especially useful in schools and campuses where timing accuracy and organized communication matter every day.

Although TI-BOT is not Octa Node Engineering's banking software, it can also be deployed in banks and similar service environments to manage time, coordinate crowd updates, and improve how customers receive timely announcements.`,
    features: [
      'Smart scheduling and timed announcements',
      'Multi-zone audio management',
      'Emergency broadcast capabilities',
      'Weather-responsive schedule adjustments',
      'Integration with school management systems',
      'Customizable announcement templates',
      'Real-time system monitoring',
      'Timed crowd and service updates for large environments'
    ],
    benefits: [
      'Keep daily operations on time',
      'Reduce manual timing errors',
      'Improve public communication across large environments',
      'Enhance emergency response capabilities',
      'Support timely crowd updates when needed',
      'Streamline school and service-area coordination',
      'Provide detailed usage analytics'
    ],
    techSpecs: {
      platform: 'IoT-enabled hardware with cloud management',
      compatibility: 'Existing PA systems, network infrastructure',
      requirements: 'Network connectivity, compatible audio equipment'
    },
    appUrl: 'https://tibot-ai.netlify.app',
    category: 'School Management',
    launchDate: '2024'
  },
  {
    id: 'dresscode',
    name: 'DressCode',
    targetAudience: 'fashion shoppers, creators, designers, and tailors',
    images: [dresscodeHeroImg, dresscodeFeaturesImg, dresscodeAiTryOnImg],
    description: 'DressCode is a Nigerian fashion social commerce platform that brings shopping, bespoke tailoring, creator monetization, and AI virtual try-on into one app.',
    fullDescription: `DressCode is built as a digital home for Nigeria's fashion ecosystem. It combines product discovery, social content, custom tailoring, secure payments, and creator-led commerce in one experience designed for local fashion culture.

Users can shop exclusive looks from independent designers, commission bespoke pieces from verified tailors, post outfit content, and connect directly with sellers and creators. Instead of splitting discovery, messaging, payments, and order tracking across multiple platforms, DressCode keeps the full fashion journey in one place.

What makes DressCode stand out is the combination of community and utility. It supports fashion lovers, local designers, and creators at the same time, while also introducing AI-powered virtual try-on so customers can preview outfits before they buy.`,
    features: [
      'Fashion marketplace for local designers and boutiques',
      'Bespoke order workflow for verified tailors and dressmakers',
      'Built-in social feed and fashion reels',
      'Direct messaging between buyers, creators, and sellers',
      'AI virtual try-on for outfit previews',
      'Secure payments with tracked order flow',
      'Seller dashboard for measurements, orders, and payments',
      'Creator monetization through tagged outfit posts'
    ],
    benefits: [
      'Discover Nigerian fashion in one platform',
      'Place custom orders with verified tailors',
      'Preview outfits before purchase with AI try-on',
      'Help designers and creators reach more buyers',
      'Simplify payments, messaging, and order tracking',
      'Create new revenue opportunities for fashion creators'
    ],
    techSpecs: {
      platform: 'Mobile-first fashion platform with web landing experience',
      compatibility: 'iOS, Android, and modern web browsers',
      requirements: 'Internet connection and supported mobile device for full app experience'
    },
    appUrl: 'https://dresscode-ten.vercel.app/',
    category: 'Fashion Commerce',
    launchDate: '2026'
  },
  {
    id: 'workspot',
    name: 'WorkSpot',
    targetAudience: 'operations managers, HR teams, supervisors, and field-based organizations',
    images: [workspotHeroDashboardImg, workspotFeatureCheckinsImg, workspotFeatureOpsImg],
    description: 'WorkSpot is a workforce attendance and operations platform that automates verified check-ins, live team monitoring, payroll-ready logs, and location-based compliance.',
    fullDescription: `WorkSpot is built to remove the friction, fraud, and manual effort that come with traditional attendance tracking. It combines biometric verification, geo-fencing, live operations visibility, and automated exports in one platform for modern teams.

Teams can define work zones, verify the right person is checking in, monitor attendance events in real time, and export clean records for payroll and compliance without relying on paper logs or spreadsheets. The result is faster operations oversight with fewer attendance disputes and less time theft.

What makes WorkSpot valuable is the balance between control and simplicity. Employees get a fast mobile check-in experience, while managers get instant operational visibility, audit-ready records, and automation that scales from small teams to enterprise deployments.`,
    features: [
      'Geo-fenced attendance check-ins',
      'Biometric verification with Face ID and Touch ID',
      'Live operations dashboard for team visibility',
      'Payroll-ready CSV and PDF exports',
      'Offline check-in support with cloud sync',
      'Automated logs for audits and compliance',
      'Zone setup for offices, sites, and client locations',
      'Mobile-first workforce management experience'
    ],
    benefits: [
      'Reduce buddy-punching and attendance fraud',
      'Monitor workforce activity in real time',
      'Simplify payroll and compliance workflows',
      'Improve attendance accuracy across locations',
      'Cut time theft and manual admin overhead',
      'Scale attendance operations with less friction'
    ],
    techSpecs: {
      platform: 'Mobile attendance platform with cloud dashboard',
      compatibility: 'iOS, Android, and modern admin dashboards',
      requirements: 'Smartphone access, location services, and biometric support for full verification'
    },
    appUrl: 'https://play.google.com/store/search?q=workspot&c=apps',
    category: 'Workforce Operations',
    launchDate: '2026'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
