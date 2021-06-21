import "./App.css";
import api from "./api/api";
import { useEffect } from "react";
import { switchMap } from "rxjs/operators";
import { forkJoin } from "rxjs";

// using switch map for sequential requests
function App() {
  useEffect(() => {
    api
      .get()
      .pipe(switchMap((x) => api.get(`?gender=${x.results[0].gender}`)))
      .subscribe((y) => console.log("Inside Y: ", y.results));
  }, []);

  // using forkJoin for parallel  requests
  useEffect(() => {
    forkJoin({
      data1: api.get(),
      data2: api.get(),
      data3: api.get(),
    }).subscribe(({ data1, data2, data3 }) => {
      console.log("data 1: ", data1);
      console.log("data 2: ", data2);
      console.log("data 3: ", data3);
    });
  }, []);

  // using switch map and forkJoin for sequential and parallel requests
  useEffect(() => {
    api
      .get()
      .pipe(
        switchMap((x) => {
          console.log(x.results[0].gender);
          return forkJoin({
            datax: api.get(`?gender=${x.results[0].gender}`),
            datay: api.get(`?gender=${x.results[0].gender}`),
            dataz: api.get(`?gender=${x.results[0].gender}`),
          });
        })
      )
      .subscribe(({ datax, datay, dataz }) => {
        console.log("data x : ", datax);
        console.log("data y : ", datay);
        console.log("data z : ", dataz);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">Inside App</header>
    </div>
  );
}

export default App;
