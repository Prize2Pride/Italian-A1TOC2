# Italian Civilization Restoration Platform - TODO

## Phase 1: Codebase Audit & Monetization Removal
- [x] Audit Italian-A1TOC2 repository for all payment/subscription logic
- [x] Remove Stripe integration (if present) - None found
- [x] Remove subscription tier gates and paywall logic - None found
- [x] Remove premium feature flags and access controls - None found
- [x] Remove pricing pages and payment UI components - Demo "Billing" menu items only
- [x] Remove monetization-related environment variables - None found
- [x] Verify all lessons are marked as published and free - All set to isPublished: true
- [x] Remove any API endpoints that enforce payment requirements - None found
- [x] Remove authentication gates that block free access - None found
- [x] Document removed monetization components - Codebase is clean

## Phase 2: Visual Design & Style System
- [x] Preserve original design (user requested no alterations)
- [x] Copied all original components and styling
- [x] Maintained color palette, typography, and design tokens
- [x] Global styling preserved in client/src/index.css
- [ ] Design landing page mockup
- [ ] Design dashboard/learning interface mockup

## Phase 3: Database Schema Enhancement
- [x] Extend lessons table with register level field (volgare, colloquiale, neutro, formale, letterario)
- [x] Add culture_modules table (art, music, cuisine, history, dialects)
- [x] Add literature_timeline table (authors, works, periods, CEFR level)
- [x] Add pronunciation_guides table (word, IPA, phonetic breakdown, audio_url)
- [x] Add user_preferences table (preferred register, learning pace)
- [x] Create migration SQL files
- [x] Apply migrations via webdev_execute_sql - 8 tables created successfully

## Phase 4: Core Platform Architecture
- [x] Design navigation structure (Home, Courses, Literature, Culture, Professor, Progress)
- [x] Create main layout component with navigation - DashboardLayout preserved
- [x] Implement routing for all major sections - App.tsx ready
- [ ] Build lesson browser/selector UI
- [ ] Create lesson viewer component shell
- [ ] Build progress dashboard component shell
- [x] Implement user authentication flow (free signup) - OAuth ready
- [x] Create responsive mobile layout - Tailwind responsive design ready

## Phase 5: A1-C2 Curriculum Structure
- [ ] Define A1 lesson topics (alphabet, pronouns, greetings, daily routine, etc.)
- [ ] Define A2 lesson topics (past tense, shopping, travel, etc.)
- [ ] Define B1 lesson topics (subjunctive, complex sentences, etc.)
- [ ] Define B2 lesson topics (nuanced expressions, literature, etc.)
- [ ] Define C1 lesson topics (advanced grammar, stylistic variations, etc.)
- [ ] Define C2 lesson topics (mastery, regional dialects, literary analysis, etc.)
- [x] Create lesson data structure with vocabulary, grammar, reading comprehension - Schema ready
- [ ] Seed initial lessons into database (at least 5 per level)
- [x] Create lesson progression logic - Router procedures ready

## Phase 6: Language Learning Modules - Vocabulary & Grammar
- [ ] Build vocabulary viewer with Italian word, translation, pronunciation
- [ ] Implement TTS for vocabulary words (Web Speech API)
- [ ] Build grammar explanation component with examples
- [ ] Create interactive grammar examples with register variations
- [ ] Build reading comprehension viewer with Italian text
- [ ] Implement TTS for reading passages
- [ ] Add Arabic translation toggle for reading passages
- [ ] Create side-by-side register comparison view

## Phase 7: Interactive Exercises
- [ ] Build fill-in-the-blank exercise component
- [ ] Build multiple-choice exercise component
- [ ] Build sentence reordering exercise component
- [ ] Build true/false exercise component
- [ ] Implement instant feedback system
- [ ] Create exercise scoring logic
- [ ] Build exercise result summary component
- [ ] Implement exercise data persistence

## Phase 8: Italian Register Spectrum Module
- [ ] Create register level definitions (volgare, colloquiale, neutro, formale, letterario)
- [ ] Build register comparison UI (side-by-side examples)
- [ ] Populate register examples for common phrases (greeting, apology, request, etc.)
- [ ] Implement register filtering in lessons
- [ ] Create register learning progression (A1-C2)
- [ ] Add register context explanations
- [ ] Build register-aware TTS (different tone/pace per register)

## Phase 9: AI Professor Chat Module
- [ ] Integrate LLM API (Claude or similar)
- [ ] Build chat interface component
- [ ] Implement message history storage
- [ ] Create system prompt for Italian teaching
- [ ] Add register-level parameter to chat
- [ ] Implement streaming responses
- [ ] Add context awareness (current lesson, user level)
- [ ] Build chat history management
- [ ] Remove any usage limits or rate limiting (unlimited free access)
- [ ] Create chat feedback/rating system

