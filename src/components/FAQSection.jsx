import React, { useEffect, useRef, useState } from "react";

const FAQ_CATEGORIES = [
  {
    id: "trade-shows",
    label: "Trade Shows & Experiential Marketing",
    questions: [
      {
        q: "What services do you provide for trade shows and brand activations?",
        a: "We provide complete, turnkey trade show and experiential marketing solutions—from custom 3D architectural booth design and engineering to on-site fabrication, tension-fabric displays, interactive technology vitrines, professional brand ambassador staffing, and teardown logistics.",
      },
      {
        q: "How far in advance should we plan our trade show booth?",
        a: "For standard 10x10 or 10x20 inline booths, we typically recommend 8 to 12 weeks. For custom 20x20+ or multi-level island booths with specialized fabrication and interactive tech, 16 to 24 weeks ensures seamless engineering, venue approvals, and on-site rehearsals.",
      },
      {
        q: "Do you handle convention center regulations, labor, and show-site permits?",
        a: "Yes. We manage all facility regulations, electrical drops, rigging permits, EAC (Exhibitor Appointed Contractor) credentials, and union labor coordination across major convention centers nationwide.",
      },
      {
        q: "Can you incorporate interactive touchscreens and product vitrines into our booth?",
        a: "Absolutely. We engineer custom touchscreen software, interactive product vitrines, motion sensors, gamified badge-scanning quizzes, and real-time lead capture dashboards tailored specifically for high-traffic expo environments.",
      },
      {
        q: "Do you offer booth storage, asset refurbishment, and multi-city tour logistics?",
        a: "Yes. We provide secure climate-controlled warehousing, crate logistics, inspection, refurbishment, and scheduled transport for brands running multi-city expo calendars year-round.",
      },
    ],
  },
  {
    id: "interactive-digital",
    label: "Interactive Digital Experiences",
    questions: [
      {
        q: "What types of interactive digital experiences do you create?",
        a: "We design and build immersive AR/VR applications, real-time 3D product configurators, multi-user touchscreen walls, gesture-controlled activations, and gamified experiential kiosks that turn passive observers into active participants.",
      },
      {
        q: "What platforms and devices do your interactive experiences support?",
        a: "Our experiences run smoothly across web browsers (via WebGL / WebGPU), iOS and Android mobile devices, retail touch displays, and spatial headsets like Apple Vision Pro and Meta Quest without requiring complicated software installations.",
      },
      {
        q: "Can 3D configurators and interactive kiosks integrate with our existing e-commerce or CRM?",
        a: "Yes. We build seamless API integrations for Shopify, Salesforce, HubSpot, and custom headless backends, allowing configured selections, custom quotes, and qualified leads to flow straight into your sales pipeline.",
      },
      {
        q: "How do you ensure hardware and software stability during live events?",
        a: "We deploy dedicated on-site technical support, redundant local offline servers, uninterruptible power backups, and automated system health monitoring to guarantee 100% uptime throughout multi-day expos and brand activations.",
      },
    ],
  },
  {
    id: "video-productions",
    label: "Digital Video Productions",
    questions: [
      {
        q: "What digital video production services does Number9 offer?",
        a: "We produce high-impact brand commercials, 3D product visualization animations, CGI & VFX, motion graphics, corporate launch films, and 3D anamorphic billboard content designed to elevate your brand's storytelling across all digital and broadcast channels.",
      },
      {
        q: "Do you produce 3D anamorphic billboard displays and large-format screen content?",
        a: "Yes. We specialize in naked-eye 3D anamorphic billboard animations for Times Square, curved LED architectural corners, airport installations, and high-impact event screens that capture massive public attention.",
      },
      {
        q: "What is the typical production timeline for a commercial or brand video?",
        a: "Timelines generally range from 3 to 6 weeks depending on project complexity, live-action filming requirements, and 3D VFX rendering. We provide structured milestones—from concept and storyboarding to final photoreal lighting, color grading, and audio mastering.",
      },
      {
        q: "Can you deliver video assets formatted for various platforms and aspect ratios?",
        a: "Yes. Every production is mastered at ultra-high resolution (up to 8K) and delivered in multiple aspect ratios: 16:9 for web and broadcast, 9:16 vertical for TikTok and Instagram Reels, 1:1 square, and custom ultra-wide LED formats.",
      },
    ],
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing & Specialty Distribution",
    questions: [
      {
        q: "What does Number9’s digital marketing and specialty distribution cover?",
        a: "We provide end-to-end digital marketing campaigns—including performance advertising, social media marketing, content marketing, SEO, influencer partnerships, and targeted specialty distribution to connect brands with niche, high-value consumer markets.",
      },
      {
        q: "How do you approach campaign strategy and performance tracking?",
        a: "We develop data-driven omnichannel strategies with transparent KPIs. Every campaign is tracked through real-time dashboards measuring impression quality, engagement rates, cost per acquisition, and return on ad spend (ROAS).",
      },
      {
        q: "What is specialty distribution and how does it help brands expand?",
        a: "Specialty distribution connects your products and campaigns directly with targeted niche channels, ethnic and cultural grocery networks, boutique retail, and specialty partner channels where traditional mass distribution falls short.",
      },
      {
        q: "How do we get started working with Number9 on a new campaign?",
        a: "Simply fill out our contact form below or reach out to us directly. Our creative and strategy team will schedule an initial discovery call, assess your objectives, and deliver a tailored proposal within 24 to 48 hours.",
      },
    ],
  },
];

