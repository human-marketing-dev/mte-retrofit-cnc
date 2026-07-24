/**
 * Shared shapes for the measurement layer.
 *
 * Everything the site pushes to the GTM dataLayer is described here, so a
 * change to a parameter name shows up as a type error at every call site
 * instead of silently breaking a tag in production.
 */

/** UTM parameters we read off the landing URL. */
export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
  utm_source_platform?: string;
  utm_creative_format?: string;
  utm_marketing_tactic?: string;
};

/** Ad-platform click identifiers, captured alongside the UTMs. */
export type ClickIds = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  dclid?: string;
  fbclid?: string;
  msclkid?: string;
  ttclid?: string;
  li_fat_id?: string;
  twclid?: string;
};

/**
 * One attribution snapshot: the campaign parameters plus the context of the
 * visit they arrived on.
 */
export type Touch = UtmParams &
  ClickIds & {
    /** Full URL of the page the visitor landed on. */
    landing_page?: string;
    /** document.referrer at capture time, empty for direct traffic. */
    referrer?: string;
    /** ISO 8601 timestamp of the capture. */
    timestamp?: string;
  };

/**
 * What the site knows about where a visitor came from.
 *
 * `first` never changes once written (localStorage), `last` is refreshed every
 * time a visit carries campaign parameters (sessionStorage). The flattened
 * `utm_*` / click-id keys on the event payload always mirror `last`, because
 * that is the touch most tag configurations expect to read.
 */
export type Attribution = {
  first_touch: Touch;
  last_touch: Touch;
};

/**
 * User-provided data for enhanced conversions / advanced matching, in the shape
 * Google expects (google.com/tag-platform → user_provided_data).
 *
 * Values are normalized but NOT hashed: the Google Ads and GA4 tags hash them
 * in the browser before they leave the page. Never log or persist this object.
 */
export type UserData = {
  email_address?: string;
  phone_number?: string;
  address?: {
    first_name?: string;
    last_name?: string;
  };
};

/** Non-identifying descriptors of the form that produced an event. */
export type FormContext = {
  form_id: string;
  form_name: string;
  form_destination?: string;
};

/** Anything acceptable as a dataLayer payload value. */
export type DataLayerValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | DataLayerObject
  | DataLayerValue[];

export type DataLayerObject = { [key: string]: DataLayerValue };
