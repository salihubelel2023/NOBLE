import { redirect } from "next/navigation";

/** Same pattern as /catalog: redirect to the first policy rather than showing an index. */
export default function PoliciesIndexPage() {
  redirect("/policies/shipping");
}
