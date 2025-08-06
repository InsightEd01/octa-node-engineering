import { SEOHead } from '../seo/components/SEOHead';

const Terms = () => {
  return (
    <>
      {/* Terms Page SEO */}
      <SEOHead
        title="Terms of Service - Octa Node Engineering"
        description="Terms of service for Octa Node Engineering AI solutions. Read our terms and conditions for using our AI products and services."
        keywords={['terms of service', 'AI terms', 'service agreement', 'Octa Node Engineering']}
        type="article"
        noindex={true}
      />
      
      <div className="container">
      <h1>Terms and Conditions</h1>
      <p><strong>Effective Date:</strong> [Insert Date]</p>
      
      <p>Welcome to Octa Node Engineering. These Terms and Conditions outline the rules and regulations for the use of our website and services.</p>
      
      <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use Octa Node Engineering's services if you do not agree to all of the terms and conditions stated on this page.</p>
      
      <h2>1. Intellectual Property Rights</h2>
      <p>Unless otherwise stated, Octa Node Engineering and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.</p>
      
      <h2>2. License</h2>
      <p>Octa Node Engineering grants you a limited, non-exclusive, non-transferable license to access and use our website and services for your personal or business use, subject to these Terms.</p>
      
      <h2>3. User Responsibilities</h2>
      <p>As a user of our services, you agree not to:</p>
      <ul>
        <li>Use our services for any unlawful purpose</li>
        <li>Interfere with or disrupt the operation of our services</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Use our services to transmit any harmful or malicious content</li>
        <li>Violate any applicable laws or regulations</li>
      </ul>
      
      <h2>4. Services</h2>
      <p>Octa Node Engineering provides AI-powered solutions for various industries. Our services are subject to change, and we reserve the right to modify, suspend, or discontinue any aspect of our services at any time.</p>
      
      <h2>5. Limitation of Liability</h2>
      <p>In no event shall Octa Node Engineering, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
      <ul>
        <li>Your access to or use of or inability to access or use the services</li>
        <li>Any conduct or content of any third party on the services</li>
        <li>Any content obtained from the services</li>
        <li>Unauthorized access, use or alteration of your transmissions or content</li>
      </ul>
      
      <h2>6. "AS IS" and "AS AVAILABLE" Disclaimer</h2>
      <p>The services are provided on an "AS IS" and "AS AVAILABLE" basis. Octa Node Engineering makes no representations or warranties of any kind, express or implied, as to the operation of the services or the information, content, materials, or products included on this website.</p>
      
      <h2>7. Termination</h2>
      <p>We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
      
      <h2>8. Governing Law</h2>
      <p>These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.</p>
      
      <h2>9. Changes to These Terms</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.</p>
      
      <h2>10. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at:</p>
      <p>Email: terms@octanode.engineering</p>
      </div>
    </>
  );
};

export default Terms;
