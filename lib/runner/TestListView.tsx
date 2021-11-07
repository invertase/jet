/*
 *View that includes a list of all tests, allowing the user to
 * select or deselect particular tests and run them.
 */

import * as React from 'react';
import * as ReactNative from 'react-native';

import * as CommonStyles from './CommonStyles';
import { TestResult, TestType } from './Test';
import TestRegistry from './TestRegistry';

const testListViewStyles = ReactNative.StyleSheet.create({
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
  explainText: {
    fontSize: CommonStyles.generalFontSize,
    marginHorizontal: 12,
    color: CommonStyles.explainTextColor,
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  itemContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 32,
    cursor: 'pointer',
  },
  itemTextContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  itemText: {
    flex: 1,
    fontSize: CommonStyles.generalFontSize,
    marginHorizontal: 12,
  },
  notRunText: {
    fontSize: CommonStyles.generalFontSize,
    color: CommonStyles.explainTextColor,
  },
  errorText: {
    fontSize: CommonStyles.generalFontSize,
    color: CommonStyles.errorTextColor,
  },
  warningText: {
    fontSize: CommonStyles.generalFontSize,
    color: CommonStyles.warningTextColor,
  },
  successText: {
    fontSize: CommonStyles.generalFontSize,
    color: CommonStyles.successTextColor,
  },
});

export interface TestLViewProps extends React.ComponentPropsWithoutRef<any> {
  onSelectTest: (path: string) => void;
  onRunAll: () => void;
}

export interface TestLViewState {
  results?: { [path: string]: TestResult };
}

export class TestListView extends React.Component<TestLViewProps, TestLViewState> {
  // constructor(props: TestLViewProps) {
  //   super(props);

  //   this.state = {
  //     results: {},
  //   };
  // }

  private _runAll = () => {
    this.props.onRunAll();
  };

  private _onPressItem(path: string) {
    this.props.onSelectTest(path);
  }

  render() {
    const tests = TestRegistry.getAllTests();

    const testListItems: JSX.Element[] = Object.keys(TestRegistry.getAllTests()).map(key => {
      const test = tests[key];
      const testPath = test.getPath();
      const testType = test.getTestType();
      const result = TestRegistry.getResult(testPath);
      let resultText: JSX.Element;

      if (!result) {
        resultText = (
          <ReactNative.Text style={testListViewStyles.notRunText} numberOfLines={1}>
            not run
          </ReactNative.Text>
        );
      } else if (result.errors.length > 0) {
        resultText = (
          <ReactNative.Text style={testListViewStyles.errorText} numberOfLines={1}>
            {result.errors.length + (result.errors.length > 1 ? ' errors' : ' error')}
          </ReactNative.Text>
        );
      } else if (testType === TestType.Interactive && !result.userValidated) {
        resultText = (
          <ReactNative.Text style={testListViewStyles.warningText} numberOfLines={1}>
            needs validation
          </ReactNative.Text>
        );
      } else {
        resultText = (
          <ReactNative.Text style={testListViewStyles.successText} numberOfLines={1}>
            {testType === TestType.Interactive ? 'validated' : 'success'}
          </ReactNative.Text>
        );
      }

      return (
        <ReactNative.View
          style={testListViewStyles.itemContainer}
          key={testPath}
          onTouchStart={() => this._onPressItem(testPath)}
        >
          <ReactNative.View style={testListViewStyles.itemTextContainer}>
            <ReactNative.Text style={testListViewStyles.itemText} numberOfLines={1}>
              {TestRegistry.formatPath(test.getPath())}
            </ReactNative.Text>
            <ReactNative.View style={testListViewStyles.resultContainer}>
              {resultText}
            </ReactNative.View>
          </ReactNative.View>
        </ReactNative.View>
      );
    });

    return (
      <ReactNative.View style={testListViewStyles.container}>
        <ReactNative.View style={testListViewStyles.header}>
          <ReactNative.Text style={testListViewStyles.explainText}>
            Select test to run
          </ReactNative.Text>
          <ReactNative.Button
            title="Run All"
            // style={ _styles.button }

            onPress={this._runAll}
          >
            <ReactNative.Text style={testListViewStyles.buttonText}>Run All</ReactNative.Text>
          </ReactNative.Button>
        </ReactNative.View>
        {testListItems !== undefined && testListItems.length > 0 && (
          <ReactNative.ScrollView style={testListViewStyles.scrollView}>
            {testListItems}
          </ReactNative.ScrollView>
        )}
        {(testListItems === undefined || testListItems.length === 0) && (
          <ReactNative.View>
            <ReactNative.Text>No tests registered</ReactNative.Text>
            <ReactNative.Text>
              Use TestRegistry.registerTest() to register your tests.
            </ReactNative.Text>
          </ReactNative.View>
        )}
      </ReactNative.View>
    );
  }
}
