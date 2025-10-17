package handler

import (
	"testing"
)

func TestParseSpeed(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected float64
	}{
		{"512K", "512K", 512},
		{"1M", "1M", 1000},
		{"2M", "2M", 2000},
		{"Empty", "", 0},
		{"Invalid", "invalid", 0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := parseSpeed(tt.input)
			if result != tt.expected {
				t.Errorf("parseSpeed(%s) = %.2f, expected %.2f", tt.input, result, tt.expected)
			}
		})
	}
}

func TestCalculateLimitAt(t *testing.T) {
	result := calculateLimitAt("384K", 8)
	if result != "384K" {
		t.Errorf("Expected 384K, got %s", result)
	}
}

func TestCalculateBurstDuration(t *testing.T) {
	result := calculateBurstDuration("384K", "1M", 6)
	if result != 2 {
		t.Errorf("Expected 2, got %d", result)
	}
}
