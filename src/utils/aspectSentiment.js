const SENTIMENT_LEXICON = {
  positive: [
    "great",
    "good",
    "supportive",
    "caring",
    "helpful",
    "clear",
    "friendly",
    "clean",
    "fast",
    "efficient",
    "recommend",
    "reliable",
    "flexible",
    "personalized",
    "motivating",
  ],
  negative: [
    "bad",
    "poor",
    "slow",
    "confusing",
    "crowded",
    "dirty",
    "late",
    "delayed",
    "hard",
    "expensive",
    "cold",
    "noisy",
    "waiting",
    "uncomfortable",
    "pushy",
  ],
};

export const ASPECT_CATEGORIES = [
  {
    id: "dietitian",
    label: "Dietitian Guidance",
    keywords: ["dietitian", "doctor", "nutritionist", "counsel"],
  },
  {
    id: "treatment",
    label: "Treatment Plan",
    keywords: ["plan", "treatment", "protocol", "therapy"],
  },
  {
    id: "staff",
    label: "Care Staff",
    keywords: ["staff", "team", "assistant", "reception"],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    keywords: ["clinic", "infrastructure", "facility", "room", "waiting"],
  },
  {
    id: "dietCharts",
    label: "Diet Charts",
    keywords: ["chart", "meal", "diet", "menu"],
  },
  {
    id: "recommendation",
    label: "Recommendation Model",
    keywords: ["recommend", "model", "suggestion", "ai"],
  },
];

const tokenize = (text) =>
  text
    .toLowerCase()
    .split(/[.!?]/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

const countSentiment = (sentence) => {
  let score = 0;
  SENTIMENT_LEXICON.positive.forEach((word) => {
    if (sentence.includes(word)) score += 1;
  });
  SENTIMENT_LEXICON.negative.forEach((word) => {
    if (sentence.includes(word)) score -= 1;
  });
  return score;
};

export const analyzeAspectSentiment = (text = "") => {
  const sentences = tokenize(text);

  return ASPECT_CATEGORIES.map((aspect) => {
    let score = 0;
    let mentions = 0;
    const evidence = [];

    sentences.forEach((sentence) => {
      const mentionsAspect = aspect.keywords.some((keyword) =>
        sentence.includes(keyword)
      );
      if (mentionsAspect) {
        mentions += 1;
        const delta = countSentiment(sentence);
        score += delta;
        evidence.push({
          sentence,
          score: delta,
        });
      }
    });

    const sentiment =
      mentions === 0
        ? "not-mentioned"
        : score > 0
        ? "positive"
        : score < 0
        ? "negative"
        : "neutral";

    const confidence =
      mentions === 0 ? 0 : Math.min(1, Math.abs(score) / (mentions * 2));

    return {
      id: aspect.id,
      label: aspect.label,
      sentiment,
      score,
      mentions,
      confidence,
      evidence,
    };
  });
};


