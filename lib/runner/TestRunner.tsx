/*
 * This file provides a test framework for ReactXP.
 */

import * as React from 'react';

import { TestContainer } from './TestContainer';
import { TestListView } from './TestListView';
import TestRegistry from './TestRegistry';

interface AppState {
  selectedTest: string;
  runAll: boolean;
}

class TestRunner extends React.Component<any, AppState> {
  constructor(props: React.ComponentPropsWithoutRef<any>) {
    super(props);

    this.state = {
      selectedTest: '',
      runAll: false,
    };
  }

  private _onBack = () => {
    if (this.state.runAll) {
      const testPaths = Object(TestRegistry.getAllTests()).keys();
      const curTestIndex = testPaths.indexOf(this.state.selectedTest);

      // If there are more tests to run, move on to the next one.
      if (curTestIndex + 1 < testPaths.length) {
        console.log('state selectedTest moving to: ', testPaths[curTestIndex + 1]);
        this.setState({ selectedTest: testPaths[curTestIndex + 1] });
        return;
      }
    }

    // Clear the selected test.
    this.setState({ runAll: false, selectedTest: '' });
  };

  private _onSelectTest = (path: string) => {
    this.setState({ selectedTest: path });
  };

  private _onRunAll = () => {
    const firstTest = Object.keys(TestRegistry.getAllTests())[0];

    this.setState({ runAll: true, selectedTest: firstTest || '' });
  };

  render(): React.ReactNode {
    if (this.state.selectedTest) {
      return (
        <TestContainer
          key={this.state.selectedTest}
          test={this.state.selectedTest}
          prevResult={TestRegistry.getResult(this.state.selectedTest)}
          autoRun={this.state.runAll}
          onBack={this._onBack}
        />
      );
    }
    return <TestListView onSelectTest={this._onSelectTest} onRunAll={this._onRunAll} />;
  }
}

export default TestRunner;
