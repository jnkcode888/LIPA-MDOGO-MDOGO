# Website Request Form

A beautiful, animated multi-step form for collecting website development requests. Built with React, Framer Motion, and Supabase.

## Features

- 🎨 Modern, animated UI with smooth transitions
- 📱 Fully responsive design
- 🔄 Multi-step form with progress tracking
- 💾 Save as draft functionality
- 📤 File upload support
- ✅ Form validation
- 🎯 Progress bar with step indicators

## Tech Stack

- React (Functional Components)
- Framer Motion (Animations)
- Supabase (Backend & Storage)
- React Router (Navigation)
- CSS (Custom styling)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd website-request-form
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up your Supabase database:

   - Create a new project in Supabase
   - Create a table named `website_requests` with the following columns:
     - id (uuid, primary key)
     - name (text)
     - whatsapp (text)
     - email (text)
     - purpose (text)
     - pages (array)
     - homepage (text)
     - extra_sections (text)
     - features (array)
     - feature_details (text)
     - branding (text)
     - style (text)
     - references (text)
     - domain_status (text)
     - deadline (text)
     - budget (text)
     - final_description (text)
     - logo_url (text)
     - is_draft (boolean)
     - created_at (timestamp)

5. Create a storage bucket named `website-requests` in your Supabase project for file uploads.

6. Start the development server:

```bash
npm run dev
```

## Project Structure

```
src/
  ├── components/
  │   ├── steps/
  │   │   ├── Step1BasicInfo.jsx
  │   │   ├── Step2Purpose.jsx
  │   │   ├── Step3Features.jsx
  │   │   ├── Step4Design.jsx
  │   │   ├── Step5Technical.jsx
  │   │   └── Step6Final.jsx
  │   ├── ProgressBar.jsx
  │   └── Success.jsx
  ├── context/
  │   └── FormContext.jsx
  ├── config/
  │   └── supabase.js
  ├── App.jsx
  └── App.css
```

## Usage

1. Users can navigate through the form steps using "Next" and "Back" buttons
2. Each step validates required fields before proceeding
3. Users can save their progress as a draft at any step
4. The final step allows file uploads and form submission
5. Upon successful submission, users are redirected to a success page

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
