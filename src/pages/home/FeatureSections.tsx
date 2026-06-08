import React, { useEffect, useState } from 'react';
import FeatureBlock from './FeatureBlock';
import FeatureIcon from './FeatureIcon';
import { featureSections } from './homeData';

type FeatureSectionsProps = {
  onImageClick: (imageUrl: string, productName: string) => void;
};

const FeatureSections: React.FC<FeatureSectionsProps> = ({ onImageClick }) => {
  const [activeSection, setActiveSection] = useState<string>(featureSections[0].id);

  useEffect(() => {
    const offset = 136;
    let rafId = 0;

    const update = () => {
      let current: string = featureSections[0].id;
      for (const section of featureSections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= offset) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="products" className="octa-features">
      <div className="octa-section-heading">
        <span>Product structure</span>
        <h2><strong>One Company</strong> - One Intelligence - One Future</h2>
        <p>
          Each product solves a specific operational problem — across education,
          timed environments, fashion commerce, workforce operations, and cooperative finance.
        </p>
      </div>

      <div className="octa-feature-tabs" aria-label="Product categories">
        {featureSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={activeSection === section.id ? 'active' : ''}
          >
            <FeatureIcon name={section.id} />
            {section.label}
          </a>
        ))}
      </div>

      <div className="octa-feature-layout">
        <aside className="octa-feature-sidebar">
          <p>Categories</p>
          {featureSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={activeSection === section.id ? 'active' : ''}
            >
              <FeatureIcon name={section.id} />
              {section.label}
            </a>
          ))}
        </aside>

        <div className="octa-feature-stack">
          <FeatureBlock
            id="education"
            title="Education Intelligence"
            body={[
              'Stylus AI turns handwritten exam scripts into structured grading workflows for schools and assessment teams.',
              'Teachers can capture scripts, apply consistent rubrics, reduce marking bias, and return results faster.',
            ]}
            points={['Handwritten script capture', 'Rubric-led grading', 'Assessment analytics', 'Teacher-friendly review']}
            productId="stylus-ai"
            imageIndex={0}
            onImageClick={onImageClick}
          />
          <FeatureBlock
            id="timing"
            title="Timed Operations"
            body={[
              'TI-BOT manages school bells, timed announcements, public updates, and schedule control for structured environments.',
              'It keeps timing and communication centralized instead of leaving daily operations to manual reminders.',
            ]}
            points={['Smart schedules', 'Timed announcements', 'Multi-zone communication', 'Operational control']}
            productId="ti-bot"
            imageIndex={0}
            reversed
            onImageClick={onImageClick}
          />
          <FeatureBlock
            id="commerce"
            title="Fashion Commerce"
            body={[
              'DressCode gives Nigerian fashion a mobile-first commerce layer with shopping, custom tailoring, creator posts, and AI try-on.',
              'The platform keeps discovery, messaging, payments, seller workflows, and order tracking in one customer journey.',
            ]}
            points={['Fashion marketplace', 'Bespoke orders', 'Creator commerce', 'AI virtual try-on']}
            productId="dresscode"
            imageIndex={2}
            onImageClick={onImageClick}
          />
          <FeatureBlock
            id="operations"
            title="Workforce Operations"
            body={[
              'WorkSpot verifies attendance with location-aware check-ins, live team visibility, and payroll-ready records.',
              'Managers get cleaner compliance logs while field teams keep a fast mobile check-in experience.',
            ]}
            points={['Geo-fenced check-ins', 'Biometric verification', 'Live operations view', 'Payroll-ready exports']}
            productId="workspot"
            imageIndex={0}
            reversed
            onImageClick={onImageClick}
          />
          <section id="banking" className="octa-feature-block octa-banking-block">
            <div className="octa-feature-title">
              <FeatureIcon name="banking" />
              <h3>Cooperative Banking Workflows</h3>
            </div>
            <div className="octa-feature-body">
              <div className="octa-feature-copy">
                <p>
                  Octa Node also builds finance and cooperative software where member records,
                  approvals, repayments, reporting, and operational oversight need to stay organized.
                </p>
                <p>
                  This sits beside the product suite as custom engineering for organizations with
                  deeper process requirements.
                </p>
                <div className="octa-point-grid">
                  {['Member records', 'Approval flows', 'Repayment tracking', 'Operational reports'].map((point) => (
                    <span key={point}>{point}</span>
                  ))}
                </div>
              </div>
              <div className="octa-ledger-visual" aria-hidden="true">
                {['Member intake', 'Loan review', 'Repayment log', 'Monthly report'].map((item, index) => (
                  <div key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item}</strong>
                    <small>{index === 1 ? 'Approval pending' : 'Ready'}</small>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default FeatureSections;
