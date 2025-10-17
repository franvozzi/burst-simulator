//go:build !simulate

package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

type BurstConfig struct {
	MaxLimitUpload         string `json:"maxLimitUpload"`
	MaxLimitDownload       string `json:"maxLimitDownload"`
	BurstLimitUpload       string `json:"burstLimitUpload"`
	BurstLimitDownload     string `json:"burstLimitDownload"`
	BurstThresholdUpload   string `json:"burstThresholdUpload"`
	BurstThresholdDownload string `json:"burstThresholdDownload"`
	BurstTimeUpload        int    `json:"burstTimeUpload"`
	BurstTimeDownload      int    `json:"burstTimeDownload"`
	Priority               int    `json:"priority"`
}

type BurstDirection struct {
	MaxLimit       string  `json:"maxLimit"`
	BurstLimit     string  `json:"burstLimit"`
	BurstThreshold string  `json:"burstThreshold"`
	BurstTime      int     `json:"burstTime"`
	LimitAt        string  `json:"limitAt"`
	BurstDuration  int     `json:"burstDuration"`
}

type BurstResult struct {
	Upload    BurstDirection `json:"upload"`
	Download  BurstDirection `json:"download"`
	RateLimit string         `json:"rateLimit"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var config BurstConfig
	if err := json.NewDecoder(r.Body).Decode(&config); err != nil {
		http.Error(w, fmt.Sprintf("Invalid JSON: %v", err), http.StatusBadRequest)
		return
	}

	uploadResult := BurstDirection{
		MaxLimit:       config.MaxLimitUpload,
		BurstLimit:     config.BurstLimitUpload,
		BurstThreshold: config.BurstThresholdUpload,
		BurstTime:      config.BurstTimeUpload,
		LimitAt:        calculateLimitAt(config.BurstThresholdUpload, config.Priority),
		BurstDuration: calculateBurstDuration(
			config.BurstThresholdUpload,
			config.BurstLimitUpload,
			config.BurstTimeUpload,
		),
	}

	downloadResult := BurstDirection{
		MaxLimit:       config.MaxLimitDownload,
		BurstLimit:     config.BurstLimitDownload,
		BurstThreshold: config.BurstThresholdDownload,
		BurstTime:      config.BurstTimeDownload,
		LimitAt:        calculateLimitAt(config.BurstThresholdDownload, config.Priority),
		BurstDuration: calculateBurstDuration(
			config.BurstThresholdDownload,
			config.BurstLimitDownload,
			config.BurstTimeDownload,
		),
	}

	result := BurstResult{
		Upload:   uploadResult,
		Download: downloadResult,
		RateLimit: fmt.Sprintf("%s/%s %s/%s",
			config.MaxLimitUpload, config.BurstLimitUpload,
			config.MaxLimitDownload, config.BurstLimitDownload,
		),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func parseSpeed(speed string) float64 {
	speed = strings.TrimSpace(strings.ToUpper(speed))
	multiplier := 1.0

	if strings.HasSuffix(speed, "M") {
		multiplier = 1000.0
		speed = strings.TrimSuffix(speed, "M")
	} else if strings.HasSuffix(speed, "K") {
		speed = strings.TrimSuffix(speed, "K")
	}

	value, err := strconv.ParseFloat(speed, 64)
	if err != nil {
		return 0
	}
	return value * multiplier
}

func calculateLimitAt(threshold string, priority int) string {
	thresholdKbps := parseSpeed(threshold)
	limitAtKbps := (thresholdKbps * float64(priority)) / 8.0

	if limitAtKbps >= 1000 {
		return fmt.Sprintf("%.0fM", limitAtKbps/1000)
	}
	return fmt.Sprintf("%.0fK", limitAtKbps)
}

func calculateBurstDuration(threshold, burstLimit string, burstTime int) int {
	thresholdKbps := parseSpeed(threshold)
	burstLimitKbps := parseSpeed(burstLimit)

	if burstLimitKbps <= thresholdKbps {
		return 0
	}

	duration := (thresholdKbps * float64(burstTime)) / burstLimitKbps
	return int(duration)
}
