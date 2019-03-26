import * as React from "react";
import { SimilarityDetector } from "./SimilarityDetector";

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <SimilarityDetector />
            </div>
        );
    }
}
