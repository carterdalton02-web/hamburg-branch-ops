# Hamburg Branch Operations Management System

A modern, accessible web-based application for managing daily branch operations checklists at Hamburg Branch.

## Features

✅ **Operations Command Center Dashboard**
- Live completion metrics for all operational areas
- Real-time status of incomplete controls
- Overall branch readiness percentage

✅ **Daily Closing Checklist**
- Organized by teammate (Zach, Abbie, Nash, Carter)
- Daily sign-off tracking with timestamps
- Notes field for exceptions and follow-ups

✅ **Operations Champion Guide**
- Daily and weekly operational review items
- Safety deposit box, signature card, balance sheet reviews
- Proof corrections and compliance tracking

✅ **Brinks Workflow**
- Step-by-step shipment control procedures
- Dual-control documentation
- Event-based task sequence

✅ **Vault Controls**
- Daily vault custody verification
- Dual-control requirements tracking
- Shipment readiness checklist

✅ **Audit Log**
- Timestamped record of all completions and resets
- CSV export for compliance and reporting
- Full activity history

## Technical Features

🔒 **Privacy-First Design**
- All data stored locally in your browser (localStorage)
- No external servers or cloud uploads
- Complete data control

📱 **Progressive Web App (PWA)**
- Works offline after first visit
- Install as an app on mobile or desktop
- Fast, reliable performance
- Service worker caching

♿ **Accessibility**
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast colors
- Focus indicators

🎨 **Responsive Design**
- Works on desktop, tablet, and mobile
- Optimized touch targets
- Adaptive layouts

## Quick Start

### Local Setup
1. Clone this repository
2. Open `index.html` in your browser
3. Start managing your daily operations

### Deploy to Web

**GitHub Pages:**
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Access via `https://yourusername.github.io/hamburg-branch-ops`

**Netlify (Recommended):**
1. Connect your GitHub repository
2. Build command: (leave empty)
3. Publish directory: (leave empty, uses root)
4. Deploy automatically on push

**Vercel:**
1. Import repository from GitHub
2. No configuration needed
3. Deploy with one click

### Install as App

**Desktop (Chrome/Edge):**
1. Click the install icon in the address bar
2. Choose "Install Hamburg Branch Operations"
3. Access from your desktop or taskbar

**Mobile (iOS):**
1. Open in Safari
2. Tap Share → Add to Home Screen
3. Name it and tap Add

**Mobile (Android):**
1. Open in Chrome
2. Tap menu → Install app (or Add to Home screen)
3. Accept and tap Install

## Usage

### Daily Operations
1. Open the app (or bookmark the web link)
2. Navigate to the relevant section
3. Check off completed tasks
4. Add notes for any exceptions or follow-ups
5. Tasks are automatically timestamped

### Audit & Compliance
1. Go to "Audit Log" tab
2. Review activity history with timestamps
3. Click "Export Audit CSV" to download records
4. Save for compliance, reporting, or archiving

### Resetting Data
1. Go to "Audit Log"
2. Click "Reset Demo Data"
3. Confirm the action
4. App will reload with fresh checklist

## Data Persistence

Data is saved automatically in your browser and persists across sessions. To back up your data:

1. Go to "Audit Log"
2. Export CSV regularly
3. Store files securely

## Roadmap for Production

This prototype stores data locally. For a multi-user production system:

- **Authentication**: User login and role-based access
- **Database**: Secure backend database (Firebase, PostgreSQL, etc.)
- **Real-time Sync**: Live updates across devices
- **Notifications**: Alerts for overdue tasks
- **Reporting**: Advanced analytics and dashboards
- **Mobile Apps**: Native iOS and Android apps
- **Permissions**: User and branch-level access controls

## Browser Compatibility

- Chrome/Edge: Latest versions
- Firefox: Latest versions
- Safari: Latest versions (iOS 13+)
- Brave, Opera: Full support

## Accessibility

This app is designed for inclusive use:

- **Keyboard Navigation**: Tab through all controls
- **Screen Readers**: Fully announced and labeled
- **Color Contrast**: WCAG AA standard (4.5:1)
- **Text Size**: Readable at default and zoom levels
- **Reduced Motion**: Respects OS preferences

## Support

For issues, suggestions, or feedback:
- Open an issue on GitHub
- Contact: carter.dalton02@gmail.com

## License

This project is private and proprietary to Hamburg Branch.

---

**Version**: 1.0.0  
**Last Updated**: 2026-07-07  
**Built for**: Hamburg Branch Operations Team
