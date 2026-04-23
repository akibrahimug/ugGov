import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Tag } from '@ug-gov/frontend-components';
import { PageHeader } from '@/components/PageHeader';
import { getNewsBySlug, listNews, resolveRef } from '@/lib/content';
import { PortableText } from '@/lib/portableText';
import { formatLongDate } from '@/lib/format';
import type { Organisation } from '@ug-gov/content-schemas';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listNews().map((n) => ({ slug: n.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = getNewsBySlug(slug);
  if (!n) return { title: 'Not found' };
  return { title: n.title, description: n.summary };
}

const CATEGORY_LABEL: Record<string, string> = {
  news_story: 'News',
  press_release: 'Press release',
  speech: 'Speech',
  statement: 'Statement',
};

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();
  const org = resolveRef<Organisation>(article.organisation._ref);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/news' },
          { label: article.title },
        ]}
        eyebrow={CATEGORY_LABEL[article.category] ?? article.category}
        title={article.title}
        lede={article.summary}
      />
      <div className="uggov-content-layout">
        <article>
          <div className="uggov-meta uggov-mb-6">
            <Tag variant="grey">{CATEGORY_LABEL[article.category]}</Tag>
            <span>
              Published <time dateTime={article.publishedAt}>{formatLongDate(article.publishedAt)}</time>
            </span>
            {org && (
              <>
                <span>From</span>
                <Link href={`/organisations/${org.slug.current}`} className="uggov-link">
                  {org.title}
                </Link>
              </>
            )}
          </div>
          <PortableText blocks={article.body} />
        </article>
        {org && (
          <aside className="uggov-content-layout__aside">
            <h2>About this release</h2>
            <p style={{ marginBottom: '0.5rem' }}>Published by:</p>
            <p>
              <Link href={`/organisations/${org.slug.current}`} className="uggov-link">
                {org.title}
              </Link>
            </p>
            <p style={{ marginTop: '1rem' }}>
              <Link href="/news" className="uggov-link">
                More news
              </Link>
            </p>
          </aside>
        )}
      </div>
    </>
  );
}
