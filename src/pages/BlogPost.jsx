import { Component, Fragment } from 'react';
import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

class BlogPost extends Component {

  state = { post: null, blocks: [], keywords: [], related: [], notFound: false };

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prev) {
    if (prev.slug !== this.props.slug) {
      this.setState({ post: null, blocks: [], keywords: [], related: [], notFound: false });
      this.load();
    }
  }

  load() {
    const slug = this.props.slug || '';
    import('../data/blog-data.js').then(mod => {
      const post = mod.findPost(slug);
      if (!post) { this.setState({ notFound: true }); return; }
      const blocks = (post.body || []).map(b => ({
        x: b.x, items: b.items, by: b.by,
        isP: b.t === 'p', isH: b.t === 'h2', isUl: b.t === 'ul',
        isQuote: b.t === 'quote', isCallout: b.t === 'callout', isRefs: b.t === 'refs'
      }));
      const related = mod.POSTS.filter(p => p.slug !== slug).slice(0, 3).map(p => ({ ...p, href: `/blog/${p.slug}` }));
      this.setState({ post, blocks, keywords: post.seo.keywords || [], related, notFound: false });
      this.applySeo(post);
    });
  }

  applySeo(post) {
    try {
      document.title = post.seo.title || post.title;
      const setMeta = (attr, key, val) => {
        let el = document.head.querySelector(`meta[${attr}="${key}"]`);
        if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
        el.setAttribute('content', val);
      };
      setMeta('name', 'description', post.seo.description || post.subtitle);
      setMeta('name', 'keywords', (post.seo.keywords || []).join(', '));
      setMeta('property', 'og:title', post.seo.title || post.title);
      setMeta('property', 'og:description', post.seo.description || post.subtitle);
      setMeta('property', 'og:type', 'article');
      setMeta('property', 'og:image', post.hero);
      setMeta('name', 'twitter:card', 'summary_large_image');
      let ld = document.getElementById('blog-ld');
      if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'blog-ld'; document.head.appendChild(ld); }
      ld.textContent = JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BlogPosting',
        headline: post.title, description: post.seo.description || post.subtitle,
        image: post.hero, datePublished: post.date, author: { '@type': 'Organization', name: 'Gratitude Farms' },
        publisher: { '@type': 'Organization', name: 'Gratitude Farms' },
        keywords: (post.seo.keywords || []).join(', ')
      });
    } catch (e) {}
  }

  renderVals() {
    return {
      post: this.state.post,
      blocks: this.state.blocks,
      keywords: this.state.keywords,
      related: this.state.related,
      hasMore: this.state.related.length > 0,
      notFound: this.state.notFound
    };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
      <Seo title={"Article — The Gratitude Farms Journal"} />
        <SiteNav active="blog" />
        <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;min-height:70vh;")}>
          {($v.post) ? (
            <>
            <article>
              <section style={css("position:relative;height:clamp(400px,58vh,560px);overflow:hidden;background:#1A3C34;")}>
                <div role="img" aria-label={$v.post.title} style={css(`position:absolute;inset:0;background-image:url('${$v.post.hero}');background-size:cover;background-position:center;animation:heroZoom 8s ease-out both;`)} />
                <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.95),rgba(26,60,52,0.35));")} />
                <div style={css("position:relative;z-index:2;max-width:900px;margin:0 auto;height:100%;padding:0 clamp(24px,5vw,40px) 56px;display:flex;flex-direction:column;justify-content:flex-end;box-sizing:border-box;")}>
                  <A href="/blog" style={css("text-decoration:none;color:#e9c176;font-size:13px;font-weight:600;margin-bottom:18px;")}>
                    {"← All Articles"}
                  </A>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.14em;color:#e9c176;text-transform:uppercase;margin-bottom:16px;")}>
                    {$v.post.category}
                  </span>
                  <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(30px,4.6vw,52px);line-height:1.08;color:#FAFAF9;margin:0;")}>
                    {$v.post.title}
                  </h1>
                  <p style={css("color:#e5e2dd;font-size:clamp(16px,1.8vw,20px);line-height:1.5;margin:18px 0 16px;max-width:680px;")}>
                    {$v.post.subtitle}
                  </p>
                  <span style={css("color:#c5eadf;font-size:13.5px;")}>
                    {$v.post.author}{" · "}{$v.post.dateDisplay}{" · "}{$v.post.readTime}
                  </span>
                </div>
              </section>
              <section style={css("max-width:820px;margin:0 auto;padding:64px clamp(24px,5vw,40px) 40px;")}>
                <div className="article-body">
                  {($v.blocks || []).map((b, bIndex) => (
                    <Fragment key={bIndex}>
                      {(b.isP) ? (
                        <>
                        <p>
                          {b.x}
                        </p>
                        </>
                      ) : null}
                      {(b.isH) ? (
                        <>
                        <h2>
                          {b.x}
                        </h2>
                        </>
                      ) : null}
                      {(b.isUl) ? (
                        <>
                        <ul>
                          {(b.items || []).map((it, itIndex) => (
                            <Fragment key={itIndex}>
                              <li>
                                {it}
                              </li>
                            </Fragment>
                          ))}
                        </ul>
                        </>
                      ) : null}
                      {(b.isQuote) ? (
                        <>
                        <blockquote style={css("margin:36px 0;padding:28px 32px;background:#F5F2ED;border-left:4px solid #C5A059;border-radius:0 14px 14px 0;")}>
                          <p style={css("font-family:'Source Serif 4',serif;font-style:italic;font-size:22px;line-height:1.5;color:#1A3C34;margin:0;")}>
                            {b.x}
                          </p>
                          {(b.by) ? (
                            <>
                            <span style={css("display:block;margin-top:12px;font-size:13.5px;color:#717976;font-weight:600;")}>
                              {"— "}{b.by}
                            </span>
                            </>
                          ) : null}
                        </blockquote>
                        </>
                      ) : null}
                      {(b.isCallout) ? (
                        <>
                        <div style={css("margin:0 0 32px;padding:22px 26px;background:#e8f3ee;border-radius:14px;color:#2D5A27;font-size:15px;line-height:1.65;")}>
                          {b.x}
                        </div>
                        </>
                      ) : null}
                      {(b.isRefs) ? (
                        <>
                        <div style={css("margin:40px 0 0;padding:26px 28px;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:14px;")}>
                          <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#717976;text-transform:uppercase;margin-bottom:14px;")}>
                            {"References"}
                          </div>
                          <ul style={css("margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px;")}>
                            {(b.items || []).map((it, itIndex) => (
                              <Fragment key={itIndex}>
                                <li style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                                  {it}
                                </li>
                              </Fragment>
                            ))}
                          </ul>
                        </div>
                        </>
                      ) : null}
                    </Fragment>
                  ))}
                </div>
                <div style={css("margin:48px 0 0;padding-top:28px;border-top:1px solid #e5e2dd;")}>
                  <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#717976;text-transform:uppercase;margin-bottom:14px;")}>
                    {"Topics"}
                  </div>
                  <div style={css("display:flex;gap:10px;flex-wrap:wrap;")}>
                    {($v.keywords || []).map((kw, kwIndex) => (
                      <Fragment key={kwIndex}>
                        <span style={css("background:#F5F2ED;border:1px solid #e5e2dd;color:#3C4A3E;font-size:12.5px;font-weight:600;padding:7px 14px;border-radius:999px;")}>
                          {kw}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </section>
              <section style={css("max-width:820px;margin:0 auto;padding:20px clamp(24px,5vw,40px) 60px;")}>
                <div style={css("background:linear-gradient(120deg,#1A3C34,#2D5A27);border-radius:22px;padding:clamp(32px,5vw,52px);text-align:center;")}>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:clamp(22px,2.6vw,30px);color:#FAFAF9;margin:0 0 12px;")}>
                    {"Grow Something Lasting With Us"}
                  </h3>
                  <p style={css("color:#c5eadf;font-size:15.5px;line-height:1.6;max-width:520px;margin:0 auto 26px;")}>
                    {"From soil regeneration to fully managed natural farms — talk to our team about turning your land into a living, profitable ecosystem."}
                  </p>
                  <A href="/contact" style={css("text-decoration:none;background:#C5A059;color:#1A3C34;font-weight:700;font-size:15px;padding:16px 34px;border-radius:12px;")}>
                    {"Enquire Now"}
                  </A>
                </div>
              </section>
              {($v.hasMore) ? (
                <>
                <section style={css("max-width:1440px;margin:0 auto;padding:40px clamp(20px,5.5vw,80px) clamp(54px,10.0vw,120px);")}>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:26px;color:#1A3C34;margin:0 0 28px;")}>
                    {"Keep Reading"}
                  </h3>
                  <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;")}>
                    {($v.related || []).map((r, rIndex) => (
                      <Fragment key={rIndex}>
                        <A href={r.href} style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:transform 0.25s ease, box-shadow 0.25s ease;")} hoverStyle={css("transform:translateY(-5px);box-shadow:0 18px 40px rgba(26,60,52,0.12);")}>
                          <div role="img" aria-label={r.title} style={css(`aspect-ratio:16/10;background-image:url('${r.hero}');background-size:cover;background-position:center;`)} />
                          <div style={css("padding:22px;display:flex;flex-direction:column;gap:8px;")}>
                            <span style={css("font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;color:#2D5A27;text-transform:uppercase;")}>
                              {r.category}
                            </span>
                            <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#1A3C34;margin:0;line-height:1.3;")}>
                              {r.title}
                            </h4>
                          </div>
                        </A>
                      </Fragment>
                    ))}
                  </div>
                </section>
                </>
              ) : null}
            </article>
            </>
          ) : null}
          {($v.notFound) ? (
            <>
            <section style={css("max-width:800px;margin:0 auto;padding:140px 40px;text-align:center;")}>
              <h1 style={css("font-family:'Source Serif 4',serif;font-size:30px;color:#1A3C34;")}>
                {"Article not found"}
              </h1>
              <A href="/blog" style={css("color:#1A3C34;font-weight:700;")}>
                {"← Back to the Journal"}
              </A>
            </section>
            </>
          ) : null}
        </main>
        <SiteFooter />
      </>
    );
  }
}

export default BlogPost;
