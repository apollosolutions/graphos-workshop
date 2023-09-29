package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func runProcessor(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	var cr CoprocessorRequest

	err := json.NewDecoder(r.Body).Decode(&cr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	switch cr.Stage {
	case "RouterResponse":

		cr.Body, err = validateCard(cr.Body)
		if err != nil {

			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(cr)

	default:
		http.Error(w, "Co-processor does not support this stage.", http.StatusBadRequest)

	}

}

func main() {
	router := httprouter.New()
	router.POST("/", runProcessor)

	log.Fatal(http.ListenAndServe(":8080", router))
}
