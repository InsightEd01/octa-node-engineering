// Import product images
import stylus1Img from '../../assets/stylus1.png';
import stylus2Img from '../../assets/stylus2.png';
import tibotImg from '../../assets/Tibot.png';

// Export image variables for use in other components
export { stylus1Img, stylus2Img, tibotImg };

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
    description: 'Revolutionizing assessments, Stylus AI is an advanced system that accurately marks theory questions and all kinds of handwritten tests, saving educators countless hours and providing instant, consistent feedback.',
    fullDescription: `Stylus AI represents a breakthrough in educational technology, transforming how educators approach assessment and grading. Our advanced artificial intelligence system has been specifically designed to understand and evaluate handwritten responses with unprecedented accuracy.

Built with cutting-edge machine learning algorithms, Stylus AI can process various types of handwritten content, from mathematical equations to essay responses, providing detailed feedback and accurate scoring. The system learns from each interaction, continuously improving its accuracy and understanding of different writing styles and academic contexts.

What sets Stylus AI apart is its ability to maintain the human touch in education while dramatically reducing the time burden on educators. Teachers can now focus on what they do best - teaching and mentoring students - while our AI handles the time-consuming task of grading with consistency and precision.`,
    features: [
      'Advanced handwriting recognition technology',
      'Multi-language support for global accessibility',
      'Customizable grading rubrics and criteria',
      'Real-time feedback generation',
      'Integration with popular LMS platforms',
      'Detailed analytics and progress tracking',
      'Secure cloud-based processing',
      'Mobile-responsive interface'
    ],
    benefits: [
      'Reduce grading time by up to 80%',
      'Ensure consistent and fair assessment',
      'Provide instant feedback to students',
      'Scale assessment capabilities effortlessly',
      'Maintain detailed records and analytics',
      'Support diverse learning environments'
    ],
    techSpecs: {
      platform: 'Web-based application with mobile support',
      compatibility: 'All modern browsers, iOS, Android',
      requirements: 'Internet connection, camera/scanner for document input'
    },
    appUrl: 'https://stylusaipro.netlify.app',
    demoUrl: 'https://stylusaipro.netlify.app',
    category: 'Education Technology',
    launchDate: '2024'
  },
  {
    id: 'ti-bot',
    name: 'TI-BOT',
    targetAudience: 'schools and educational administrators',
    images: [tibotImg],
    description: 'An AI-enabled time management system that replaces traditional bells in schools and enhances announcements and student engagement over a large school.',
    fullDescription: `TI-BOT is revolutionizing school time management and communication systems. Moving beyond traditional bell systems, TI-BOT creates an intelligent, adaptive environment that responds to the unique needs of modern educational institutions.

Our AI-powered system doesn't just ring bells - it creates a comprehensive communication ecosystem that keeps students, teachers, and staff connected and informed throughout the school day. With smart scheduling capabilities, emergency protocols, and personalized announcements, TI-BOT ensures that everyone in the school community stays synchronized and engaged.

The system integrates seamlessly with existing school infrastructure while providing advanced features like weather-based schedule adjustments, event-specific announcements, and multi-zone audio management. TI-BOT learns from usage patterns to optimize timing and improve the overall school experience.`,
    features: [
      'Smart scheduling with AI optimization',
      'Multi-zone audio management',
      'Emergency broadcast capabilities',
      'Weather-responsive schedule adjustments',
      'Integration with school management systems',
      'Customizable announcement templates',
      'Real-time system monitoring',
      'Mobile app for administrators'
    ],
    benefits: [
      'Improve school-wide communication efficiency',
      'Reduce disruptions with smart timing',
      'Enhance emergency response capabilities',
      'Streamline daily operations',
      'Increase student and staff engagement',
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
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};