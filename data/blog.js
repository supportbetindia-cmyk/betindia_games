// Default CMS content for the Blog page.
//
// Field shapes match exactly what the existing blog section components consume,
// and the default values equal the text the components currently render — so the
// public page looks identical whether or not Firestore has been seeded. Editing
// any field in the admin panel simply swaps the data source; the markup,
// styling, animations and layout are untouched.
//
// Headings that use a partial-word gradient are split into `titleLead`
// (plain) + `titleAccent` (gradient span) so the exact gradient styling is
// preserved while keeping both parts editable.

export const blogContent = {
  hero: {
    title: "Betting Guides, Casino Tips",
    highlightedTitle: "& Winning Strategies",
    description:
      "Stay informed with expert insights, sports betting guides, casino strategies, Aviator tips, and the latest gaming trends from the BetIndia team.",
    imageUrl: "",
    imageUrlMobile: "",
    imageAlt: "BetIndia blog",
  },

  featuredPosts: {
    titleLead: "Latest",
    titleAccent: "Articles",
    description: "Discover our newest guides and insights.",
  },

  categories: {
    titleLead: "Explore",
    titleAccent: "Articles",
    description: "Filter by category or search by keyword.",
  },

  newsletter: {
    titleLead: "Never Miss",
    titleAccent: "An Update",
    description:
      "Get the latest betting guides, casino tips, promotions, and platform updates delivered directly to your inbox.",
    buttonText: "Subscribe",
  },

  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  },
};

const blog = {
  pageId: "blog",
  name: "Blog",
  slug: "/blog",
  sections: blogContent,
};

export default blog;
