import React from 'react';
import styled, { keyframes } from 'styled-components';

// 1. First define constants
const RING_COLORS = ['#eb4747', '#ebeb47', '#47eb47', '#47ebeb', '#4747eb'];

// 2. Define animations
const spin = keyframes`
  0%, 15% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
`;

// 3. Helper functions
const getRingStyle = (i) => `
  .loader-line-wrap:nth-child(${i + 1}) {
    animation-delay: -${50 * (i + 1)}ms;
    
    .loader-line {
      border-color: ${RING_COLORS[i % RING_COLORS.length]};
      height: ${90 - (i * 14)}px;
      width: ${90 - (i * 14)}px;
      top: ${7 + (i * 7)}px;
    }
  }
`;

// 4. Main Component
const Loader = ({ theme = 'light' }) => {
  return (
    <StyledWrapper $darkMode={theme === 'dark'}>
      <div className="loader" aria-label="Loading">
        <div className="loader-inner">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="loader-line-wrap">
              <div className="loader-line" />
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

// 5. Styled Components (last)
const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.$darkMode ? '#1a202c' : '#f8f9fa'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .loader-inner {
    width: 100px;
    height: 60px;
    position: relative;
  }

  .loader-line-wrap {
    animation: ${spin} 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
    width: 100px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 50% 100%;
    overflow: hidden;
  }

  .loader-line {
    border: 4px solid transparent;
    border-radius: 100%;
    position: absolute;
    inset: 0;
    margin: 0 auto;
  }

  /* Dynamic ring styles */
  ${[...Array(5)].map((_, i) => getRingStyle(i))}
`;

export default Loader;