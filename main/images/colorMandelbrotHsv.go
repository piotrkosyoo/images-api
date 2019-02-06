package images

import (
	"github.com/lucasb-eyer/go-colorful"
	"image"
	"image/color"
	"image/png"
	"math"
	"math/cmplx"
	"net/http"
)

func DrawColorMandelbrotHSV(params Params, w http.ResponseWriter) {
	img := image.NewRGBA(image.Rect(0, 0, params.Width, params.Height))
	for x := 0; x < params.Width; x++ {
		for y := 0; y < params.Height; y++ {
			// setup cords
			zx := ((((float64(x) + params.ShiftX) / float64(params.Width)) * float64(params.XMax-params.XMin)) + float64(params.XMin)) / float64(params.Zoom)
			zy := ((((float64(y) + params.ShiftY) / float64(params.Height)) * float64(params.YMax-params.YMin)) + float64(params.YMin)) / float64(params.Zoom)
			z0 := complex(0, 0)
			p := complex(zx, zy)

			// The color depends on the number of iterations
			m := complexcolor(z0, p, params)

			//colorIndex := uint8(255 - int( int(m * 255) / int(params.MAX_ITERATION)))

			hue := int(int(255*m) / params.MAX_ITERATION)
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
	png.Encode(w, img)
}

func complexcolor(z, p complex128, params Params) float64 {
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
