import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './header-actions.css';
import './company-logos.css';
import './skill-badges.css';
import './contact-actions.css';
import './profile-presence.css';

const roles = [
  {
    company: 'Securonix', logoDomain: 'securonix.com', initials: 'SX', role: 'Senior Staff Engineer', period: 'Nov 2020 — Present', location: 'Pune, India',
    tags: ['Spring Boot', 'Microservices', 'Spring Cloud', 'Event Driven Architecture', 'Distributed Systems', 'Redis', 'AWS', 'Docker', 'Security', 'Kafka', 'Kubernetes'],
    intro: 'Leading architecture and delivery for a SOAR platform trusted by enterprise security teams globally.',
    wins: ['Designed services processing 1M–5M security events daily at sub-second latency.', 'Improved API response time 5× with Redis caching, while reducing database read load by 60%.', 'Created 90+ connector integrations and a Python SDK that cut onboarding from 4 weeks to under 3 days.', 'Mentored 8+ engineers and accelerated delivery through AI-assisted engineering practices.']
  },
  {
    company: 'Citicorp Services India', logoDomain: 'citigroup.com', initials: 'C', role: 'Officer, Software Engineer', period: 'Sep 2018 — Nov 2020', location: 'Pune, India',
    tags: ['Fintech', 'Spring Boot', 'Microservices', 'Spring Cloud', 'Elasticsearch'],
    intro: 'Built core data infrastructure connecting financial reference data to global Citi systems.',
    wins: ['Built ingestion pipelines processing 10K+ reference data updates each day.', 'Reduced data-quality incident resolution from 4+ hours to under 15 minutes with live analytics.', 'Delivered APIs for 5–10 downstream systems with <200ms p95 latency at 500 requests/second.']
  },
  {
    company: 'Synechron', logoDomain: 'synechron.com', initials: 'S', role: 'Senior Associate, Software Engineer', period: 'Jul 2017 — Sep 2018', location: 'Pune, India',
    tags: ['Spring Boot', 'Microservices', 'Spring Cloud', 'Trading', 'MongoDB', 'PCF'],
    intro: 'Architected trading middleware for real-time order placement between Bloomberg and HSBC.',
    wins: ['Supported 500+ concurrent traders and 5K+ daily transactions at <500ms confirmation latency.', 'Developed live Angular dashboards for positions and cash-balance monitoring.', 'Helped lower post-release defects by 35% through stronger review practices.']
  },
  {
    company: 'Cognizant', logoDomain: 'cognizant.com', initials: 'C', role: 'Associate, Java Developer', period: 'May 2016 — Jul 2017', location: 'Mumbai, India',
    tags: ['Enterprise', 'Mule ESB', 'Cassandra', 'IBM MQ', 'Active MQ', 'Drools', 'Java', 'Spring Boot'],
    intro: 'Architected multi-country Tax Computation Engine supporting tax initiation, approval, and payment workflows across 13 countries,',
    wins: ['Implemented resilient integrations with 99.9% message-delivery reliability.', 'Reduced tax computation processing time by 50% with configurable Drools rules.', 'Maintained zero production audit failures across local tax authority requirements.']
  },
  {
    company: 'Cylsys Software Solutions', logoDomain: 'cylsys.com', initials: 'CY', role: 'Java Developer', period: 'Mar 2013 — Apr 2016', location: 'Mumbai, India',
    tags: ['CRM', 'Solr', 'Full stack'],
    intro: 'Built real-estate CRM platforms used by more than 100 clients.',
    wins: ['Developed full sales-lifecycle features across 5K+ property inventories.', 'Reduced property search latency from 3+ seconds to under 500ms with Solr indexing.', 'Delivered features supporting end-to-end sales lifecycle: lead management, property viewing scheduling, offer management, and transaction closure across multiple user roles (brokers, agents, buyers).']
  }
];

