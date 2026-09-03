import {
    Award,
    BookOpen,
    BriefcaseBusiness,
    ExternalLink,
    GraduationCap,
    Link as LinkIcon,
    MapPin,
    UserRound,
    Wrench,
    type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { ButtonLink } from "../../components/ui/Button";
import { useProfile } from "../../hooks/useProfile";
import type { EducationStatus } from "../../types/profile";
import { calculateProfileCompleteness } from "../../utils/profileCompleteness";

function formatMonthYear(dateValue: string | null) {
    if (!dateValue) {
        return "Date not provided";
    }

    return new Intl.DateTimeFormat("en-PK", {
        month: "short",
        year: "numeric",
    }).format(new Date(`${dateValue}T00:00:00Z`));
}

const educationStatusLabels: Record<EducationStatus, string> = {
    in_progress: "In progress",
    completed: "Completed",
    incomplete: "Incomplete",
    other: "Other",
};

function ProfilePage() {
    const { profile } = useProfile();
    const completeness = calculateProfileCompleteness(profile);

    const initials = profile.fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((name) => name[0])
        .join("")
        .toUpperCase();

    return (
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <section className="rounded-xl border border-border bg-white p-5 shadow-card sm:p-6">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                    <div className="flex items-start gap-4">
                        <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-xl font-bold text-brand-700">
                            {initials}
                        </span>

                        <div>
                            <p className="text-sm font-semibold text-brand-600">
                                Professional profile
                            </p>

                            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                {profile.fullName}
                            </h1>

                            <p className="mt-2 text-base text-slate-700">
                                {profile.professionalHeadline ??
                                    "Professional headline not added"}
                            </p>

                            {profile.currentLocation && (
                                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-500">
                                    <MapPin
                                        aria-hidden="true"
                                        className="size-4"
                                    />
                                    {profile.currentLocation}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <ButtonLink to="/profile/edit">
                            Edit profile
                        </ButtonLink>

                        <ButtonLink to="/preferences" variant="secondary">
                            Job preferences
                        </ButtonLink>
                    </div>
                </div>
            </section>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-6">
                    <SectionCard
                        title="About"
                        icon={UserRound}
                    >
                        {profile.about ? (
                            <p className="leading-7 text-slate-600">
                                {profile.about}
                            </p>
                        ) : (
                            <EmptySection message="No professional summary added." />
                        )}
                    </SectionCard>

                    <SectionCard
                        title="Experience"
                        icon={BriefcaseBusiness}
                        action={
                            <ButtonLink
                                to="/profile/experience"
                                size="sm"
                                variant="secondary"
                            >
                                Manage
                            </ButtonLink>
                        }
                    >
                        {profile.experience.length > 0 ? (
                            <div className="divide-y divide-border">
                                {profile.experience.map((experience) => (
                                    <article
                                        key={experience.id}
                                        className="py-5 first:pt-0 last:pb-0"
                                    >
                                        <h3 className="font-bold text-slate-950">
                                            {experience.jobTitle}
                                        </h3>

                                        <p className="mt-1 text-sm font-semibold text-slate-700">
                                            {experience.companyName}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {formatMonthYear(experience.startDate)}
                                            {" – "}
                                            {experience.isCurrent
                                                ? "Present"
                                                : formatMonthYear(experience.endDate)}
                                            {experience.employmentType
                                                ? ` · ${experience.employmentType}`
                                                : ""}
                                        </p>

                                        {experience.location && (
                                            <p className="mt-1 text-sm text-slate-500">
                                                {experience.location}
                                            </p>
                                        )}

                                        {experience.description && (
                                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                                {experience.description}
                                            </p>
                                        )}

                                        {experience.skillsUsed.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {experience.skillsUsed.map((skill) => (
                                                    <SkillChip key={skill}>{skill}</SkillChip>
                                                ))}
                                            </div>
                                        )}
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <EmptySection message="No experience added." />
                        )}
                    </SectionCard>

                    <SectionCard
                        title="Education"
                        icon={GraduationCap}
                        action={
                            <ButtonLink
                                to="/profile/education"
                                size="sm"
                                variant="secondary"
                            >
                                Manage
                            </ButtonLink>
                        }
                    >
                        {profile.education.length > 0 ? (
                            <div className="divide-y divide-border">
                                {profile.education.map((education) => (
                                    <article
                                        key={education.id}
                                        className="py-5 first:pt-0 last:pb-0"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <h3 className="font-bold text-slate-950">
                                                    {education.degree}
                                                    {education.fieldOfStudy
                                                        ? ` in ${education.fieldOfStudy}`
                                                        : ""}
                                                </h3>

                                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                                    {education.institution}
                                                </p>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {education.startDate
                                                        ? `${formatMonthYear(education.startDate)} – `
                                                        : ""}
                                                    {formatMonthYear(
                                                        education.graduationDate,
                                                    )}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                                                {
                                                    educationStatusLabels[
                                                    education.status
                                                    ]
                                                }
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <EmptySection message="No education added." />
                        )}

                    </SectionCard>

                    <SectionCard title="Skills" icon={Wrench} action={
                        <ButtonLink
                            to="/profile/skills"
                            size="sm"
                            variant="secondary"
                        >
                            Manage
                        </ButtonLink>
                    }>
                        {profile.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map((skill) => (
                                    <span
                                        key={skill.id}
                                        className="rounded-lg border border-border bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700"
                                    >
                                        {skill.name}

                                        {skill.proficiency && (
                                            <span className="ml-2 font-normal text-slate-500">
                                                · {skill.proficiency}
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <EmptySection message="No skills added." />
                        )}
                    </SectionCard>

                    <SectionCard title="Certifications" icon={Award}>
                        {profile.certifications.length > 0 ? (
                            <div className="divide-y divide-border">
                                {profile.certifications.map((certification) => (
                                    <article
                                        key={certification.id}
                                        className="py-4 first:pt-0 last:pb-0"
                                    >
                                        <h3 className="font-bold text-slate-950">
                                            {certification.name}
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-600">
                                            {certification.issuer}
                                            {certification.issueDate
                                                ? ` · ${formatMonthYear(
                                                    certification.issueDate,
                                                )}`
                                                : ""}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <EmptySection message="No certifications added." />
                        )}
                    </SectionCard>
                </div>

                <aside className="space-y-6">
                    <section className="rounded-xl border border-border bg-white p-5 shadow-card">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-slate-950">
                                Profile completeness
                            </h2>

                            <span className="text-lg font-bold text-brand-700">
                                {completeness.percentage}%
                            </span>
                        </div>

                        <div
                            role="progressbar"
                            aria-label="Profile completeness"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={completeness.percentage}
                            className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
                        >
                            <div
                                className="h-full rounded-full bg-brand-600 transition-all"
                                style={{
                                    width: `${completeness.percentage}%`,
                                }}
                            />
                        </div>

                        <p className="mt-3 text-sm text-slate-500">
                            {completeness.completedItems} of{" "}
                            {completeness.totalItems} profile areas completed.
                        </p>

                        {completeness.missingItems.length > 0 && (
                            <div className="mt-4 border-t border-border pt-4">
                                <p className="text-sm font-semibold text-slate-700">
                                    Still to add
                                </p>

                                <ul className="mt-2 space-y-1.5 text-sm text-slate-500">
                                    {completeness.missingItems.map((item) => (
                                        <li key={item}>• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>

                    <SectionCard title="Professional links" icon={LinkIcon}>
                        <div className="space-y-3">
                            {profile.portfolioUrl && (
                                <ExternalProfileLink
                                    href={profile.portfolioUrl}
                                    label="Portfolio or GitHub"
                                />
                            )}

                            {profile.linkedinUrl && (
                                <ExternalProfileLink
                                    href={profile.linkedinUrl}
                                    label="LinkedIn"
                                />
                            )}

                            {!profile.portfolioUrl &&
                                !profile.linkedinUrl && (
                                    <EmptySection message="No professional links added." />
                                )}
                        </div>
                    </SectionCard>

                    <section className="rounded-xl border border-brand-200 bg-brand-50 p-5">
                        <BookOpen
                            aria-hidden="true"
                            className="size-5 text-brand-700"
                        />

                        <h2 className="mt-3 font-bold text-brand-950">
                            Profile affects matching
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-brand-800">
                            Accurate education, experience, and skills produce more
                            useful job-match explanations.
                        </p>
                    </section>
                </aside>
            </div>
        </main>
    );
}

type SectionCardProps = {
    title: string;
    icon: LucideIcon;
    children: ReactNode;
    action?: ReactNode;
};

function SectionCard({
    title,
    icon: Icon,
    children,
    action,
}: SectionCardProps) {
    return (
        <section className="rounded-xl border border-border bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Icon
                        aria-hidden="true"
                        className="size-5 text-brand-700"
                    />

                    <h2 className="text-lg font-bold text-slate-950">
                        {title}
                    </h2>
                </div>

                {action}
            </div>

            <div className="mt-5">{children}</div>
        </section>
    );
}

function SkillChip({ children }: { children: ReactNode }) {
    return (
        <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            {children}
        </span>
    );
}

function EmptySection({ message }: { message: string }) {
    return <p className="text-sm text-slate-500">{message}</p>;
}

type ExternalProfileLinkProps = {
    href: string;
    label: string;
};

function ExternalProfileLink({
    href,
    label,
}: ExternalProfileLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-brand-700"
        >
            {label}
            <ExternalLink aria-hidden="true" className="size-4" />
        </a>
    );
}

export default ProfilePage;