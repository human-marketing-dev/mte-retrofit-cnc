"use client";

import { LeadForm, type LeadFormProps } from "@/components/forms/LeadForm";

/**
 * The landing's preset of the reusable <LeadForm>.
 *
 * It exists so the two placements — hero and closing CTA — share one name and
 * one set of defaults, while the generic form stays free of landing-specific
 * copy. Anything not fixed here (heading level, compact spacing, which optional
 * fields show) is still passed through.
 *
 * `formId` is what tells the two instances apart in reporting, so it is
 * required: the analytics event carries it as `form_id`.
 */
export type DiagnosticoFormProps = Omit<LeadFormProps, "formName">;

export function DiagnosticoForm(props: DiagnosticoFormProps) {
  return <LeadForm formName="Diagnóstico sin costo" {...props} />;
}
