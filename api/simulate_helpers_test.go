package handler

import (
	"testing"
)

func TestParseSpeedSim(t *testing.T) {
	result := parseSpeedSim("1M")
	if result != 1000.0 {
		t.Errorf("Expected 1000, got %.2f", result)
	}
}

func TestGenerateSimulation(t *testing.T) {
	points := generateSimulation("512K", "1M", "384K", 6)

	if len(points) != 17 {
		t.Errorf("Expected 17 points, got %d", len(points))
	}

	if points[0].Speed != 1000.0 {
		t.Errorf("Expected initial speed 1000, got %.2f", points[0].Speed)
	}
}
