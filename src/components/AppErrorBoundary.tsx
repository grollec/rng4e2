import React from 'react';
import {ErrorInfo, ReactNode, useCallback} from 'react';
import {ErrorBoundary, ErrorBoundaryProps} from 'react-error-boundary';
import crashlytics from '@react-native-firebase/crashlytics';

/**
 * App Error Boundary
 * Display a fallback UI when a component throws an error.
 * The error is tracked in datadog.
 *
 * Provide a component name to be able to identify the component in datadog.
 */
export const AppErrorBoundary = ({
  onError,
  ...props
}: {children: ReactNode} & ErrorBoundaryProps) => {
  const handleError = useCallback(
    (error: unknown, info: unknown) => {
      const safeError = parseError(error);
      const safeInfo = parseInfo(info);
      // track error in DD
      crashlytics().recordError({
        ...safeError,
      });
      onError?.(safeError, safeInfo);
    },
    [onError],
  );
  return <ErrorBoundary {...props} onError={handleError} />;
};

const TYPE = 'COMPONENT_ERROR';
class ComponentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = TYPE;
  }
}

/**
 * Parse anything into a proper ComponentError (Error with a name for datadog)
 */
const parseError = (error: unknown): ComponentError => {
  if (error === null || error === undefined) {
    return new ComponentError('No error message provided');
  }
  if (error instanceof Error) {
    // HACK: mutate the error into a ComponentError to preserve the original stack trace
    // it would be better to create a new ComponentError and copy the stack trace
    // but I don't know how to do that
    try {
      error.name = TYPE;
      return error;
    } catch {
      // in some unknown cases, the error is not mutable and would throw
      // "Cannot set property name of  which has only a getter"
      console.error(error);
      const componentError = new ComponentError(
        error.message ?? 'Unparsable error',
      );
      return componentError;
    }
  }
  if (typeof error === 'object') {
    if ('message' in error && typeof error.message === 'string') {
      return new ComponentError(error.message);
    }
    return new ComponentError(JSON.stringify(error));
  }
  return new ComponentError(String(error));
};

const parseInfo = (info: unknown): ErrorInfo => {
  if (info === null || info === undefined) {
    return {
      componentStack: 'No component stack provided',
    };
  }
  if (typeof info === 'object') {
    if ('componentStack' in info && typeof info.componentStack === 'string') {
      return info as ErrorInfo;
    }
  }
  return {
    componentStack: 'No component stack provided',
  };
};
