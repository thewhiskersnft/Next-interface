import { isMainnet } from "@/global/hook/getConnectedClusterInfo";
import { Config, Endpoint } from "./type";

export default async function caculateEndpointUrlByRpcConfig({
  strategy,
  rpcs,
  devrpcs,
}: Config): Promise<string> {
  return strategy === "weight"
    ? getEndpointUrlByWeight(isMainnet() ? rpcs : devrpcs)
    : strategy === "speed"
    ? getEndpointUrlBySpeed(isMainnet() ? rpcs : devrpcs)
    : getEndpointUrlBySequence(isMainnet() ? rpcs : devrpcs);
}
function getEndpointUrlByWeight(endpoints: Endpoint[]): string {
  let pointer = 0;
  const random = Math.random() * 100;
  let api = endpoints[0].url;

  for (const endpoint of endpoints) {
    if (random > pointer + (endpoint.weight ?? 0)) {
      pointer += pointer + (endpoint.weight ?? 0);
    } else {
      api = endpoint.url;
      break;
    }
  }
  return api;
}

function getEndpointUrlBySequence(endpoints: Endpoint[]): string {
  return endpoints[0]?.url;
}

async function getEndpointUrlBySpeed(endpoints: Endpoint[]): Promise<string> {
  try {
    const result = Promise.any(
      endpoints.map(({ url }) =>
        fetch(url, {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getEpochInfo",
          }),
        }).then((res) => (res.ok ? Promise.resolve(url) : Promise.reject(res)))
      )
    );
    return await result;
  } catch (err) {
    console.error(err);
    return " ";
  }
}
