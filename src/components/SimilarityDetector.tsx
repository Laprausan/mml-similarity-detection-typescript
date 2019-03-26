import * as React from "react";
import * as Levin from "fast-levenshtein";
import "../style/index.css";

interface SimilarityState {
    leftContent: string;
    rightContent: string;
    similarityPercent: number;
    differences: number;
}

export class SimilarityDetector extends React.Component<{}, SimilarityState> {
    constructor() {
        super({});

        this.state = {
            differences: 0,
            leftContent: "",
            rightContent: "",
            similarityPercent: 0
        };

        this.handleLeftUpdate = this.handleLeftUpdate.bind(this);
        this.handleRightUpdate = this.handleRightUpdate.bind(this);
        this.handleLevin = this.handleLevin.bind(this);
    }

    private handleLeftUpdate(event: React.ChangeEvent) {
        this.setState({ ...this.state, leftContent: (event.target as any).value }, this.handleLevin);
    }
    private handleRightUpdate(event: React.ChangeEvent) {
        this.setState({ ...this.state, rightContent: (event.target as any).value }, this.handleLevin);
    }

    private handleLevin() {
        let differences = Levin.get(this.state.leftContent, this.state.rightContent);
        let similarityPercent = (1.0 - differences / Math.max(this.state.leftContent.length, this.state.rightContent.length)) * 100;
        similarityPercent = Math.trunc(similarityPercent);

        this.setState({ ...this.state, differences, similarityPercent });
    }

    render() {
        return (
            <div>
                <textarea id={"LeftText"} onChange={this.handleLeftUpdate} rows={30} cols={100} />
                <textarea id={"RightText"} onChange={this.handleRightUpdate} rows={30} cols={100} />
                <br />
                <label id={"Similarity"}>Similarity: {this.state.similarityPercent}% </label>
                <br />
                <label id={"Differences"}>Differences: {this.state.differences}</label>
            </div>
        );
    }
}
