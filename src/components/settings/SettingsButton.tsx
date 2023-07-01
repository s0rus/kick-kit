import * as React from 'react';
import { Description } from '@radix-ui/react-dialog';

interface SettingsButtonProps {
  description: string;
  text: string;
  onClick: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
  description,
  onClick,
  text,
}) => {
  return (
    <div className='flex flex-row gap-2 px-2 py-1 bg-red-500'>
      <h1>{text}</h1>
      <Description>
        <button onClick={onClick}>{description}</button>
      </Description>
    </div>
  );
};

export default SettingsButton;
