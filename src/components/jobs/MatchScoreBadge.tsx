type MatchScoreLevel = "excellent" | "strong" | "moderate" | "weak";

type MatchScoreSize = "sm" | "md";

type MatchScorePresentation = {
  level: MatchScoreLevel;
  label: string;
  className: string;
};

type MatchScoreBadgeProps = {
  score: number;
  size?: MatchScoreSize;
};

const scorePresentation: Record<
  MatchScoreLevel,
  MatchScorePresentation
> = {
  excellent: {
    level: "excellent",
    label: "Excellent match",
    className: "border-green-200 bg-green-50 text-green-700",
  },
  strong: {
    level: "strong",
    label: "Strong match",
    className: "border-brand-200 bg-brand-50 text-brand-700",
  },
  moderate: {
    level: "moderate",
    label: "Moderate match",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  weak: {
    level: "weak",
    label: "Weak match",
    className: "border-slate-200 bg-slate-100 text-slate-600",
  },
};

const sizeClasses: Record<MatchScoreSize, string> = {
  sm: "gap-1.5 px-2.5 py-1 text-xs",
  md: "gap-2 px-3 py-2 text-sm",
};

function normalizeScore(score: number) {
  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

function getMatchScorePresentation(score: number) {
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

function MatchScoreBadge({
  score,
  size = "sm",
}: MatchScoreBadgeProps) {
  const normalizedScore = normalizeScore(score);
  const presentation = getMatchScorePresentation(normalizedScore);

  return (
    <span
      aria-label={`${normalizedScore} percent. ${presentation.label}. Advisory match score.`}
      title="Match scores are advisory and do not guarantee eligibility or selection."
      className={[
        "inline-flex w-fit items-center rounded-full border font-bold",
        presentation.className,
        sizeClasses[size],
      ].join(" ")}
    >
      <span>{normalizedScore}%</span>

      <span aria-hidden="true" className="size-1 rounded-full bg-current" />

      <span>{presentation.label}</span>
    </span>
  );
}

export { MatchScoreBadge, getMatchScorePresentation };
export type {
  MatchScoreBadgeProps,
  MatchScoreLevel,
  MatchScorePresentation,
  MatchScoreSize,
};