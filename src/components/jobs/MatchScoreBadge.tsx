import {
  getMatchScorePresentation,
  normalizeScore,
} from "../../utils/matchScorePresentation";

type MatchScoreSize = "sm" | "md";

type MatchScoreBadgeProps = {
  score: number;
  size?: MatchScoreSize;
};

const sizeClasses: Record<MatchScoreSize, string> = {
  sm: "gap-1.5 px-2.5 py-1 text-xs",
  md: "gap-2 px-3 py-2 text-sm",
};

function MatchScoreBadge({
  score,
  size = "sm",
}: MatchScoreBadgeProps) {
  const normalizedScore = normalizeScore(score);

  const presentation =
    getMatchScorePresentation(normalizedScore);

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

      <span
        aria-hidden="true"
        className="size-1 rounded-full bg-current"
      />

      <span>{presentation.label}</span>
    </span>
  );
}

export { MatchScoreBadge };

export type {
  MatchScoreBadgeProps,
  MatchScoreSize,
};

export type {
  MatchScoreLevel,
  MatchScorePresentation,
} from "../../utils/matchScorePresentation";