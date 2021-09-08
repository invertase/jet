/*
 * A view that includes a list of all tests, allowing the user to
 * select or deselect particular tests and run them.
 */

import R from 'react';
import RN from 'react-native';
import _ from 'lodash';

import * as CommonStyles from './CommonStyles';
import { Test, TestResult, TestType } from './Test';
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

export interface TestListViewProps extends R.ComponentPropsWithoutRef<any> {
  onSelectTest: (path: string) => void;
  onRunAll: () => void;
}

export interface TestListViewState {
  results?: { [path: string]: TestResult };
}

export class TestListView extends R.Component<TestListViewProps, TestListViewState> {
  constructor(props: TestListViewProps) {
    super(props);

    this.state = {
      results: {},
    };
  }

  render() {
    const tests = TestRegistry.getAllTests();

    const testListItems: JSX.Element[] = _.map(tests, (test, path) => {
      const testPath = test.getPath();
      const testType = test.getTestType();
      const result = TestRegistry.getResult(testPath);
      let resultText: JSX.Element;

      if (!result) {
        resultText = (
          <RN.Text style={_styles.notRunText} numberOfLines={1}>
            not run
          </RN.Text>
        );
      } else if (result.errors.length > 0) {
        resultText = (
          <RN.Text style={_styles.errorText} numberOfLines={1}>
            {result.errors.length + (result.errors.length > 1 ? ' errors' : ' error')}
          </RN.Text>
        );
      } else if (testType === TestType.Interactive && !result.userValidated) {
        resultText = (
          <RN.Text style={_styles.warningText} numberOfLines={1}>
            needs validation
          </RN.Text>
        );
      } else {
        resultText = (
          <RN.Text style={_styles.successText} numberOfLines={1}>
            {testType === TestType.Interactive ? 'validated' : 'success'}
          </RN.Text>
        );
      }

      return (
        <RN.View
          style={_styles.itemContainer}
          key={path}
          onTouchStart={() => this._onPressItem(testPath)}
        >
          <RN.View style={_styles.itemTextContainer}>
            <RN.Text style={_styles.itemText} numberOfLines={1}>
              {TestRegistry.formatPath(test.getPath())}
            </RN.Text>
            <RN.View style={_styles.resultContainer}>{resultText}</RN.View>
          </RN.View>
        </RN.View>
      );
    });

    return (
      <RN.View style={_styles.container}>
        <RN.View style={_styles.header}>
          <RN.Text style={_styles.explainText}>Select test to run</RN.Text>
          <RN.Button
            title="Run All"
            // style={ _styles.button }

            onPress={this._runAll}
          >
            <RN.Text style={_styles.buttonText}>Run All</RN.Text>
          </RN.Button>
        </RN.View>
        <RN.ScrollView style={_styles.scrollView}>{testListItems}</RN.ScrollView>
      </RN.View>
    );
  }

  private _onPressItem(path: string) {
    this.props.onSelectTest(path);
  }

  private _runAll = (e: RN.NativeSyntheticEvent<any>) => {
    this.props.onRunAll();
  };
}