## Phase 10: Italian Literature & Civilization Timeline
- [ ] Create timeline data structure (period, authors, works, cultural context)
- [ ] Populate timeline: Medieval period (Dante, Petrarch, Boccaccio)
- [ ] Populate timeline: Renaissance (Machiavelli, Ariosto, Tasso)
- [ ] Populate timeline: 17th-18th centuries (Goldoni, Metastasio)
- [ ] Populate timeline: 19th century (Manzoni, Leopardi, Risorgimento)
- [ ] Populate timeline: 20th century (D'Annunzio, Pirandello, Calvino, Eco)
- [ ] Populate timeline: Contemporary (modern authors and works)
- [ ] Build timeline visualization component
- [ ] Create literature excerpt viewer (with CEFR-appropriate selections)
- [ ] Add author biography component
- [ ] Link literature to CEFR levels
- [ ] Build literature search/filter functionality

## Phase 11: Italian Culture Modules
- [ ] Create culture module structure (art, music, cuisine, history, dialects)
- [ ] Build art module: major movements, artists, masterworks
- [ ] Build music module: opera, classical, folk traditions
- [ ] Build cuisine module: regional dishes, food culture, dining etiquette
- [ ] Build history module: key events, periods, figures (Risorgimento, unification, etc.)
- [ ] Build dialects module: regional variations, pronunciation differences
- [ ] Create culture content viewer component
- [ ] Link culture modules to lessons and CEFR levels
- [ ] Add multimedia support (images, videos where applicable)
- [ ] Create culture quiz/exercises

## Phase 12: Text-to-Speech Integration
- [ ] Implement Web Speech API for basic TTS
- [ ] Add LLM-powered pronunciation guides (IPA, phonetic breakdown)
- [ ] Create TTS control UI (play, pause, speed adjustment)
- [ ] Add pronunciation guide viewer
- [ ] Implement register-aware TTS variations
- [ ] Create audio caching strategy
- [ ] Add accessibility features (captions, transcripts)
- [ ] Test TTS across browsers and devices

## Phase 13: User Progress Tracking & Dashboard
- [ ] Build progress dashboard component
- [ ] Implement lesson completion tracking
- [ ] Create quiz score tracking
- [ ] Build time-spent tracking
- [ ] Implement level advancement logic
- [ ] Create progress visualization (charts, progress bars)
- [ ] Build achievement/badge system
- [ ] Create user statistics view
- [ ] Implement progress export functionality
- [ ] Build learning streak tracker

## Phase 14: Backend API Routes & Database Queries
- [x] Create lessons router (list, get, filter by level) - COMPLETE
- [ ] Create exercises router (submit, get results)
- [x] Create professor/chat router (send message, get history) - COMPLETE with register levels
- [x] Create culture router (get modules, search) - COMPLETE
- [x] Create literature router (get timeline, search, get excerpts) - COMPLETE
- [x] Create user router (get profile, update preferences) - Preferences table ready
- [x] Create pronunciation router (get guides, generate new) - COMPLETE
- [x] Implement all database queries in server/db.ts - ALL QUERIES IMPLEMENTED
- [x] Add proper error handling and validation - Error handling in place

## Phase 15: Responsive Design & Mobile Optimization
- [ ] Test all components on mobile devices (375px width)
- [ ] Implement mobile-friendly navigation
- [ ] Optimize touch interactions
- [ ] Test tablet layout (768px width)
- [ ] Ensure readable text sizes on all devices
- [ ] Test TTS on mobile browsers
- [ ] Optimize performance for slower connections
- [ ] Create mobile-specific UI patterns where needed

## Phase 16: Accessibility & Internationalization
- [ ] Add ARIA labels to all interactive elements
- [ ] Ensure keyboard navigation works throughout
- [ ] Test with screen readers
- [ ] Ensure sufficient color contrast
- [ ] Add alt text to all images
- [ ] Create focus indicators
- [ ] Support RTL layout for Arabic translations
- [ ] Add language switching capability (if needed)

## Phase 17: Testing & Quality Assurance
- [ ] Write unit tests for database queries (vitest)
- [ ] Write unit tests for API routes
- [ ] Write component tests for major UI components
- [ ] Test lesson progression logic
- [ ] Test exercise scoring logic
- [ ] Test progress tracking
- [ ] Test TTS functionality across browsers
- [ ] Test chat functionality
- [ ] Performance testing (load times, bundle size)
- [ ] Security audit (no payment logic, proper auth)

## Phase 18: Documentation & Deployment Preparation
- [ ] Update README.md with full feature list
- [ ] Create user guide/help documentation
- [ ] Document API endpoints
- [ ] Create developer documentation
- [ ] Set up GitHub repository (if not already done)
- [ ] Create deployment configuration
- [ ] Set up CI/CD pipeline (if needed)
- [ ] Create backup/data export strategy

## Phase 19: Final Polish & Launch
- [ ] Review all UI for consistency
- [ ] Add micro-interactions and polish
- [ ] Optimize images and assets
- [ ] Test all features end-to-end
- [ ] Create landing page with feature overview
- [ ] Set up analytics (optional, privacy-respecting)
- [ ] Create social media assets
- [ ] Prepare launch announcement
- [ ] Deploy to production
- [ ] Create checkpoint for launch version

## Known Issues & Technical Debt
- [ ] Audit existing code for any remaining monetization references
- [ ] Review all environment variables for payment-related configs
- [ ] Check for hidden payment logic in components
- [ ] Review API responses for payment gates

## Notes
- All features must be completely free with zero monetization
- No subscription tiers, paywalls, or premium features
- All lessons and resources must be publicly accessible
- AI Professor chat must have no usage limits
- Platform should be open-source friendly
- Focus on educational quality and accessibility
