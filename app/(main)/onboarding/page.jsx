import { redirect } from 'next/navigation';
import { getOnboardingData } from '@/actions/user';
import { industries } from '@/data/industries'
import OnboardingForm from './_components/onboarding-form'

const onboarding = async () => {
  const { isOnboarded } = await getOnboardingData();

  if (isOnboarded) return redirect('/dashboard');
  return (
    <main>
      <OnboardingForm industries={industries} />

    </main>
  )
}

export default onboarding