const skills = [
  ['Architecture', ['Distributed Systems', 'Microservices', 'Event-driven', 'CQRS', 'System Design']],
  ['Engineering', ['AI', 'Agentic AI', 'LLM', 'RAG', 'Java', 'Spring Boot', 'Python', 'FastAPI', 'JavaScript', 'React js', 'Angular']],
  ['Data & messaging', ['Apache Kafka', 'Redis', 'PostgreSQL', 'MongoDB', 'Elasticsearch', 'MySQL']],
  ['Cloud & delivery', ['AWS', 'Kubernetes', 'Docker', 'Jenkins', 'CI/CD']]
];

const skillIcons = {
  'Distributed Systems': ['apachekafka', 'DS', '231F20', null], 
  'Microservices': ['springboot', 'µS', '6DB33F', 'https://spring.io/microservices'], 
  'Event-driven': ['apachekafka', 'EV', '231F20', 'https://kafka.apache.org/documentation/'], 
  'CQRS': ['eventstore', 'CQ', '5C2D91', 'https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs'], 
  'System Design': ['diagramsdotnet', 'SD', 'F08705', null],
  'Java': ['openjdk', 'J', 'ED8B00', 'https://docs.oracle.com/en/java/'], 
  'Spring Boot': ['springboot', 'SB', '6DB33F', 'https://docs.spring.io/spring-boot/'], 
  'Python': ['python', 'Py', '3776AB', 'https://docs.python.org/3/'], 
  'FastAPI': ['fastapi', 'FA', '009688', 'https://fastapi.tiangolo.com/'], 
  'JavaScript': ['javascript', 'JS', 'F7DF1E', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
  'React js': ['react', 'R', '61DAFB', 'https://reactjs.org/'], 
  'Angular': ['angular', 'A', 'DD0031', 'https://angular.io/'],
  'Apache Kafka': ['apachekafka', 'K', '231F20', 'https://kafka.apache.org/documentation/'], 
  'Redis': ['redis', 'R', 'DC382D', 'https://redis.io/docs/latest/'], 
  'PostgreSQL': ['postgresql', 'PG', '4169E1', 'https://www.postgresql.org/docs/'], 
  'MongoDB': ['mongodb', 'M', '47A248', 'https://www.mongodb.com/docs/'], 
  'Elasticsearch': ['elasticsearch', 'ES', '005571', 'https://www.elastic.co/guide/'],
  'AWS': ['amazonaws', 'AWS', 'FF9900', 'https://docs.aws.amazon.com/'], 
  'Kubernetes': ['kubernetes', 'K8s', '326CE5', 'https://kubernetes.io/docs/'], 
  'Docker': ['docker', 'D', '2496ED', 'https://docs.docker.com/'], 
  'Jenkins': ['jenkins', 'J', 'D24939', 'https://www.jenkins.io/doc/'], 
  'CI/CD': ['githubactions', 'CI', '2088FF', 'https://docs.github.com/en/actions'],
  'MySQL': ['mysql', 'My', '4479A1', 'https://dev.mysql.com/doc/'],
  'AI': ['anthropic', 'AI', '412991', 'https://platform.openai.com/docs/'],
  'Agentic AI': ['anthropic', 'AA', '2D3047', 'https://www.anthropic.com/'], 
  'LLM': ['huggingface', 'LLM', 'FF6A13', 'https://huggingface.co/'], 
  'RAG': ['langchain', 'RAG', '25A8F3', 'https://python.langchain.com/']
};

function CompanyLogo({ role }) {
  return <span className="company-logo" aria-hidden="true"><img src={`https://www.google.com/s2/favicons?domain=${role.logoDomain}&sz=128`} alt="" onError={(event) => { event.currentTarget.hidden = true; event.currentTarget.parentElement.classList.add('logo-fallback'); }} /><b>{role.initials}</b></span>;
}

function SkillBadge({ skill }) {
  const [icon, initials, color, docsUrl] = skillIcons[skill];
  const logo = <><img src={`https://cdn.simpleicons.org/${icon}/${color}`} alt="" onError={(event) => { event.currentTarget.hidden = true; event.currentTarget.parentElement.classList.add('skill-icon--fallback'); }} /><b>{initials}</b></>;
  return <div className="skill-badge">{docsUrl ? <a className="skill-icon" href={docsUrl} target="_blank" rel="noreferrer" aria-label={`Open ${skill} documentation`} title={`Open ${skill} documentation`}>{logo}</a> : <span className="skill-icon skill-icon--static">{logo}</span>}<button className="skill-name" onClick={() => navigator.clipboard?.writeText(skill)} title={`Copy ${skill}`}>{skill}</button></div>;
}

function App() {
  const [activeRole, setActiveRole] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  const jump = id => { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  return <>
    <header className={scrolled ? 'nav nav--scrolled' : 'nav'}>
      <button className="brand" onClick={() => jump('#top')} aria-label="Back to top"><span className="brand-mark" data-full-name="Ashish Kumar Gupta">AKG</span><i>ashish.dev</i></button>
      <div className="nav-actions">
        <nav className={menuOpen ? 'links links--open' : 'links'}>
          <button onClick={() => jump('#experience')}>Experience</button><button onClick={() => jump('#expertise')}>Expertise</button><button onClick={() => jump('#contact')}>Contact</button>
        </nav>
        <div className="quick-contact">
          <a href="tel:+917208769992" aria-label="Call Ashish"><span className="contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.64a2 2 0 0 1-.45 2.11L8 9.75a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.86.29 1.74.5 2.64.62A2 2 0 0 1 22 16.92z" /></svg></span><i>Call</i></a>
          <a href="https://wa.me/917208769992" target="_blank" rel="noreferrer" aria-label="Message Ashish on WhatsApp"><span className="contact-icon"><img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" /></span><i>WhatsApp</i></a>
          <a href="/Ashish_Kumar_Gupta_Resume.pdf" download="Ashish-Kumar-Gupta-Resume.pdf" aria-label="Download resume" rel="noreferrer" aria-label="Download resume"><span className="contact-icon"><img src="https://unpkg.com/heroicons@2.2.0/24/outline/arrow-down-tray.svg" alt="Download" /></span><i>Resume </i></a>
        </div>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title="Toggle color theme"><span>{theme === 'dark' ? '☀' : '☾'}</span><i>{theme === 'dark' ? 'Light' : 'Dark'}</i></button>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button>
      </div>
    </header>

    <main id="top">
      <section className="hero section">
        <div className="hero-copy reveal">
          <p className="eyebrow opportunity-badge"><span></span> Available for staff & principal opportunities</p>
          <h1>Building systems<br/>that <em>move fast.</em></h1>
          <p className="lede">I’m Ashish Kumar Gupta, a Senior Staff Engineer who turns complex, high-volume systems into dependable platforms for cybersecurity and fintech.</p>
          <div className="hero-actions"><a className="button button--primary" href="mailto:ashishkrgupta@hotmail.com">Let’s talk <b>↗</b></a><button className="button button--ghost" onClick={() => jump('#experience')}>Explore my work <b>↓</b></button></div>
          <div className="availability"><span className="pulse"></span> Pune, India <small>•</small> Working globally</div>
        </div>
        <div className="hero-art reveal">
          <div className="orbit orbit--one"></div><div className="orbit orbit--two"></div>
          <div className="monogram"><small>AKG</small><strong>13<sup>+</sup></strong><span>years of engineering</span></div>
          <div className="float-card float-card--top"><b>&lt; 1s</b><span>event latency</span></div>
          <div className="float-card float-card--bottom"><b>1M–5M</b><span>events / day</span></div>
        </div>
      </section>

      <section className="metrics section" aria-label="Career highlights">
        {[['13+', 'years shaping software'], ['500+', 'enterprise teams supported'], ['90+', 'security integrations built'], ['13', 'countries served']].map(([n, l]) => <div className="metric" key={l}><b>{n}</b><span>{l}</span></div>)}
      </section>

      <section id="experience" className="work section">
        <div className="section-title"><p className="eyebrow">Selected journey</p><h2>Impact, measured<br/>in outcomes.</h2><p>Click a role to explore the work behind the numbers.</p></div>
        <div className="career">
          <div className="role-list">{roles.map((role, index) => <button key={role.company} className={activeRole === index ? 'role active' : 'role'} onClick={() => setActiveRole(index)}><span className="role-index">0{index + 1}</span><CompanyLogo role={role} /><span><b>{role.company}</b><small>{role.period}</small></span><i>↗</i></button>)}</div>
          <article className="role-detail" key={activeRole}>
            <div className="role-detail-head"><div className="role-title"><CompanyLogo role={roles[activeRole]} /><div><p>{roles[activeRole].location}</p><h3>{roles[activeRole].role}</h3></div></div><span className="role-period">{roles[activeRole].period}</span></div>
            <p className="intro">{roles[activeRole].intro}</p>
            <ul>{roles[activeRole].wins.map(win => <li key={win}>{win}</li>)}</ul>
            <div className="tag-row">{roles[activeRole].tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </article>
        </div>
      </section>

      <section id="expertise" className="expertise section">
        <div className="section-title"><p className="eyebrow">Technical range</p><h2>Fluent across<br/>the platform.</h2></div>
        <div className="skill-grid">{skills.map(([group, items], index) => <article className="skill-card" key={group}><span>0{index + 1}</span><h3>{group}</h3><div>{items.map(item => <SkillBadge skill={item} key={item} />)}</div></article>)}</div>
      </section>

      <section className="open-source section"><div><p className="eyebrow">Beyond the day job</p><h2>Making integration<br/>work less repetitive.</h2></div><article><span className="package-icon">⌘</span><div><p>Open source package</p><h3>scnx-soar-integration-starter <a href="https://pypi.org/project/scnx-soar-integration-starter/" target="_blank" rel="noreferrer">↗</a></h3><span>Python SDK that helps security teams build SOAR connectors faster — cutting setup from four weeks to less than three days.</span></div></article></section>

      <section className="developer-presence section"><div className="section-title"><p className="eyebrow">Developer presence</p><h2>Learn more from<br/>my public work.</h2></div><div className="profile-cards"><a href="https://github.com/ashishkrgupta" target="_blank" rel="noreferrer" className="profile-card"><span className="profile-logo"><img src="https://cdn.simpleicons.org/github/ffffff" alt="" /></span><div><small>Open-source work</small><h3>GitHub</h3><p>github.com/ashishkrgupta</p></div><b>↗</b></a><a href="https://stackoverflow.com/users/8527240/ashish-kumar-gupta" target="_blank" rel="noreferrer" className="profile-card profile-card--stack"><span className="profile-logo"><img src="https://cdn.simpleicons.org/stackoverflow/F58025" alt="" /></span><div><small>Engineering knowledge</small><h3>Stack Overflow</h3><p>Ashish Kumar Gupta</p></div><b>↗</b></a></div></section>

      <section id="contact" className="contact"><div className="section"><p className="eyebrow">Start a conversation</p><h2>Have a tough systems<br/>problem to solve?</h2><a href="mailto:ashishkrgupta@hotmail.com" className="email">ashishkrgupta@hotmail.com <span>↗</span></a><div className="contact-links contact-links--large"><a href="https://www.linkedin.com/in/ashish-kumar-gupta-9a183525" target="_blank" rel="noreferrer" className="contact-action">LinkedIn <span>↗</span></a><a href="tel:+917208769992" className="contact-action contact-phone" aria-label="Call Ashish at +91 7208769992"><span className="contact-phone-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.64a2 2 0 0 1-.45 2.11L8 9.75a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.86.29 1.74.5 2.64.62A2 2 0 0 1 22 16.92z" /></svg></span>+91 7208769992</a><a href="https://wa.me/917208769992" target="_blank" rel="noreferrer" className="contact-action contact-whatsapp" aria-label="Message Ashish on WhatsApp"><img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" /> WhatsApp <span>↗</span></a></div></div></section>
    </main>
    <footer><span>© {new Date().getFullYear()} Ashish Kumar Gupta</span><span>Designed & built with intent.</span></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
