package code

import (
	"fmt"
	"images-api/code/images"
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
	http.HandleFunc("/api/mandelbrot", mandelbrot)

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

func mandelbrot(w http.ResponseWriter, r *http.Request) {
	images.DrawMandelbrot(w)
	w.Header().Set("Content-Type", "html")
}
