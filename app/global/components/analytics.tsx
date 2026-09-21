import { io } from "next/cache";
import site from "@/app/global/config/site";
import AnalyticsConsent from "./analytics-consent";

/**
 * Renders nothing unless a measurement ID is configured. `io()` keeps this
 * out of the static shell, so the ID is read from the environment on each
 * request rather than being frozen into the build. Must sit inside a
 * <Suspense> boundary for that reason.
 */
export default async function Analytics() {
    await io();

    if (!site.analytics_id) {
        return null;
    }

    return <AnalyticsConsent measurementId={site.analytics_id} />;
}
