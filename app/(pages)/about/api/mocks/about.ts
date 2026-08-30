export default function getExperiences(): Experience[] {
    return [
        {
            id: 1,
            job_title: "Full Stack Developer",
            company_name: "Ascend Group",
            detail: "Work as full stack developer",
            tech_stack: ["Golang", "NextJs", "Kafka", "Postgresql", "MySql"],
            start_date: new Date("2026-03-01"),
            icon: 'https://www.ascendcorp.com/wp-content/uploads/2025/02/Ascend_Logo.png',
        },
        {
            id: 2,
            job_title: "Backend Developer",
            company_name: "BJC(Big C)",
            detail: "Work as backend developer",
            tech_stack: ["Golang", "VueJs", "Kafka", "Postgresql", "MySql", "Python"],
            start_date: new Date("2025-09-01"),
            end_date: new Date("2026-02-01"),
            icon: "https://corporate.bigc.co.th/assets/images/logo-big.png",
        }
    ];
}