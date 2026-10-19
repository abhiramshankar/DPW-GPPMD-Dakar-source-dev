import { ISPService } from "@src/services/core/spService/ISPService";
import { SPService } from "@src/services/core/spService/SPService";
import useWebPartContextStore from "@src/stores/useWebPartContextStore";

export default function useSPService(): ISPService {
  const { context } = useWebPartContextStore();

  const spService: ISPService = context.serviceScope.consume(
    SPService.serviceKey
  );

  return spService;
}

