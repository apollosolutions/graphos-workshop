package main

type Context struct {
	Entries map[string]interface{} `json:"entries"`
}

type CoprocessorRequest struct {
	Version int                 `json:"version"`
	Stage   string              `json:"stage"`
	ID      string              `json:"id"`
	Control string              `json:"control"`
	Headers map[string][]string `json:"headers"`
	Body    string              `json:"body"`
	Context *Context            `json:"context"`
}
