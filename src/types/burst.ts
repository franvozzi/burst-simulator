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

export interface BurstDirection {
  maxLimit: string;
  burstLimit: string;
  burstThreshold: string;
  burstTime: number;
  limitAt: string;
  burstDuration: number;
}

export interface BurstResult {
  upload: BurstDirection;
  download: BurstDirection;
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
