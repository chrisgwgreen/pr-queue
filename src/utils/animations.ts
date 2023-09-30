import { keyframes } from '@mui/system'

/*
 * Fade Animation
 */
export const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

/*
 * Pulse Animation
 */
export const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 0.625rem rgba(255, 82, 82, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
`

export const pulseFadeAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

/*
 * Reflection
 */
export const imageDropIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

export const imageDropOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  
  100% {
    opacity: 0;
    transform: translateY(-20px);    
  }
`

export const reflectionClimbIn = keyframes`
  0% {
    transform: rotate(180deg) scaleX(-1) translateY(-40px);
    opacity: 0;
  }
  
  100% {
    transform: rotate(180deg) scaleX(-1) translateY(0);
    opacity: 0.2;
  }
`

export const reflectionClimbOut = keyframes`
  0% {
    transform: rotate(180deg) scaleX(-1) translateY(0);
    opacity: 0.2;
  }
  
  100% {
    transform: rotate(180deg) scaleX(-1) translateY(-40px);
    opacity: 0;
    
  }
`
