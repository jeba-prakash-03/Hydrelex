import React, { createContext, useContext, useEffect, useState } from 'react';
import { CompanySettings } from '../types';
import { api } from '../lib/api';

interface SettingsContextType {
  settings: CompanySettings | null;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const fallbackSettings: CompanySettings = {
  company_name: 'HYDRELEX LIFT SYSTEMS',
  tagline: 'A way to reach a goal',
  hero_headline: 'ENGINEERING VERTICAL MOBILITY.',
  hero_subheading: 'Reliable lift and elevator solutions designed to move people and materials with confidence.',
  intro_headline: 'Moving Beyond Expectations.',
  intro_text: 'HYDRELEX LIFT SYSTEMS delivers engineering-focused vertical mobility and industrial lifting solutions. Based in Sriperumbudur, Tamil Nadu, we provide durable, precision-engineered elevator systems and hydraulic machinery built for industrial, commercial, and customized structural requirements.',
  address_line1: 'No B3-G4, Arakonam Road',
  address_line2: 'Mevallurkuppam Village',
  city: 'Sriperumbudur Taluk',
  pincode: '602015',
  state: 'Tamil Nadu',
  country: 'India',
  phone_primary: '8939359592',
  phone_secondary: '9789397504',
  email: 'info@hydrelex.com',
  udyam_registration: 'UDYAM-TN-08-0090275',
  gstin: '33BNOPK2159N1ZJ',
  business_hours: 'Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed)',
  contact_cta_headline: "LET'S MOVE YOUR PROJECT FORWARD.",
  contact_cta_subtext: "Connect with our engineering specialists in Sriperumbudur for a technical consultation tailored to your facility's vertical mobility demands.",
  social_linkedin: 'https://linkedin.com/company/hydrelex',
};

const SettingsContext = createContext<SettingsContextType>({
  settings: fallbackSettings,
  loading: true,
  refreshSettings: async () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CompanySettings>(fallbackSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await api.getSettings();
      if (res.success && res.settings) {
        setSettings({ ...fallbackSettings, ...res.settings });
      }
    } catch (err) {
      console.warn('Using default settings fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

