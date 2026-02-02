# Technical Documentation of Projects Page
## 1. Overview
Projects page is the central information hub for StudentsxCEOs Jakarta programs. It is designed to provide real time updates on program availability, detailed information, and reminder system integrated with google calendar.

The implementation prioritizes:
- Clarity of information
- Scalable for add new projects via a structured constant
- Consistent user experience

## 2. Tech Stack & Dependencies
- Framework: Next.js
- Animation: framer-motion
- Icon: lucide-react
- Data Source: `@/constants/projects.ts`

## 3. Key Features & Logic
### 3.1 Status System
- This system uses a dynamic helper function `getProjectStatus` to determine the state of a program based on user's local system time:
- **OPEN:** Current date is within the range
- **COMING SOON:** Current date is before the start date
- **FINISHED:** Current date is after the end date

### 3.2 Priority Sorting
Projects are sorted by priority state:
1. `OPEN`
2. `COMING SOON`
3. `FINISHED`

### 3.3 Category Filter
The filter allows user to filtering program based on target audience. This filter uses `.filter()` and `.includes()` method and wrapped by `useMemo` to prevent recalculation.

### 3.4 Event Propagation Shield
To ensure a clean UI, the "Register Now" and "PIC" links utilize `e.stopPropagation()`. This prevents the parent card's `onClick` event from triggering when user only need to go to a specific link.

### 3.5 Calendar Generator
"Add Reminder" feature automatically create a Google Calendar unique link for projects using the API by converting the `startDate` and `endDate`.

### 3.6 Progressive Disclosure
By default, the system only shows 3 projects based on priority sorting to ensure the visual hierarchy and provide "View More" button to show all projects.


## 4. Data Structure
Each object in `PROJECTS_DATA` must follow the schema below to ensure the page renders correctly without runtime errors:
```ts
interface Project {
  id: number;
  title: string;
  categories: string[];
  description: string;
  outcomes: string[];
  startDate: string; //format: YYYY-MM-DD
  endDate: string; //format: YYYY-MM-DD
  partnerRange?: string;
  link?: string;
  pic: string; //whatsapp or social media link
}
```

## 5. Maintenance Notes
>[!IMPORTANT]
>Date formatting: always use the `YYYY-MM-DD` format for `startDate` and `endDate` to ensure the `getProjectStatus` logic and Google Calendar integration.
>Adding project: simply append a new object to `PROJECTS_DATA`. The UI will handle the sorting and filtering automatically
