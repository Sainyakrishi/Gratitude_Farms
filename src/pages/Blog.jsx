import { Component, Fragment } from 'react';
import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

class Blog extends Component {

  state = { all: [], filter: 'All' };

  componentDidMount() {
    import('../data/blog-data.js').then(mod => {
      const all = mod.POSTS.map(p => ({ ...p, href: `/blog/${p.slug}` }));
      this.setState({ all });
    });
    // Deep links like /blog?category=Natural%20Farming land pre-filtered.
    const cat = new URLSearchParams(window.location.search).get('category');
    if (cat) this.setState({ filter: cat });
  }

  setFilter(label) {
    this.setState({ filter: label });
    try {
      const url = new URL(window.location.href);
      if (label === 'All') url.searchParams.delete('category');
      else url.searchParams.set('category', label);
      window.history.replaceState({}, '', url);
    } catch (e) {}
  }

  renderVals() {
    const all = this.state.all;
    const filter = this.state.filter;

    // Categories come from the posts themselves, so the filter row can never
    // offer a topic with nothing behind it.
    const counts = new Map();
    all.forEach(p => counts.set(p.category, (counts.get(p.category) || 0) + 1));

    const categories = [{ label: 'All', count: all.length }]
      .concat([...counts.entries()].map(([label, count]) => ({ label, count })))
      .map(c => ({
        label: c.label,
        count: c.count ? String(c.count) : '',
        pressed: String(filter === c.label),
        onClick: () => this.setFilter(c.label)
      }));

    const matching = filter === 'All' ? all : all.filter(p => p.category === filter);
    // The featured slot only makes sense on the unfiltered view.
    const featured = filter === 'All' ? (matching.find(p => p.featured) || matching[0] || null) : null;
    const posts = matching
      .filter(p => p !== featured)
      .map((p, i) => ({ ...p, delay: `${i * 70}ms` }));

    return {
      categories,
      featured,
      posts,
      hasPosts: posts.length > 0 || !!featured,
      resultLabel: filter === 'All'
        ? ''
        : `${matching.length} article${matching.length === 1 ? '' : 's'} in ${filter}`
    };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
      <Seo title={"The Gratitude Farms Journal — Natural Farming Insights"} description={"Gratitude Farms Blog — field-tested insights on natural farming, soil regeneration, biochar, carbon farming, food forests and rural entrepreneurship."} />
        <SiteNav active="blog" />
        <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px) 20px;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
              {"Insights & Field Notes"}
            </span>
            <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,50px);color:#1A3C34;margin:18px 0 16px;")}>
              {"The Gratitude Farms Journal"}
            </h1>
            <p style={css("color:#414846;font-size:16.5px;line-height:1.7;max-width:640px;margin:0 0 22px;")}>
              {"Field-tested writing on natural farming, soil regeneration, biochar and the circular bio-economy, food forests, and building rural livelihoods with ex-servicemen."}
            </p>
            <div role="group" aria-label="Filter articles by topic" style={css("display:flex;gap:10px;flex-wrap:wrap;margin-top:8px;")}>
              {($v.categories || []).map((cat, catIndex) => (
                <Fragment key={catIndex}>
                  <button className="gf-chip" aria-pressed={cat.pressed} onClick={cat.onClick}>
                    {cat.label}
                    {(cat.count) ? (
                      <>
                      <span style={css("opacity:0.6;margin-left:6px;font-weight:500;")}>
                        {cat.count}
                      </span>
                      </>
                    ) : null}
                  </button>
                </Fragment>
              ))}
            </div>
          </section>
          {($v.featured) ? (
            <>
            <section style={css("max-width:1440px;margin:0 auto;padding:48px clamp(20px,5.5vw,80px) 40px;")}>
              <A href={$v.featured.href} className="gf-2col" style={css("text-decoration:none;display:grid;grid-template-columns:1.1fr 1fr;gap:0;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:24px;overflow:hidden;align-items:stretch;transition:transform 0.25s ease, box-shadow 0.25s ease;")} hoverStyle={css("transform:translateY(-5px);box-shadow:0 24px 56px rgba(26,60,52,0.14);")}>
                <div role="img" aria-label={$v.featured.title} style={css(`min-height:340px;background-image:url('${$v.featured.hero}');background-size:cover;background-position:center;`)} />
                <div style={css("padding:48px;display:flex;flex-direction:column;justify-content:center;")}>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;margin-bottom:14px;")}>
                    {"Featured · "}{$v.featured.category}
                  </span>
                  <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,2.4vw,32px);color:#1A3C34;margin:0 0 14px;line-height:1.2;")}>
                    {$v.featured.title}
                  </h2>
                  <p style={css("color:#414846;font-size:15.5px;line-height:1.7;margin:0 0 20px;")}>
                    {$v.featured.subtitle}
                  </p>
                  <span style={css("color:#717976;font-size:12.5px;")}>
                    {$v.featured.author}{" · "}{$v.featured.dateDisplay}{" · "}{$v.featured.readTime}
                  </span>
                </div>
              </A>
            </section>
            </>
          ) : null}
          <section style={css("max-width:1440px;margin:0 auto;padding:20px clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
            {($v.resultLabel) ? (
              <>
              <p role="status" style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.06em;color:#717976;text-transform:uppercase;margin:0 0 24px;")}>
                {$v.resultLabel}
              </p>
              </>
            ) : null}
            {(!$v.hasPosts) ? (
              <>
              <div style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:18px;padding:48px 32px;text-align:center;")}>
                <p style={css("color:#414846;font-size:16px;line-height:1.7;margin:0;")}>
                  {"No articles in this topic yet — more field notes are on the way."}
                </p>
              </div>
              </>
            ) : null}
            <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:24px;")}>
              {($v.posts || []).map((post, postIndex) => (
                <Fragment key={postIndex}>
                  <A href={post.href} style={css(`text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:18px;overflow:hidden;display:flex;flex-direction:column;animation:fadeUpSm 0.5s ease both;animation-delay:${post.delay};transition:transform 0.25s ease, box-shadow 0.25s ease;`)} hoverStyle={css("transform:translateY(-6px);box-shadow:0 20px 44px rgba(26,60,52,0.12);")}>
                    <div role="img" aria-label={post.title} style={css(`aspect-ratio:16/10;overflow:hidden;background-image:url('${post.hero}');background-size:cover;background-position:center;`)} />
                    <div style={css("padding:26px;display:flex;flex-direction:column;gap:10px;flex:1;")}>
                      <span style={css("font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.1em;color:#2D5A27;text-transform:uppercase;")}>
                        {post.category}
                      </span>
                      <h3 style={css("font-family:'Source Serif 4',serif;font-size:20px;color:#1A3C34;margin:0;line-height:1.25;")}>
                        {post.title}
                      </h3>
                      <p style={css("color:#414846;font-size:13.5px;line-height:1.6;margin:0;")}>
                        {post.subtitle}
                      </p>
                      <span style={css("color:#717976;font-size:12px;margin-top:auto;padding-top:8px;")}>
                        {post.dateDisplay}{" · "}{post.readTime}
                      </span>
                    </div>
                  </A>
                </Fragment>
              ))}
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }
}

export default Blog;
