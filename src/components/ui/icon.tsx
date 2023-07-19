import { BadgeInfo, MessageSquare, type Icon as LucideIcon, type LucideProps } from 'lucide-react';

export type Icon = LucideIcon;

export const Icon = {
  messageSquare: MessageSquare,
  badgeInfo: BadgeInfo,
  kickKit: (props: LucideProps) => (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M0.5 0.585714H7.91304V23.75H0.5V0.585714Z' fill='currentColor' />
      <path d='M7.91304 8.30714H15.8315L23.5815 23.75H15.8315L7.91304 8.30714Z' fill='currentColor' />
      <path d='M15.663 0.25H23.75V8.30714H15.663V0.25Z' fill='currentColor' />
      <path d='M14.9891 8.30714H16.6739V9.98571H14.9891V8.30714Z' fill='currentColor' />
    </svg>
  ),
  gitHub: (props: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
      <path d='M9 18c-4.51 2-5-2-7-2' />
    </svg>
  ),
};