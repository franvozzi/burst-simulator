//go:build ignore
// +build ignore

package main

import (
	"log"
	"net/http"
)

// Importar los handlers de los archivos existentes
// Como están en package handler, necesitamos un wrapper

func main() {
	// Servidor de test
	http.HandleFunc("/api/calculate", calculateHandler)
	http.HandleFunc("/api/simulate", simulateHandler)

	log.Println("🚀 Test server running on http://localhost:8080")
	log.Println("📊 Calculate endpoint: http://localhost:8080/api/calculate")
	log.Println("📈 Simulate endpoint: http://localhost:8080/api/simulate")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// Wrapper functions que llaman a los handlers originales
func calculateHandler(w http.ResponseWriter, r *http.Request) {
	// Aquí copiar el contenido completo del Handler de calculate.go
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

	// ... resto del código del handler
}

func simulateHandler(w http.ResponseWriter, r *http.Request) {
	// Similar al anterior
}
