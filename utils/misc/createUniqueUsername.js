import prisma from "@/lib/prisma";

async function createUniqueUsername() {
  let uniqueUsername = "";
  // Keep trying to create a username until it's unique
  let userExists = true;
  while (userExists) {
    // Get a random noun and adjective from the arrays
    let randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    let randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];

    // Capitalize the first letter of the adjective and the first letter of the noun
    let capitalizedAdjective =
      randomAdjective.charAt(0).toUpperCase() +
      randomAdjective.slice(1).toLowerCase();
    let capitalizedNoun =
      randomNoun.charAt(0).toUpperCase() + randomNoun.slice(1).toLowerCase();

    uniqueUsername = `${capitalizedAdjective}${capitalizedNoun}`;

    // Convert the username to lowercase for comparison
    let lowercaseUsername = uniqueUsername.toLowerCase();

    // Check if the username already exists in the database
    userExists = await prisma.users.findUnique({
      where: { username: lowercaseUsername },
    });

    // If not, break out of the loop
    if (!userExists) {
      break;
    }
  }

  return uniqueUsername;
}

export default createUniqueUsername;

export const nouns = [
  "Able",
  "Active",
  "Adaptable",
  "Adventurous",
  "Affectionate",
  "Agile",
  "Alert",
  "Ambitious",
  "Amiable",
  "Amusing",
  "Artistic",
  "Assertive",
  "Attentive",
  "Attractive",
  "Balanced",
  "Beautiful",
  "Bold",
  "Brave",
  "Bright",
  "Brilliant",
  "Calm",
  "Capable",
  "Careful",
  "Charming",
  "Cheerful",
  "Clean",
  "Clever",
  "Colorful",
  "Committed",
  "Compassionate",
  "Competent",
  "Confident",
  "Conscientious",
  "Considerate",
  "Constant",
  "Cooperative",
  "Courageous",
  "Courteous",
  "Creative",
  "Cultured",
  "Curious",
  "Daring",
  "Decisive",
  "Dedicated",
  "Delightful",
  "Dependable",
  "Determined",
  "Devoted",
  "Diligent",
  "Diplomatic",
  "Disciplined",
  "Discreet",
  "Dynamic",
  "Eager",
  "Earnest",
  "Easygoing",
  "Efficient",
  "Elegant",
  "Eloquent",
  "Energetic",
  "Enthusiastic",
  "Ethical",
  "Exciting",
  "Experienced",
  "Expert",
  "Extroverted",
  "Fabulous",
  "Fair",
  "Faithful",
  "Fearless",
  "Flexible",
  "Focused",
  "Friendly",
  "Fun",
  "Funny",
  "Generous",
  "Gentle",
  "Genuine",
  "Gifted",
  "raceful",
  "Gracious",
  "Grateful",
  "Great",
  "Hardworking",
  "Healthy",
  "Helpful",
  "Honest",
  "Hopeful",
  "Humble",
  "Humorous",
  "Imaginative",
  "Impartial",
  "Industrious",
  "Innovative",
  "Insightful",
  "Inspiring",
  "Intelligent",
  "ntense",
  "Intuitive",
  "Inventive",
];

const adjectives = [
  "Able",
  "Active",
  "Adaptable",
  "Adventurous",
  "Affectionate",
  "Agile",
  "Alert",
  "Ambitious",
  "Amiable",
  "Amusing",
  "Artistic",
  "Assertive",
  "Attentive",
  "Attractive",
  "Balanced",
  "Beautiful",
  "Bold",
  "Brave",
  "Bright",
  "Brilliant",
  "Calm",
  "Capable",
  "Careful",
  "Charming",
  "Cheerful",
  "Clean",
  "Clever",
  "Colorful",
  "Committed",
  "Compassionate",
  "Competent",
  "Confident",
  "Conscientious",
  "Considerate",
  "Constant",
  "Cooperative",
  "Courageous",
  "Courteous",
  "Creative",
  "Cultured",
  "Curious",
  "Daring",
  "Decisive",
  "Dedicated",
  "Delightful",
  "Dependable",
  "Determined",
  "Devoted",
  "Diligent",
  "Diplomatic",
  "Disciplined",
  "Discreet",
  "Dynamic",
  "Eager",
  "Earnest",
  "Easygoing",
  "Efficient",
  "Elegant",
  "Eloquent",
  "Energetic",
  "Enthusiastic",
  "Ethical",
  "Exciting",
  "Experienced",
  "Expert",
  "Extroverted",
  "Fabulous",
  "Fair",
  "Faithful",
  "Fearless",
  "Flexible",
  "Focused",
  "Friendly",
  "Fun",
  "Funny",
  "Generous",
  "Gentle",
  "Genuine",
  "Gifted",
  "raceful",
  "Gracious",
  "Grateful",
  "Great",
  "Hardworking",
  "Healthy",
  "Helpful",
  "Honest",
  "Hopeful",
  "Humble",
  "Humorous",
  "Imaginative",
  "Impartial",
  "Industrious",
  "Innovative",
  "Insightful",
  "Inspiring",
  "Intelligent",
  "ntense",
  "Intuitive",
  "Inventive",
];
