import React from "react";
import { render, screen, cleanup, act } from "@testing-library/react";
import useDataLoader from "./useDataLoader";

// copy/pasting an implementation of defer here since i don't think
// jest has a good one
function defer() {
	var deferred = {
		promise: null,
		resolve: null,
		reject: null
	};

	deferred.promise = new Promise((resolve, reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});

	return deferred;
}

const TestComp = ({loadFn, onError}) => {
    let { isLoading, data } = useDataLoader(loadFn, onError);
    console.log({isLoading, data})
    if (isLoading) return <p>Loading</p>;
    return (
        <div>
            <p> Data A: {data.a} </p>
            <p> Data B: {data.b} </p>
        </div>
    );
};

const testOnError = () => {
    return "There was an error!";
};
let deferred, testLoadFn;
beforeEach(() => {
    deferred = defer(); 
    testLoadFn = () => deferred.promise;
});
afterEach(()=>cleanup());

test("returns {isLoading: true, data: null} to start", () => {
    render(<TestComp loadFn={testLoadFn} onError={testOnError} />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
    expect(screen.queryByText(/Data A/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Data B/)).not.toBeInTheDocument();
});

test("returns {isLoading: false, data: {...}} once async loadFn returns", async () => {
    render(<TestComp loadFn={testLoadFn} onError={testOnError} />);
    deferred.resolve({a: 1, b: 2});
    let dataA = await screen.findByText("Data A: 1");
    let dataB = await screen.findByText("Data B: 2");
    expect(dataA).toBeInTheDocument();
    expect(dataB).toBeInTheDocument();
    cleanup();
});
