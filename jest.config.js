/** @type {import('jest').Config} */

const config = {
  testEnvironment: 'jsdom',
  
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
}

export default config;