Possible refactors:

backend/app.ts : make saving and reading from storage abstract, then factor out storage logic for the JSON storage system into reusable functions

frontend: divide frontpage content in pages (partially implemented and commented out, some thoughts on this also included in detailed_wireframe.png)
frontend: move the date parsing function out of Experience into an own util/lib file, so that it can be reused outside of it
frontend: create an API object to make operations on projects (and later experiences) more abstract and make it easier to change the impl
frontend: add error handling wherever the backend is queried
frontend: add loading markers while data is being fetched
