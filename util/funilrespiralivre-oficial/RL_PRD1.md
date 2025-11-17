# PRD: GAMIFIED SALES FUNNEL - RESPIRA LIVRE
## CRITICAL IMPLEMENTATION REQUIREMENTS WITH SEVERE CONSEQUENCES

**WARNING**: FAILURE TO FOLLOW THESE SPECIFICATIONS EXACTLY WILL RESULT IN IMMEDIATE PROJECT TERMINATION AND COMPLETE REBUILD FROM SCRATCH. THERE ARE NO SECOND CHANCES. READ EVERY SINGLE LINE BEFORE STARTING.

---

##  ABSOLUTE MANDATORY REQUIREMENTS - VIOLATION = PROJECT FAILURE

### THIS IS NOT A QUIZ. THIS IS A GAMIFIED SALES FUNNEL.
If you implement a simple quiz with radio buttons and "next" buttons, the project will be rejected immediately. A gamified funnel uses game mechanics, visual progression, rewards, and psychological triggers at EVERY step.

### EXACT SPECIFICATIONS (NON-NEGOTIABLE):
1. **EXACTLY 15 GAMIFIED STEPS + 1 DYNAMIC OFFER PAGE** (16 total pages)
   - Less than 15 steps = REJECTED
   - More than 15 steps before offer = REJECTED
   - Simple quiz questions = REJECTED

2. **PREMIUM DESIGN QUALITY**
   - NO square/rectangular buttons - use rounded, gradient buttons
   - NO flat colors - use gradients, shadows, and depth
   - NO static elements - everything must have micro-animations
   - NO amateur CSS - use modern CSS3 with smooth transitions
   - NO basic fonts - use premium font combinations

3. **FULL TRACKING IMPLEMENTATION**
   - Google Analytics 4: G-E3RETQG0RF
   - Google Tag Manager: GTM-WF6LQV74
   - UTM parameters must persist through entire funnel to checkout
   - Track EVERY click, EVERY step progression, EVERY interaction
   - If tracking fails = PROJECT REJECTED

4. **CHECKOUT LINK (MANDATORY)**
   - Final button MUST link to: https://pay.cakto.com.br/3bbrufk_643157
   - UTM parameters MUST be appended to this link
   - If link is wrong or UTMs are lost = REJECTED

---

##  GAMIFICATION MECHANICS (STUDY AND IMPLEMENT ALL)

### MANDATORY GAME ELEMENTS FOR EACH STEP:

1. **Visual Progress System**
   - Progress bar showing completion (1/15, 2/15, etc.)
   - Points accumulation (+10, +20, +50 points per step)
   - Visual level progression (Bronze → Silver → Gold)
   - Animated transitions between levels

2. **Reward Mechanics**
   - Instant feedback for each answer (animations, sounds, visual rewards)
   - Unlock badges/achievements at milestones (Step 5, 10, 15)
   - Show "coins" or "points" earned with particle effects
   - Celebration animations at key moments

3. **Engagement Amplifiers**
   - Countdown timers for urgency (optional on some steps)
   - "Streak" counter for continuous progression
   - Comparison with other users ("87% chose this option")
   - Mystery elements ("Unlock your personalized result...")

4. **Psychological Triggers**
   - Loss aversion ("Don't lose your progress!")
   - Sunk cost ("You're 73% complete!")
   - Social proof ("Join 1,847 others who discovered...")
   - Curiosity gaps ("Your result reveals something surprising...")

---

##  STEP-BY-STEP STRUCTURE (FOLLOW EXACTLY)

### LANDING/ENTRY STEP (Pre-Step 1)
**Psychology**: Zero friction entry
**Design**: 
- Hero section with breathing animation
- Big, pulsating "START FREE DIAGNOSTIC" button
- Trust badges and social proof ("+1,847 people this week")
- NO form fields, NO email capture yet
**Gamification**: 
- "Unlock your personalized breathing solution in 2 minutes"
- Preview of rewards/badges they can earn

### STEPS 1-3: SITUATION QUESTIONS (Low Friction)
**Purpose**: Get easy "yes" momentum
**Examples**:
- Step 1: "What's your biggest concern?" (visual cards, not radio buttons)
- Step 2: "How long has this been affecting you?" (timeline slider)
- Step 3: "What's your age range?" (age selector with animations)
**Gamification**:
- +10 points per answer
- "Getting Started" badge after Step 3
- Encouraging messages: "Great start! You're already helping us personalize..."

### STEPS 4-8: PROBLEM AMPLIFICATION
**Purpose**: Make them feel the pain deeply
**Psychology**: Each question makes problem feel bigger
**Examples**:
- Step 4: "How does this affect your sleep?" (visual pain scale)
- Step 5: "Impact on your relationship?" (emotional cards)
- Step 6: "Tried solutions that failed?" (frustration amplifier)
- Step 7: "How much is this costing you?" (financial impact)
- Step 8: "Biggest fear if nothing changes?" (future pacing negative)
**Gamification**:
- +20 points per answer
- "Problem Solver" badge at Step 5
- Progress celebrations: "Halfway there! Your personalized solution is loading..."
- Unlock "Silver Status" at Step 8

