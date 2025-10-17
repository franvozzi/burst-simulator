export interface BurstConfig {
  maxLimitUpload: string;
  maxLimitDownload: string;
  burstLimitUpload: string;
  burstLimitDownload: string;
  burstThresholdUpload: string;
  burstThresholdDownload: string;
  burstTimeUpload: number;
  burstTimeDownload: number;
  priority: number;
}

export interface BurstResult {
  upload: {
    maxLimit: string;
    burstLimit: string;
    burstThreshold: string;
    burstTime: number;
    limitAt: string;
    burstDuration: number;
  };
  download: {
    maxLimit: string;
    burstLimit: string;
    burstThreshold: string;
    burstTime: number;
    limitAt: string;
    burstDuration: number;
  };
  rateLimit: string;
}

export interface SimulationPoint {
  time: number;
  speed: number;
}

export interface SimulationData {
  upload: SimulationPoint[];
  download: SimulationPoint[];
}
