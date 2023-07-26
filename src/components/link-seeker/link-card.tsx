import { ReactNode } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';

interface LinkCardProps {
  children: ReactNode;
}

const LinkCard = ({ children }: LinkCardProps) => {
  return (
    <HoverCard closeDelay={0} openDelay={0}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent side='top' sideOffset={18}>
        aha spoko nie wnikam...
      </HoverCardContent>
    </HoverCard>
  );
};

export default LinkCard;
