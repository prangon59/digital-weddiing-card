/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFEFA',
          100: '#FFFDF5',
          200: '#FFF6E5',
          300: '#FCEFD2',
          400: '#F5DEB0',
        },
        marigold: {
          DEFAULT: '#F4A300',
          50: '#FFF9E6',
          100: '#FFF0BF',
          200: '#FFE280',
          300: '#FFD340',
          400: '#F4A300',
          500: '#D98200',
          600: '#B86800',
        },
        maroon: {
          DEFAULT: '#7A1F2B',
          50: '#F9ECEE',
          100: '#F2D3D7',
          200: '#E2A2AB',
          300: '#CE6C7B',
          400: '#A43444',
          500: '#7A1F2B',
          600: '#5C141E',
          700: '#430B14',
          800: '#2C060C',
        },
        sage: {
          DEFAULT: '#8FA98A',
          50: '#F3F6F3',
          100: '#E3EBE3',
          200: '#C7D7C7',
          300: '#ABC2AB',
          400: '#8FA98A',
          500: '#708C6B',
          600: '#536E4F',
        },
        gold: {
          DEFAULT: '#C9A24B',
          50: '#FAF6ED',
          100: '#F3E8CE',
          200: '#E7D09C',
          300: '#DBB86B',
          400: '#C9A24B',
          500: '#A88231',
          600: '#856420',
        },
        ink: {
          DEFAULT: '#382226',
          muted: '#684F54',
          soft: '#8C7478',
        }
      },
      fontFamily: {
        banglaBody: ['"Hind Siliguri"', '"Tiro Bangla"', 'sans-serif'],
        banglaHeading: ['"Noto Serif Bengali"', 'serif'],
        engHeading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        engScript: ['"Great Vibes"', 'cursive'],
        arabic: ['"Amiri"', 'serif'],
        arabicRuqaa: ['"Aref Ruqaa"', '"Amiri"', 'serif'],
      },
      boxShadow: {
        'card-warm': '0 20px 45px -15px rgba(122, 31, 43, 0.18), 0 0 25px 0 rgba(201, 162, 75, 0.12)',
        'gold-glow': '0 0 25px rgba(201, 162, 75, 0.45)',
        'maroon-glow': '0 10px 30px rgba(122, 31, 43, 0.35)',
      },
      backgroundImage: {
        'watercolor-pattern': "radial-gradient(circle at 50% 50%, rgba(255, 246, 229, 0.8) 0%, rgba(253, 242, 219, 0.6) 100%)",
      }
    },
  },
  plugins: [],
}
