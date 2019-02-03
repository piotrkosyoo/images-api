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

func DrawColorMandelbrot(params Params, w http.ResponseWriter) {
	img := image.NewRGBA(image.Rect(0, 0, params.Width, params.Height))
	for x := 0; x < params.Width; x++ {
		for y := 0; y < params.Height; y++ {
			// setup cords
			zx := ((((float64(x) + params.ShiftX) / float64(params.Width)) * float64(params.XMax-params.XMin)) + float64(params.XMin)) / float64(params.Zoom)
			zy := ((((float64(y) + params.ShiftY) / float64(params.Height)) * float64(params.YMax-params.YMin)) + float64(params.YMin)) / float64(params.Zoom)
			z0 := complex(0, 0)
			p := complex(zx, zy)

			// The color depends on the number of iterations
			m := complexColor(z0, p, params)

			colorIndex := uint8(255 - int(int(m*255)/int(params.MAX_ITERATION)))

			img.Set(x, y, color.RGBA{
				R: colorIndex,
				G: colorIndex,
				B: colorIndex,
				A: 255,
			})
		}
	}
	png.Encode(w, img)
}

func DrawColorMandelbrotBase64(params Params, w http.ResponseWriter) {
	img := image.NewRGBA(image.Rect(0, 0, params.Width, params.Height))

	for x := 0; x < params.Width; x++ {
		for y := 0; y < params.Height; y++ {
			// setup cords
			zx := ((((float64(x) + params.ShiftX) / float64(params.Width)) * float64(params.XMax-params.XMin)) + float64(params.XMin)) / float64(params.Zoom)
			zy := ((((float64(y) + params.ShiftY) / float64(params.Height)) * float64(params.YMax-params.YMin)) + float64(params.YMin)) / float64(params.Zoom)
			z0 := complex(0, 0)
			p := complex(zx, zy)

			// The color depends on the number of iterations
			iter := complexColor(z0, p, params)

			h := float64(float64(255*iter) / float64(params.MAX_ITERATION))
			s := float64(255)
			v := 255

			if iter >= 255 {
				v = 0
			}

			c := colorful.Hsv(float64(h), float64(s), float64(v))

			r, g, b, a := c.RGBA()

			img.Set(x, y, color.RGBA{
				R: uint8(r),
				G: uint8(g),
				B: uint8(b),
				A: uint8(a),
			})
		}
	}

	// In-memory buffer to store PNG image
	// before we base 64 encode it
	var buff bytes.Buffer
	// The Buffer satisfies the Writer interface so we can use it with Encode
	// In previous example we encoded to a file, this time to a temp buffer
	png.Encode(&buff, img)
	// Encode the bytes in the buffer to a base64 string
	encodedString := base64.StdEncoding.EncodeToString(buff.Bytes())

	w.Write([]byte(encodedString))
}

func complexColor(z, p complex128, params Params) float64 {
	var n int = 0
	for n < params.MAX_ITERATION && cmplx.Abs(z) <= 2 {
		z = z*z + p
		n++
	}

	if n == params.MAX_ITERATION {
		return float64(n)
	}
	// check sum number lim n -> nan if not the in our number

	return float64(n+1) - math.Log(math.Log2(cmplx.Abs(z)))
}
