package images

import (
	"image"
	"image/color"
	"image/png"
	"math/cmplx"
	"net/http"
)

// Piotr Kosmala

type DrawColors struct {
	R, G, B, A uint8
}

type Params struct {
	Width, Height, Zoom    int
	Iteration, Contrast    uint8
	YMax, YMin, XMax, XMin int8
	DrawColor              DrawColors
	ShiftX, ShiftY         float64
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
			color := complexColor(z0, p, params)
			img.Set(x, y, color)
		}
	}
	png.Encode(w, img)
}

func complexColor(z, p complex128, params Params) color.Color {
	for n := uint8(0); n < params.Iteration; n++ {
		z = z*z + p
		// check sum number lim n -> nan if not the in our number
		if cmplx.Abs(z) > 2 {
			return color.RGBA{
				R: params.DrawColor.R - n*params.Contrast,
				G: params.DrawColor.G - n*params.Contrast,
				B: params.DrawColor.B - n*params.Contrast,
				A: params.DrawColor.A,
			}
		}
	}
	return color.Black
}
