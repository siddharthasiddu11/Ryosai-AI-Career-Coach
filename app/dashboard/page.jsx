import { getOnboardingData } from "@/actions/user";
import { redirect } from "next/navigation";

const IndustryInsight = async () => {
    const { isOnboarded } = await getOnboardingData();

    if (!isOnboarded) redirect('/onboarding');
    return (
        <div>IndustryInsight</div>
    )
}

export default IndustryInsight;