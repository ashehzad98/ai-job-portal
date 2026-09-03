import {
    CalendarClock,
    ChevronRight,
    ClipboardList,
} from "lucide-react";
// import { useState } from "react";
import { Link } from "react-router-dom";

// import { mockApplications } from "../../data/mockApplications";
import { useApplications } from "../../hooks/useApplications";
import { mockJobs } from "../../data/mockJobs";
import {
    applicationStatusOptions,
    type ApplicationStatus,
    type JobApplication,
} from "../../types/application";

function formatApplicationDate(dateValue: string) {
    return new Intl.DateTimeFormat("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(dateValue));
}

function ApplicationTrackerPage() {
    const { applications, updateApplication } = useApplications();

    const activeCount = applications.filter((application) =>
        ["Applied", "Assessment", "Interview"].includes(
            application.status,
        ),
    ).length;

    const interviewCount = applications.filter(
        (application) => application.status === "Interview",
    ).length;

    const offerCount = applications.filter(
        (application) => application.status === "Offer",
    ).length;

    function updateApplicationStatus(
        applicationId: string,
        status: ApplicationStatus,
    ) {
        const application = applications.find(
            (item) => item.id === applicationId,
        );

        if (!application) {
            return;
        }

        updateApplication(applicationId, {
            status,
            appliedAt:
                status !== "Saved" && !application.appliedAt
                    ? new Date().toISOString()
                    : application.appliedAt,
        });
    }

    return (
        <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                    Application tracker
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Organize your applications and keep track of the next action
                    for each opportunity.
                </p>
            </div>

            <section
                aria-label="Application summary"
                className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
                <SummaryItem label="Total tracked" value={applications.length} />
                <SummaryItem label="In progress" value={activeCount} />
                <SummaryItem label="Interviews" value={interviewCount} />
                <SummaryItem label="Offers" value={offerCount} />
            </section>

            <section aria-labelledby="tracker-board-heading" className="mt-8">
                <div>
                    <h2
                        id="tracker-board-heading"
                        className="text-xl font-bold text-slate-950"
                    >
                        Application pipeline
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Change an application&apos;s status to move it through the
                        pipeline.
                    </p>
                </div>

                <div className="mt-5 overflow-x-auto pb-4">
                    <div className="grid min-w-max auto-cols-[290px] grid-flow-col gap-4">
                        {applicationStatusOptions.map((statusOption) => {
                            const statusApplications = applications.filter(
                                (application) =>
                                    application.status === statusOption.value,
                            );

                            return (
                                <section
                                    key={statusOption.value}
                                    aria-labelledby={`column-${statusOption.value}`}
                                    className="flex max-h-[680px] min-h-[340px] flex-col rounded-xl border border-border bg-slate-100/70"
                                >
                                    <header className="border-b border-border px-4 py-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <h3
                                                id={`column-${statusOption.value}`}
                                                className="font-bold text-slate-800"
                                            >
                                                {statusOption.label}
                                            </h3>

                                            <span className="flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-600">
                                                {statusApplications.length}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            {statusOption.description}
                                        </p>
                                    </header>

                                    <div className="flex-1 space-y-3 overflow-y-auto p-3">
                                        {statusApplications.length > 0 ? (
                                            statusApplications.map((application) => {
                                                const job = mockJobs.find(
                                                    (item) => item.id === application.jobId,
                                                );

                                                return (
                                                    <ApplicationCard
                                                        key={application.id}
                                                        application={application}
                                                        jobTitle={job?.title ?? "Unavailable job"}
                                                        company={job?.company ?? "Unknown company"}
                                                        onStatusChange={(status) =>
                                                            updateApplicationStatus(
                                                                application.id,
                                                                status,
                                                            )
                                                        }
                                                    />
                                                );
                                            })
                                        ) : (
                                            <div className="rounded-lg border border-dashed border-slate-300 bg-white/60 p-5 text-center">
                                                <p className="text-xs leading-5 text-slate-500">
                                                    No applications in this stage.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}

type SummaryItemProps = {
    label: string;
    value: number;
};

function SummaryItem({ label, value }: SummaryItemProps) {
    return (
        <div className="rounded-xl border border-border bg-white p-5 shadow-card">
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                {value}
            </p>
        </div>
    );
}

type ApplicationCardProps = {
    application: JobApplication;
    jobTitle: string;
    company: string;
    onStatusChange: (status: ApplicationStatus) => void;
};

function ApplicationCard({
    application,
    jobTitle,
    company,
    onStatusChange,
}: ApplicationCardProps) {
    const primaryDate = application.appliedAt ?? application.addedAt;
    const dateLabel = application.appliedAt ? "Applied" : "Added";

    return (
        <article className="rounded-xl border border-border bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <ClipboardList aria-hidden="true" className="size-4" />
                </span>

                <div className="min-w-0">
                    <h4 className="font-bold leading-5 text-slate-950">
                        {jobTitle}
                    </h4>

                    <p className="mt-1 text-sm text-slate-600">{company}</p>
                </div>
            </div>

            <div className="mt-4">
                <label
                    htmlFor={`status-${application.id}`}
                    className="block text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                    Status
                </label>

                <select
                    id={`status-${application.id}`}
                    value={application.status}
                    onChange={(event) =>
                        onStatusChange(event.target.value as ApplicationStatus)
                    }
                    className="mt-1.5 min-h-10 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-100"
                >
                    {applicationStatusOptions.map((statusOption) => (
                        <option
                            key={statusOption.value}
                            value={statusOption.value}
                        >
                            {statusOption.label}
                        </option>
                    ))}
                </select>
            </div>

            <p className="mt-4 text-xs font-medium text-slate-500">
                {dateLabel} {formatApplicationDate(primaryDate)}
            </p>

            {application.nextAction && (
                <div className="mt-3 rounded-lg bg-amber-50 p-3">
                    <div className="flex items-start gap-2">
                        <CalendarClock
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-amber-700"
                        />

                        <div>
                            <p className="text-xs font-semibold leading-5 text-amber-900">
                                {application.nextAction}
                            </p>

                            {application.nextActionAt && (
                                <time
                                    dateTime={application.nextActionAt}
                                    className="mt-1 block text-xs text-amber-700"
                                >
                                    {formatApplicationDate(application.nextActionAt)}
                                </time>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Link
                to={`/applications/${application.id}`}
                className="mt-4 inline-flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-brand-700"
            >
                View details
                <ChevronRight aria-hidden="true" className="size-4" />
            </Link>
        </article>
    );
}

export default ApplicationTrackerPage;