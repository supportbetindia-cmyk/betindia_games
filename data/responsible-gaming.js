export const responsibleGamingContent = {
  hero: {
    title: "Responsible Gaming",
    description:
      "BetIndia promotes responsible gaming and encourages all players to enjoy betting and gaming as a form of entertainment. We provide a range of tools, resources, and support to help every player stay in control of their gaming activity at all times.",
    imageUrl: "",
    imageUrlMobile: "",
    imageAlt: "Responsible Gaming",
  },

  layout: {
    badge: "Player Safety",
    title: "Responsible",
    accentTitle: "Gaming",
    lastUpdated: "June 2026",
    preparedBy: "BetIndia Legal Team",
    intro:
      "BetIndia promotes responsible gaming and encourages all players to enjoy betting and gaming as a form of entertainment. We provide a range of tools, resources, and support to help every player stay in control of their gaming activity at all times.",
    relatedLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Contact Support", href: "/contact" },
    ],
    footerNote:
      "BetIndia reserves the right to update this Responsible Gaming Policy at any time. Continued use of the platform constitutes acceptance of any future changes.",
  },

  sections: [
    {
      id: "play-for-entertainment",
      title: "Play for Entertainment",
      intro:
        "Betting and gaming on BetIndia should always be treated as a form of entertainment—not as a source of income or a solution to financial problems. We encourage all players to approach gaming with a healthy and responsible mindset.\n\nTo help you stay in control:",
      bullets: [
        "Never gamble beyond your means. Only bet amounts you can genuinely afford to lose.",
        "Set personal spending limits before you begin and stick to your budget.",
        "Take regular breaks and avoid extended gaming sessions.",
        "Balance gaming with work, family, and other personal responsibilities.",
      ],
      closing:
        "If betting is no longer enjoyable or begins causing stress, it may be time to take a break. BetIndia provides tools that allow you to do so instantly.",
    },
    {
      id: "managing-your-activity",
      title: "Managing Your Activity",
      intro:
        "BetIndia offers several responsible gaming tools to help you maintain control over your betting activity.",
      bullets: [
        {
          heading: "Budget Control",
          text: "Set daily, weekly, or monthly deposit limits directly from your account settings. Limits can be reduced immediately, while increases are subject to a cooling-off period.",
        },
        {
          heading: "Time Management",
          text: "Set session time reminders or automatic logout periods to help manage the amount of time you spend playing.",
        },
        {
          heading: "Reality Check",
          text: "Receive regular notifications showing how long you've been playing, along with your net session result, helping you make informed decisions while gaming.",
        },
      ],
      closing:
        "All responsible gaming tools are available through your account dashboard. If you need assistance, our support team is available to help set or adjust your limits.",
    },
    {
      id: "warning-signs",
      title: "Warning Signs",
      intro:
        "Problem gambling can affect anyone. Recognising the warning signs early is important.\n\nCommon warning signs include:",
      bullets: [
        "Chasing losses in an attempt to recover previous losses.",
        "Spending more money than originally planned.",
        "Gaming that interferes with work, family, or daily life.",
        "Borrowing money or selling assets to continue gambling.",
        "Feeling anxious, restless, or irritable when not gambling.",
        "Using gambling to escape personal or financial problems.",
        "Hiding gambling activity from family or friends.",
      ],
      closing:
        "If you recognise any of these signs in yourself or someone you know, please contact our support team or seek professional assistance immediately.",
    },
    {
      id: "taking-breaks",
      title: "Taking Breaks",
      intro:
        "Taking regular breaks is one of the most effective ways to maintain a healthy relationship with gaming.\n\nBetIndia offers several self-control features, including:",
      bullets: [
        {
          heading: "Self-Exclusion",
          text: "Temporarily or permanently exclude yourself from the platform for: 24 Hours, 7 Days, 30 Days, 90 Days, or Permanently. Self-exclusion takes effect immediately.",
        },
        {
          heading: "Cool-Off Periods",
          text: "Take a short break without permanently closing your account. During this period, you will be unable to log in or access your account. Available options include: 24 Hours, 7 Days, and 30 Days.",
        },
        {
          heading: "Healthy Gaming Habits",
          text: "Treat every gaming session as a fresh start. Never attempt to recover previous losses. Stop playing once you reach your pre-set limits.",
        },
      ],
      closing:
        "If you choose self-exclusion, BetIndia will take all reasonable steps to prevent re-registration during the exclusion period.",
    },
    {
      id: "seeking-support",
      title: "Seeking Support",
      intro:
        "If you feel your gambling is becoming difficult to control, professional support is available.",
      bullets: [
        {
          heading: "Professional Assistance",
          text: "You may contact organisations such as BeGambleAware.org, the National Problem Gambling Helpline, or other responsible gaming organisations available in your region. These services provide free and confidential support from trained professionals.",
        },
        {
          heading: "Responsible Gaming Resources",
          text: "Our support team can help you explain responsible gaming tools, apply account restrictions, and access responsible gaming resources.",
        },
      ],
      highlight: {
        title: "Remember",
        items: [
          "Play for entertainment—not income.",
          "Set personal limits before you begin.",
          "Take regular breaks.",
          "Never chase losses.",
          "Seek help whenever you need it.",
        ],
        accent: "#138808",
      },
      closing:
        "Seeking help is a positive step, and every enquiry is treated with complete confidentiality and respect.",
    },
    {
      id: "underage-gaming",
      title: "Underage Gaming",
      intro:
        "BetIndia operates a strict zero-tolerance policy regarding underage gaming.\n\nThe minimum age required to register and use the platform is 18 years.",
      bullets: [
        {
          heading: "Age Verification",
          text: "By registering an account, you confirm that you are at least 18 years old. We reserve the right to request age verification documentation at any time.",
        },
        {
          heading: "If a player is found to be underage",
          text: "The account will be closed immediately. Funds will be returned where applicable, excluding bonus amounts. Additional action may be taken where required.",
        },
      ],
      closing:
        "If you believe a minor has accessed BetIndia, please contact our support team immediately at support@betindia.com.",
    },
    {
      id: "contact",
      title: "Contact & Support",
      intro:
        "For responsible gaming assistance, self-exclusion requests, account restrictions, or general enquiries, please contact our team.",
      highlight: {
        items: [
          "Email: support@betindia.com",
          "Live Chat: Available 24/7 through the BetIndia platform.",
          "All responsible gaming requests are handled with strict confidentiality.",
        ],
        accent: "#138808",
      },
    },
  ],
};

const ResponsibleGaming = {
  pageId: "responsible-gaming",
  name: "Responsible Gaming",
  slug: "/responsible-gaming",
  sections: responsibleGamingContent,
};

export default ResponsibleGaming;
