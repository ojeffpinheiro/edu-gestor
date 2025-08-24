import { useState } from "react";

export const useCollapsibleSections = () => {
    const [collapsedSections, setCollapsedSections] = useState({
      types: false,
      schools: false,
      locations: false,
      timeRange: false,
      allFilters: false
    });
  
    const toggleSection = (section: keyof typeof collapsedSections) => {
      setCollapsedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };
  
    const toggleCategory = (categoryId: string) => {
      setCollapsedSections(prev => ({
        ...prev,
        [`category_${categoryId}`]: !prev[`category_${categoryId}` as keyof typeof collapsedSections]
      }));
    };
  
    return {
      collapsedSections,
      toggleSection,
      toggleCategory
    };
  };