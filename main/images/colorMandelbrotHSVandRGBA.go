package images

import (
	"bytes"
	"encoding/base64"
	"github.com/lucasb-eyer/go-colorful"
	"image"
	"image/color"
	"image/png"
	"math"
	"math/cmplx"
	"net/http"
)

// Piotr Kosmala
type Params struct {
	Width, Height, Zoom, MAX_ITERATION int
	YMax, YMin, XMax, XMin             int8
	ShiftX, ShiftY                     float64
}

func DrawColorMandelbrotHSVImage(params Params, w http.ResponseWriter) {
	png.Encode(w, createImageHSV(params))
}

func DrawColorMandelbrotHSVBase64(params Params, w http.ResponseWriter) {
	// In-memory buffer to store PNG image
	// before we base 64 encode it
	var buff bytes.Buffer
	// The Buffer satisfies the Writer interface so we can use it with Encode
	// In previous example we encoded to a file, this time to a temp buffer
	png.Encode(&buff, createImageHSV(params))
	// Encode the bytes in the buffer to a base64 string
	encodedString := base64.StdEncoding.EncodeToString(buff.Bytes())
	w.Write([]byte(encodedString))
}

func createImageHSV(params Params) image.Image {
	img := image.NewRGBA(image.Rect(0, 0, params.Width, params.Height))
	for x := 0; x < params.Width; x++ {
		for y := 0; y < params.Height; y++ {
			// setup cords
			zx := ((((float64(x) + params.ShiftX) / float64(params.Width)) * float64(params.XMax-params.XMin)) + float64(params.XMin)) / float64(params.Zoom)
			zy := ((((float64(y) + params.ShiftY) / float64(params.Height)) * float64(params.YMax-params.YMin)) + float64(params.YMin)) / float64(params.Zoom)
			z0 := complex(0, 0)
			p := complex(zx, zy)

			// The color depends on the number of iterations
			m := complexColorHSV(z0, p, params)

			//colorIndex := uint8(255 - int( int(m * 255) / int(params.MAX_ITERATION)))

			hue := m / float64(params.MAX_ITERATION)
			saturation := 1
			value := 1

			if m >= float64(params.MAX_ITERATION) {
				value = 0
			}

			c := colorful.Hsv(float64(hue), float64(saturation), float64(value))

			r, g, b, _ := c.RGBA()

			img.Set(x, y, color.RGBA{
				R: uint8(r),
				G: uint8(g),
				B: uint8(b),
				A: uint8(255),
			})

		}
	}
	return img
}

func complexColorHSV(z, p complex128, params Params) float64 {
	var n int = 0
	for n < params.MAX_ITERATION && cmplx.Abs(z) <= 2 {
		z = z*z + p
		n++
	}

	if n == params.MAX_ITERATION {
		return float64(n)
	}

	return float64(n+1) - math.Log(math.Log2(cmplx.Abs(z)))
}

func DrawMandelbrotRGBA(w http.ResponseWriter) {
	const (
		xmin, ymin, xmax, ymax = -2, -2, +2, +2
		width, height          = 1024, 1024
	)

	img := image.NewRGBA(image.Rect(0, 0, width, height))
	for py := 0; py < height; py++ {
		y := float64(py)/height*(ymax-ymin) + ymin
		for px := 0; px < width; px++ {
			x := float64(px)/width*(xmax-xmin) + xmin
			z := complex(x, y)
			// Punkt obrazu (px, py) reprezentuje wartość zespoloną z.
			img.Set(px, py, mandelbrot(z))
		}
	}

	png.Encode(w, img) // UWAGA: ignorowanie błędów
}

func mandelbrot(z complex128) color.Color {
	const iterations = 200
	const contrast = 15
	var v complex128
	for n := uint8(0); n < iterations; n++ {
		v = v*v + z
		if cmplx.Abs(v) > 2 {
			return color.Gray{255 - contrast*n}
		}
	}
	return color.Black
}
