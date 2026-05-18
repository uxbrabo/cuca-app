import React, { createContext, useContext, useState } from 'react';
import type { UserProfile } from '~/navigation/types';

export type StudyPlan = {
  planTitle: string;
  objetivo: string;
  subjects: string[];
  dailyGoal: string;
  nivel: string;
  firstTrail: {
    subject: string;
    topic: string;
    totalActivities: number;
    completedActivities: number;
    nextActivityType: 'video' | 'artigo' | 'quiz' | 'flashcard';
    nextActivityTitle: string;
    xp: number;
    color: string;
  };
};

type ProfileContextType = {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  studyPlan: StudyPlan | null;
  setStudyPlan: (plan: StudyPlan) => void;
};

const ProfileContext = createContext<ProfileContextType>({
  profile: 'aluno',
  setProfile: () => {},
  studyPlan: null,
  setStudyPlan: () => {},
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>('aluno');
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  return (
    <ProfileContext.Provider value={{ profile, setProfile, studyPlan, setStudyPlan }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
