import TimeLine from "@/app/global/components/timeline";
import getExperiences from "./api/mocks/about";
import { options } from "@/app/global/constants/DateFormat";

const timeline : TimeLineProps[] = getExperiences().map((exp) => {
    return   {
            id: exp.id,
            start_date: exp.start_date.toLocaleDateString('en-Us', options),
            end_date: exp.end_date ? exp.end_date.toLocaleDateString('en-Us', options) : 'Present',
            title: exp.job_title,
            subtitle: exp.company_name,
            detail: exp.detail,
            icon: exp.icon,
        }
});


export default function About() {
    return (
        <>
            <div className="flex flex-col flex-1 items-center justify-center font-sans">
                <main className="grid grid-cols-2 gap-6 justify-center w-full 2xl:max-w-1/2 items-center justify-between xl:py-32 md:px-16 sm:items-start">
                    <div>
                        <p className="text-white">
I’m a Software Engineer with 3+ years of experience building scalable backend services, APIs, and cloud-native applications.

I work primarily with Go, PHP/Laravel, React, Vue, and Kubernetes, with a focus on system design, microservices, DevOps, and automation.

I enjoy solving complex problems, designing reliable systems, and turning ideas into practical software. I’ve worked on ERP, warehouse management, banking integrations, and AI-powered automation across the full software development lifecycle.
                        </p>
                    </div>
                    <TimeLine className="grow" items={timeline}/>
                </main>
            </div>
        </>
    );
}