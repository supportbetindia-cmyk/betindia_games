const HERO_BASIC = [
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "imageUrl", label: "Hero Image URL", type: "text" },
  { name: "imageAlt", label: "Image Alt Text", type: "text" },
];

const HERO_WITH_HIGHLIGHT = [
  { name: "title", label: "Title", type: "text" },
  { name: "highlightedTitle", label: "Highlighted Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "imageUrl", label: "Hero Image URL", type: "text" },
  { name: "imageAlt", label: "Image Alt Text", type: "text" },
];

const HERO_COMMON = [
  { name: "eyebrow", label: "Eyebrow", type: "text" },
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "primaryCta", label: "Primary CTA Text", type: "text" },
  { name: "secondaryCta", label: "Secondary CTA Text", type: "text" },
  { name: "imageUrl", label: "Hero Image URL", type: "text" },
  { name: "imageAlt", label: "Image Alt Text", type: "text" },
];

const HERO_VIP = [
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "imageUrl", label: "Hero Image URL", type: "text" },
  { name: "imageAlt", label: "Image Alt Text", type: "text" },
  { name: "primaryCta", label: "Primary CTA Text", type: "text" },
  { name: "secondaryCta", label: "Secondary CTA Text", type: "text" },
  { name: "highlights", label: "Highlights", type: "list" },
];

const HERO_ANDAR = [
  { name: "eyebrow", label: "Eyebrow", type: "text" },
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "paragraphs", label: "Paragraphs", type: "list" },
  { name: "imageUrl", label: "Hero Image URL", type: "text" },
  { name: "imageAlt", label: "Image Alt Text", type: "text" },
  { name: "primaryCta", label: "Primary CTA Text", type: "text" },
  { name: "secondaryCta", label: "Secondary CTA Text", type: "text" },
];

const HERO_VOLLEYBALL = [
  { name: "title", label: "Title", type: "text" },
  { name: "titleAccent", label: "Title Accent", type: "text" },
  { name: "tagline", label: "Tagline", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "imageUrl", label: "Hero Image URL", type: "text" },
  { name: "imageAlt", label: "Image Alt Text", type: "text" },
  { name: "primaryCta", label: "Primary CTA Text", type: "text" },
  { name: "secondaryCta", label: "Secondary CTA Text", type: "text" },
];

const FAQ_FIELDS = [
  { name: "badge", label: "Badge", type: "text" },
  { name: "heading", label: "Heading", type: "text" },
  { name: "subtitle", label: "Subtitle", type: "textarea" },
  {
    name: "items",
    label: "FAQ Items",
    type: "repeater",
    fields: [
      { name: "question", label: "Question", type: "text" },
      { name: "answer", label: "Answer", type: "textarea" },
    ],
  },
];

const CTA_FIELDS = [
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "primaryCta", label: "Primary Button Text", type: "text" },
  { name: "secondaryCta", label: "Secondary Button Text", type: "text" },
  { name: "trust", label: "Trust Badges", type: "list" },
  { name: "disclaimer", label: "Disclaimer Note", type: "text" },
];

