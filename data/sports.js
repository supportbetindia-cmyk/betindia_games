export const sportsContent = {
  hero: {
    title: "BET ON YOUR",
    highlightedTitle: "FAVOURITE SPORTS",
    description:
      "Experience the excitement of real-time sports betting with live markets, competitive odds, and seamless gameplay. From cricket and football to tennis, kabaddi, and more, BetIndia gives you access to a wide range of betting opportunities backed by fast payouts and a secure platform.",
    imageUrl: "/sportsHero.jpeg",
    imageUrlMobile: "/sportsbanner.png",
    imageAlt: "Sports betting at BetIndia",
    ctaPrimary: "Start Betting",
    ctaSecondary: "View Live Matches",
  },
  
  whyBet: {
    title: "Why Bet with Us?",
    items: [
      { title: "Live Betting", description: "Access real-time odds and place bets while the action unfolds." },
      { title: "Fast Withdrawals", description: "Enjoy quick and hassle-free payouts whenever you win." },
      { title: "Secure Platform", description: "Your transactions and personal information are protected with advanced security." },
      { title: "500+ Live Markets", description: "Explore a variety of betting options across major sporting events." },
    ]
  },

  liveCricket: {
    title: "Live Cricket Betting",
    text: "Stay connected to the latest cricket action with live matches, upcoming fixtures, and in-play betting opportunities. Bet on international tournaments, T20 leagues, ODI matches, and more with competitive odds and multiple betting markets.\n\nWhether you're backing your favourite team, predicting the top batsman, or betting on match totals, you'll find exciting options for every cricket fan."
  },

  popularSports: {
    title: "Explore Popular Sports",
    subtitle: "50+ Sports Available",
    text: "Explore live odds, match predictions, and betting opportunities across all major sporting events.",
    items: [
      { title: "Cricket", description: "500+ Betting Markets" },
      { title: "Football", description: "300+ Betting Markets" },
      { title: "Tennis", description: "150+ Betting Markets" },
      { title: "Badminton", description: "80+ Betting Markets" },
      { title: "Volleyball", description: "60+ Betting Markets" },
      { title: "Kabaddi", description: "40+ Betting Markets" },
    ]
  },

  bettingMarkets: {
    title: "Popular Betting Markets",
    subtitle: "Choose from a variety of betting options designed to make every game more exciting.",
    items: [
      { title: "Match Winner", description: "Predict the team or player that will win the match outright." },
      { title: "Toss Winner", description: "Bet on which team will win the toss before the match begins." },
      { title: "Over / Under", description: "Wager on whether the total runs, goals, or points scored will finish above or below a set line." },
      { title: "Top Batsman", description: "Select the player you believe will score the highest number of runs in the match." },
      { title: "Top Bowler", description: "Choose the bowler expected to take the most wickets during the game." },
      { title: "Both Teams to Score", description: "Predict whether both teams will register a score during the match." },
    ]
  },

 
  finalCta: {
    title: "Join Thousands of Sports Fans",
    subtitle: "Ready to Start Betting?",
    description: "Join thousands of players enjoying live sports betting with competitive odds, instant withdrawals, and a secure gaming environment.",
    bullets: [
      "No Hidden Fees",
      "Instant Withdrawals",
      "Secure Platform",
      "18+ Only • Play Responsibly",
    ]
  },

  faq: {
    badge: "Got Questions?",
    heading: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about our sports betting platform.",
    items: [
      {
        question: "What is live sports betting?",
        answer: "Live sports betting allows players to place bets while a match is in progress with odds updating in real time."
      },
      {
        question: "Which sports can I bet on?",
        answer: "You can bet on cricket, football, tennis, badminton, volleyball, kabaddi, and many other sports."
      },
      {
        question: "What betting markets are available?",
        answer: "Popular markets include Match Winner, Toss Winner, Top Batsman, Top Bowler, and Over/Under betting."
      },
      {
        question: "Are withdrawals processed quickly?",
        answer: "Most withdrawals are processed quickly through supported payment methods."
      }
    ]
  }
};

const sports = {
  pageId: "sports",
  name: "Sports",
  slug: "/sports",
  sections: sportsContent,
};

export default sports;
