import { GuideLinks } from './GuideLinks';
import { HowToGuide } from './HowToGuide';
import { Illustration } from './Illustration';
import { DeviceGuide, FaqList, ToolHub } from './ToolSections';
import './page-arrange.css';

export function ToolCopy({ page, guides }) {
  return (
    <div className="home-copy">
      <nav className="home-jump" aria-label="On this page">
        {page.jump.map(([id, label]) => (
          <a key={id} href={`#${id}`}>{label}</a>
        ))}
      </nav>

      <section className="panel article-panel" id="about" aria-labelledby="about-heading">
        <h2 id="about-heading">{page.intro.heading}</h2>
        <div className="article-copy">{page.intro.body}</div>
        <Illustration name={page.art} />
      </section>

      <HowToGuide heading={page.how.heading} type={page.how.type} />

      {page.sections.map((section) => (
        <section key={section.id} className="panel article-panel" id={section.id} aria-labelledby={`${section.id}-heading`}>
          <h2 id={`${section.id}-heading`}>{section.heading}</h2>
          {section.body}
        </section>
      ))}

      <DeviceGuide kind={page.kind} />

      <ToolHub current={page.path} heading="More Instagram downloaders" />

      <GuideLinks guides={guides} />

      <FaqList items={page.faq.items} />
    </div>
  );
}
