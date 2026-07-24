import type { UserData } from "./types";

/**
 * User-provided data (UPD) for Google enhanced conversions and Meta advanced
 * matching.
 *
 * The values leave the page in plain text and are hashed by the Google/Meta
 * tags themselves — that is the documented contract for the GTM User-Provided
 * Data variable, which needs the raw value to apply its own normalization
 * before SHA-256. Our job is only to normalize consistently so the same person
 * hashes to the same value every time.
 *
 * These values are personal data. They go into the dataLayer for the tags and
 * into the lead email; they are never written to storage or a log.
 */

/** Default country code for phone numbers typed without one. MX. */
const DEFAULT_COUNTRY_CODE = "52";
const NATIONAL_NUMBER_LENGTH = 10;

/** Lowercase and trim, per Google's email normalization rules. */
export function normalizeEmail(value: string): string | undefined {
  const email = value.trim().toLowerCase();
  return email.includes("@") ? email : undefined;
}

/**
 * Phone in E.164 (`+52...`), which is what both Google and Meta require.
 *
 * Mexican visitors type their number every possible way — `81 8381 0445`,
 * `(81) 8381-0445`, `044 81...`, `+52 1 81...`. We keep the digits, drop the
 * legacy 044/045 and the post-2019 obsolete `1` mobile prefix, and prepend +52
 * when only the 10 national digits are present. Anything that still doesn't
 * look like a phone number is dropped rather than sent as garbage.
 */
export function normalizePhone(value: string): string | undefined {
  const hadPlus = value.trim().startsWith("+");
  let digits = value.replace(/\D/g, "");
  if (!digits) return undefined;

  // Legacy national mobile prefixes, only meaningful without a country code.
  if (!hadPlus && (digits.startsWith("044") || digits.startsWith("045"))) {
    digits = digits.slice(3);
  }

  // "52 1 8183810445" — the old mobile marker between country code and number.
  if (digits.startsWith(`${DEFAULT_COUNTRY_CODE}1`) && digits.length === 13) {
    digits = DEFAULT_COUNTRY_CODE + digits.slice(3);
  }

  if (digits.length === NATIONAL_NUMBER_LENGTH) {
    digits = DEFAULT_COUNTRY_CODE + digits;
  }

  // E.164 allows 8–15 digits including the country code.
  if (digits.length < 8 || digits.length > 15) return undefined;

  return `+${digits}`;
}

/** Lowercase, collapse whitespace, drop punctuation — Google's name rules. */
export function normalizeName(value: string): string | undefined {
  const name = value
    .trim()
    .toLowerCase()
    .replace(/[.,'"]/g, "")
    .replace(/\s+/g, " ");
  return name || undefined;
}

export type UserDataInput = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
};

/**
 * Build the `user_data` object, omitting anything that did not normalize.
 *
 * Returns undefined when nothing usable is left, so callers never push an empty
 * `user_data` that would make a tag report a match it doesn't have.
 */
export function buildUserData({
  email,
  phone,
  firstName,
  lastName,
}: UserDataInput): UserData | undefined {
  const email_address = email ? normalizeEmail(email) : undefined;
  const phone_number = phone ? normalizePhone(phone) : undefined;
  const first_name = firstName ? normalizeName(firstName) : undefined;
  const last_name = lastName ? normalizeName(lastName) : undefined;

  const address =
    first_name || last_name ? { ...(first_name && { first_name }), ...(last_name && { last_name }) } : undefined;

  if (!email_address && !phone_number && !address) return undefined;

  return {
    ...(email_address && { email_address }),
    ...(phone_number && { phone_number }),
    ...(address && { address }),
  };
}
