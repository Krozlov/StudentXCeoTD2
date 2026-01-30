# Technical Documentation of Vision & Mission Page
## 1. Overview
The Vision & Mission page communicates the identity, values, and long term direction of StudentsxCEOs Jakarta.

Although the content is static, the page is built with and interactive and state driven UI to improve flexibility, user engagement, and narrative flow.

The implementation prioritizes:
- Clarity of information
- Maintainable structure
- Consistent user experience

## 2. Tech Stack & Dependencies
- Framework: Next.js
- Animation: framer-motion
- Icon: lucide-react
- Media: Next.js `Image` component for optimized visual assets
- Data Source: `@/constants/values.ts`

## 3. Key Components & Features
### 3.1 Hero Section 
- Uses `motion.div` to create a fade-in and slide up animation effect when the page loads.
- Typography using large scale text to highlight StudentsxCEO's tagline and core message.

### 3.2 Vision & Mission Statement
- Layout is structured using a 12 column grid system:
    - 5 columns for title section
    - 7 columns for the statement content
- A vertical blue border is used as a visual accent to emphasize the mission statement.

### 3.3 Interactive Value
Displays core values of StudentsxCEOs Jakarta using a state driven UI:
- State (`activeValue`): Stores the currently selected value object from `VALUES_DATA`
- Dynamic styling: Button styles change dynamically based on active state (`isActive`) 
- `AnimatePresence`: AnimatePresence is used on the right side content to ensure smooth transitions when switching between values, including text and images.

## 4. Data Structure
Each object in `VALUES_DATA` must follow the schema below to ensure the page renders correctly without runtime errors:
```ts
interface ValueData {
  id: string | number;
  title: string;
  description: string;
  points: string[]; // Array of strings for tag detail
  icon: React.ComponentType; // lucide-react icon
  bgLight: string; // Tailwind class (ex: 'bg-blue-50')
  color: string;   // Tailwind class (ex: 'bg-blue-600')
  text: string;    // Tailwind class (ex: 'text-blue-600')
  img: string;     // Filename di folder /public
}
```

## 5. Maintenance Notes
>[!IMPORTANT]
>All images referenced in `VALUES_DATA` must be placed inside the `/public` directory to be compatible with the Next.js `Image` component.

Responsive Adjustments: Padding, spacing, and typography sizes are handled using responsive Tailwind prefixes (`md:`, `lg:`) to ensure a clean and consistent layout across mobile, tablet, and desktop devices.
