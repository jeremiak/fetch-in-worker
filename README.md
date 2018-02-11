# fetch wrapper to use web workers

## idea

idk, get off the main thread? what if we used web workers to do that? this replaces the `fetch` global object with a wrapper that spawns a web worker, which executes the fetch and does some JSON parsing, and returns a promise. the idea is that it should just work where `fetch` currently works but takes the request and processing off the main thread entirely.

### future ideas?

* make the web worker load as a dataURL so that two files aren't needed to be included in a project
* have some sort of concept of a worker pool. right now each fetch request spawns a worker, which calls `.close()` on itself when done. it might be better to have a pool of workers that don't start up and stop but are available for any request
