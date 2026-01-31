/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--color-border)', /* slate-400/20 */
        input: 'var(--color-input)', /* slate-400/20 */
        ring: 'var(--color-ring)', /* amber-600 */
        background: 'var(--color-background)', /* slate-50 */
        foreground: 'var(--color-foreground)', /* slate-900 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* blue-900 */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* blue-800 */
          foreground: 'var(--color-secondary-foreground)', /* slate-50 */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* amber-600 */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-600 */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* emerald-600 */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-600 */
          foreground: 'var(--color-warning-foreground)', /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-600 */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* slate-100 */
          foreground: 'var(--color-muted-foreground)', /* slate-600 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)', /* slate-800 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)', /* slate-800 */
        },
        'text-primary': 'var(--color-text-primary)', /* slate-900 */
        'text-secondary': 'var(--color-text-secondary)', /* slate-600 */
      },
      borderRadius: {
        sm: 'var(--radius-sm)', /* 6px */
        md: 'var(--radius-md)', /* 12px */
        lg: 'var(--radius-lg)', /* 18px */
        xl: 'var(--radius-xl)', /* 24px */
      },
      spacing: {
        base: 'var(--spacing-base)', /* 8px */
      },
      boxShadow: {
        sm: '0 2px 4px var(--shadow-color)',
        DEFAULT: '0 3px 6px var(--shadow-color-md)',
        md: '0 6px 12px var(--shadow-color-md)',
        lg: '0 12px 24px var(--shadow-color-lg)',
        xl: '0 20px 40px var(--shadow-color-lg)',
        '2xl': '0 32px 64px -12px var(--shadow-color-lg)',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      scale: {
        '97': '0.97',
      },
      ringWidth: {
        '3': '3px',
      },
      ringOffsetWidth: {
        '3': '3px',
      },
      zIndex: {
        '1': '1',
        '50': '50',
        '100': '100',
        '200': '200',
        '300': '300',
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
      },
      fontFamily: {
        amiri: ['Amiri', 'serif'],
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        'ibm-plex': ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      maxWidth: {
        'measure': '70ch',
      },
    },
  },
  plugins: [],
}