export default function FAQSection({ onNavigate }) {
  const [activeTab, setActiveTab] = useState(FAQ_CATEGORIES[0].id);
  const [openIndex, setOpenIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the mobile category dropdown on outside click / Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onPointer = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const currentCategory =
    FAQ_CATEGORIES.find((cat) => cat.id === activeTab) || FAQ_CATEGORIES[0];

  const handleTabChange = (id) => {
    setActiveTab(id);
    setOpenIndex(0); // Open first question of new category by default
    setIsMenuOpen(false);
  };

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="w-full bg-white dark:bg-[#0B0D0C] font-grift transition-colors duration-300 
    
pt-16 sm:pt-20 lg:pt-28
pb-6 sm:pb-8 lg:pb-10

       overflow-hidden"
    >
      <div className="max-w-[1240px] xl:max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="font-grift-semibold text-[32px] sm:text-[44px] lg:text-[54px] xl:text-[60px] leading-[1.1] tracking-[-0.035em] text-black dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Category Dropdown (mobile) */}
        <div ref={menuRef} className="sm:hidden relative mb-10 max-w-[420px] mx-auto">
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={isMenuOpen}
            className="w-full flex items-center justify-between gap-3 rounded-full px-5 py-3.5 text-left text-[15px] font-grift-semibold bg-[#15B83E] text-white dark:bg-[#32c400] dark:text-black shadow-md shadow-[#15B83E]/25 dark:shadow-[#32c400]/25 cursor-pointer select-none"
          >
            <span className="truncate">{currentCategory.label}</span>
            <svg
              className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 7.5l5 5 5-5" />
            </svg>
          </button>

          {isMenuOpen && (
            <ul
              role="listbox"
              className="absolute z-30 left-0 right-0 mt-2 overflow-hidden rounded-[20px] border border-[#E5E7EB] dark:border-[#27342B] bg-white dark:bg-[#141A16] shadow-xl py-1.5"
            >
              {FAQ_CATEGORIES.map((cat) => {
                const isActive = cat.id === activeTab;
                return (
                  <li key={cat.id} role="option" aria-selected={isActive}>
                    <button
                      type="button"
                      onClick={() => handleTabChange(cat.id)}
                      className={`w-full text-left px-5 py-3 text-[14px] font-grift-medium transition-colors cursor-pointer ${
                        isActive
                          ? "text-[#15B83E] dark:text-[#32c400]"
                          : "text-[#4B5563] hover:bg-[#F3F4F6] dark:text-[#D1D5DB] dark:hover:bg-[#1A241D]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Category Filter Pills (tablet & desktop) */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-10 sm:mb-14">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleTabChange(cat.id)}
                className={`
                  relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full
                  text-[13px] sm:text-[14px] lg:text-[15px] font-grift-medium
                  transition-all duration-200 cursor-pointer select-none
                  ${
                    isActive
                      ? "bg-[#15B83E] text-white shadow-md shadow-[#15B83E]/25 dark:bg-[#32c400] dark:text-black dark:font-grift-semibold dark:shadow-[#32c400]/25"
                      : "bg-[#F3F4F6] text-[#4B5563] border border-transparent hover:border-[#15B83E]/40 hover:text-black hover:bg-[#E5E7EB] dark:bg-[#141A16] dark:text-[#A1A1AA] dark:border-[#27342B] dark:hover:border-[#32c400]/50 dark:hover:text-white dark:hover:bg-[#1A241D]"
                  }
                `}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion Questions List */}
        <div className="max-w-[1060px] mx-auto divide-y divide-[#E5E7EB] dark:divide-[#1F2922] border-t border-b border-[#E5E7EB] dark:border-[#1F2922]">
          {currentCategory.questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left py-5 sm:py-6 lg:py-7 group cursor-pointer select-none"
                >
                  <span
                    className={`
                      text-[17px] sm:text-[19px] lg:text-[21px] font-grift-semibold
                      leading-[1.35] tracking-[-0.015em] pr-6 transition-colors duration-200
                      ${
                        isOpen
                          ? "text-[#15B83E] dark:text-[#32c400]"
                          : "text-[#141414] dark:text-white group-hover:text-[#15B83E] dark:group-hover:text-[#32c400]"
                      }
                    `}
                  >
                    {item.q}
                  </span>

                  {/* Plus / Cross Icon with Smooth Rotation */}
                  <span
                    className={`
                      shrink-0 w-6 h-6 flex items-center justify-center
                      text-[#15B83E] dark:text-[#32c400] transition-transform duration-300 ease-out
                      ${isOpen ? "rotate-45" : "rotate-0"}
                    `}
                    aria-hidden="true"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                {/* Answer Accordion Content */}
                <div
                  className={`
                    grid transition-all duration-300 ease-in-out
                    ${isOpen ? "grid-rows-[1fr] opacity-100 mb-6" : "grid-rows-[0fr] opacity-0"}
                  `}
                >
                  <div className="overflow-hidden">
                    <p className="font-grift text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.68] text-[#555555] dark:text-[#E5E7EB] pr-4 sm:pr-12 max-w-[960px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
