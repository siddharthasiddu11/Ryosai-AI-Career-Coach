import { getIndustryInsights } from "@/actions/dashboard";
import { getOnboardingData } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardView from "./_components/dashboard-view";

const IndustryInsight = async () => {
    const { isOnboarded } = await getOnboardingData();
    const insights = await getIndustryInsights();

    if (!isOnboarded) redirect('/onboarding');
    return (
        <div className="container mx-auto">
            <DashboardView insights={insights} />
        </div>
    )
}

export default IndustryInsight;