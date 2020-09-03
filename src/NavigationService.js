import { CommonActions, StackActions  } from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    CommonActions.navigate({
      routeName,
      params,
    }),
  );
}

function reset(routeName) {
  _navigator.dispatch(StackActions.reset({
      index: 0,
      key: null,
      actions: [CommonActions.navigate({ routeName })],
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  reset
};