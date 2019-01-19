package images

import (
	"bytes"
	"fmt"
	"math"
)

const (
	width, height = 600, 320            // rozmiar płótna w pikselach
	cells         = 100                 // liczba komórek siatki
	xyrange       = 30.0                // zakresy osi (–xyrange..+xyrange)
	xyscale       = width / 2 / xyrange // liczba pikseli na jednostkę x lub y
	zscale        = height * 0.4        // liczba pikseli na jednostkę z
	angle         = math.Pi / 6         // kąt nachylenia osi x, y (=30°)
)

var sin30, cos30 = math.Sin(angle), math.Cos(angle) // sin(30°), cos(30°)

func BuildSinusXYZDefault() []byte {
	buf := bytes.NewBufferString("")

	fmt.Fprint(buf, fmt.Sprintf("<svg xmlns='http://www.w3.org/2000/svg' "+
		"style='stroke: grey; fill: white; stroke-width: 0.7' "+
		"width='%d' height='%d'>", width, height))
	var u float64 = 255

	for i := 0; i < cells; i++ {
		for j := 0; j < cells; j++ {
			ax, ay, fillAXY := corner(i+1, j)
			bx, by, fillBXY := corner(i, j)
			cx, cy, fillCXY := corner(i, j+1)
			dx, dy, fillDXY := corner(i+1, j+1)
			resultColorBack := (fillAXY + fillBXY + fillCXY + fillDXY) / 4

			if resultColorBack < 0 {
				resultColorBackInt := uint8((resultColorBack * -1) * u)
				red := 255 - resultColorBackInt
				fmt.Fprint(buf, fmt.Sprintf("<polygon points='%g,%g %g,%g %g,%g %g,%g' style='fill:rgb(%d,0,%d)'/>\n",
					ax, ay, bx, by, cx, cy, dx, dy, red, resultColorBackInt))
			} else {
				resultColorBackInt := uint8((resultColorBack) * u)
				blue := 255 - resultColorBackInt
				fmt.Fprint(buf, fmt.Sprintf("<polygon points='%g,%g %g,%g %g,%g %g,%g' style='fill:rgb(%d,0,%d)'/>\n",
					ax, ay, bx, by, cx, cy, dx, dy, resultColorBackInt, blue))
			}

		}
	}
	fmt.Fprint(buf, "</svg>")
	return buf.Bytes()
}

// TODO func BuildSinusXYZDefault(...params)

func corner(i, j int) (float64, float64, float64) {
	// Znajdowanie punktu (x, y) w rogu komórki (i, j).
	x := xyrange * (float64(i)/cells - 0.5)
	y := xyrange * (float64(j)/cells - 0.5)
	// Obliczenie wysokości z powierzchni.
	z := f(x, y)
	// Rzutowanie (x, y, z) izometrycznie na płótno 2D SVG (sx, sy).
	sx := width/2 + (x-y)*cos30*xyscale
	sy := height/2 + (x+y)*sin30*xyscale - z*zscale
	return sx, sy, z
}

func f(x, y float64) float64 {
	r := math.Hypot(x, y) // odległość od punktu (0, 0)
	return math.Sin(r) / r
}