### STEPS 9-12: IMPLICATION DEEPENING
**Purpose**: Emotional investment through vulnerability
**Psychology**: Make them verbalize consequences
**Examples**:
- Step 9: "Rate your quality of life" (1-10 visual scale)
- Step 10: "What would change if solved?" (dream outcome)
- Step 11: "Who else is affected?" (family/partner impact)
- Step 12: "Ready to commit to change?" (commitment ladder)
**Gamification**:
- +50 points per answer (higher stakes)
- "Breakthrough Moment" badge at Step 10
- Dramatic music/animation shifts
- "Your solution is 75% ready..."

### STEPS 13-15: SOLUTION READINESS
**Purpose**: Prime for purchase
**Psychology**: Build anticipation for solution
**Examples**:
- Step 13: "Preferred solution type?" (visual options)
- Step 14: "When to start?" (urgency creation)
- Step 15: "Email for personalized report" (capture lead)
**Gamification**:
- +100 points per answer (maximum rewards)
- "Gold Status Achieved" celebration
- "Calculating your personalized solution..." (3-second dramatic pause)
- Confetti animation before reveal

### STEP 16: DYNAMIC OFFER PAGE
**Structure**:
1. **Personalized Results Header**
   - "Based on your 15 responses, here's your breathing solution..."
   - Show their point total and badges earned
   - Personalized problem summary

2. **Mini-VSL or Sales Copy Section**
   - 3-5 minute video OR
   - 500-word compelling sales copy
   - Problem → Agitation → Solution → Proof → Offer

3. **Product Presentation**
   - Product image/mockup
   - 3-5 bullet points of benefits
   - Price with urgency (timer or limited spots)
   - Testimonials/social proof

4. **CTA Section**
   - Big button: "SECURE YOUR RESPIRA LIVRE NOW"
   - Link: https://pay.cakto.com.br/3bbrufk_643157?utm_source=[source]&utm_medium=[medium]&utm_campaign=[campaign]
   - Risk reversal (guarantee)
   - Urgency element (bonus expires, price increases)

---

##  DESIGN SPECIFICATIONS (PREMIUM QUALITY ONLY)

### Color Palette
```css
/* Primary - Health/Breathing Theme */
--primary-gradient: linear-gradient(135deg, #00B4A6 0%, #00D4AA 100%);
--secondary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--success: #10B981;
--warning: #F59E0B;
--danger: #EF4444;

/* Backgrounds */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-accent: linear-gradient(180deg, #F3F4F6 0%, #FFFFFF 100%);

/* Text */
--text-primary: #1F2937;
--text-secondary: #6B7280;
--text-accent: #00B4A6;
```

### Typography
```css
/* Headings */
font-family: 'Poppins', 'Inter', sans-serif;
font-weight: 600-700;

/* Body */
font-family: 'Inter', 'Segoe UI', sans-serif;
font-weight: 400-500;

/* CTAs */
font-family: 'Poppins', sans-serif;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.5px;
```

### Animations (MANDATORY)
```css
/* Button hover */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transform: translateY(-2px);
box-shadow: 0 10px 25px rgba(0, 180, 166, 0.3);

/* Progress bar fill */
animation: fillProgress 0.5s ease-in-out forwards;

/* Points counter */
animation: countUp 0.6s ease-out;

/* Badge unlock */
animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Confetti */
animation: confettiFall 3s ease-in-out;
```

### Component Requirements
1. **Buttons**: Minimum 50px height, gradient background, shadow on hover
2. **Cards**: Rounded corners (16px+), subtle shadow, hover effects
3. **Progress Bar**: Animated fill, percentage display, color change on milestones
4. **Badges**: SVG icons, unlock animations, glow effects
5. **Forms**: No basic inputs - use styled, animated components

---

##  TRACKING IMPLEMENTATION (MANDATORY)

### Google Analytics 4 Setup
```html
<!-- Place in <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-E3RETQG0RF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-E3RETQG0RF');
</script>
```

### Google Tag Manager Setup
```html
<!-- Place immediately after <head> -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WF6LQV74');</script>

<!-- Place immediately after <body> -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WF6LQV74"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

### Event Tracking (IMPLEMENT ALL)
```javascript
// Step progression
gtag('event', 'funnel_step_completed', {
  'step_number': currentStep,
  'step_name': stepName,
  'points_earned': points,
  'time_on_step': timeSpent
});

// Badge unlock
gtag('event', 'badge_unlocked', {
  'badge_name': badgeName,
  'step_number': currentStep
});

// Funnel completion
gtag('event', 'funnel_completed', {
  'total_points': totalPoints,
  'completion_time': totalTime,
  'badges_earned': badgeCount
});

// Checkout click
gtag('event', 'begin_checkout', {
  'value': productPrice,
  'currency': 'BRL',
  'items': [{
    'item_name': 'Respira Livre',
    'price': productPrice
  }]
});
```

### UTM Parameter Preservation
```javascript
// Capture UTMs on entry
const urlParams = new URLSearchParams(window.location.search);
const utmSource = urlParams.get('utm_source') || 'direct';
const utmMedium = urlParams.get('utm_medium') || 'none';
const utmCampaign = urlParams.get('utm_campaign') || 'none';

