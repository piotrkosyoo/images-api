package main

import (
	"fmt"
	"images-api/main/images"
	"log"
	"net/http"
	"strconv"
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
	setupCorsResponse(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	keys := r.URL.Query()
	var shiftX = float64(0)
	var shiftY = float64(0)
	var zoom = int(1)

	if ShiftX, err := strconv.ParseFloat(keys.Get("ShiftX"), 64); err == nil {
		shiftX = ShiftX
	}

	if ShiftY, err := strconv.ParseFloat(keys.Get("ShiftY"), 64); err == nil {
		shiftY = ShiftY
	}

	if Zoom, err := strconv.ParseInt(keys.Get("zoom"), 10, 64); err == nil {
		zoom = int(Zoom)
	}

	params := images.Params{
		Width:     1200,
		Height:    1200,
		Iteration: 240,
		Zoom:      zoom,
		Contrast:  10,
		YMax:      2,
		YMin:      -2,
		XMax:      2,
		XMin:      -2,
		DrawColor: images.DrawColors{
			R: 200,
			G: 150,
			B: 100,
			A: 255,
		},
		ShiftX: shiftX,
		ShiftY: shiftY,
	}
	images.DrawColorMandelbrotBase64(params, w)
	w.Header().Set("Content-Type", "text/plain")
}

func setupCorsResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}
