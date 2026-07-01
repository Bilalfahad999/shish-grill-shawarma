// ── Content configuration ────────────────────────────────────────────────────
// Edit all page content here. Every heading, paragraph, and label is centralised
// so a future CMS or admin dashboard can replace this file as a data source.

export const ABOUT_CONTENT = {
  hero: {
    eyebrow: "Our Story",
    headline: "Authentic Charcoal Grill & Middle Eastern Flavours",
    intro:
      "Born from a passion for honest, generous cooking, Shish Shawarma & Grill brings the warmth of Middle Eastern hospitality to Melbourne. Every meal is made fresh — from the bread to the sauces — and cooked over real charcoal.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=85",
    imageAlt: "Shish Shawarma & Grill restaurant interior",
  },

  story: {
    eyebrow: "How It Started",
    headline: "Food Made With Intention",
    paragraphs: [
      "At Shish, we believe great food starts with great ingredients. We source fresh produce daily and prepare everything in-house — from our house-made garlic sauce to our marinated meats.",
      "Our charcoal grill isn't just a cooking method — it's a commitment. The slow, natural heat creates a depth of flavour that a flat top simply can't match. It takes longer, but the result is worth it.",
      "We're a family-friendly restaurant where generous portions are the norm, not the exception. Whether you're grabbing a quick wrap for lunch or sitting down for a full platter, we want you to leave satisfied.",
    ],
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85",
    imageAlt: "Fresh ingredients being prepared",
  },

  kitchen: {
    eyebrow: "The Kitchen",
    headline: "Prepared Fresh. Every Single Day.",
    description:
      "Nothing at Shish comes out of a packet. Our kitchen team prepares everything from scratch each morning — marinating meats, making sauces, and prepping fresh salads so that every dish that leaves the kitchen is at its best.",
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1400&q=85",
    imageAlt: "Charcoal grill in action",
    highlights: [
      "Meats marinated fresh daily",
      "Charcoal-fired grill only",
      "House-made garlic sauce",
      "Fresh salads cut every service",
      "House-made hummus & dips",
      "No artificial preservatives",
    ],
  },

  values: [
    {
      icon: "fresh",
      title: "Fresh Every Day",
      description:
        "Ingredients are sourced and prepared fresh daily. We don't cut corners on freshness.",
    },
    {
      icon: "halal",
      title: "100% Halal",
      description:
        "All our meats are sourced from certified Halal suppliers. No exceptions.",
    },
    {
      icon: "recipes",
      title: "Authentic Recipes",
      description:
        "Traditional Middle Eastern recipes, made the right way — without shortcuts.",
    },
    {
      icon: "charcoal",
      title: "Charcoal Grilled",
      description:
        "Real charcoal, real smoke, real flavour. There's no substitute for the grill.",
    },
    {
      icon: "portions",
      title: "Large Portions",
      description:
        "We believe in value. You'll never leave Shish feeling like you needed more.",
    },
    {
      icon: "service",
      title: "Friendly Service",
      description:
        "We treat every guest like family. Fast, warm, and genuinely welcoming.",
    },
  ],

  cta: {
    headline: "Ready for Your Next Meal?",
    subtext: "Dine in, takeaway, or order online — we're ready when you are.",
  },
};

