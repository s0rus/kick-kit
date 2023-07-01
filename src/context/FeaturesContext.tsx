import React, { createContext, useContext, useState, useEffect } from 'react';

type FeatureContextType = {
  streamerMode: boolean;
  changeStreamerMode: (enabled: boolean) => void;
};

const FeatureContext = createContext<FeatureContextType>({
  streamerMode: false,
  changeStreamerMode: () => {},
});

export const useFeatureContext = () => {
  return useContext(FeatureContext);
};

type FeatureProviderProps = {
  children: React.ReactNode;
};

export const FeatureContextProvider: React.FC<FeatureProviderProps> = ({
  children,
}) => {
  const [streamerMode, setStreamerMode] = useState<boolean>(false);

  useEffect(() => {
    const savedStreamerMode = localStorage.getItem('streamerMode');
    if (savedStreamerMode) {
      setStreamerMode(JSON.parse(savedStreamerMode));
    }
  }, []);

  useEffect(() => {
    if (streamerMode) {
      document.body.setAttribute('streamerMode', 'on');
    } else {
      document.body.removeAttribute('streamerMode');
    }
  }, [streamerMode]);

  const changeStreamerMode = (enabled: boolean) => {
    setStreamerMode(enabled);
    localStorage.setItem('streamerMode', JSON.stringify(enabled));
  };

  return (
    <FeatureContext.Provider
      value={{
        streamerMode,
        changeStreamerMode,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};
