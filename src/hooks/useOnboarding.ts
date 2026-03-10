import { useState, useEffect } from "react";

export interface OnboardingData {
  businessName: string;
  industry: string;
  location: string;
  yearsInOperation: string;
  teamSize: string;
  currentRevenue: string;
  fundingNeeded: string;
  marketDemand: string;
  businessDescription: string;
}

interface OnboardingState {
  currentStep: number;
  data: OnboardingData;
  completed: boolean;
}

const STORAGE_KEY = "equifund_onboarding";

const defaultData: OnboardingData = {
  businessName: "",
  industry: "",
  location: "",
  yearsInOperation: "",
  teamSize: "",
  currentRevenue: "",
  fundingNeeded: "",
  marketDemand: "",
  businessDescription: "",
};

const dataKeys: (keyof OnboardingData)[] = [
  "businessName", "industry", "location", "yearsInOperation",
  "teamSize", "currentRevenue", "fundingNeeded", "marketDemand", "businessDescription",
];

export const TOTAL_STEPS = 9;

export function getOnboardingProgress(): { completedFields: number; totalFields: number; percentage: number; data: OnboardingData; completed: boolean } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { completedFields: 0, totalFields: TOTAL_STEPS, percentage: 0, data: defaultData, completed: false };
    const state: OnboardingState = JSON.parse(stored);
    const completedFields = dataKeys.filter(k => state.data[k].trim().length > 0).length;
    return {
      completedFields,
      totalFields: TOTAL_STEPS,
      percentage: Math.round((completedFields / TOTAL_STEPS) * 100),
      data: state.data,
      completed: state.completed,
    };
  } catch {
    return { completedFields: 0, totalFields: TOTAL_STEPS, percentage: 0, data: defaultData, completed: false };
  }
}

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return { currentStep: 0, data: defaultData, completed: false };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setStep = (step: number) => setState(prev => ({ ...prev, currentStep: step }));
  
  const setFieldValue = (val: string) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [dataKeys[prev.currentStep]]: val },
    }));
  };

  const getValue = () => state.data[dataKeys[state.currentStep]] || "";

  const markCompleted = () => setState(prev => ({ ...prev, completed: true }));

  return { ...state, setStep, setFieldValue, getValue, markCompleted, dataKeys };
}