export const CATERING_CONTENT = {
  hero: {
    eyebrow: "Catering",
    headline: "Catering for Every Occasion",
    description:
      "Whether you're hosting a family gathering, workplace lunch or special celebration, we'll help make your event memorable with freshly prepared Middle Eastern favourites.",
    image:
      "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1600&q=85",
    imageAlt: "Catering spread of Middle Eastern food",
  },

  types: [
    {
      icon: "users",
      title: "Family Gatherings",
      description:
        "Feed the whole family with generous platters of charcoal-grilled meats, fresh salads, and house-made dips.",
    },
    {
      icon: "building",
      title: "Corporate Lunches",
      description:
        "Impress your team with a spread that's fresh, halal, and crowd-pleasing. Flexible quantity and pickup options.",
    },
    {
      icon: "cake",
      title: "Birthday Parties",
      description:
        "Make your celebration delicious. We'll take care of the food so you can enjoy your event.",
    },
    {
      icon: "school",
      title: "School Events",
      description:
        "Healthy, halal, and kid-approved. Great for school fetes, sport days, and end-of-year events.",
    },
    {
      icon: "heart",
      title: "Community Events",
      description:
        "Supporting community and cultural events with reliable, quality catering at scale.",
    },
    {
      icon: "star",
      title: "Private Functions",
      description:
        "Tailored menus for private dining, office parties, team celebrations, and more.",
    },
  ],

  highlights: [
    { icon: "flame", label: "Freshly Prepared" },
    { icon: "check-circle", label: "100% Halal" },
    { icon: "utensils", label: "Generous Portions" },
    { icon: "layers", label: "Flexible Menus" },
    { icon: "truck", label: "Pickup or Delivery" },
    { icon: "clock", label: "On Time, Every Time" },
  ],

  packages: [
    {
      name: "Package A",
      tagline: "Perfect for small gatherings",
      serves: "Serves 10–20 guests",
      description:
        "A great starting point. Includes a selection of grilled meats, fresh salads, pita bread, and dips.",
      items: [
        "Choice of 2 grilled meats",
        "2 fresh salads",
        "Hummus & garlic sauce",
        "Fresh pita bread",
        "Disposable serving ware",
      ],
      note: "Contact us for pricing",
      badge: null,
    },
    {
      name: "Package B",
      tagline: "Our most popular catering pack",
      serves: "Serves 20–40 guests",
      description:
        "A full spread that covers all bases. More variety, more volume, more value.",
      items: [
        "Choice of 3 grilled meats",
        "3 fresh salads",
        "Hummus, baba ganoush & garlic sauce",
        "Fresh pita bread",
        "Dessert selection",
        "Disposable serving ware",
      ],
      note: "Contact us for pricing",
      badge: "Most Popular",
    },
    {
      name: "Package C",
      tagline: "For large events & celebrations",
      serves: "Serves 40+ guests",
      description:
        "Full-service catering for large groups. Custom menu options available on request.",
      items: [
        "Full menu selection",
        "Unlimited salad & bread",
        "Full dip & sauce spread",
        "Desserts included",
        "Staff assistance available",
        "Custom dietary options",
      ],
      note: "Contact us for a custom quote",
      badge: null,
    },
  ],
};

export const CONTACT_CONTENT = {
  hero: {
    eyebrow: "Find Us",
    headline: "Come Visit Us",
    description:
      "We'd love to hear from you. Reach out to make a booking, ask about catering, or simply say hello.",
  },
};

export const FAQ_CONTENT = {
  headline: "Frequently Asked Questions",
  subtext:
    "Everything you need to know about dining with us, our catering, and how to get in touch.",
  items: [
    {
      question: "Do you offer takeaway?",
      answer:
        "Yes! All of our menu items are available for takeaway. You can order in person, call ahead, or place your order online through our website for convenient pickup.",
    },
    {
      question: "Do you offer delivery?",
      answer:
        "Yes, we offer delivery in the local area. You can order directly through our website. A flat delivery fee applies, and there is a minimum order value for delivery.",
    },
    {
      question: "Are all meals halal?",
      answer:
        "Yes. All meats used at Shish Shawarma & Grill are sourced from certified Halal suppliers. This applies to every dish on our menu.",
    },
    {
      question: "Do you provide catering?",
      answer:
        "Yes, we cater for a range of events including family gatherings, corporate lunches, birthday parties, school events, and private functions. Visit our Catering page or contact us directly to discuss your requirements.",
    },
    {
      question: "Can I place a large group order?",
      answer:
        "Absolutely. For large orders, we recommend calling ahead so we can prepare everything fresh and have it ready on time. Platters and bulk orders are available — ask us for details.",
    },
    {
      question: "Do you have vegetarian options?",
      answer:
        "Yes. We have a range of vegetarian options including falafel, halloumi, fresh salads, and vegetarian wraps. These are clearly marked on our menu.",
    },
    {
      question: "Can I call ahead to place my order?",
      answer:
        "Yes, absolutely. You can call us during opening hours to place your order and we'll have it ready for you when you arrive, minimising your wait time.",
    },
    {
      question: "How do I contact you about catering?",
      answer:
        "You can submit a catering enquiry through our website, call us directly during opening hours, or use the contact form on our Contact page. We aim to respond to all catering enquiries within 24 hours.",
    },
    {
      question: "Do you have dine-in seating?",
      answer:
        "Yes, we have dine-in seating available. We welcome walk-ins and also take bookings for larger groups. Please call ahead if you're coming with a large party.",
    },
    {
      question: "What are your opening hours?",
      answer:
        "We are open Monday to Thursday 11am–10pm, Friday and Saturday 11am–11pm, and Sunday 12pm–9:30pm. Hours may vary on public holidays — follow us on social media for any updates.",
    },
  ],
};

