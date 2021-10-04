import * as React from 'react';
import * as ReactNative from 'react-native';

import * as CommonStyles from './CommonStyles';
import { AutoExecutableTest, TestResult, TestType } from './Test';
import TestRegistry from './TestRegistry';

const testContainerStyles = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    alignSelf: 'stretch',
    flex: 0,
    backgroundColor: CommonStyles.headerBackgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: CommonStyles.headerBorderColor,
  },
  headerSpacer: {
    paddingTop: 20,
  },
  button: {
    flex: 0,
    margin: 8,
    height: 28,
    backgroundColor: CommonStyles.buttonBackgroundColor,
    borderRadius: CommonStyles.buttonBorderRadius,
    borderWidth: CommonStyles.buttonBorderWidth,
    borderColor: CommonStyles.buttonBorderColor,
  },
  buttonText: {
    fontSize: CommonStyles.buttonFontSize,
    marginHorizontal: 12,
    color: CommonStyles.buttonTextColor,
  },
  titleText: {
    flex: -1,
    fontSize: CommonStyles.buttonFontSize,
    marginHorizontal: 12,
  },
  resultContainer: {
    height: 100,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  resultScrollView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  resultItem: {
    marginHorizontal: 12,
    marginTop: 8,
  },
  notRunText: {
    fontSize: CommonStyles.generalFontSize,
    color: CommonStyles.explainTextColor,
  },
  errorText: {
    fontSize: CommonStyles.generalFontSize,
    color: CommonStyles.errorTextColor,
  },
  successText: {
    fontSize: CommonStyles.generalFontSize,
    color: CommonStyles.successTextColor,
  },
  fullScreenContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export interface TestContainerProps extends React.ComponentPropsWithoutRef<any> {
  test: string;
  prevResult?: TestResult;
  autoRun: boolean;
  onBack: () => void;
}

export interface TestContainerState {
  mountedComponent?: any;
  isTestRunning?: boolean;
  result?: TestResult;
}

export class TestContainer extends React.Component<TestContainerProps, TestContainerState> {
  constructor(props: TestContainerProps) {
    super(props);

    this.state = {
      mountedComponent: undefined,
      isTestRunning: false,
    };
  }

  componentDidUpdate(_: TestContainerProps, prevState: TestContainerState) {
    if (this.props.autoRun) {
      if (!prevState.isTestRunning && !this.state.isTestRunning) {
        this._executeTest();
      }
    }
  }

  private _onBack = () => {
    this.props.onBack();
  };

  private _onRunTest = () => {
    this._executeTest();
  };

  private _onCompleteInteractiveTest = () => {
    // This should be called only if the test type is interactive.
    const result = new TestResult();
    result.userValidated = true;
    TestRegistry.setResult(this.props.test, result);

    this.props.onBack();
  };

  private _onMountTestUI = (component: any) => {
    // Record the mounted component. This will trigger
    // the test to run if the autoRun prop is set.
    if (component) {
      this.setState({ mountedComponent: component });
    }
  };

  private _executeTest() {
    this.setState({ isTestRunning: true });

    const test = TestRegistry.getTest(this.props.test);
    const testType = test.getTestType();

    if (testType === TestType.AutoExecutable) {
      (test as AutoExecutableTest).execute(this.state.mountedComponent, result => {
        // Record the results.
        TestRegistry.setResult(this.props.test, result);

        this.setState({ isTestRunning: false, result });

        // Automatically go back.
        if (this.props.autoRun) {
          this.props.onBack();
        }
      });
    } else {
      const result = new TestResult();
      if (testType === TestType.Interactive) {
        result.userValidated = false;
        TestRegistry.setResult(this.props.test, result);
      } else {
        // For render-only tests, always report success.
        TestRegistry.setResult(this.props.test, result);
      }

      // Automatically go back.
      if (this.props.autoRun) {
        this.props.onBack();
      }
    }
  }

  render() {
    const test = TestRegistry.getTest(this.props.test);
    const testType = test.getTestType();

    // let testResults: JSX.Element;
    const result = this.state.result || this.props.prevResult;
    const resultText: JSX.Element[] = [];
    if (!result) {
      resultText.push(
        <ReactNative.View style={testContainerStyles.resultItem} key="notrun">
          <ReactNative.Text style={testContainerStyles.notRunText}>
            {this.state.isTestRunning ? 'Test is running' : 'Test not run'}
          </ReactNative.Text>
        </ReactNative.View>
      );
    } else {
      result.errors.forEach((error, index) => {
        resultText.push(
          // eslint-disable-next-line react/no-array-index-key
          <ReactNative.View style={testContainerStyles.resultItem} key={`error${index}`}>
            <ReactNative.Text style={testContainerStyles.errorText}>{error}</ReactNative.Text>
          </ReactNative.View>
        );
      });

      if (resultText.length === 0) {
        resultText.push(
          <ReactNative.View style={testContainerStyles.resultItem} key="success">
            <ReactNative.Text style={testContainerStyles.successText}>
              Test succeeded
            </ReactNative.Text>
          </ReactNative.View>
        );
      }
    }

    // Include results if it's not a render-only test.
    let optionalResultSection: JSX.Element | undefined;
    if (testType === TestType.AutoExecutable) {
      optionalResultSection = (
        <ReactNative.View style={testContainerStyles.resultContainer}>
          <ReactNative.ScrollView style={testContainerStyles.resultScrollView}>
            {resultText}
          </ReactNative.ScrollView>
        </ReactNative.View>
      );
    }

    let rightButton: JSX.Element;
    if (testType === TestType.Interactive) {
      rightButton = (
        <ReactNative.Button
          title="Validate"
          // style={ _styles.button }
          onPress={this._onCompleteInteractiveTest}
        >
          <ReactNative.Text style={testContainerStyles.buttonText}>Validate</ReactNative.Text>
        </ReactNative.Button>
      );
    } else {
      rightButton = (
        <ReactNative.Button
          title="Run"
          // style={ _styles.button }
          onPress={this._onRunTest}
          disabled={this.state.isTestRunning || testType !== TestType.AutoExecutable}
        >
          <ReactNative.Text style={testContainerStyles.buttonText}>Run</ReactNative.Text>
        </ReactNative.Button>
      );
    }

    const renderedTest = test.render(this._onMountTestUI);

    let testContainer: JSX.Element;
    if (test.useFullScreenContainer) {
      testContainer = (
        <ReactNative.View style={testContainerStyles.fullScreenContainer}>
          {renderedTest}
        </ReactNative.View>
      );
    } else {
      testContainer = (
        <ReactNative.ScrollView>
          <ReactNative.View>{renderedTest}</ReactNative.View>
        </ReactNative.ScrollView>
      );
    }

    return (
      <ReactNative.View style={testContainerStyles.container}>
        <ReactNative.View style={testContainerStyles.header}>
          <ReactNative.Button
            title="Back"
            // style={ _styles.button }
            onPress={this._onBack}
            disabled={this.state.isTestRunning}
          >
            <ReactNative.Text style={testContainerStyles.buttonText}>Back</ReactNative.Text>
          </ReactNative.Button>
          <ReactNative.Text style={testContainerStyles.titleText} numberOfLines={1}>
            {TestRegistry.formatPath(test.getPath())}
          </ReactNative.Text>
          {rightButton}
        </ReactNative.View>
        {optionalResultSection}
        {testContainer}
      </ReactNative.View>
    );
  }
}
