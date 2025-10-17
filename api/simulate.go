//go:build !calculate

package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

type SimulationPoint struct {
	Time  int     `json:"time"`
	Speed float64 `json:"speed"`
}

type SimulationData struct {
	Upload   []SimulationPoint `json:"upload"`
	Download []SimulationPoint `json:"download"`
}

type BurstConfigSim struct {
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

	var config BurstConfigSim
	if err := json.NewDecoder(r.Body).Decode(&config); err != nil {
		http.Error(w, fmt.Sprintf("Invalid JSON: %v", err), http.StatusBadRequest)
		return
	}

	uploadPoints := generateSimulation(
		config.MaxLimitUpload,
		config.BurstLimitUpload,
		config.BurstThresholdUpload,
		config.BurstTimeUpload,
	)

	downloadPoints := generateSimulation(
		config.MaxLimitDownload,
		config.BurstLimitDownload,
		config.BurstThresholdDownload,
		config.BurstTimeDownload,
	)

	result := SimulationData{
		Upload:   uploadPoints,
		Download: downloadPoints,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func parseSpeedSim(speed string) float64 {
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

func generateSimulation(maxLimit, burstLimit, threshold string, burstTime int) []SimulationPoint {
	maxLimitKbps := parseSpeedSim(maxLimit)
	burstLimitKbps := parseSpeedSim(burstLimit)

	points := []SimulationPoint{}
	totalTime := burstTime + 10

	for t := 0; t <= totalTime; t++ {
		var speed float64

		if t <= burstTime {
			speed = burstLimitKbps
		} else {
			elapsed := float64(t - burstTime)
			transitionTime := 5.0
			progress := elapsed / transitionTime

			if progress > 1.0 {
				progress = 1.0
			}

			speed = burstLimitKbps - (burstLimitKbps-maxLimitKbps)*progress
		}

		points = append(points, SimulationPoint{
			Time:  t,
			Speed: speed,
		})
	}

	return points
}
