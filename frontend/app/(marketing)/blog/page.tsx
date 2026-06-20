import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tax guides, KRA updates, and practical advice for Kenya's independent workers and creatives.",
};

// Placeholder posts — replace with Sanity CMS data
const posts = [
  {
    slug: "paye-guide-2026",
    category: "PAYE",
    title: "How PAYE Actually Works in Kenya — A Plain English Guide",
    excerpt:
      "Most people know PAYE exists. Very few know how it is calculated. Here is every step explained simply.",
    readTime: "8 min read",
    date: "May 2026",
    featured: true,
  },
  {
    slug: "allowable-expenses-creatives",
    category: "Deductions",
    title: "What Kenyan Creatives Can Claim as Business Expenses",
    excerpt:
      "From Adobe subscriptions to Uber rides to shoots — a full breakdown of what you can legally deduct.",
    readTime: "6 min read",
    date: "May 2026",
    featured: false,
  },
  {
    slug: "kra-itax-guide",
    category: "KRA",
    title: "How to File Your Returns on iTax — Step by Step",
    excerpt:
      "iTax does not have to be terrifying. Here is a walkthrough of every screen from login to submission.",
    readTime: "12 min read",
    date: "April 2026",
    featured: false,
  },
  {
    slug: "vat-registration-kenya",
    category: "VAT",
    title: "When Do You Need to Register for VAT in Kenya?",
    excerpt:
      "The KES 5 million threshold, what it means for your business, and what happens if you cross it.",
    readTime: "5 min read",
    date: "April 2026",
    featured: false,
  },
  {
    slug: "freelancer-tax-pin",
    category: "Getting Started",
    title: "Getting Your KRA PIN as a Freelancer — Everything You Need",
    excerpt:
      "No PIN means no business. Here is how to register with KRA and what to do if you have never filed.",
    readTime: "4 min read",
    date: "March 2026",
    featured: false,
  },
];

const categories = [
  "All",
  "PAYE",
  "VAT",
  "KRA",
  "Deductions",
  "Getting Started",
];

export default function BlogPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="relative">
      {/* Top accent line */}
      <div className="w-full h-[3px]" style={{ backgroundColor: "#20A160" }} />

      <div className="max-container padding-x">
        {/* Page header */}
        <div className="padding-y">
          <span className="label-tag">Knowledge Base</span>
          <h1
            className="mt-3"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#003020",
              lineHeight: 1.1,
            }}
          >
            Tax made readable.
          </h1>
          <p
            className="mt-4"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "1.0625rem",
              color: "#616150",
              maxWidth: "480px",
              lineHeight: 1.7,
            }}
          >
            Plain English guides on Kenya's tax system — written for
            freelancers, creatives, and independent workers.
          </p>
        </div>

        {/* Category filter */}
        <div
          className="flex gap-2 flex-wrap pb-8 border-b"
          style={{ borderColor: "#DDDDC8" }}
        >
          {categories.map((cat, i) => (
            <button
              key={cat}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150"
              style={{
                fontFamily: "var(--font-primary)",
                backgroundColor: i === 0 ? "#003020" : "#E8E8D0",
                color: i === 0 ? "#F0F0E0" : "#616150",
                border: "none",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <div
            className="padding-y border-b"
            style={{ borderColor: "#DDDDC8" }}
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group block no-underline"
            >
              <div
                className="rounded-2xl p-8 md:p-12 transition-all duration-300 group-hover:shadow-lg"
                style={{
                  backgroundColor: "#003020",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Background decoration */}
                <div
                  className="absolute top-0 right-0 opacity-10 pointer-events-none"
                  style={{
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    backgroundColor: "#20A160",
                    transform: "translate(30%, -30%)",
                  }}
                />

                <div className="relative z-10 max-w-[600px]">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: "#E0A020",
                        color: "#003020",
                        fontFamily: "var(--font-primary)",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      Featured
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        color: "#8A8A72",
                        fontFamily: "var(--font-primary)",
                      }}
                    >
                      {featured.category}
                    </span>
                  </div>

                  <h2
                    className="mb-4 group-hover:text-[#E0A020] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      fontWeight: 700,
                      color: "#F0F0E0",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {featured.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: "#8A8A72",
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {featured.excerpt}
                  </p>

                  <div
                    className="flex items-center gap-4 mt-6"
                    style={{
                      color: "#616150",
                      fontFamily: "var(--font-primary)",
                      fontSize: "0.8125rem",
                    }}
                  >
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                    <span
                      className="ml-auto group-hover:translate-x-1 transition-transform duration-200 inline-block"
                      style={{ color: "#20A160" }}
                    >
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Post grid */}
        <div className="padding-y">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block no-underline"
              >
                <article
                  className="h-full rounded-xl p-6 transition-all duration-200 group-hover:shadow-md"
                  style={{
                    backgroundColor: "#E8E8D0",
                    border: "1px solid #DDDDC8",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: "#D4EDDF",
                        color: "#20A160",
                        fontFamily: "var(--font-primary)",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {post.category}
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        color: "#8A8A72",
                        fontFamily: "var(--font-primary)",
                      }}
                    >
                      {post.readTime}
                    </span>
                  </div>

                  <h3
                    className="mb-3 group-hover:text-[#20A160] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      color: "#003020",
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "0.875rem",
                      color: "#616150",
                      lineHeight: 1.6,
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    className="mt-5 flex items-center justify-between"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "0.8125rem",
                      color: "#8A8A72",
                    }}
                  >
                    <span>{post.date}</span>
                    <span
                      className="group-hover:translate-x-1 transition-transform duration-200 inline-block"
                      style={{ color: "#20A160" }}
                    >
                      Read →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming soon banner */}
        <div
          className="rounded-xl p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            backgroundColor: "#D4EDDF",
            border: "1px solid #20A160",
          }}
        >
          <div>
            <p
              className="font-semibold mb-1"
              style={{
                fontFamily: "var(--font-primary)",
                color: "#003020",
                fontSize: "0.9375rem",
              }}
            >
              More articles coming weekly
            </p>
            <p
              style={{
                fontFamily: "var(--font-primary)",
                color: "#616150",
                fontSize: "0.8125rem",
              }}
            >
              We are publishing guides on every aspect of Kenya's tax system for
              independent workers.
            </p>
          </div>
          <Link
            href="/waitlist"
            className="btn btn-primary btn-sm no-underline whitespace-nowrap"
          >
            Get Notified
          </Link>
        </div>
      </div>
    </div>
  );
}
