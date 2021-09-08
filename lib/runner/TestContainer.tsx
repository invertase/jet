import R from 'react';
import RN from 'react-native';

import * as CommonStyles from './CommonStyles';
import { AutoExecutableTest, TestResult, TestType } from './Test';
import TestRegistry from './TestRegistry';

const _styles = RN.StyleSheet.create({
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

export interface TestContainerProps extends R.ComponentPropsWithoutRef<any> {
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

export class TestContainer extends R.Component<TestContainerProps, TestContainerState> {
  constructor(props: TestContainerProps) {
    super(props);

    this.state = {
      mountedComponent: undefined,
      isTestRunning: false,
    };
  }

  componentDidUpdate(prevProps: TestContainerProps, prevState: TestContainerState) {
    if (this.props.autoRun) {
      if (!prevState.isTestRunning && !this.state.isTestRunning) {
        this._executeTest();
      }
    }
  }

  render() {
    const test = TestRegistry.getTest(this.props.test);
    const testType = test.getTestType();

    let testResults: JSX.Element;
    const result = this.state.result || this.props.prevResult;
    const resultText: JSX.Element[] = [];
    if (!result) {
      resultText.push(
        <RN.View style={_styles.resultItem} key="notrun">
          <RN.Text style={_styles.notRunText}>
            {this.state.isTestRunning ? 'Test is running' : 'Test not run'}
          </RN.Text>
        </RN.View>
      );
    } else {
      result.errors.forEach((error, index) => {
        resultText.push(
          <RN.View style={_styles.resultItem} key={`error${index}`}>
            <RN.Text style={_styles.errorText}>{error}</RN.Text>
          </RN.View>
        );
      });

      if (resultText.length === 0) {
        resultText.push(
          <RN.View style={_styles.resultItem} key="success">
            <RN.Text style={_styles.successText}>Test succeeded</RN.Text>
          </RN.View>
        );
      }
    }

    // Include results if it's not a render-only test.
    let optionalResultSection: JSX.Element | undefined;
    if (testType === TestType.AutoExecutable) {
      optionalResultSection = (
        <RN.View style={_styles.resultContainer}>
          <RN.ScrollView style={_styles.resultScrollView}>{resultText}</RN.ScrollView>
        </RN.View>
      );
    }

    let rightButton: JSX.Element;
    if (testType === TestType.Interactive) {
      rightButton = (
        <RN.Button
          title="Validate"
          // style={ _styles.button }
          onPress={this._onCompleteInteractiveTest}
        >
          <RN.Text style={_styles.buttonText}>Validate</RN.Text>
        </RN.Button>
      );
    } else {
      rightButton = (
        <RN.Button
          title="Run"
          // style={ _styles.button }
          onPress={this._onRunTest}
          disabled={this.state.isTestRunning || testType !== TestType.AutoExecutable}
        >
          <RN.Text style={_styles.buttonText}>Run</RN.Text>
        </RN.Button>
      );
    }

    const renderedTest = test.render(this._onMountTestUI);

    let testContainer: JSX.Element;
    if (test.useFullScreenContainer) {
      testContainer = <RN.View style={_styles.fullScreenContainer}>{renderedTest}</RN.View>;
    } else {
      testContainer = (
        <RN.ScrollView>
          <RN.View>{renderedTest}</RN.View>
        </RN.ScrollView>
      );
    }

    return (
      <RN.View style={_styles.container}>
        <RN.View style={_styles.header}>
          <RN.Button
            title="Back"
            // style={ _styles.button }
            onPress={this._onBack}
            disabled={this.state.isTestRunning}
          >
            <RN.Text style={_styles.buttonText}>Back</RN.Text>
          </RN.Button>
          <RN.Text style={_styles.titleText} numberOfLines={1}>
            {TestRegistry.formatPath(test.getPath())}
          </RN.Text>
          {rightButton}
        </RN.View>
        {optionalResultSection}
        {testContainer}
      </RN.View>
    );
  }

  private _onBack = () => {
    this.props.onBack();
  };

  private _onRunTest = () => {
    this._executeTest();
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
}
