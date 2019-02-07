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
	// UI serve files
	fs := http.FileServer(http.Dir("./client-api/build"))
	http.Handle("/client-api/", http.StripPrefix("/client-api", fs))
	fss := http.FileServer(http.Dir("./client-api/build/static"))
	http.Handle("/static/", http.StripPrefix("/static", fss))

	// api handler
	http.HandleFunc("/api/info", infoEndpoint)
	http.HandleFunc("/api/mandelbrot", colorMandelbrotBase64)
	http.HandleFunc("/api/test/mandelbrot", colorMandelbrotImage)
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func infoEndpoint(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	count++
	mu.Unlock()
	fmt.Fprintf(w, "URL.Path = [%q] visitNumber=[%d] \n", r.URL.Path, count)
}

func colorMandelbrotImage(w http.ResponseWriter, r *http.Request) {
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
		Width:         600,
		Height:        600,
		MAX_ITERATION: 80,
		Zoom:          zoom,
		YMax:          2,
		YMin:          -2,
		XMax:          2,
		XMin:          -2,
		ShiftX:        shiftX,
		ShiftY:        shiftY,
	}

	images.DrawColorMandelbrotHSVImage(params, w)
	w.Header().Set("Content-Type", "text/plain")
}

func colorMandelbrotBase64(w http.ResponseWriter, r *http.Request) {
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
		Width:         1200,
		Height:        1200,
		MAX_ITERATION: 80,
		Zoom:          zoom,
		YMax:          2,
		YMin:          -2,
		XMax:          2,
		XMin:          -2,
		ShiftX:        shiftX,
		ShiftY:        shiftY,
	}

	images.DrawColorMandelbrotHSVBase64(params, w)
	w.Header().Set("Content-Type", "text/plain")
}

func setupCorsResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}
