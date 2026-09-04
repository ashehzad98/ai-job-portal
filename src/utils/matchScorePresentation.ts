type MatchScoreLevel =
  | "excellent"
  | "strong"
  | "moderate"
  | "weak";

type MatchScorePresentation = {
  level: MatchScoreLevel;
  label: string;
  className: string;
};

const scorePresentation: Record<
  MatchScoreLevel,
  MatchScorePresentation
> = {
  excellent: {
    level: "excellent",
    label: "Excellent match",
    className:
      "border-green-200 bg-green-50 text-green-700",
  },
  strong: {
    level: "strong",
    label: "Strong match",
    className:
      "border-brand-200 bg-brand-50 text-brand-700",
  },
  moderate: {
    level: "moderate",
    label: "Moderate match",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },
  weak: {
    level: "weak",
    label: "Weak match",
    className:
      "border-slate-200 bg-slate-100 text-slate-600",
  },
};

function normalizeScore(score: number): number {
  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(0, Math.round(score)),
  );
}

function getMatchScorePresentation(
  score: number,
): MatchScorePresentation {
  const normalizedScore = normalizeScore(score);

  if (normalizedScore >= 90) {
    return scorePresentation.excellent;
  }

  if (normalizedScore >= 75) {
    return scorePresentation.strong;
  }

  if (normalizedScore >= 60) {
    return scorePresentation.moderate;
  }

  return scorePresentation.weak;
}

export {
  getMatchScorePresentation,
  normalizeScore,
};

export type {
  MatchScoreLevel,
  MatchScorePresentation,
};