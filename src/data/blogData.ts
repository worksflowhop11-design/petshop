import { BlogPost, BlogCategory } from '../types';

import blogDogNutritionImg from '../assets/images/blog_dog_nutrition_bowl_1788791031260.jpg';
import blogCatFoodBowlImg from '../assets/images/blog_cat_food_bowl_1788875376026.jpg';
import blogDogCareHappyImg from '../assets/images/blog_dog_care_happy_1788790998416.jpg';
import blogCatCareCozyImg from '../assets/images/blog_cat_care_cozy_1788791050193.jpg';
import blogDogFeedingGuideImg from '../assets/images/blog_dog_feeding_guide_1788875395087.jpg';
import blogCatActivePlayImg from '../assets/images/blog_cat_active_play_1788875413350.jpg';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Dog Care',
  'Cat Care',
  'Pet Nutrition',
  'Grooming',
  'Pet Health',
  'Pet Lifestyle',
  'Training & Behavior',
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '10-essential-nutrition-tips-healthy-dogs',
    slug: '10-essential-nutrition-tips-for-healthy-dogs',
    category: 'Pet Nutrition',
    title: '10 Essential Nutrition Tips for Healthy Dogs',
    description:
      'Discover veterinarian-approved nutritional principles to support your dog’s immune system, joint longevity, muscle tone, and everyday vitality.',
    image: blogDogNutritionImg,
    imageAlt: 'Healthy adult dog with a fresh bowl of nutritious balanced dog food and real chicken',
    publishDate: 'September 6, 2026',
    readTime: '5 min read',
    featured: true,
    author: {
      name: 'Dr. Ananya Sharma',
      role: 'Veterinary Nutritional Consultant',
    },
    content: {
      intro:
        'Nutrition is the single most controllable factor influencing your dog’s lifespan and daily quality of life. Providing an optimal canine diet goes beyond merely filling a food bowl—it requires understanding species-appropriate protein quality, micronutrient balance, and metabolic health.',
      sections: [
        {
          heading: '1. Whole Animal Protein as the Primary Foundation',
          body:
            'Dogs thrive when their primary calories come from bioavailable animal proteins like real chicken, lamb, or wild salmon. Whole meats supply essential amino acids like taurine, arginine, and lysine necessary for cardiac health and lean muscle tone.',
          bulletPoints: [
            'Look for foods listing real deboned meat as the first ingredient.',
            'Avoid obscure meat by-product derivatives and excessive corn or wheat fillers.',
            'Rotate protein sources periodically to prevent food sensitivities.',
          ],
        },
        {
          heading: '2. Balance Omega-3 and Omega-6 Fatty Acids',
          body:
            'Omega-3 fatty acids (EPA & DHA) from fish oils reduce inflammation in aging joints, soothe sensitive skin, and promote a glossy, flake-free coat. A healthy ratio keeps cell membranes resilient.',
        },
        {
          heading: '3. Regulate Portion Sizes with Measuring Precision',
          body:
            'Overfeeding by just 10% can gradually cause canine obesity, placing enormous strain on hips and accelerating diabetes risk. Always measure daily rations with a standard kitchen scale or calibrated measuring cup.',
        },
        {
          heading: '4. Active Probiotics for Gut Biome Balance',
          body:
            'Over 70% of a dog’s immune system resides in their digestive tract. Probiotic-fortified diets nurture beneficial flora, curtail loose stools, and enhance nutrient absorption.',
        },
      ],
      keyTakeaways: [
        'Real animal proteins are essential for canine metabolic health.',
        'Precision portioning prevents obesity-related orthopedic strain.',
        'Omega-3 fatty acids protect heart, skin, and joint functions.',
        'Digestive enzymes and probiotics optimize nutrient assimilation.',
      ],
      conclusion:
        'By applying these 10 core nutritional foundations, you equip your canine companion with lifelong stamina, clean teeth, and boundless playful energy.',
    },
  },
  {
    id: 'how-to-choose-right-food-cat',
    slug: 'how-to-choose-the-right-food-for-your-cat',
    category: 'Cat Care',
    title: 'How to Choose the Right Food for Your Cat',
    description:
      'Understand the unique biological needs of obligate carnivores, how to evaluate ingredient labels, and which recipes best fit your cat’s lifestyle.',
    image: blogCatFoodBowlImg,
    imageAlt: 'Healthy cat eating delicious wet food from a modern ceramic bowl on a wooden floor',
    publishDate: 'September 2, 2026',
    readTime: '4 min read',
    featured: true,
    author: {
      name: 'Dr. Priya Nambiar',
      role: 'Feline Medicine Specialist',
    },
    content: {
      intro:
        'Cats are true obligate carnivores with evolutionary nutritional demands that differ fundamentally from dogs and humans. Selecting the right diet requires respecting their strict need for animal protein, high moisture, and amino acids they cannot synthesize internally.',
      sections: [
        {
          heading: 'Obligate Carnivore Biology: Taurine & Arginine',
          body:
            'Feline bodies cannot convert plant precursors into essential amino acids like taurine. Without dietary taurine from real meat, cats can suffer irreversible blindness and cardiomyopathy. Never compromise on certified animal-based formulas.',
          bulletPoints: [
            'Check for explicit taurine supplementation on all guaranteed analyses.',
            'Select formulas with poultry, lamb, or ocean fish as leading ingredients.',
            'Avoid high-carbohydrate grain fillers that can stress feline insulin regulation.',
          ],
        },
        {
          heading: 'Prioritizing Hydration: Wet Food & Broths',
          body:
            'Cats have a naturally low thirst drive inherited from desert ancestors. Feeding dry food alone can lead to chronically concentrated urine, increasing the risk of urinary crystals (FLUTD). Incorporating wet canned food provides vital hydration for kidney wellness.',
        },
        {
          heading: 'Tailoring Recipes to Life Stages',
          body:
            'Growing kittens need DHA and calorie-dense recipes for rapid bone formation. Indoor adults benefit from hairball control fibers and moderate calories, while seniors need easily digestible proteins and reduced phosphorus.',
        },
      ],
      keyTakeaways: [
        'Cats must receive dietary animal protein and essential taurine daily.',
        'High moisture intake shields cats from chronic kidney disease.',
        'Indoor lifestyle requires controlled calorie formulations to prevent lethargy.',
      ],
      conclusion:
        'A thoughtfully chosen feline diet pays dividends in a radiant coat, clean litter box habits, and purrs of genuine mealtime satisfaction.',
    },
  },
  {
    id: 'daily-care-tips-every-pet-parent-should-know',
    slug: 'daily-care-tips-every-pet-parent-should-know',
    category: 'Dog Care',
    title: 'Daily Care Tips Every Pet Parent Should Know',
    description:
      'Practical everyday routines spanning dental hygiene, physical exercise, mental enrichment, and preventative care for happy pets.',
    image: blogDogCareHappyImg,
    imageAlt: 'Happy smiling golden retriever enjoying outdoor park sunshine with joyful expression',
    publishDate: 'August 27, 2026',
    readTime: '4 min read',
    featured: true,
    author: {
      name: 'Rohan Mehta',
      role: 'Pet Lifestyle & Care Specialist',
    },
    content: {
      intro:
        'Great pet parenting is built on small, affectionate daily habits. Consistency in nutrition, daily movement, preventative hygiene, and positive affection builds an unbreakable bond of trust and shields your pet from preventable illnesses.',
      sections: [
        {
          heading: 'Daily Dental Brushing and Plaque Control',
          body:
            'Periodontal disease impacts more than 80% of dogs and cats by age three. Brushing your pet’s teeth with enzymatic pet toothpaste, combined with crunchy dental kibble, sweeps away tartar and protects internal organs from bacterial leakage.',
        },
        {
          heading: 'Structured Physical Exercise & Scent Walks',
          body:
            'Daily exercise satisfies both physical and psychological needs. For dogs, allow "sniffari" strolls where they explore environmental scents. For cats, schedule two 10-minute interactive hunting play sessions.',
        },
        {
          heading: 'Consistent Feeding Schedules',
          body:
            'Free-feeding (leaving food out all day) leads to overeating, spoiled wet food, and poor digestion. Set consistent breakfast and dinner times to regulate biological clocks and monitor appetite changes immediately.',
        },
      ],
      keyTakeaways: [
        'Preventative dental care prevents costly veterinary extractions.',
        'Mental scent-work exhausts hyperactive dogs more effectively than running alone.',
        'Scheduled feeding allows immediate detection of appetite changes.',
      ],
      conclusion:
        'By integrating these simple daily habits into your home routine, you give your furry family members the gift of vibrant, stress-free health.',
    },
  },
  {
    id: 'common-pet-nutrition-mistakes-to-avoid',
    slug: 'common-pet-nutrition-mistakes-to-avoid',
    category: 'Pet Nutrition',
    title: 'Common Pet Nutrition Mistakes to Avoid',
    description:
      'Learn about table scrap dangers, rapid diet switching, over-supplementation, and how to safeguard your pet’s digestive wellness.',
    image: blogCatCareCozyImg,
    imageAlt: 'Peaceful cat resting comfortably on a warm knitted blanket in cozy modern home',
    publishDate: 'August 20, 2026',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'Dr. Ananya Sharma',
      role: 'Veterinary Nutritional Consultant',
    },
    content: {
      intro:
        'Even the most devoted pet parents can unintentionally make dietary mistakes that cause gastrointestinal upset or long-term imbalances. Recognizing these common pitfalls allows you to make informed decisions that protect your pet’s gut and vitality.',
      sections: [
        {
          heading: 'Mistake 1: Abrupt Food Transitions',
          body:
            'Switching pet food brands overnight shocks the intestinal microbiome, leading to vomiting, diarrhea, and food aversion. Always transition gradually over 7 to 10 days by steadily increasing the proportion of new food.',
          bulletPoints: [
            'Days 1-3: 75% old food, 25% new food.',
            'Days 4-6: 50% old food, 50% new food.',
            'Days 7-9: 25% old food, 75% new food.',
            'Day 10: 100% new PETSHOP formula.',
          ],
        },
        {
          heading: 'Mistake 2: Feeding Toxic Human Table Scraps',
          body:
            'High-fat scraps trigger painful pancreatitis in dogs, while ingredients like onions, garlic, grapes, raisins, chocolate, and xylitol are acutely toxic. Stick to veterinarian-approved pet treats.',
        },
        {
          heading: 'Mistake 3: Uncontrolled Caloric Treat Stacking',
          body:
            'Training treats and chews can sneakily account for up to 30% of a pet’s daily calories. Ensure treats never exceed 10% of total daily caloric intake to prevent obesity.',
        },
      ],
      keyTakeaways: [
        'Always transition diets gradually over 7 to 10 days.',
        'Beware of human pantry toxins like onions, garlic, and chocolate.',
        'Limit treats to under 10% of daily total calories.',
      ],
      conclusion:
        'Avoiding these simple nutrition traps keeps your pet’s digestive tract running smoothly and prevents emergency vet visits.',
    },
  },
  {
    id: 'how-much-food-should-your-dog-eat',
    slug: 'how-much-food-should-your-dog-eat',
    category: 'Dog Care',
    title: 'How Much Food Should Your Dog Eat?',
    description:
      'A practical guide to calculating accurate caloric requirements based on breed size, life stage, weight goals, and activity level.',
    image: blogDogFeedingGuideImg,
    imageAlt: 'Attentive dog waiting patiently by a measuring cup and clean bowl of nutritious dog kibbles',
    publishDate: 'August 14, 2026',
    readTime: '4 min read',
    featured: false,
    author: {
      name: 'Rohan Mehta',
      role: 'Pet Nutrition Specialist & Formulator',
    },
    content: {
      intro:
        'There is no universal "one-size-fits-all" food portion for dogs. A 10kg couch-loving bulldog requires vastly fewer calories than a 10kg working terrier. Learning how to determine exact portion sizes keeps your dog at their ideal body condition score.',
      sections: [
        {
          heading: 'Understanding Body Condition Score (BCS)',
          body:
            'Instead of fixating solely on scale weight, evaluate your dog’s silhouette. On a 1-to-9 BCS scale, a healthy dog sits at 4 or 5: you should easily feel their ribs without pressing, and see a discernible waistline tucked behind the ribcage.',
        },
        {
          heading: 'Calculating Resting Energy Requirements (RER)',
          body:
            'Veterinarians calculate baseline calories using formula multipliers based on life stage (puppy, neutered adult, intact adult, active athlete, or senior). Always consult feeding guidelines on PETSHOP packaging as an accurate baseline.',
        },
        {
          heading: 'Adjusting for Seasonal & Activity Shifts',
          body:
            'Dogs that hike during summer or play outdoors in cold winter weather burn extra energy to regulate body temperature. Regularly assess your dog’s weight every fortnight and tweak portions by 5–10% accordingly.',
        },
      ],
      keyTakeaways: [
        'Use Body Condition Scoring rather than arbitrary cup estimates.',
        'Factor in neuter status and daily exercise intensity.',
        'Use PETSHOP’s interactive Feeding Calculator for customized daily portions.',
      ],
      conclusion:
        'Calibrated feeding prevents the silent epidemic of canine obesity, adding up to two extra years of healthy, comfortable life to your faithful companion.',
    },
  },
  {
    id: 'keeping-your-cat-healthy-and-active',
    slug: 'keeping-your-cat-healthy-and-active',
    category: 'Cat Care',
    title: 'Keeping Your Cat Healthy and Active',
    description:
      'How to combat feline boredom, stimulate primal hunting instincts, and maintain optimal mobility with indoor vertical territory.',
    image: blogCatActivePlayImg,
    imageAlt: 'Agile tabby cat leaping gracefully mid-air playing with feather wand toy in sunlit room',
    publishDate: 'August 08, 2026',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'Dr. Priya Nambiar',
      role: 'Feline Medicine Specialist',
    },
    content: {
      intro:
        'Indoor cats often live longer, safer lives than outdoor felines, but sedentary indoor routines can lead to boredom, weight gain, and behavioral distress. Creating an enriched environment turns your living room into an engaging feline playground.',
      sections: [
        {
          heading: 'The Predatory Hunting Sequence',
          body:
            'Cats are hardwired to stalk, chase, pounce, and eat. Engage them with interactive feather wands, laser pointers, or motorized mice for 10–15 minutes daily. Always conclude playtime with a small protein-rich snack to satisfy the biological completion of the hunt.',
        },
        {
          heading: 'Vertical Territory & Climbing Highways',
          body:
            'Cats experience security in height. Installing cat trees, wall bridges, or window perches allows them to survey their domain safely, building spinal flexibility and hind-leg muscle strength.',
        },
        {
          heading: 'Food Puzzles and Foraging Toys',
          body:
            'Ditch static food bowls for interactive foraging toys and lick mats. Working for their food mimics natural foraging, stimulates neuro-cognitive pathways, and prevents frantic mealtime scarfing.',
        },
      ],
      keyTakeaways: [
        'Interactive play satisfies natural hunting instincts and burns pent-up energy.',
        'Vertical climbing trees reduce feline household anxiety.',
        'Puzzle feeders convert ordinary mealtimes into rewarding mental puzzles.',
      ],
      conclusion:
        'An active cat is a content, confident cat. With daily play and vertical territory, your indoor feline will stay agile and joyful throughout all nine lives.',
    },
  },
];
