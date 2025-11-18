
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	safelist: [
		// Only safelist animation classes that are used dynamically in the codebase
		'animate-spin',
		'animate-pulse',
		'animate-sparkle',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				seftec: {
					navy: '#0A2540',
					gold: '#E6B94D',
					slate: '#F6F9FC',
					lightgray: '#E8E8E8',
					// Dark mode colors
					darkNavy: '#0A1A2F',
					charcoal: '#1E293B',
					teal: '#4FD1C5',
					purple: '#9F7AEA',
					highlight: '#6EE7B7',
				}
			},
			fontFamily: {
				sans: ['"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
				serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
				handwritten: ['"Caveat"', 'cursive'],
				gabriela: ['"Gabriela"', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.95)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(20px)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-left': {
					from: { transform: 'translateX(-20px)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-500px 0' },
					'100%': { backgroundPosition: '500px 0' }
				},
				sparkle: {
					'0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
					'50%': { opacity: '1', transform: 'scale(1.2)' }
				},
				bounce: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out',
				'fade-up': 'fade-up 0.7s ease-out',
				'scale-in': 'scale-in 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse': 'pulse 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite linear',
				'sparkle': 'sparkle 1.5s ease-in-out infinite',
				'bounce': 'bounce 1s ease-in-out infinite'
			},
			transitionTimingFunction: {
				'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
				'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
			},
			fontFamily: {
				sans: ['"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
				serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
				handwritten: ['"Caveat"', 'cursive'],
			},
			boxShadow: {
				'apple': '0 4px 20px rgba(0, 0, 0, 0.08)',
				'apple-hover': '0 10px 30px rgba(0, 0, 0, 0.12)',
				'apple-active': '0 2px 10px rgba(0, 0, 0, 0.06)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.06)',
				'neo': '0 4px 24px rgba(0, 0, 0, 0.25)',
			},
			backdropBlur: {
				'apple': 'blur(20px)',
			},
			backgroundImage: {
				'gradient-teal-purple': 'linear-gradient(90deg, #4FD1C5 0%, #9F7AEA 100%)',
				'gradient-navy': 'linear-gradient(135deg, #0A1A2F 0%, #1E293B 100%)',
				'gradient-success': 'linear-gradient(90deg, #48BB78 0%, #38B2AC 100%)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
