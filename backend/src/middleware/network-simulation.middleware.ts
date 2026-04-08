import { NextFunction, Request, Response } from 'express';

type NetworkSimulationConfig = {
  delayMs: number;
  errorFraction: number;
};

const DEFAULT_NETWORK_SIMULATION_CONFIG: NetworkSimulationConfig = {
  delayMs: 0,
  errorFraction: 0,
};

function parseNumber(value: string | undefined, fallback: number) {
  if (value === undefined) {
    return fallback;
  }

  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getNetworkSimulationConfig() {
  const delayMs = parseNumber(
    process.env.DEV_NETWORK_SIMULATION_DELAY_MS,
    DEFAULT_NETWORK_SIMULATION_CONFIG.delayMs,
  );
  const errorFraction = clamp(
    parseNumber(
      process.env.DEV_NETWORK_SIMULATION_ERROR_FRACTION,
      DEFAULT_NETWORK_SIMULATION_CONFIG.errorFraction,
    ),
    0,
    1,
  );

  return { delayMs, errorFraction };
}

export function createNetworkSimulationMiddleware(
  overrides: Partial<NetworkSimulationConfig> = {},
) {
  const config = {
    ...getNetworkSimulationConfig(),
    ...overrides,
  };

  return (request: Request, response: Response, next: NextFunction) => {
    const isMiddlewareDisabled =
      config.delayMs === 0 && config.errorFraction === 0;
    if (isMiddlewareDisabled) {
      next();
      return;
    }

    if (request.method === 'OPTIONS') {
      next();
      return;
    }

    const shouldDelay = config.delayMs > 0;
    const shouldReturnError =
      config.errorFraction > 0 && Math.random() < config.errorFraction;

    const completeRequest = () => {
      if (shouldReturnError) {
        response.status(503).json({ message: 'Network simulation error!' });
        return;
      }

      next();
    };

    if (shouldDelay) {
      setTimeout(completeRequest, config.delayMs);
      return;
    }

    completeRequest();
  };
}
