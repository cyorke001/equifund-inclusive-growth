import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface OnboardingData {
  business_name: string;
  industry: string;
  location: string;
  years_in_operation: string;
  team_size: string;
  current_revenue: string;
  funding_needed: string;
  market_demand: string;
  business_description: string;
}

const defaultData: OnboardingData = {
  business_name: "",
  industry: "",
  location: "",
  years_in_operation: "",
  team_size: "",
  current_revenue: "",
  funding_needed: "",
  market_demand: "",
  business_description: "",
};

export const dataKeys: (keyof OnboardingData)[] = [
  "business_name", "industry", "location", "years_in_operation",
  "team_size", "current_revenue", "funding_needed", "market_demand", "business_description",
];

export const TOTAL_STEPS = 9;

export function useOnboarding() {
  const { user } = useAuth();
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [readinessScore, setReadinessScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load from DB
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const load = async () => {
      const { data: row } = await supabase
        .from("onboarding_progress")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (row) {
        setData({
          business_name: row.business_name,
          industry: row.industry,
          location: row.location,
          years_in_operation: row.years_in_operation,
          team_size: row.team_size,
          current_revenue: row.current_revenue,
          funding_needed: row.funding_needed,
          market_demand: row.market_demand,
          business_description: row.business_description,
        });
        setCurrentStep(row.current_step);
        setCompleted(row.completed);
        setReadinessScore(row.readiness_score);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  // Save to DB (debounced)
  const saveToDb = useCallback(async (updates: Partial<OnboardingData & { current_step?: number; completed?: boolean; readiness_score?: number }>) => {
    if (!user) return;
    await supabase
      .from("onboarding_progress")
      .update(updates)
      .eq("user_id", user.id);
  }, [user]);

  const setStep = (step: number) => {
    setCurrentStep(step);
    saveToDb({ current_step: step });
  };

  const setFieldValue = (val: string) => {
    const key = dataKeys[currentStep];
    setData(prev => ({ ...prev, [key]: val }));
    saveToDb({ [key]: val });
  };

  const getValue = () => data[dataKeys[currentStep]] || "";

  const markCompleted = () => {
    setCompleted(true);
    saveToDb({ completed: true });
  };

  const completedFields = dataKeys.filter(k => data[k].trim().length > 0).length;
  const percentage = Math.round((completedFields / TOTAL_STEPS) * 100);

  return {
    currentStep, data, completed, readinessScore, loading,
    setStep, setFieldValue, getValue, markCompleted, dataKeys,
    completedFields, percentage, setReadinessScore,
    saveToDb,
  };
}
