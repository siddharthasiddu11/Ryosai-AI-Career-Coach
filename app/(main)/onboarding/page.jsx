import { industries } from '@/data/industries'
import React from 'react'

const onboarding = () => {
  return (
    <main>
      <onboardingForm industries={industries}/>
      
    </main>
  )
}

export default onboarding