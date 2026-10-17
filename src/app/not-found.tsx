import { composeCommercialPresence } from "@/composition/commercial-presence/compose-commercial-presence";
import { RecoveryLanding } from "@/contexts/commercial-presence/presentation/landings/recovery/recovery-landing";

export default function NotFound() {
  return <RecoveryLanding view={composeCommercialPresence().home()} />;
}
