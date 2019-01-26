package main

import (
	"fmt"
	"images-api/main/images"
	"log"
	"net/http"
	"sync"
)

// Piotr Kosmala
// sync counter
var mu sync.Mutex
var count int

func main() {
	buildServer()
}

func buildServer() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/api/info", infoEndpoint)
	http.HandleFunc("/api/mandelbrot", colorMandelbrot)

	log.Fatal(http.ListenAndServe(":8081", nil))
}

func infoEndpoint(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	count++
	mu.Unlock()
	fmt.Fprintf(w, "URL.Path = [%q] visitNumber=[%d] \n", r.URL.Path, count)
}

func colorMandelbrot(w http.ResponseWriter, r *http.Request) {

	keys := r.URL.Query()
	if len(keys) < 1 {
		// keys.Get("zoom")
		log.Println("Url Param 'key' is missing")
	}

	params := images.Params{
		Width:     600,
		Height:    600,
		Iteration: 200,
		Zoom:      1,
		Contrast:  15,
		YMax:      2,
		YMin:      -2,
		XMax:      2,
		XMin:      -2,
		DrawColor: images.DrawColors{
			R: 200,
			G: 160,
			B: 140,
			A: 255,
		},
		ShiftX: 0,
		ShiftY: 0,
	}
	images.DrawColorMandelbrot(params, w)
	w.Header().Set("Content-Type", "image/png")
}