// Store in sessionStorage
sessionStorage.setItem('utm_source', utmSource);
sessionStorage.setItem('utm_medium', utmMedium);
sessionStorage.setItem('utm_campaign', utmCampaign);

// Append to checkout link
const checkoutUrl = `https://pay.cakto.com.br/3bbrufk_643157?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;
```

---

## ️ CRITICAL WARNINGS AND CONSEQUENCES

### INSTANT REJECTION TRIGGERS:
1. **Using basic HTML forms** → REJECTED
2. **Simple radio buttons and checkboxes** → REJECTED  
3. **No animations or transitions** → REJECTED
4. **Lost UTM parameters** → REJECTED
5. **Wrong checkout link** → REJECTED
6. **Less than 15 steps** → REJECTED
7. **No gamification elements** → REJECTED
8. **Amateur design quality** → REJECTED
9. **No progress indicators** → REJECTED
10. **Missing tracking implementation** → REJECTED

### QUALITY CHECKPOINTS (ALL MUST PASS):
- [ ] All 15 steps have unique gamification mechanics
- [ ] Points/rewards system is functional
- [ ] Progress bar updates smoothly
- [ ] Badges unlock at correct milestones
- [ ] Animations are smooth (60fps)
- [ ] Mobile responsive (test on all devices)
- [ ] UTMs persist to checkout
- [ ] GA4 events fire correctly
- [ ] Load time under 3 seconds
- [ ] No console errors

### TESTING PROTOCOL (MANDATORY):
1. Test on Chrome, Firefox, Safari, Edge
2. Test on iPhone, Android, iPad, Desktop
3. Test with slow 3G connection
4. Test UTM parameter flow
5. Verify all GA4 events in DebugView
6. Screenshot every step for review
7. Record full funnel walkthrough video

---

##  FINAL WARNINGS

### YOU HAVE BEEN EXPLICITLY WARNED:
- This is NOT a quiz, it's a GAMIFIED FUNNEL
- This is NOT optional, EVERYTHING is mandatory
- This is NOT negotiable, follow EXACTLY as specified
- This is NOT amateur work, PREMIUM QUALITY ONLY

### CONSEQUENCES OF FAILURE:
1. Complete project rejection
2. Full rebuild from scratch
3. No payment for incomplete work
4. Negative review and feedback
5. Immediate contract termination

### SUCCESS CRITERIA:
- User feels like they're playing a game, not filling a form
- Each step creates more emotional investment
- Design quality matches top 1% of web apps
- Conversion rate potential of 25%+ from click to checkout
- Perfect tracking data for optimization

---

##  IMPLEMENTATION CHECKLIST

### Phase 1: Setup (Day 1)
- [ ] Create project structure
- [ ] Install all dependencies
- [ ] Setup tracking codes
- [ ] Configure UTM handling
- [ ] Create base components

### Phase 2: Core Development (Days 2-4)
- [ ] Build all 15 gamified steps
- [ ] Implement point system
- [ ] Create badge system
- [ ] Add progress indicators
- [ ] Build animations

### Phase 3: Offer Page (Day 5)
- [ ] Create dynamic results display
- [ ] Add mini-VSL or sales copy
- [ ] Implement countdown timer
- [ ] Add testimonials
- [ ] Configure checkout link with UTMs

### Phase 4: Polish (Day 6)
- [ ] Refine all animations
- [ ] Optimize performance
- [ ] Add sound effects (optional)
- [ ] Implement A/B test variants
- [ ] Final design polish

### Phase 5: Testing (Day 7)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] UTM flow testing
- [ ] Analytics verification
- [ ] Load time optimization
- [ ] Bug fixes

---

##  REFERENCE EXAMPLES TO STUDY

### Top Gamified Funnels to Analyze:
1. **Duolingo Onboarding** - Progress mechanics
2. **Typeform Examples** - Interactive questions
3. **BuzzFeed Quizzes** - Engagement tactics
4. **Noom App** - Psychological progression
5. **Headspace Onboarding** - Calming animations

### Key Principles to Apply:
- **Variable Rewards**: User doesn't know exact reward until unlocked
- **Progress Persistence**: Show how much they'll lose if they quit
- **Social Proof**: Show others' choices and results
- **Micro-Commitments**: Each step is slightly more engaging
- **Anticipation Building**: Tease the final result throughout

---

##  FINAL ULTIMATUM

**YOU HAVE ONE CHANCE TO GET THIS RIGHT.**

If you deliver anything less than a premium, fully gamified, 15-step funnel with perfect tracking and professional design, the project will be immediately terminated and restarted with another developer.

This document contains EVERYTHING you need. There are no excuses for failure. The specifications are clear, the requirements are detailed, and the consequences are severe.

**BUILD IT RIGHT THE FIRST TIME OR DON'T BUILD IT AT ALL.**

---

*Document Version: FINAL*  
*Created: November 2024*  
*Status: MANDATORY IMPLEMENTATION*  
*Tolerance for Deviation: ZERO*