export interface Testimonial {
  /** Customer's name as they gave it — use a real name, or initials if they prefer. */
  name: string;
  /** Country they imported to, e.g. 'Kenya'. */
  country: string;
  /** Their own words. Don't paraphrase or polish into marketing copy. */
  quote: string;
  /** Optional: the vehicle they bought, e.g. '2019 Toyota Prius'. */
  vehicle?: string;
  /** Optional: 1-5. Omit unless they actually gave a rating. */
  rating?: number;
}

/**
 * Real customer testimonials only.
 *
 * To add one: get the customer's permission, paste their actual words below,
 * and commit. Never invent entries or pad this list — a short list of real
 * reviews builds more trust than a long list of invented ones, and invented
 * ones are easy for buyers to catch.
 *
 * While this list is empty the site shows an honest "no reviews yet" state
 * inviting customers to be the first, which is the truthful thing to display.
 */
export const TESTIMONIALS: Testimonial[] = [];
