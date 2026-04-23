import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeUp, Stagger, StaggerItem, Tag } from '@ug-gov/frontend-components';
import { PageHero } from '@/components/PageHero';
import { listNews, resolveRef } from '@/lib/content';
import { formatLongDate } from '@/lib/format';
import type { Organisation } from '@ug-gov/content-schemas';

export const metadata: Metadata = {
  title: 'News & communications',
  description:
    'News, press releases, speeches and statements from across the Government of Uganda.',
};

const CATEGORY_LABEL: Record<string, string> = {
  news_story: 'News',
  press_release: 'Press release',
  speech: 'Speech',
  statement: 'Statement',
};

export default function NewsPage() {
  const items = listNews();
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
        eyebrow="News and communications"
        title="Fresh from across the Government of Uganda"
        lede="News stories, press releases, speeches and statements from every ministry, agency and public body."
      />
      <div className="uggov-section uggov-section--compact">
        <div className="uggov-section__inner">
          <Stagger>
            <ul className="uggov-article-list">
              {items.map((n) => {
                const org = resolveRef<Organisation>(n.organisation._ref);
                return (
                  <StaggerItem key={n._id}>
                    <li>
                      <article>
                        <div className="uggov-meta">
                          <Tag variant="grey">{CATEGORY_LABEL[n.category] ?? n.category}</Tag>
                          <span>{formatLongDate(n.publishedAt)}</span>
                          {org && (
                            <Link href={`/organisations/${org.slug.current}`} className="uggov-link">
                              {org.shortName ?? org.title}
                            </Link>
                          )}
                        </div>
                        <h2 className="uggov-article-list__title">
                          <Link href={`/news/${n.slug.current}`}>{n.title}</Link>
                        </h2>
                        <p className="uggov-article-list__summary">{n.summary}</p>
                      </article>
                    </li>
                  </StaggerItem>
                );
              })}
            </ul>
          </Stagger>
        </div>
      </div>
    </>
  );
}
