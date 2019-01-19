package main

import (
	"fmt"
	"images-api/images"
	"log"
	"net/http"
	"sync"
)

// sync counter
var mu sync.Mutex
var count int

func main() {
	buildServer()
}

func buildServer() {
	http.HandleFunc("/api/info", infoEndpoint)
	http.HandleFunc("/api/sinus", printSinusDefault)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func infoEndpoint(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	count++
	mu.Unlock()
	fmt.Fprintf(w, "URL.Path = %q\n", r.URL.Path)
}

func printSinusDefault(w http.ResponseWriter, r *http.Request) {
	svg := images.BuildSinusXYZDefault()
	w.Header().Set("Content-Type", "image/svg+xml")
	w.Write(svg)
}
