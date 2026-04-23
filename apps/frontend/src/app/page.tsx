import Link from 'next/link';
import {
  Card,
  FadeUp,
  SearchBox,
  Stagger,
  StaggerItem,
} from '@ug-gov/frontend-components';
import {
  listOrganisations,
  listProgrammes,
  listNews,
  listServices,
} from '@/lib/content';
import { formatLongDate } from '@/lib/format';

const QUICK_LINKS = [
  { label: 'Apply for a National ID', href: '/guidance/register-for-a-national-identification-number' },
  { label: 'Register a business', href: '/services/register-a-business' },
  { label: 'Join the Parish Development Model', href: '/programmes/parish-development-model' },
  { label: 'Get a TIN', href: '/services/register-for-a-tin' },
];

export default function Home() {
  const ministries = listOrganisations({ kind: 'ministry', featured: true });
  const featuredProgrammes = listProgrammes({ featured: true });
  const latestNews = listNews({ limit: 4 });
  const services = listServices().slice(0, 6);

  return (
    <>
      <section className="uggov-hero">
        <div className="uggov-hero__inner">
          <FadeUp>
            <div className="uggov-hero__eyebrow">
              <span className="uggov-hero__eyebrow-dot" />
              Official · Government of Uganda
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="uggov-hero__title">
              Everything government, <span className="uggov-hero__title-accent">in one place.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="uggov-hero__lede">
              Services, news and guidance from every ministry, agency and public body — designed to be
              fast, accessible and easy to find, on any device.
            </p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <div className="uggov-hero__search">
              <SearchBox size="lg" placeholder="Search services, guidance, news…" />
            </div>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="uggov-hero__quick">
              <span className="uggov-hero__quick-label">Popular</span>
              {QUICK_LINKS.map((q) => (
                <Link
                  key={q.href}
                  href={q.href}
                  className="uggov-button uggov-button--secondary uggov-button--sm"
                >
                  {q.label}
                </Link>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="uggov-section" aria-labelledby="services-heading">
        <div className="uggov-section__inner">
          <div className="uggov-section__header">
            <div>
              <div className="uggov-section__eyebrow">Services</div>
              <h2 id="services-heading" className="uggov-section__title">
                Do something today.
              </h2>
              <p className="uggov-section__subtitle">
                The fastest route from a question to a done-thing.
              </p>
            </div>
            <Link
              href="/services"
              className="uggov-button uggov-button--secondary uggov-button--sm"
            >
              All services
              <span className="uggov-button__icon" aria-hidden="true">→</span>
            </Link>
          </div>
          <Stagger className="uggov-grid uggov-grid--3">
            {services.map((svc) => (
              <StaggerItem key={svc._id}>
                <Card
                  href={`/services/${svc.slug.current}`}
                  heading={svc.title}
                  description={svc.summary}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section
        className="uggov-section uggov-section--muted"
        aria-labelledby="programmes-heading"
      >
        <div className="uggov-section__inner">
          <div className="uggov-section__header">
            <div>
              <div className="uggov-section__eyebrow">Programmes</div>
              <h2 id="programmes-heading" className="uggov-section__title">
                The programmes changing Uganda.
              </h2>
              <p className="uggov-section__subtitle">
                Flagship initiatives delivering the National Development Plan — with clear answers on
                who can benefit, and how.
              </p>
            </div>
            <Link
              href="/programmes"
              className="uggov-button uggov-button--secondary uggov-button--sm"
            >
              All programmes
              <span className="uggov-button__icon" aria-hidden="true">→</span>
            </Link>
          </div>
          <Stagger className="uggov-rail">
            {featuredProgrammes.map((p) => (
              <StaggerItem key={p._id}>
                <Card
                  href={`/programmes/${p.slug.current}`}
                  variant="feature"
                  meta={p.shortName ?? 'Programme'}
                  heading={p.title}
                  description={p.summary}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="uggov-section" aria-labelledby="ministries-heading">
        <div className="uggov-section__inner">
          <div className="uggov-section__header">
            <div>
              <div className="uggov-section__eyebrow">Directory</div>
              <h2 id="ministries-heading" className="uggov-section__title">
                Every ministry, one door.
              </h2>
              <p className="uggov-section__subtitle">
                Find the Ugandan body you need — 25 ministries, 50+ agencies, 146 districts.
              </p>
            </div>
            <Link
              href="/organisations"
              className="uggov-button uggov-button--secondary uggov-button--sm"
            >
              Full directory
              <span className="uggov-button__icon" aria-hidden="true">→</span>
            </Link>
          </div>
          <Stagger className="uggov-grid uggov-grid--2">
            {ministries.map((m) => (
              <StaggerItem key={m._id}>
                <Card
                  href={`/organisations/${m.slug.current}`}
                  meta={m.shortName}
                  heading={m.title}
                  description={m.mandate}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="uggov-section uggov-section--muted" aria-labelledby="news-heading">
        <div className="uggov-section__inner">
          <div className="uggov-section__header">
            <div>
              <div className="uggov-section__eyebrow">News &amp; comms</div>
              <h2 id="news-heading" className="uggov-section__title">
                Fresh from Government.
              </h2>
            </div>
            <Link
              href="/news"
              className="uggov-button uggov-button--secondary uggov-button--sm"
            >
              All news
              <span className="uggov-button__icon" aria-hidden="true">→</span>
            </Link>
          </div>
          <Stagger className="uggov-grid uggov-grid--2">
            {latestNews.map((n) => (
              <StaggerItem key={n._id}>
                <Card
                  href={`/news/${n.slug.current}`}
                  meta={formatLongDate(n.publishedAt)}
                  heading={n.title}
                  description={n.summary}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="uggov-section__inner">
        <FadeUp>
          <div className="uggov-cta">
            <h2 className="uggov-cta__title">One government. One voice. One web.</h2>
            <p className="uggov-cta__lede">
              GOV.UG brings every public body under one unified, accessible, trusted online home — so
              every Ugandan can find what Government offers in under a minute.
            </p>
            <div className="uggov-flex-row">
              <Link
                href="/about"
                className="uggov-button uggov-button--inverse uggov-button--lg"
              >
                Learn more
              </Link>
              <Link
                href="/organisations"
                className="uggov-button uggov-button--ghost uggov-button--lg"
              >
                Browse directory →
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