export const cmsConfig = {
  home: {
    hero: [
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "ctaPrimary", label: "Primary Button Text", type: "text" },
      { name: "ctaSecondary", label: "Secondary Button Text", type: "text" },
      { name: "imageUrl", label: "Hero Image URL", type: "text" },
      { name: "bgImageUrl", label: "Background Image URL", type: "text" },
      { name: "imageAlt", label: "Image Alt Text", type: "text" },
    ],

    trustBar: [
      {
        name: "items",
        label: "Trust Items",
        type: "repeater",
        fields: [
          { name: "icon", label: "Icon name (Users, Zap, ShieldCheck, Headphones, Lock)", type: "text" },
          { name: "label", label: "Label", type: "text" },
          { name: "sub", label: "Sub", type: "text" },
          { name: "accent", label: "Accent color (#FF6B00 or #138808)", type: "text" },
          { name: "highlight", label: "Highlight", type: "checkbox" },
        ],
      },
    ],

    about: [
      { name: "aboutTitle", label: "About Title", type: "text" },
      { name: "aboutText", label: "About Text", type: "textarea" },
    ],

    whyChoose: [
      { name: "whyChooseTitle", label: "Title", type: "text" },
      { name: "whyChooseSubtitle", label: "Subtitle", type: "text" },
      {
        name: "whyChooseItems",
        label: "Why Choose Items",
        type: "repeater",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
    ],

    promotions: [
      { name: "promotionsTitle", label: "Title", type: "text" },
      { name: "promotionsSubtitle", label: "Subtitle", type: "text" },
      {
        name: "promotionsItems",
        label: "Promotion Items",
        type: "repeater",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
    ],

    howItWorks: [
      { name: "howItWorksTitle", label: "Title", type: "text" },
      { name: "howItWorksSubtitle", label: "Subtitle", type: "text" },
      {
        name: "howItWorksItems",
        label: "How It Works Items",
        type: "repeater",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
    ],

    liveCasino: [
      { name: "liveCasinoTitle", label: "Title", type: "text" },
      { name: "liveCasinoSubtitle", label: "Subtitle", type: "text" },
      {
        name: "liveCasinoItems",
        label: "Live Casino Items",
        type: "repeater",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image URL", type: "text" },
        ],
      },
    ],

    poupar: [
      { name: "popularCasinoTitle", label: "Title", type: "text" },
      { name: "popularCasinoSubtitle", label: "Subtitle", type: "text" },
      {
        name: "popularCasinoItems",
        label: "Popular Casino Items",
        type: "repeater",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image URL", type: "text" },
        ],
      },
    ],

    cricket: [
      { name: "cricketIdTitle", label: "Cricket ID Title", type: "text" },
      { name: "cricketIdText", label: "Cricket ID Text", type: "textarea" },
      { name: "trustedProviderTitle", label: "Trusted Provider Title", type: "text" },
      { name: "trustedProviderText", label: "Trusted Provider Text", type: "textarea" },
      { name: "sportsbookPlatformTitle", label: "Sportsbook Platform Title", type: "text" },
      { name: "sportsbookPlatformText", label: "Sportsbook Platform Text", type: "textarea" },
      { name: "playSmartTitle", label: "Play Smart Title", type: "text" },
      { name: "playSmartText", label: "Play Smart Text", type: "textarea" },
    ],

    faq: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "heading", label: "Heading", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      {
        name: "items",
        label: "FAQ Items",
        type: "repeater",
        fields: [
          { name: "question", label: "Question", type: "text" },
          { name: "answer", label: "Answer", type: "textarea" },
        ],
      },
    ],
  },

  casino: {
    hero: HERO_WITH_HIGHLIGHT,
    about: [
      { name: "aboutTitle", label: "About Title", type: "text" },
      { name: "aboutText", label: "About Text", type: "textarea" },
    ],
    featured: [
      { name: "featuredTitle", label: "Featured Title", type: "text" },
      { name: "featuredText", label: "Featured Text", type: "textarea" },
    ],
    liveCasino: [
      { name: "liveCasinoTitle", label: "Live Casino Title", type: "text" },
      { name: "liveCasinoText", label: "Live Casino Text", type: "textarea" },
      { name: "liveBlackjackTitle", label: "Live Blackjack Title", type: "text" },
      { name: "liveBlackjackText", label: "Live Blackjack Text", type: "textarea" },
      { name: "liveRouletteTitle", label: "Live Roulette Title", type: "text" },
      { name: "liveRouletteText", label: "Live Roulette Text", type: "textarea" },
      { name: "liveBaccaratTitle", label: "Live Baccarat Title", type: "text" },
      { name: "liveBaccaratText", label: "Live Baccarat Text", type: "textarea" },
    ],
    popularSlots: [
      { name: "popularSlotsTitle", label: "Popular Slots Title", type: "text" },
      { name: "popularSlotsText", label: "Popular Slots Text", type: "textarea" },
    ],
    teenPatti: [
      { name: "teenPattiTitle", label: "Teen Patti Title", type: "text" },
      { name: "teenPattiText", label: "Teen Patti Text", type: "textarea" },
    ],
    aviator: [
      { name: "aviatorTitle", label: "Aviator Title", type: "text" },
      { name: "aviatorText", label: "Aviator Text", type: "textarea" },
    ],
    whyChoose: [
      { name: "whyChooseTitle", label: "Why Choose Title", type: "text" },
      { name: "whyChooseText", label: "Why Choose Text", type: "textarea" },
    ],
    cricketId: [
      { name: "cricketIdTitle", label: "Cricket ID Title", type: "text" },
      { name: "cricketIdText", label: "Cricket ID Text", type: "textarea" },
    ],
    platform: [
      { name: "platformTitle", label: "Platform Title", type: "text" },
      { name: "platformText", label: "Platform Text", type: "textarea" },
    ],
    bestCasino: [
      { name: "bestCasinoTitle", label: "Best Casino Title", type: "text" },
      { name: "bestCasinoText", label: "Best Casino Text", type: "textarea" },
    ],
    finalCta: [
      { name: "finalCtaTitle", label: "Final CTA Title", type: "text" },
      { name: "finalCtaText", label: "Final CTA Text", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
  },

  sports: {
    hero: [
      { name: "title", label: "Title", type: "text" },
      { name: "highlightedTitle", label: "Highlighted Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "imageUrl", label: "Hero Image URL", type: "text" },
      { name: "imageUrlMobile", label: "Mobile Hero Image URL", type: "text" },
      { name: "imageAlt", label: "Image Alt Text", type: "text" },
    ],
    whyBet: [
      { name: "title", label: "Title", type: "text" },
      {
        name: "items",
        label: "Features",
        type: "repeater",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    liveCricket: [
      { name: "title", label: "Title", type: "text" },
      { name: "text", label: "Text", type: "textarea" },
    ],
    popularSports: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "text", label: "Intro text", type: "textarea" },
    ],
    bettingMarkets: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
    ],
    finalCta: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
  },

  cricket: {
    hero: HERO_BASIC,
    seoBlocks: [
      { name: "cricketBettingTitle", label: "Cricket Betting Title", type: "text" },
      { name: "cricketBettingText", label: "Cricket Betting Text", type: "textarea" },
      { name: "liveCricketBettingTitle", label: "Live Cricket Betting Title", type: "text" },
      { name: "liveCricketBettingText", label: "Live Cricket Betting Text", type: "textarea" },
      { name: "whyChooseTitle", label: "Why Choose Title", type: "text" },
      { name: "whyChooseText", label: "Why Choose Text", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
  },

  "teen-patti": {
    hero: HERO_BASIC,
    seoBlocks: [
      { name: "teenPattiTitle", label: "Teen Patti Title", type: "text" },
      { name: "teenPattiText", label: "Teen Patti Text", type: "textarea" },
      { name: "liveTeenPattiTitle", label: "Live Teen Patti Title", type: "text" },
      { name: "liveTeenPattiText", label: "Live Teen Patti Text", type: "textarea" },
      { name: "whyChooseTitle", label: "Why Choose Title", type: "text" },
      { name: "whyChooseText", label: "Why Choose Text", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
  },

  aviator: {
    hero: HERO_BASIC,
    cta: [
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "primaryCta", label: "Primary Button Text", type: "text" },
      { name: "secondaryCta", label: "Secondary Button Text", type: "text" },
    ],
    faq: FAQ_FIELDS,
  },

  football: {
    hero: HERO_BASIC,
    seoBlocks: [
      { name: "footballBettingTitle", label: "Football Betting Title", type: "text" },
      { name: "footballBettingText", label: "Football Betting Text", type: "textarea" },
      { name: "liveFootballBettingTitle", label: "Live Football Betting Title", type: "text" },
      { name: "liveFootballBettingText", label: "Live Football Betting Text", type: "textarea" },
      { name: "whyChooseTitle", label: "Why Choose Title", type: "text" },
      { name: "whyChooseText", label: "Why Choose Text", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
    cta: CTA_FIELDS,
  },

  slots: {
    hero: HERO_COMMON,
    intro: [
      { name: "title", label: "Intro Title", type: "text" },
      { name: "text", label: "Intro Text", type: "textarea" },
    ],
    whyChoose: [
      { name: "title", label: "Title", type: "text" },
      { name: "text", label: "Text", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
    cta: CTA_FIELDS,
  },

  "table-games": {
    hero: HERO_COMMON,
    cta: CTA_FIELDS,
  },

  promotions: {
    hero: HERO_BASIC,
    featured: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "items",
        label: "Promotions List",
        type: "repeater",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "cta", label: "CTA Text", type: "text" },
          { name: "href", label: "CTA Href", type: "text" },
        ],
      },
    ],
    seoBlocks: [
      { name: "bonusesTitle", label: "Bonuses Block Title", type: "text" },
      { name: "bonusesText", label: "Bonuses Block Text", type: "textarea" },
      { name: "casinoPromotionsTitle", label: "Casino Promotions Title", type: "text" },
      { name: "casinoPromotionsText", label: "Casino Promotions Text", type: "textarea" },
      { name: "whyStandOutTitle", label: "Why Stand Out Title", type: "text" },
      { name: "whyStandOutText", label: "Why Stand Out Text", type: "textarea" },
    ],
    whyJoin: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      {
        name: "items",
        label: "Features List",
        type: "repeater",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    finalCta: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
  },

  blog: {
    hero: [
      { name: "title", label: "Title", type: "text" },
      { name: "highlightedTitle", label: "Highlighted Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "imageUrl", label: "Hero Image URL", type: "text" },
      { name: "imageAlt", label: "Image Alt Text", type: "text" },
    ],
    featuredPosts: [
      { name: "titleLead", label: "Heading (lead text)", type: "text" },
      { name: "titleAccent", label: "Heading (gradient text)", type: "text" },
      { name: "description", label: "Description", type: "text" },
    ],
    categories: [
      { name: "titleLead", label: "Heading (lead text)", type: "text" },
      { name: "titleAccent", label: "Heading (gradient text)", type: "text" },
      { name: "description", label: "Description", type: "text" },
    ],
    newsletter: [
      { name: "titleLead", label: "Heading (lead text)", type: "text" },
      { name: "titleAccent", label: "Heading (gradient text)", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "buttonText", label: "Button Text", type: "text" },
    ],
    seo: [
      { name: "metaTitle", label: "Meta Title", type: "text" },
      { name: "metaDescription", label: "Meta Description", type: "textarea" },
      { name: "keywords", label: "Keywords", type: "text" },
    ],
  },

  "about-us": {
    hero: HERO_COMMON,
    intro: [
      { name: "text", label: "Intro Text", type: "textarea" },
    ],
    whatWeOffer: [
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro Text", type: "textarea" },
      { name: "listLabel", label: "List Label", type: "text" },
      {
        name: "items",
        label: "Offer Items",
        type: "repeater",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Link/Href (optional)", type: "text" },
        ],
      },
    ],
    whyChoose: [
      { name: "title", label: "Title", type: "text" },
      { name: "text", label: "Text Content", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
    cta: CTA_FIELDS,
  },

  "contact-us": {
    hero: [
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "imageUrl", label: "Hero Image URL", type: "text" },
      { name: "imageAlt", label: "Image Alt Text", type: "text" },
    ],
    supportServices: [
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro Text", type: "textarea" },
      { name: "listLabel", label: "List Label", type: "text" },
      { name: "items", label: "Support Topics", type: "list" },
      { name: "outro", label: "Outro Text", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
    cta: CTA_FIELDS,
  },

  "privacy-policy": {
    hero: HERO_BASIC,
  },

  "terms-and-conditions": {
    hero: HERO_BASIC,
  },

  "vip-benefits": {
    hero: HERO_VIP,
    benefits: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      {
        name: "items",
        label: "Benefits",
        type: "repeater",
        fields: [
          { name: "title", label: "Benefit Title", type: "text" },
          { name: "description", label: "Benefit Description", type: "textarea" },
        ],
      },
    ],
    levels: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "note", label: "Note Description", type: "textarea" },
      {
        name: "items",
        label: "VIP Tiers",
        type: "repeater",
        fields: [
          { name: "name", label: "Tier Name", type: "text" },
          { name: "description", label: "Tier Description", type: "textarea" },
          { name: "benefits", label: "Tier Benefits", type: "list" },
          { name: "diamond", label: "Diamond Style Theme?", type: "checkbox" },
        ],
      },
    ],
    manager: [
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro Description", type: "textarea" },
      {
        name: "features",
        label: "Manager Features",
        type: "repeater",
        fields: [
          { name: "title", label: "Feature Title", type: "text" },
          { name: "description", label: "Feature Description", type: "textarea" },
        ],
      },
    ],
    seoBlocks: [
      { name: "whyJoinTitle", label: "Why Join Title", type: "text" },
      { name: "whyJoinText", label: "Why Join Text", type: "textarea" },
      { name: "premiumRewardsTitle", label: "Premium Rewards Title", type: "text" },
      { name: "premiumRewardsText", label: "Premium Rewards Text", type: "textarea" },
      { name: "exclusiveMembershipTitle", label: "Exclusive Membership Title", type: "text" },
      { name: "exclusiveMembershipText", label: "Exclusive Membership Text", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
    cta: CTA_FIELDS,
  },

  "responsible-gaming": {
    hero: HERO_BASIC,
    layout: [
      { name: "badge", label: "Badge Title", type: "text" },
      { name: "title", label: "Title First Word", type: "text" },
      { name: "accentTitle", label: "Title Accent Word", type: "text" },
      { name: "lastUpdated", label: "Last Updated Date", type: "text" },
      { name: "preparedBy", label: "Prepared By Info", type: "text" },
      { name: "intro", label: "Intro Paragraph", type: "textarea" },
      {
        name: "relatedLinks",
        label: "Related Policy Links",
        type: "repeater",
        fields: [
          { name: "label", label: "Link Label", type: "text" },
          { name: "href", label: "Link URL / Route", type: "text" },
        ],
      },
      { name: "footerNote", label: "Footer Disclaimer Note", type: "textarea" },
    ],
    sections: [
      {
        name: "sections",
        label: "Gaming Policy Sections",
        type: "repeater",
        fields: [
          { name: "id", label: "Section Slug ID", type: "text" },
          { name: "title", label: "Section Title", type: "text" },
          { name: "intro", label: "Section Intro Text", type: "textarea" },
          { name: "bullets", label: "Bullets", type: "list" },
          { name: "closing", label: "Section Closing Text", type: "textarea" },
        ],
      },
    ],
  },

  "andar-bahar": {
    hero: HERO_ANDAR,
    faq: FAQ_FIELDS,
    cta: [
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "primaryCta", label: "Primary Button Text", type: "text" },
      { name: "secondaryCta", label: "Secondary Button Text", type: "text" },
    ],
  },

  badminton: {
    hero: HERO_BASIC,
    faq: FAQ_FIELDS,
    cta: CTA_FIELDS,
  },

  volleyball: {
    hero: HERO_VOLLEYBALL,
    faq: FAQ_FIELDS,
    cta: CTA_FIELDS,
  },

  kabaddi: {
    hero: HERO_BASIC,
    faq: FAQ_FIELDS,
    cta: CTA_FIELDS,
  },

  esports: {
    hero: HERO_BASIC,
    faq: FAQ_FIELDS,
    cta: CTA_FIELDS,
  },

  tennis: {
    hero: [
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "imageUrl", label: "Hero Image URL", type: "text" },
      { name: "imageAlt", label: "Image Alt Text", type: "text" },
      { name: "secondaryCta", label: "Secondary CTA Text", type: "text" },
    ],
    seoBlocks: [
      { name: "whyChooseTitle", label: "Why Choose Title", type: "text" },
      { name: "whyChooseText", label: "Why Choose Text", type: "textarea" },
      { name: "oddsTitle", label: "Odds Title", type: "text" },
      { name: "oddsText", label: "Odds Text", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
    cta: CTA_FIELDS,
  },

  live: {
    hero: [
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "imageUrl", label: "Hero Image URL", type: "text" },
      { name: "primaryCta", label: "Primary CTA Text", type: "text" },
      { name: "secondaryCta", label: "Secondary CTA Text", type: "text" },
    ],
    seoBlocks: [
      { name: "whyChooseTitle", label: "Why Choose Title", type: "text" },
      { name: "whyChooseText", label: "Why Choose Text", type: "textarea" },
      { name: "experienceTitle", label: "Experience Title", type: "text" },
      { name: "experienceText", label: "Experience Text", type: "textarea" },
    ],
    faq: FAQ_FIELDS,
    cta: CTA_FIELDS,
  },

  "live-casino": {
    hero: HERO_BASIC,
    faq: FAQ_FIELDS,
  },
};
