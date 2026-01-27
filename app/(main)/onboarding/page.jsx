import { getOnboardingData } from '@/actions/user';
import { industries } from '@/data/industries'
import React from 'react'

const onboarding = async  () => {
  const {isOnboarded} = await getOnboardingData();

  if(isOnboarded) return redirect('/dashboard');
  return (
    <main>
      <onboardingForm industries={industries}/>
      
    </main>
  )
}

export default onboarding