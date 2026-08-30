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
                <main className="flex flex-1 flex-col justify-center w-full 2xl:max-w-1/2 items-center justify-between xl:py-32 md:px-16 sm:items-start">
                    <TimeLine items={timeline}/>
                </main>
            </div>
        </>
    );
}