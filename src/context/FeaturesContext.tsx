import React, { createContext, useContext, useState, useEffect } from 'react';

type FeatureContextType = {
  streamerMode: boolean;
  changeStreamerMode: (enabled: boolean) => void;
  streamableMode: boolean;
  changeStreamableMode: (enabled: boolean) => void;
};

const FeatureContext = createContext<FeatureContextType>({
  streamerMode: false,
  changeStreamerMode: () => {},
  streamableMode: false,
  changeStreamableMode: () => {},
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
  const [streamableMode, setStreamableMode] = useState<boolean>(false);

  useEffect(() => {
    const savedStreamerMode = localStorage.getItem('streamerMode');
    if (savedStreamerMode) {
      setStreamerMode(JSON.parse(savedStreamerMode));
    }
  }, []);

  useEffect(() => {
    const savedStreamableMode = localStorage.getItem('streamableMode');
    if (savedStreamableMode) {
      setStreamableMode(JSON.parse(savedStreamableMode));
    }
  }, []);

  useEffect(() => {
    if (streamerMode) {
      document.body.setAttribute('streamerMode', 'on');
    } else {
      document.body.removeAttribute('streamerMode');
    }
  }, [streamerMode]);

  useEffect(() => {
    if (streamableMode) {
      document.body.setAttribute('streamableMode', 'on');
    } else {
      document.body.removeAttribute('streamableMode');
    }
  }, [streamableMode]);

  const changeStreamerMode = (enabled: boolean) => {
    setStreamerMode(enabled);
    localStorage.setItem('streamerMode', JSON.stringify(enabled));
  };

  const changeStreamableMode = (enabled: boolean) => {
    setStreamableMode(enabled);
    localStorage.setItem('streamableMode', JSON.stringify(enabled));
  };

  return (
    <FeatureContext.Provider
      value={{
        streamerMode,
        changeStreamerMode,
        streamableMode,
        changeStreamableMode,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};
