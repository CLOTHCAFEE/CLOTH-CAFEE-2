
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-16", showText = true }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 400 180" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Infinite Stylized C Shape (Golden) */}
        <path 
          d="M160 50C130 50 110 65 110 90C110 115 130 130 160 130H195L180 115H160C148 115 132 105 132 90C132 75 148 65 160 65H178L195 50H160Z" 
          fill="#D4A373" 
        />
        <path 
          d="M240 50C270 50 290 65 290 90C290 115 270 130 240 130H205L220 115H240C252 115 268 105 268 90C268 75 252 65 240 65H222L205 50H240Z" 
          fill="#D4A373" 
        />
        
        {showText && (
          <text 
            x="200" 
            y="170" 
            textAnchor="middle" 
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            style={{ 
              fontFamily: 'Oswald, sans-serif', 
              fontSize: '32px', 
              fontWeight: '500', 
              letterSpacing: '0.4em',
              textTransform: 'uppercase'
            }}
          >
            CLOTH CAFEE
          </text>
        )}
      </svg>
    </div>
  );
};

export default Logo;
