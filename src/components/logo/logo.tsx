import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M0.5 0.585714H7.91304V23.75H0.5V0.585714Z' fill='white' />
      <path d='M7.91304 8.30714H15.8315L23.5815 23.75H15.8315L7.91304 8.30714Z' fill='white' />
      <path d='M15.663 0.25H23.75V8.30714H15.663V0.25Z' fill='white' />
      <path d='M14.9891 8.30714H16.6739V9.98571H14.9891V8.30714Z' fill='white' />
    </svg>
  );
};

export default Logo;
